"""
EduSphere — Slides Data Desktop Studio (Python GUI)
===================================================
A powerful, standalone desktop application to visually view, add, edit,
and delete presentation decks, slides, flashcards, and academic formulas
directly in slides-data.js.

Features:
- Direct local file read/write with automated .bak backups
- Visual Slide Simulator Canvas (real-time rendering of presentation cards)
- 1-Click File Browser with automatic file import into slides/ directory
- Integrated Flashcards Editor & 1-Click "Generate from Slide" converter
- Scientific Formulas Editor
- Deck Health & Validation Inspector (checks file paths & unique IDs)
- Dark Mode / Light Mode toggle
- Dual Mode: Native Tkinter Desktop GUI + Optional Local Web GUI (--web)

Usage:
    python slides_editor.py          # Launches Tkinter Desktop GUI
    python slides_editor.py --web    # Launches Local Web GUI with Auto-Save API
"""

import os
import sys
import json
import shutil
import subprocess
import webbrowser
from datetime import datetime
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Base directory paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SLIDES_DATA_FILE = os.path.join(SCRIPT_DIR, "slides-data.js")
SLIDES_DIR = os.path.join(SCRIPT_DIR, "slides")


# ==============================================================================
# DATA LOAD & SAVE ENGINE
# ==============================================================================

def load_slides_data(file_path=SLIDES_DATA_FILE):
    """Loads academicResources, academicFormulas, and academicFlashcards from slides-data.js."""
    if not os.path.exists(file_path):
        return [], [], []

    # 1. Primary: Load via Node.js for 100% JavaScript runtime accuracy
    try:
        abs_path = os.path.abspath(file_path).replace("\\", "/")
        cmd = ["node", "-e", f"const d = require('{abs_path}'); console.log(JSON.stringify(d));"]
        res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", timeout=10)
        if res.returncode == 0 and res.stdout.strip():
            data = json.loads(res.stdout.strip())
            return (
                data.get("academicResources", []),
                data.get("academicFormulas", []),
                data.get("academicFlashcards", [])
            )
    except Exception as e:
        print(f"[Notice] Node loader note: {e}, using fallback parser...")

    # 2. Fallback text parsing
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        import re
        res_m = re.search(r"const\s+academicResources\s*=\s*(\[[\s\S]*?\]);\s*(?:const|\/\/|if)", content)
        form_m = re.search(r"const\s+academicFormulas\s*=\s*(\[[\s\S]*?\]);\s*(?:const|\/\/|if|module|$)", content)
        flash_m = re.search(r"const\s+academicFlashcards\s*=\s*(\[[\s\S]*?\]);\s*(?:if|module|$)", content)

        resources = json.loads(res_m.group(1)) if res_m else []
        formulas = json.loads(form_m.group(1)) if form_m else []
        flashcards = json.loads(flash_m.group(1)) if flash_m else []
        return resources, formulas, flashcards
    except Exception as e:
        print(f"[Error] Fallback parser error: {e}")
        return [], [], []


def generate_js_content(resources, formulas, flashcards):
    """Generates clean, indented JavaScript code for slides-data.js."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    resources_json = json.dumps(resources, indent=2, ensure_ascii=False)
    formulas_json = json.dumps(formulas, indent=2, ensure_ascii=False)
    flashcards_json = json.dumps(flashcards, indent=2, ensure_ascii=False)

    return (
        "/**\n"
        " * Academic & Seminar Slides Data Repository\n"
        " * ==========================================\n"
        " * Features rich slide-by-slide decks for in-browser presentation view,\n"
        " * full citations, interactive links, and study tools.\n"
        " *\n"
        f" * Last updated via EduSphere Python Desktop Studio: {timestamp}\n"
        " */\n\n"
        f"const academicResources = {resources_json};\n\n"
        "// Quick formula cards for the academic toolkit\n"
        f"const academicFormulas = {formulas_json};\n\n"
        "// Curated academic & seminar flashcards\n"
        f"const academicFlashcards = {flashcards_json};\n\n"
        "if (typeof module !== 'undefined') {\n"
        "  module.exports = { academicResources, academicFormulas, academicFlashcards };\n"
        "}\n"
    )


def save_slides_data(file_path, resources, formulas, flashcards):
    """Saves updated data directly to slides-data.js with automatic .bak backup."""
    if os.path.exists(file_path):
        backup_path = file_path + ".bak"
        try:
            shutil.copy2(file_path, backup_path)
        except Exception:
            pass

    content = generate_js_content(resources, formulas, flashcards)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    return True


def format_file_size(size_bytes):
    """Formats raw bytes into human readable KB / MB string."""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.0f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.1f} MB"


# ==============================================================================
# TKINTER DESKTOP GUI IMPLEMENTATION
# ==============================================================================

def run_tkinter_app():
    import tkinter as tk
    from tkinter import ttk, messagebox, scrolledtext, filedialog

    class SlidesEditorApp:
        def __init__(self, root):
            self.root = root
            self.root.title("EduSphere — Slides Data Desktop Studio (Python)")
            self.root.geometry("1260x860")
            self.root.minsize(1050, 720)

            # State Data
            self.resources = []
            self.formulas = []
            self.flashcards = []
            self.active_deck_idx = 0
            self.active_slide_idx = 0
            self.active_formula_idx = 0
            self.active_flashcard_idx = 0
            self.is_dark = True
            self.flashcard_flipped = False

            # Setup Colors & Theme
            self.apply_theme_colors()

            # Build UI Layout
            self.build_top_bar()
            self.build_main_panels()
            self.build_status_bar()

            # Load Initial Data
            self.reload_data(initial=True)

            # Keyboard Shortcuts
            self.root.bind("<Control-s>", lambda e: self.on_save())
            self.root.bind("<Control-S>", lambda e: self.on_save())
            self.root.bind("<Control-f>", lambda e: self.entry_search.focus_set())
            self.root.bind("<F5>", lambda e: self.reload_data())

        def apply_theme_colors(self):
            """Initializes modern color palettes for Dark or Light theme."""
            if self.is_dark:
                self.c_bg = "#0f172a"          # slate-900
                self.c_panel = "#1e293b"       # slate-800
                self.c_subpanel = "#182234"    # slate-850
                self.c_card = "#334155"        # slate-700
                self.c_border = "#475569"      # slate-600
                self.c_fg = "#f8fafc"          # slate-50
                self.c_muted = "#94a3b8"       # slate-400
                self.c_primary = "#3b82f6"     # blue-500
                self.c_primary_hover = "#2563eb"
                self.c_accent = "#14b8a6"      # teal-500
                self.c_danger = "#dc2626"      # red-600
                self.c_code_bg = "#030712"     # slate-950
                self.c_code_fg = "#34d399"     # emerald-400
                self.c_entry_bg = "#1e293b"
            else:
                self.c_bg = "#f1f5f9"          # slate-100
                self.c_panel = "#ffffff"       # white
                self.c_subpanel = "#f8fafc"    # slate-50
                self.c_card = "#ffffff"
                self.c_border = "#cbd5e1"      # slate-300
                self.c_fg = "#0f172a"          # slate-900
                self.c_muted = "#64748b"       # slate-500
                self.c_primary = "#2563eb"     # blue-600
                self.c_primary_hover = "#1d4ed8"
                self.c_accent = "#0d9488"      # teal-600
                self.c_danger = "#b91c1c"      # red-700
                self.c_code_bg = "#0f172a"
                self.c_code_fg = "#10b981"
                self.c_entry_bg = "#ffffff"

            self.root.configure(bg=self.c_bg)

            # Fonts
            self.f_title = ("Segoe UI", 12, "bold")
            self.f_heading = ("Segoe UI", 10, "bold")
            self.f_bold = ("Segoe UI", 9, "bold")
            self.f_regular = ("Segoe UI", 9)
            self.f_mono = ("Consolas", 9)

            # ttk styles
            style = ttk.Style()
            try:
                style.theme_use("clam")
            except Exception:
                pass

            style.configure(".", background=self.c_panel, foreground=self.c_fg, font=self.f_regular)
            style.configure("TFrame", background=self.c_panel)
            style.configure("Sub.TFrame", background=self.c_subpanel)
            style.configure("Treeview", background=self.c_panel, foreground=self.c_fg,
                            fieldbackground=self.c_panel, rowheight=26, font=self.f_regular)
            style.map("Treeview", background=[("selected", self.c_primary)], foreground=[("selected", "#ffffff")])
            style.configure("Treeview.Heading", background=self.c_subpanel, foreground=self.c_fg, font=self.f_bold)
            style.configure("TNotebook", background=self.c_bg, borderwidth=0)
            style.configure("TNotebook.Tab", background=self.c_subpanel, foreground=self.c_muted, font=self.f_bold, padding=[12, 6])
            style.map("TNotebook.Tab", background=[("selected", self.c_panel)], foreground=[("selected", self.c_primary)])

        def toggle_theme(self):
            self.is_dark = not self.is_dark
            self.apply_theme_colors()
            # Rebuild UI
            for widget in self.root.winfo_children():
                widget.destroy()
            self.build_top_bar()
            self.build_main_panels()
            self.build_status_bar()
            self.reload_data(initial=False)

        # ======================================================================
        # TOP TOOLBAR
        # ======================================================================

        def build_top_bar(self):
            top_frame = tk.Frame(self.root, bg=self.c_panel, height=56, bd=0)
            top_frame.pack(side=tk.TOP, fill=tk.X)
            top_frame.pack_propagate(False)

            # Brand Title
            brand_f = tk.Frame(top_frame, bg=self.c_panel)
            brand_f.pack(side=tk.LEFT, padx=14, pady=8)

            lbl_logo = tk.Label(brand_f, text="🎓 EduSphere", font=("Segoe UI", 12, "bold"), fg=self.c_primary, bg=self.c_panel)
            lbl_logo.pack(side=tk.LEFT)

            lbl_title = tk.Label(brand_f, text="Slides Data Studio", font=("Segoe UI", 11, "bold"), fg=self.c_fg, bg=self.c_panel)
            lbl_title.pack(side=tk.LEFT, padx=(4, 0))

            lbl_badge = tk.Label(brand_f, text="Direct Local Editor", font=("Segoe UI", 8, "bold"),
                                 bg=self.c_subpanel, fg=self.c_accent, padx=6, pady=2)
            lbl_badge.pack(side=tk.LEFT, padx=(8, 0))

            # Action Buttons on Right
            btn_f = tk.Frame(top_frame, bg=self.c_panel)
            btn_f.pack(side=tk.RIGHT, padx=14, pady=8)

            btn_save = tk.Button(btn_f, text="💾 Save to slides-data.js (Ctrl+S)", font=self.f_bold,
                                 bg=self.c_primary, fg="#ffffff", activebackground=self.c_primary_hover,
                                 activeforeground="#ffffff", relief=tk.FLAT, padx=14, pady=5, cursor="hand2", command=self.on_save)
            btn_save.pack(side=tk.LEFT, padx=3)

            btn_health = tk.Button(btn_f, text="🛡️ Validate", font=self.f_regular,
                                   bg=self.c_card, fg=self.c_fg, relief=tk.FLAT, padx=8, pady=5, cursor="hand2", command=self.check_deck_health)
            btn_health.pack(side=tk.LEFT, padx=3)

            btn_new = tk.Button(btn_f, text="➕ New Deck", font=self.f_bold,
                                bg=self.c_card, fg=self.c_fg, relief=tk.FLAT, padx=10, pady=5, cursor="hand2", command=self.on_new_deck)
            btn_new.pack(side=tk.LEFT, padx=3)

            btn_dup = tk.Button(btn_f, text="📋 Duplicate", font=self.f_regular,
                                bg=self.c_card, fg=self.c_fg, relief=tk.FLAT, padx=8, pady=5, cursor="hand2", command=self.on_duplicate_deck)
            btn_dup.pack(side=tk.LEFT, padx=3)

            btn_del = tk.Button(btn_f, text="🗑️ Delete", font=self.f_regular,
                                bg=self.c_danger, fg="#ffffff", relief=tk.FLAT, padx=8, pady=5, cursor="hand2", command=self.on_delete_deck)
            btn_del.pack(side=tk.LEFT, padx=3)

            theme_icon = "☀️ Light" if self.is_dark else "🌙 Dark"
            btn_theme = tk.Button(btn_f, text=theme_icon, font=self.f_regular,
                                  bg=self.c_card, fg=self.c_fg, relief=tk.FLAT, padx=8, pady=5, cursor="hand2", command=self.toggle_theme)
            btn_theme.pack(side=tk.LEFT, padx=3)

            btn_browser = tk.Button(btn_f, text="🌐 View Site", font=self.f_regular,
                                    bg=self.c_accent, fg="#ffffff", relief=tk.FLAT, padx=9, pady=5, cursor="hand2", command=self.open_in_browser)
            btn_browser.pack(side=tk.LEFT, padx=3)

        # ======================================================================
        # MAIN PANELS (Left: Navigator, Right: Notebook)
        # ======================================================================

        def build_main_panels(self):
            self.paned = ttk.PanedWindow(self.root, orient=tk.HORIZONTAL)
            self.paned.pack(fill=tk.BOTH, expand=True, padx=8, pady=8)

            # Left Navigator
            left_frame = tk.Frame(self.paned, bg=self.c_panel, width=340)
            self.paned.add(left_frame, weight=1)

            # Search bar
            search_f = tk.Frame(left_frame, bg=self.c_panel)
            search_f.pack(fill=tk.X, padx=8, pady=6)

            tk.Label(search_f, text="🔍", font=self.f_regular, bg=self.c_panel, fg=self.c_muted).pack(side=tk.LEFT, padx=(0, 4))
            self.entry_search = tk.Entry(search_f, font=self.f_regular, bg=self.c_entry_bg, fg=self.c_fg,
                                         insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.entry_search.pack(side=tk.LEFT, fill=tk.X, expand=True)
            self.entry_search.bind("<KeyRelease>", lambda e: self.filter_deck_list())

            # Decks Treeview
            columns = ("title", "category", "count")
            self.tree_decks = ttk.Treeview(left_frame, columns=columns, show="headings", selectmode="browse")
            self.tree_decks.heading("title", text="Presentation Title")
            self.tree_decks.heading("category", text="Discipline")
            self.tree_decks.heading("count", text="Slides")
            self.tree_decks.column("title", width=180)
            self.tree_decks.column("category", width=95)
            self.tree_decks.column("count", width=45, anchor="center")

            scroll_d = ttk.Scrollbar(left_frame, orient=tk.VERTICAL, command=self.tree_decks.yview)
            self.tree_decks.configure(yscrollcommand=scroll_d.set)
            scroll_d.pack(side=tk.RIGHT, fill=tk.Y)
            self.tree_decks.pack(fill=tk.BOTH, expand=True, padx=(8, 0), pady=(0, 6))
            self.tree_decks.bind("<<TreeviewSelect>>", self.on_deck_select)

            # Quick Deck Counter
            self.lbl_deck_stat = tk.Label(left_frame, text="11 presentations loaded", font=self.f_regular,
                                          bg=self.c_panel, fg=self.c_muted, anchor="w")
            self.lbl_deck_stat.pack(fill=tk.X, padx=8, pady=(0, 6))

            # Right Notebook
            right_frame = tk.Frame(self.paned, bg=self.c_bg)
            self.paned.add(right_frame, weight=3)

            self.notebook = ttk.Notebook(right_frame)
            self.notebook.pack(fill=tk.BOTH, expand=True)

            # Tab 1: Presentation Metadata & Files
            self.tab_meta = ttk.Frame(self.notebook, padding=12)
            self.notebook.add(self.tab_meta, text="1. Deck Metadata & File")
            self.build_meta_tab()

            # Tab 2: Slide-by-Slide Content Builder (with Live Card Preview Canvas)
            self.tab_slides = ttk.Frame(self.notebook, padding=12)
            self.notebook.add(self.tab_slides, text="2. Slide Builder & Live Preview")
            self.build_slides_tab()

            # Tab 3: Flashcards Studio
            self.tab_flashcards = ttk.Frame(self.notebook, padding=12)
            self.notebook.add(self.tab_flashcards, text="3. Flashcards Studio")
            self.build_flashcards_tab()

            # Tab 4: Scientific Formulas Directory
            self.tab_formulas = ttk.Frame(self.notebook, padding=12)
            self.notebook.add(self.tab_formulas, text="4. Scientific Formulas")
            self.build_formulas_tab()

            # Tab 5: Raw Code Inspector
            self.tab_code = ttk.Frame(self.notebook, padding=12)
            self.notebook.add(self.tab_code, text="5. Raw Code")
            self.build_code_tab()

        # ======================================================================
        # TAB 1: METADATA & FILE PICKER
        # ======================================================================

        def build_meta_tab(self):
            frame = self.tab_meta

            # Title
            ttk.Label(frame, text="Presentation Title *", font=self.f_bold).grid(row=0, column=0, sticky="w", pady=4)
            self.e_title = tk.Entry(frame, font=self.f_title, bg=self.c_entry_bg, fg=self.c_fg,
                                    insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_title.grid(row=0, column=1, columnspan=3, sticky="ew", pady=4, padx=4)

            # ID Slug & Category
            ttk.Label(frame, text="ID Slug *", font=self.f_bold).grid(row=1, column=0, sticky="w", pady=4)
            self.e_id = tk.Entry(frame, font=self.f_mono, bg=self.c_entry_bg, fg=self.c_fg,
                                 insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_id.grid(row=1, column=1, sticky="ew", pady=4, padx=4)

            ttk.Label(frame, text="Discipline *", font=self.f_bold).grid(row=1, column=2, sticky="w", pady=4)
            self.cb_category = ttk.Combobox(frame, values=[
                "Computer Science", "Biology & Health", "Economics & Social Studies",
                "Geography & Social Studies", "Electronics & IoT", "Public Speaking & Study Notes",
                "Mathematics & Science"
            ])
            self.cb_category.grid(row=1, column=3, sticky="ew", pady=4, padx=4)

            # Format & Author
            ttk.Label(frame, text="Format / Type *", font=self.f_bold).grid(row=2, column=0, sticky="w", pady=4)
            self.cb_type = ttk.Combobox(frame, values=["PPTX", "PDF", "Interactive HTML", "Canva"])
            self.cb_type.grid(row=2, column=1, sticky="ew", pady=4, padx=4)

            ttk.Label(frame, text="Author Name *", font=self.f_bold).grid(row=2, column=2, sticky="w", pady=4)
            self.e_author = tk.Entry(frame, font=self.f_regular, bg=self.c_entry_bg, fg=self.c_fg,
                                     insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_author.grid(row=2, column=3, sticky="ew", pady=4, padx=4)

            # File URL & Browse Button
            ttk.Label(frame, text="File Path / URL *", font=self.f_bold).grid(row=3, column=0, sticky="w", pady=4)
            file_box_frame = tk.Frame(frame, bg=self.c_panel)
            file_box_frame.grid(row=3, column=1, sticky="ew", pady=4, padx=4)

            self.e_fileurl = tk.Entry(file_box_frame, font=self.f_mono, bg=self.c_entry_bg, fg=self.c_fg,
                                      insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_fileurl.pack(side=tk.LEFT, fill=tk.X, expand=True)

            btn_browse = tk.Button(file_box_frame, text="📂 Browse...", font=self.f_regular,
                                   bg=self.c_card, fg=self.c_fg, relief=tk.FLAT, padx=8, pady=1,
                                   cursor="hand2", command=self.browse_slide_file)
            btn_browse.pack(side=tk.RIGHT, padx=(4, 0))

            ttk.Label(frame, text="Embed URL", font=self.f_bold).grid(row=3, column=2, sticky="w", pady=4)
            self.e_embedurl = tk.Entry(frame, font=self.f_mono, bg=self.c_entry_bg, fg=self.c_fg,
                                       insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_embedurl.grid(row=3, column=3, sticky="ew", pady=4, padx=4)

            # File Size & Academic Level
            ttk.Label(frame, text="File Size / Label", font=self.f_bold).grid(row=4, column=0, sticky="w", pady=4)
            self.e_filesize = tk.Entry(frame, font=self.f_regular, bg=self.c_entry_bg, fg=self.c_fg,
                                       insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_filesize.grid(row=4, column=1, sticky="ew", pady=4, padx=4)

            ttk.Label(frame, text="Academic Level", font=self.f_bold).grid(row=4, column=2, sticky="w", pady=4)
            self.e_level = tk.Entry(frame, font=self.f_regular, bg=self.c_entry_bg, fg=self.c_fg,
                                    insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_level.grid(row=4, column=3, sticky="ew", pady=4, padx=4)

            # Executive Summary
            ttk.Label(frame, text="Executive Summary *", font=self.f_bold).grid(row=5, column=0, sticky="nw", pady=6)
            self.txt_summary = scrolledtext.ScrolledText(frame, height=4, font=self.f_regular, bg=self.c_entry_bg,
                                                         fg=self.c_fg, insertbackground=self.c_fg, wrap=tk.WORD, bd=1, relief=tk.SOLID)
            self.txt_summary.grid(row=5, column=1, columnspan=3, sticky="ew", pady=6, padx=4)

            # Topics Covered
            ttk.Label(frame, text="Topics Covered\n(one per line)", font=self.f_bold).grid(row=6, column=0, sticky="nw", pady=6)
            self.txt_topics = scrolledtext.ScrolledText(frame, height=4, font=self.f_regular, bg=self.c_entry_bg,
                                                        fg=self.c_fg, insertbackground=self.c_fg, wrap=tk.WORD, bd=1, relief=tk.SOLID)
            self.txt_topics.grid(row=6, column=1, columnspan=3, sticky="ew", pady=6, padx=4)

            # Tags & Featured
            ttk.Label(frame, text="Tags (comma-separated)", font=self.f_bold).grid(row=7, column=0, sticky="w", pady=4)
            self.e_tags = tk.Entry(frame, font=self.f_regular, bg=self.c_entry_bg, fg=self.c_fg,
                                   insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_tags.grid(row=7, column=1, columnspan=2, sticky="ew", pady=4, padx=4)

            self.var_featured = tk.BooleanVar(value=True)
            self.chk_featured = ttk.Checkbutton(frame, text="Featured Deck", variable=self.var_featured)
            self.chk_featured.grid(row=7, column=3, sticky="w", pady=4, padx=4)

            frame.columnconfigure(1, weight=1)
            frame.columnconfigure(3, weight=1)

            # Action bar
            btn_row = tk.Frame(frame, bg=self.c_panel)
            btn_row.grid(row=8, column=0, columnspan=4, sticky="ew", pady=12)

            self.lbl_file_verify = tk.Label(btn_row, text="File Check", font=self.f_regular, bg=self.c_panel, fg=self.c_muted)
            self.lbl_file_verify.pack(side=tk.LEFT)

            btn_apply = tk.Button(btn_row, text="Apply Changes to Active Deck", bg=self.c_primary, fg="#ffffff",
                                  font=self.f_bold, relief=tk.FLAT, padx=14, pady=6, cursor="hand2", command=self.apply_deck_meta)
            btn_apply.pack(side=tk.RIGHT)

        def browse_slide_file(self):
            """Opens file picker and automatically copies selected slide file into slides/ directory."""
            file_path = filedialog.askopenfilename(
                title="Select Presentation or Slide File",
                filetypes=[
                    ("Slide & Document Formats", "*.pptx;*.pdf;*.html;*.key;*.ppt"),
                    ("PowerPoint (*.pptx)", "*.pptx"),
                    ("PDF Documents (*.pdf)", "*.pdf"),
                    ("HTML Apps (*.html)", "*.html"),
                    ("All Files (*.*)", "*.*")
                ]
            )
            if not file_path:
                return

            os.makedirs(SLIDES_DIR, exist_ok=True)
            filename = os.path.basename(file_path)
            target_path = os.path.join(SLIDES_DIR, filename)

            # Copy if external
            if os.path.abspath(file_path) != os.path.abspath(target_path):
                try:
                    shutil.copy2(file_path, target_path)
                    messagebox.showinfo("Imported File", f"File successfully copied to project slides folder:\n\nslides/{filename}")
                except Exception as e:
                    messagebox.showerror("Copy Failed", f"Could not copy file to slides folder:\n{e}")
                    return

            rel_url = f"slides/{filename}"
            self.e_fileurl.delete(0, tk.END)
            self.e_fileurl.insert(0, rel_url)

            # Set file size automatically
            try:
                size_bytes = os.path.getsize(target_path)
                self.e_filesize.delete(0, tk.END)
                self.e_filesize.insert(0, format_file_size(size_bytes))
            except Exception:
                pass

            # Detect format
            if filename.lower().endswith(".pptx") or filename.lower().endswith(".ppt"):
                self.cb_type.set("PPTX")
            elif filename.lower().endswith(".pdf"):
                self.cb_type.set("PDF")
            elif filename.lower().endswith(".html"):
                self.cb_type.set("Interactive HTML")

            self.verify_active_deck_file()

        def verify_active_deck_file(self):
            url = self.e_fileurl.get().strip()
            if not url:
                self.lbl_file_verify.config(text="⚠️ No file URL set", fg="#f59e0b")
                return
            if url.startswith("http://") or url.startswith("https://"):
                self.lbl_file_verify.config(text="🌐 External Cloud Link", fg=self.c_accent)
                return
            disk_path = os.path.join(SCRIPT_DIR, url.replace("/", os.sep))
            if os.path.exists(disk_path):
                self.lbl_file_verify.config(text="✓ Local file verified in slides/", fg="#10b981")
            else:
                self.lbl_file_verify.config(text=f"⚠️ File missing on disk ({url})", fg="#ef4444")

        # ======================================================================
        # TAB 2: SLIDE BUILDER WITH LIVE SIMULATOR
        # ======================================================================

        def build_slides_tab(self):
            paned_s = ttk.PanedWindow(self.tab_slides, orient=tk.HORIZONTAL)
            paned_s.pack(fill=tk.BOTH, expand=True)

            # Sub-panel 1: Slides List (left)
            left_s = tk.Frame(paned_s, bg=self.c_panel, width=220)
            paned_s.add(left_s, weight=1)

            btn_s_row = tk.Frame(left_s, bg=self.c_panel)
            btn_s_row.pack(fill=tk.X, pady=(0, 6))

            tk.Button(btn_s_row, text="+ Slide", font=self.f_bold, bg=self.c_primary, fg="#ffffff",
                      relief=tk.FLAT, padx=6, pady=2, command=self.on_add_slide).pack(side=tk.LEFT, padx=1)
            tk.Button(btn_s_row, text="▲", font=self.f_regular, bg=self.c_card, fg=self.c_fg,
                      relief=tk.FLAT, padx=5, pady=2, command=self.on_move_slide_up).pack(side=tk.LEFT, padx=1)
            tk.Button(btn_s_row, text="▼", font=self.f_regular, bg=self.c_card, fg=self.c_fg,
                      relief=tk.FLAT, padx=5, pady=2, command=self.on_move_slide_down).pack(side=tk.LEFT, padx=1)
            tk.Button(btn_s_row, text="✕", font=self.f_regular, bg=self.c_danger, fg="#ffffff",
                      relief=tk.FLAT, padx=5, pady=2, command=self.on_delete_slide).pack(side=tk.LEFT, padx=1)

            self.tree_slides = ttk.Treeview(left_s, columns=("num", "title"), show="headings", selectmode="browse")
            self.tree_slides.heading("num", text="#")
            self.tree_slides.heading("title", text="Slide Title")
            self.tree_slides.column("num", width=36, anchor="center")
            self.tree_slides.column("title", width=160)

            scroll_s = ttk.Scrollbar(left_s, orient=tk.VERTICAL, command=self.tree_slides.yview)
            self.tree_slides.configure(yscrollcommand=scroll_s.set)
            scroll_s.pack(side=tk.RIGHT, fill=tk.Y)
            self.tree_slides.pack(fill=tk.BOTH, expand=True)
            self.tree_slides.bind("<<TreeviewSelect>>", self.on_slide_select)

            # Sub-panel 2: Slide Editor Form (middle)
            mid_s = tk.Frame(paned_s, bg=self.c_panel, padx=8)
            paned_s.add(mid_s, weight=2)

            tk.Label(mid_s, text="Slide Title *", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.e_slide_title = tk.Entry(mid_s, font=self.f_title, bg=self.c_entry_bg, fg=self.c_fg,
                                          insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_slide_title.pack(fill=tk.X, pady=(0, 8))
            self.e_slide_title.bind("<KeyRelease>", lambda e: self.update_slide_preview())

            tk.Label(mid_s, text="Slide Subtitle", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.e_slide_sub = tk.Entry(mid_s, font=self.f_regular, bg=self.c_entry_bg, fg=self.c_fg,
                                        insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_slide_sub.pack(fill=tk.X, pady=(0, 8))
            self.e_slide_sub.bind("<KeyRelease>", lambda e: self.update_slide_preview())

            tk.Label(mid_s, text="Bullet Points (one bullet per line) *", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.txt_slide_bullets = scrolledtext.ScrolledText(mid_s, height=7, font=self.f_regular, bg=self.c_entry_bg,
                                                               fg=self.c_fg, insertbackground=self.c_fg, wrap=tk.WORD, bd=1, relief=tk.SOLID)
            self.txt_slide_bullets.pack(fill=tk.BOTH, expand=True, pady=(0, 8))
            self.txt_slide_bullets.bind("<KeyRelease>", lambda e: self.update_slide_preview())

            tk.Label(mid_s, text="Core Seminar Takeaway (Highlight Box)", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.e_slide_takeaway = tk.Entry(mid_s, font=self.f_regular, bg=self.c_entry_bg, fg=self.c_fg,
                                             insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_slide_takeaway.pack(fill=tk.X, pady=(0, 10))
            self.e_slide_takeaway.bind("<KeyRelease>", lambda e: self.update_slide_preview())

            slide_action_f = tk.Frame(mid_s, bg=self.c_panel)
            slide_action_f.pack(fill=tk.X)

            tk.Button(slide_action_f, text="⚡ Convert to Flashcard", font=self.f_regular, bg=self.c_subpanel,
                      fg=self.c_accent, relief=tk.FLAT, padx=8, pady=4, cursor="hand2", command=self.convert_active_slide_to_flashcard).pack(side=tk.LEFT)

            tk.Button(slide_action_f, text="Apply Slide Changes", font=self.f_bold, bg=self.c_primary,
                      fg="#ffffff", relief=tk.FLAT, padx=12, pady=5, cursor="hand2", command=self.apply_slide_changes).pack(side=tk.RIGHT)

            # Sub-panel 3: Live Visual Slide Simulator (right)
            right_s = tk.Frame(paned_s, bg=self.c_subpanel, padx=12, pady=12, bd=1, relief=tk.SOLID)
            paned_s.add(right_s, weight=2)

            tk.Label(right_s, text="🖥️ Live Slide Simulator", font=self.f_bold, bg=self.c_subpanel, fg=self.c_muted).pack(anchor="w", pady=(0, 8))

            # The Simulated Slide Card
            self.sim_card = tk.Frame(right_s, bg=self.c_panel, bd=1, relief=tk.SOLID, padx=14, pady=14)
            self.sim_card.pack(fill=tk.BOTH, expand=True)

            self.sim_badge = tk.Label(self.sim_card, text="Slide 1", font=("Segoe UI", 9, "bold"),
                                      bg="#dbeafe", fg="#1d4ed8", padx=6, pady=2)
            self.sim_badge.pack(anchor="w", pady=(0, 6))

            self.sim_title = tk.Label(self.sim_card, text="Slide Title", font=("Segoe UI", 13, "bold"),
                                      bg=self.c_panel, fg=self.c_fg, wraplength=280, justify=tk.LEFT)
            self.sim_title.pack(anchor="w", pady=(0, 2))

            self.sim_subtitle = tk.Label(self.sim_card, text="Subtitle", font=("Segoe UI", 9),
                                         bg=self.c_panel, fg=self.c_muted, wraplength=280, justify=tk.LEFT)
            self.sim_subtitle.pack(anchor="w", pady=(0, 10))

            self.sim_bullets = tk.Label(self.sim_card, text="• Bullets appear here", font=("Segoe UI", 9),
                                        bg=self.c_panel, fg=self.c_fg, wraplength=280, justify=tk.LEFT, anchor="nw")
            self.sim_bullets.pack(fill=tk.BOTH, expand=True, anchor="w", pady=(0, 10))

            self.sim_takeaway_box = tk.Frame(self.sim_card, bg="#eff6ff" if not self.is_dark else "#132338",
                                             bd=1, relief=tk.SOLID, padx=8, pady=6)
            self.sim_takeaway_box.pack(fill=tk.X, side=tk.BOTTOM)

            tk.Label(self.sim_takeaway_box, text="CORE TAKEAWAY", font=("Segoe UI", 7, "bold"),
                     bg="#eff6ff" if not self.is_dark else "#132338", fg=self.c_primary).pack(anchor="w")

            self.sim_takeaway = tk.Label(self.sim_takeaway_box, text="Takeaway...", font=("Segoe UI", 8),
                                         bg="#eff6ff" if not self.is_dark else "#132338", fg=self.c_fg, wraplength=260, justify=tk.LEFT)
            self.sim_takeaway.pack(anchor="w")

        def update_slide_preview(self):
            """Updates the live simulator canvas as the user types."""
            title = self.e_slide_title.get().strip() or "Untitled Slide"
            subtitle = self.e_slide_sub.get().strip()
            takeaway = self.e_slide_takeaway.get().strip()
            raw_bullets = self.txt_slide_bullets.get("1.0", tk.END).strip().splitlines()

            num = self.active_slide_idx + 1
            total = len(self.tree_slides.get_children()) or 1
            self.sim_badge.config(text=f"Slide {num} of {total}")
            self.sim_title.config(text=title)
            self.sim_subtitle.config(text=subtitle)

            if raw_bullets:
                formatted_bullets = "\n\n".join(f"▸  {b.strip()}" for b in raw_bullets if b.strip())
                self.sim_bullets.config(text=formatted_bullets)
            else:
                self.sim_bullets.config(text="• Bullet points will appear here...")

            self.sim_takeaway.config(text=takeaway or "Highlight takeaway will appear here...")

        # ======================================================================
        # TAB 3: FLASHCARDS STUDIO
        # ======================================================================

        def build_flashcards_tab(self):
            paned_fc = ttk.PanedWindow(self.tab_flashcards, orient=tk.HORIZONTAL)
            paned_fc.pack(fill=tk.BOTH, expand=True)

            # Left list
            left_fc = tk.Frame(paned_fc, bg=self.c_panel, width=280)
            paned_fc.add(left_fc, weight=1)

            btn_fc_row = tk.Frame(left_fc, bg=self.c_panel)
            btn_fc_row.pack(fill=tk.X, pady=(0, 6))

            tk.Button(btn_fc_row, text="+ New Card", font=self.f_bold, bg=self.c_primary, fg="#ffffff",
                      relief=tk.FLAT, padx=8, pady=3, cursor="hand2", command=self.on_add_flashcard).pack(side=tk.LEFT, padx=1)
            tk.Button(btn_fc_row, text="🗑️ Delete", font=self.f_regular, bg=self.c_danger, fg="#ffffff",
                      relief=tk.FLAT, padx=6, pady=3, cursor="hand2", command=self.on_delete_flashcard).pack(side=tk.LEFT, padx=1)

            self.tree_fc = ttk.Treeview(left_fc, columns=("cat", "question"), show="headings", selectmode="browse")
            self.tree_fc.heading("cat", text="Category")
            self.tree_fc.heading("question", text="Question Prompt")
            self.tree_fc.column("cat", width=90)
            self.tree_fc.column("question", width=180)

            scroll_fc = ttk.Scrollbar(left_fc, orient=tk.VERTICAL, command=self.tree_fc.yview)
            self.tree_fc.configure(yscrollcommand=scroll_fc.set)
            scroll_fc.pack(side=tk.RIGHT, fill=tk.Y)
            self.tree_fc.pack(fill=tk.BOTH, expand=True)
            self.tree_fc.bind("<<TreeviewSelect>>", self.on_flashcard_select)

            # Right Editor Form
            right_fc = tk.Frame(paned_fc, bg=self.c_panel, padx=10)
            paned_fc.add(right_fc, weight=2)

            tk.Label(right_fc, text="Discipline / Category *", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.cb_fc_cat = ttk.Combobox(right_fc, values=[
                "Computer Science", "Electronics & IoT", "Biology & Health",
                "Mathematics & Science", "Economics & Social Studies", "Public Speaking & Notes"
            ])
            self.cb_fc_cat.pack(fill=tk.X, pady=(0, 8))

            tk.Label(right_fc, text="Front: Question / Concept *", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.txt_fc_q = scrolledtext.ScrolledText(right_fc, height=3, font=self.f_regular, bg=self.c_entry_bg,
                                                      fg=self.c_fg, insertbackground=self.c_fg, wrap=tk.WORD, bd=1, relief=tk.SOLID)
            self.txt_fc_q.pack(fill=tk.X, pady=(0, 8))

            tk.Label(right_fc, text="Back: Answer & Technical Rationale *", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.txt_fc_a = scrolledtext.ScrolledText(right_fc, height=4, font=self.f_regular, bg=self.c_entry_bg,
                                                      fg=self.c_fg, insertbackground=self.c_fg, wrap=tk.WORD, bd=1, relief=tk.SOLID)
            self.txt_fc_a.pack(fill=tk.X, pady=(0, 8))

            tk.Label(right_fc, text="Study Tip / Pro Tip (Optional)", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.e_fc_tip = tk.Entry(right_fc, font=self.f_regular, bg=self.c_entry_bg, fg=self.c_fg,
                                     insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_fc_tip.pack(fill=tk.X, pady=(0, 10))

            btn_fc_save = tk.Button(right_fc, text="Apply Flashcard Changes", font=self.f_bold,
                                    bg=self.c_primary, fg="#ffffff", relief=tk.FLAT, padx=12, pady=6,
                                    cursor="hand2", command=self.apply_flashcard_changes)
            btn_fc_save.pack(anchor="e")

        # ======================================================================
        # TAB 4: SCIENTIFIC FORMULAS
        # ======================================================================

        def build_formulas_tab(self):
            paned_f = ttk.PanedWindow(self.tab_formulas, orient=tk.HORIZONTAL)
            paned_f.pack(fill=tk.BOTH, expand=True)

            left_f = tk.Frame(paned_f, bg=self.c_panel, width=280)
            paned_f.add(left_f, weight=1)

            btn_f_row = tk.Frame(left_f, bg=self.c_panel)
            btn_f_row.pack(fill=tk.X, pady=(0, 6))
            tk.Button(btn_f_row, text="+ Formula", font=self.f_bold, bg=self.c_primary, fg="#ffffff",
                      relief=tk.FLAT, padx=8, pady=3, command=self.on_add_formula).pack(side=tk.LEFT, padx=1)
            tk.Button(btn_f_row, text="🗑️ Delete", font=self.f_regular, bg=self.c_danger, fg="#ffffff",
                      relief=tk.FLAT, padx=6, pady=3, command=self.on_delete_formula).pack(side=tk.LEFT, padx=1)

            self.tree_formulas = ttk.Treeview(left_f, columns=("subj", "title"), show="headings", selectmode="browse")
            self.tree_formulas.heading("subj", text="Subject")
            self.tree_formulas.heading("title", text="Title")
            self.tree_formulas.column("subj", width=100)
            self.tree_formulas.column("title", width=160)

            scroll_f = ttk.Scrollbar(left_f, orient=tk.VERTICAL, command=self.tree_formulas.yview)
            self.tree_formulas.configure(yscrollcommand=scroll_f.set)
            scroll_f.pack(side=tk.RIGHT, fill=tk.Y)
            self.tree_formulas.pack(fill=tk.BOTH, expand=True)
            self.tree_formulas.bind("<<TreeviewSelect>>", self.on_formula_select)

            # Right Editor Form
            right_f = tk.Frame(paned_f, bg=self.c_panel, padx=10)
            paned_f.add(right_f, weight=2)

            tk.Label(right_f, text="Subject Area *", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.e_f_subj = tk.Entry(right_f, font=self.f_regular, bg=self.c_entry_bg, fg=self.c_fg,
                                     insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_f_subj.pack(fill=tk.X, pady=(0, 8))

            tk.Label(right_f, text="Formula / Theorem Title *", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.e_f_title = tk.Entry(right_f, font=self.f_title, bg=self.c_entry_bg, fg=self.c_fg,
                                      insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_f_title.pack(fill=tk.X, pady=(0, 8))

            tk.Label(right_f, text="Equation / Expression *", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.e_f_code = tk.Entry(right_f, font=self.f_mono, bg=self.c_entry_bg, fg=self.c_accent,
                                     insertbackground=self.c_fg, relief=tk.SOLID, bd=1)
            self.e_f_code.pack(fill=tk.X, pady=(0, 8))

            tk.Label(right_f, text="Description & Context *", font=self.f_bold, bg=self.c_panel, fg=self.c_fg).pack(anchor="w", pady=(0, 2))
            self.txt_f_desc = scrolledtext.ScrolledText(right_f, height=5, font=self.f_regular, bg=self.c_entry_bg,
                                                        fg=self.c_fg, insertbackground=self.c_fg, wrap=tk.WORD, bd=1, relief=tk.SOLID)
            self.txt_f_desc.pack(fill=tk.BOTH, expand=True, pady=(0, 10))

            btn_f_save = tk.Button(right_f, text="Apply Formula Changes", font=self.f_bold,
                                   bg=self.c_primary, fg="#ffffff", relief=tk.FLAT, padx=12, pady=5,
                                   cursor="hand2", command=self.apply_formula_changes)
            btn_f_save.pack(anchor="e")

        # ======================================================================
        # TAB 5: RAW CODE PREVIEW
        # ======================================================================

        def build_code_tab(self):
            top_c = tk.Frame(self.tab_code, bg=self.c_panel)
            top_c.pack(fill=tk.X, pady=(0, 6))

            tk.Label(top_c, text="Live Output Preview (slides-data.js)", font=self.f_bold,
                     bg=self.c_panel, fg=self.c_fg).pack(side=tk.LEFT)
            tk.Button(top_c, text="Refresh Code", font=self.f_regular, bg=self.c_card, fg=self.c_fg,
                      relief=tk.FLAT, padx=8, pady=2, command=self.update_code_preview).pack(side=tk.RIGHT)

            self.txt_code = scrolledtext.ScrolledText(self.tab_code, font=self.f_mono, bg=self.c_code_bg,
                                                     fg=self.c_code_fg, insertbackground="#ffffff", wrap=tk.NONE)
            self.txt_code.pack(fill=tk.BOTH, expand=True)

        def build_status_bar(self):
            self.status_bar = tk.Frame(self.root, bg=self.c_subpanel, height=26, bd=0)
            self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)

            self.lbl_status = tk.Label(self.status_bar, text="Ready", font=("Segoe UI", 9),
                                       bg=self.c_subpanel, fg=self.c_muted)
            self.lbl_status.pack(side=tk.LEFT, padx=10)

        # ======================================================================
        # DATA OPERATIONS
        # ======================================================================

        def reload_data(self, initial=False):
            self.resources, self.formulas, self.flashcards = load_slides_data(SLIDES_DATA_FILE)
            self.lbl_status.config(text=f"Loaded {len(self.resources)} decks, {len(self.formulas)} formulas, {len(self.flashcards)} flashcards from slides-data.js")
            self.populate_decks_tree()
            self.populate_formulas_tree()
            self.populate_flashcards_tree()
            if self.resources:
                self.select_deck_by_index(0)

        def populate_decks_tree(self, filter_text=""):
            for item in self.tree_decks.get_children():
                self.tree_decks.delete(item)

            filter_text = filter_text.lower().strip()
            count_visible = 0
            for idx, deck in enumerate(self.resources):
                title = deck.get("title", "Untitled")
                category = deck.get("category", "")
                count = len(deck.get("slidesDeck", []))
                if filter_text and filter_text not in title.lower() and filter_text not in category.lower():
                    continue
                self.tree_decks.insert("", tk.END, iid=str(idx), values=(title, category, count))
                count_visible += 1

            self.lbl_deck_stat.config(text=f"{count_visible} presentations shown ({len(self.resources)} total)")

        def filter_deck_list(self):
            text = self.entry_search.get()
            self.populate_decks_tree(text)

        def select_deck_by_index(self, idx):
            if 0 <= idx < len(self.resources):
                self.active_deck_idx = idx
                try:
                    self.tree_decks.selection_set(str(idx))
                    self.tree_decks.see(str(idx))
                except Exception:
                    pass
                self.load_deck_into_form(idx)

        def on_deck_select(self, event):
            sel = self.tree_decks.selection()
            if sel:
                idx = int(sel[0])
                self.active_deck_idx = idx
                self.load_deck_into_form(idx)

        def load_deck_into_form(self, idx):
            if not (0 <= idx < len(self.resources)):
                return
            deck = self.resources[idx]

            self.e_title.delete(0, tk.END)
            self.e_title.insert(0, deck.get("title", ""))

            self.e_id.delete(0, tk.END)
            self.e_id.insert(0, deck.get("id", ""))

            self.cb_category.set(deck.get("category", "Computer Science"))
            self.cb_type.set(deck.get("type", "PPTX"))

            self.e_author.delete(0, tk.END)
            self.e_author.insert(0, deck.get("author", ""))

            self.e_fileurl.delete(0, tk.END)
            self.e_fileurl.insert(0, deck.get("fileUrl", ""))

            self.e_embedurl.delete(0, tk.END)
            self.e_embedurl.insert(0, deck.get("embedUrl", ""))

            self.e_filesize.delete(0, tk.END)
            self.e_filesize.insert(0, deck.get("fileSize", ""))

            self.e_level.delete(0, tk.END)
            self.e_level.insert(0, deck.get("academicLevel", ""))

            self.txt_summary.delete("1.0", tk.END)
            self.txt_summary.insert("1.0", deck.get("summary", ""))

            self.txt_topics.delete("1.0", tk.END)
            topics = deck.get("topicsCovered", [])
            self.txt_topics.insert("1.0", "\n".join(topics))

            self.e_tags.delete(0, tk.END)
            self.e_tags.insert(0, ", ".join(deck.get("tags", [])))

            self.var_featured.set(deck.get("featured", True))

            self.verify_active_deck_file()
            self.populate_slides_tree(deck.get("slidesDeck", []))

        def apply_deck_meta(self):
            if not (0 <= self.active_deck_idx < len(self.resources)):
                return
            deck = self.resources[self.active_deck_idx]

            deck["title"] = self.e_title.get().strip()
            deck["id"] = self.e_id.get().strip()
            deck["category"] = self.cb_category.get().strip()
            deck["type"] = self.cb_type.get().strip()
            deck["author"] = self.e_author.get().strip()
            deck["fileUrl"] = self.e_fileurl.get().strip()
            deck["embedUrl"] = self.e_embedurl.get().strip()
            deck["fileSize"] = self.e_filesize.get().strip()
            deck["academicLevel"] = self.e_level.get().strip()
            deck["summary"] = self.txt_summary.get("1.0", tk.END).strip()

            raw_topics = self.txt_topics.get("1.0", tk.END).strip().splitlines()
            deck["topicsCovered"] = [t.strip() for t in raw_topics if t.strip()]

            raw_tags = self.e_tags.get().strip().split(",")
            deck["tags"] = [t.strip() for t in raw_tags if t.strip()]
            deck["featured"] = self.var_featured.get()

            count = len(deck.get("slidesDeck", []))
            deck["slidesCount"] = f"{count} Slides"

            # Auto citation
            deck["citation"] = {
                "apa": f"{deck['author']}. (2026). {deck['title']}. Academic Seminar Series.",
                "ieee": f"{deck['author']}, \"{deck['title']},\" presented at Academic Seminar Series, 2026."
            }

            self.tree_decks.item(str(self.active_deck_idx), values=(deck["title"], deck["category"], count))
            self.lbl_status.config(text=f"Updated deck metadata: {deck['title']} (Remember to save!)")

        # ================= Slide Builder Operations =================

        def populate_slides_tree(self, slides):
            for item in self.tree_slides.get_children():
                self.tree_slides.delete(item)

            for idx, slide in enumerate(slides):
                num = slide.get("slideNumber", idx + 1)
                title = slide.get("title", f"Slide {num}")
                self.tree_slides.insert("", tk.END, iid=str(idx), values=(num, title))

            if slides:
                self.select_slide_by_index(0)

        def select_slide_by_index(self, idx):
            deck = self.resources[self.active_deck_idx]
            slides = deck.get("slidesDeck", [])
            if 0 <= idx < len(slides):
                self.active_slide_idx = idx
                try:
                    self.tree_slides.selection_set(str(idx))
                    self.tree_slides.see(str(idx))
                except Exception:
                    pass
                self.load_slide_into_form(idx)

        def on_slide_select(self, event):
            sel = self.tree_slides.selection()
            if sel:
                idx = int(sel[0])
                self.active_slide_idx = idx
                self.load_slide_into_form(idx)

        def load_slide_into_form(self, idx):
            deck = self.resources[self.active_deck_idx]
            slides = deck.get("slidesDeck", [])
            if not (0 <= idx < len(slides)):
                return
            slide = slides[idx]

            self.e_slide_title.delete(0, tk.END)
            self.e_slide_title.insert(0, slide.get("title", ""))

            self.e_slide_sub.delete(0, tk.END)
            self.e_slide_sub.insert(0, slide.get("subtitle", ""))

            self.txt_slide_bullets.delete("1.0", tk.END)
            bullets = slide.get("bullets", [])
            self.txt_slide_bullets.insert("1.0", "\n".join(bullets))

            self.e_slide_takeaway.delete(0, tk.END)
            self.e_slide_takeaway.insert(0, slide.get("takeaway", ""))

            self.update_slide_preview()

        def apply_slide_changes(self):
            deck = self.resources[self.active_deck_idx]
            slides = deck.get("slidesDeck", [])
            if not (0 <= self.active_slide_idx < len(slides)):
                return
            slide = slides[self.active_slide_idx]

            slide["title"] = self.e_slide_title.get().strip()
            slide["subtitle"] = self.e_slide_sub.get().strip()

            raw_bullets = self.txt_slide_bullets.get("1.0", tk.END).strip().splitlines()
            slide["bullets"] = [b.strip() for b in raw_bullets if b.strip()]
            slide["takeaway"] = self.e_slide_takeaway.get().strip()

            num = slide.get("slideNumber", self.active_slide_idx + 1)
            self.tree_slides.item(str(self.active_slide_idx), values=(num, slide["title"]))
            self.update_slide_preview()
            self.lbl_status.config(text=f"Updated Slide {num}: {slide['title']}")

        def on_add_slide(self):
            deck = self.resources[self.active_deck_idx]
            if "slidesDeck" not in deck:
                deck["slidesDeck"] = []
            num = len(deck["slidesDeck"]) + 1
            new_slide = {
                "slideNumber": num,
                "title": f"Slide {num}: Core Concept",
                "subtitle": "Analysis & Findings",
                "bullets": [
                    "Key technical finding or architecture detail",
                    "Implementation consideration for students"
                ],
                "takeaway": "Emphasize primary conclusion before moving to next slide."
            }
            deck["slidesDeck"].append(new_slide)
            deck["slidesCount"] = f"{len(deck['slidesDeck'])} Slides"
            self.populate_slides_tree(deck["slidesDeck"])
            self.select_slide_by_index(len(deck["slidesDeck"]) - 1)

        def on_delete_slide(self):
            deck = self.resources[self.active_deck_idx]
            slides = deck.get("slidesDeck", [])
            if not slides or not (0 <= self.active_slide_idx < len(slides)):
                return
            if not messagebox.askyesno("Confirm", f"Delete Slide {self.active_slide_idx + 1}?"):
                return
            slides.pop(self.active_slide_idx)
            for i, s in enumerate(slides):
                s["slideNumber"] = i + 1
            deck["slidesCount"] = f"{len(slides)} Slides"
            self.populate_slides_tree(slides)

        def on_move_slide_up(self):
            deck = self.resources[self.active_deck_idx]
            slides = deck.get("slidesDeck", [])
            idx = self.active_slide_idx
            if idx <= 0 or idx >= len(slides):
                return
            slides[idx], slides[idx - 1] = slides[idx - 1], slides[idx]
            for i, s in enumerate(slides):
                s["slideNumber"] = i + 1
            self.populate_slides_tree(slides)
            self.select_slide_by_index(idx - 1)

        def on_move_slide_down(self):
            deck = self.resources[self.active_deck_idx]
            slides = deck.get("slidesDeck", [])
            idx = self.active_slide_idx
            if idx < 0 or idx >= len(slides) - 1:
                return
            slides[idx], slides[idx + 1] = slides[idx + 1], slides[idx]
            for i, s in enumerate(slides):
                s["slideNumber"] = i + 1
            self.populate_slides_tree(slides)
            self.select_slide_by_index(idx + 1)

        def convert_active_slide_to_flashcard(self):
            """Instantly generates a flashcard from the active slide."""
            deck = self.resources[self.active_deck_idx]
            slides = deck.get("slidesDeck", [])
            if not slides or not (0 <= self.active_slide_idx < len(slides)):
                return
            slide = slides[self.active_slide_idx]

            q = f"What is the key concept of Slide {self.active_slide_idx + 1} ({slide.get('title')}) in {deck.get('title')}?"
            bullets = slide.get("bullets", [])
            a = slide.get("takeaway") or "; ".join(bullets)
            tip = f"From {deck.get('author')}'s presentation."

            new_card = {
                "id": f"fc-gen-{int(datetime.now().timestamp()) % 10000}",
                "category": deck.get("category", "Computer Science"),
                "question": q,
                "answer": a,
                "tip": tip
            }

            self.flashcards.insert(0, new_card)
            self.populate_flashcards_tree()
            self.notebook.select(self.tab_flashcards)
            self.select_flashcard_by_index(0)
            messagebox.showinfo("Generated Flashcard", f"Flashcard created from Slide {self.active_slide_idx + 1}!")

        # ================= Flashcards Operations =================

        def populate_flashcards_tree(self):
            for item in self.tree_fc.get_children():
                self.tree_fc.delete(item)

            for idx, card in enumerate(self.flashcards):
                cat = card.get("category", "General")
                q = card.get("question", "Prompt")
                self.tree_fc.insert("", tk.END, iid=str(idx), values=(cat, q))

            if self.flashcards:
                self.select_flashcard_by_index(0)

        def select_flashcard_by_index(self, idx):
            if 0 <= idx < len(self.flashcards):
                self.active_flashcard_idx = idx
                try:
                    self.tree_fc.selection_set(str(idx))
                    self.tree_fc.see(str(idx))
                except Exception:
                    pass
                self.load_flashcard_into_form(idx)

        def on_flashcard_select(self, event):
            sel = self.tree_fc.selection()
            if sel:
                idx = int(sel[0])
                self.active_flashcard_idx = idx
                self.load_flashcard_into_form(idx)

        def load_flashcard_into_form(self, idx):
            if not (0 <= idx < len(self.flashcards)):
                return
            card = self.flashcards[idx]

            self.cb_fc_cat.set(card.get("category", "Computer Science"))

            self.txt_fc_q.delete("1.0", tk.END)
            self.txt_fc_q.insert("1.0", card.get("question", ""))

            self.txt_fc_a.delete("1.0", tk.END)
            self.txt_fc_a.insert("1.0", card.get("answer", ""))

            self.e_fc_tip.delete(0, tk.END)
            self.e_fc_tip.insert(0, card.get("tip", ""))

        def apply_flashcard_changes(self):
            if not (0 <= self.active_flashcard_idx < len(self.flashcards)):
                return
            card = self.flashcards[self.active_flashcard_idx]

            card["category"] = self.cb_fc_cat.get().strip()
            card["question"] = self.txt_fc_q.get("1.0", tk.END).strip()
            card["answer"] = self.txt_fc_a.get("1.0", tk.END).strip()
            card["tip"] = self.e_fc_tip.get().strip()

            self.tree_fc.item(str(self.active_flashcard_idx), values=(card["category"], card["question"]))
            self.lbl_status.config(text=f"Updated flashcard: {card['question'][:40]}...")

        def on_add_flashcard(self):
            new_c = {
                "id": f"fc-custom-{int(datetime.now().timestamp()) % 10000}",
                "category": "Computer Science",
                "question": "What is the primary benefit of pipelining in CPU architectures?",
                "answer": "Pipelining increases CPU instruction throughput by overlapping instruction execution phases.",
                "tip": "Hazards (structural, data, control) can cause pipeline stalls."
            }
            self.flashcards.insert(0, new_c)
            self.populate_flashcards_tree()
            self.select_flashcard_by_index(0)

        def on_delete_flashcard(self):
            if not (0 <= self.active_flashcard_idx < len(self.flashcards)):
                return
            card = self.flashcards[self.active_flashcard_idx]
            if not messagebox.askyesno("Confirm", f"Delete flashcard:\n'{card.get('question')[:50]}'...?"):
                return
            self.flashcards.pop(self.active_flashcard_idx)
            self.populate_flashcards_tree()
            new_idx = max(0, self.active_flashcard_idx - 1)
            self.select_flashcard_by_index(new_idx)

        # ================= Formulas Operations =================

        def populate_formulas_tree(self):
            for item in self.tree_formulas.get_children():
                self.tree_formulas.delete(item)

            for idx, f in enumerate(self.formulas):
                subj = f.get("subject", "")
                title = f.get("title", "Formula")
                self.tree_formulas.insert("", tk.END, iid=str(idx), values=(subj, title))

            if self.formulas:
                self.select_formula_by_index(0)

        def select_formula_by_index(self, idx):
            if 0 <= idx < len(self.formulas):
                self.active_formula_idx = idx
                try:
                    self.tree_formulas.selection_set(str(idx))
                    self.tree_formulas.see(str(idx))
                except Exception:
                    pass
                self.load_formula_into_form(idx)

        def on_formula_select(self, event):
            sel = self.tree_formulas.selection()
            if sel:
                idx = int(sel[0])
                self.active_formula_idx = idx
                self.load_formula_into_form(idx)

        def load_formula_into_form(self, idx):
            if not (0 <= idx < len(self.formulas)):
                return
            f = self.formulas[idx]
            self.e_f_subj.delete(0, tk.END)
            self.e_f_subj.insert(0, f.get("subject", ""))

            self.e_f_title.delete(0, tk.END)
            self.e_f_title.insert(0, f.get("title", ""))

            self.e_f_code.delete(0, tk.END)
            self.e_f_code.insert(0, f.get("formula", ""))

            self.txt_f_desc.delete("1.0", tk.END)
            self.txt_f_desc.insert("1.0", f.get("description", ""))

        def apply_formula_changes(self):
            if not (0 <= self.active_formula_idx < len(self.formulas)):
                return
            f = self.formulas[self.active_formula_idx]
            f["subject"] = self.e_f_subj.get().strip()
            f["title"] = self.e_f_title.get().strip()
            f["formula"] = self.e_f_code.get().strip()
            f["description"] = self.txt_f_desc.get("1.0", tk.END).strip()

            self.tree_formulas.item(str(self.active_formula_idx), values=(f["subject"], f["title"]))
            self.lbl_status.config(text=f"Updated formula: {f['title']}")

        def on_add_formula(self):
            new_f = {
                "subject": "Mathematics & Science",
                "title": "New Scientific Formula",
                "formula": "E = m · c²",
                "description": "Mass-energy equivalence principle."
            }
            self.formulas.insert(0, new_f)
            self.populate_formulas_tree()
            self.select_formula_by_index(0)

        def on_delete_formula(self):
            if not (0 <= self.active_formula_idx < len(self.formulas)):
                return
            f = self.formulas[self.active_formula_idx]
            if not messagebox.askyesno("Confirm", f"Delete formula '{f.get('title')}'?"):
                return
            self.formulas.pop(self.active_formula_idx)
            self.populate_formulas_tree()
            new_idx = max(0, self.active_formula_idx - 1)
            self.select_formula_by_index(new_idx)

        # ================= Deck Actions =================

        def on_new_deck(self):
            new_id = f"deck-{int(datetime.now().timestamp()) % 10000}"
            new_deck = {
                "id": new_id,
                "title": "New Presentation Deck",
                "category": "Computer Science",
                "type": "PPTX",
                "slidesCount": "3 Slides",
                "fileSize": "1.2 MB",
                "author": "Student Presenter",
                "academicLevel": "School / College Seminar",
                "summary": "Seminar deck detailing fundamental methodology, experiments, and findings.",
                "topicsCovered": [
                    "Introduction and problem scope",
                    "Implementation and architectural design",
                    "Experimental observations and takeaways"
                ],
                "fileUrl": f"slides/{new_id}.pptx",
                "tags": ["seminar", "research", "study"],
                "featured": True,
                "slidesDeck": [
                    {
                        "slideNumber": 1,
                        "title": "Introduction & Scope",
                        "subtitle": "Agenda & Goals",
                        "bullets": [
                            "Introduction to the core thesis and target goals",
                            "Understanding the background context"
                        ],
                        "takeaway": "Frame the primary objective clearly for the audience."
                    },
                    {
                        "slideNumber": 2,
                        "title": "Architecture & Results",
                        "subtitle": "Analysis & Methods",
                        "bullets": [
                            "Key benchmark metrics and performance observations",
                            "Technical mechanisms and comparison"
                        ],
                        "takeaway": "Highlight the primary empirical breakthrough."
                    },
                    {
                        "slideNumber": 3,
                        "title": "Summary & Takeaways",
                        "subtitle": "Conclusion & Q&A",
                        "bullets": [
                            "Summary of lessons learned and recommendations",
                            "Open discussion with the seminar audience"
                        ],
                        "takeaway": "Reiterate core thesis before concluding."
                    }
                ]
            }
            self.resources.insert(0, new_deck)
            self.populate_decks_tree()
            self.select_deck_by_index(0)
            self.notebook.select(self.tab_meta)
            messagebox.showinfo("New Deck", "Created new blank presentation deck! Fill in details and click Save.")

        def on_duplicate_deck(self):
            if not (0 <= self.active_deck_idx < len(self.resources)):
                return
            deck = self.resources[self.active_deck_idx]
            copy_deck = json.loads(json.dumps(deck))
            copy_deck["id"] = f"{deck['id']}-copy-{int(datetime.now().timestamp()) % 1000}"
            copy_deck["title"] = f"{deck['title']} (Copy)"
            self.resources.insert(self.active_deck_idx + 1, copy_deck)
            self.populate_decks_tree()
            self.select_deck_by_index(self.active_deck_idx + 1)
            self.lbl_status.config(text=f"Duplicated: {copy_deck['title']}")

        def on_delete_deck(self):
            if not (0 <= self.active_deck_idx < len(self.resources)):
                return
            deck = self.resources[self.active_deck_idx]
            if not messagebox.askyesno("Confirm Delete", f"Delete entire presentation:\n\n'{deck.get('title')}'?"):
                return
            self.resources.pop(self.active_deck_idx)
            self.populate_decks_tree()
            new_idx = max(0, self.active_deck_idx - 1)
            self.select_deck_by_index(new_idx)

        def check_deck_health(self):
            """Inspects dataset health: unique IDs, slide counts, missing files in slides/."""
            issues = []
            id_counts = {}
            for d in self.resources:
                did = d.get("id")
                id_counts[did] = id_counts.get(did, 0) + 1

            for did, cnt in id_counts.items():
                if cnt > 1:
                    issues.append(f"⚠️ Duplicate ID: '{did}' appears {cnt} times.")

            missing_files = []
            for d in self.resources:
                url = d.get("fileUrl", "")
                if url and not url.startswith("http"):
                    disk_p = os.path.join(SCRIPT_DIR, url.replace("/", os.sep))
                    if not os.path.exists(disk_p):
                        missing_files.append(f"• {d.get('title')} ({url})")

            total_slides = sum(len(d.get("slidesDeck", [])) for d in self.resources)

            msg = (
                f"📊 DECK HEALTH REPORT\n"
                f"===========================\n"
                f"• Total Presentations: {len(self.resources)}\n"
                f"• Total Slides: {total_slides}\n"
                f"• Total Formulas: {len(self.formulas)}\n"
                f"• Total Flashcards: {len(self.flashcards)}\n\n"
            )

            if issues:
                msg += "ISSUES DETECTED:\n" + "\n".join(issues) + "\n\n"
            if missing_files:
                msg += "FILES MISSING FROM slides/ DIRECTORY:\n" + "\n".join(missing_files) + "\n\n"

            if not issues and not missing_files:
                msg += "✅ Everything looks publication-ready! All IDs are unique and files exist."

            messagebox.showinfo("Health & Validation Report", msg)

        # ================= Save & Code Operations =================

        def update_code_preview(self):
            code = generate_js_content(self.resources, self.formulas, self.flashcards)
            self.txt_code.delete("1.0", tk.END)
            self.txt_code.insert("1.0", code)

        def on_save(self):
            # Apply any pending inputs first
            try:
                self.apply_deck_meta()
                if self.resources and 0 <= self.active_deck_idx < len(self.resources):
                    deck = self.resources[self.active_deck_idx]
                    slides = deck.get("slidesDeck", [])
                    if slides and 0 <= self.active_slide_idx < len(slides):
                        self.apply_slide_changes()
                if self.formulas and 0 <= self.active_formula_idx < len(self.formulas):
                    self.apply_formula_changes()
                if self.flashcards and 0 <= self.active_flashcard_idx < len(self.flashcards):
                    self.apply_flashcard_changes()
            except Exception:
                pass

            save_slides_data(SLIDES_DATA_FILE, self.resources, self.formulas, self.flashcards)
            now_str = datetime.now().strftime("%H:%M:%S")
            self.lbl_status.config(text=f"✅ Saved directly to slides-data.js at {now_str}")
            messagebox.showinfo("Saved Successfully", f"Changes written directly to:\n\n{SLIDES_DATA_FILE}\n\n(A backup copy was created at slides-data.js.bak)")

        def open_in_browser(self):
            index_path = os.path.join(SCRIPT_DIR, "index.html")
            webbrowser.open(f"file:///{index_path.replace(os.sep, '/')}")

    root = tk.Tk()
    app = SlidesEditorApp(root)
    root.mainloop()


# ==============================================================================
# WEB SERVER MODE (python slides_editor.py --web)
# ==============================================================================

class StudioWebHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=SCRIPT_DIR, **kwargs)

    def do_POST(self):
        if self.path == "/api/save_slides_data":
            try:
                content_len = int(self.headers.get("Content-Length", 0))
                post_body = self.rfile.read(content_len).decode("utf-8")
                payload = json.loads(post_body)
                resources = payload.get("academicResources", [])
                formulas = payload.get("academicFormulas", [])
                flashcards = payload.get("academicFlashcards", [])

                save_slides_data(SLIDES_DATA_FILE, resources, formulas, flashcards)
                print(f"[API] Direct file save successful to {SLIDES_DATA_FILE}")

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"status": "ok", "message": "Saved directly to slides-data.js"}')
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()


def run_web_server(port=8080):
    server = HTTPServer(("127.0.0.1", port), StudioWebHandler)
    url = f"http://127.0.0.1:{port}/studio.html"
    print(f"\n=======================================================")
    print(f"🚀 EduSphere Slides Data Studio Server Running!")
    print(f"📍 Local URL: {url}")
    print(f"📁 Direct file target: {SLIDES_DATA_FILE}")
    print(f"Press Ctrl+C to stop the server.")
    print(f"=======================================================\n")
    webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down studio server...")
        server.server_close()


# ==============================================================================
# ENTRY POINT
# ==============================================================================

if __name__ == "__main__":
    if "--web" in sys.argv:
        port = 8080
        for arg in sys.argv:
            if arg.startswith("--port="):
                port = int(arg.split("=")[1])
        run_web_server(port)
    else:
        run_tkinter_app()
