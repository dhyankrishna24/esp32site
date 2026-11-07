"""
EduSphere — Slides Data Desktop Studio (Python GUI)
===================================================
A standalone desktop application to visually view, add, edit, and delete
presentation decks, slides, and academic formulas directly in slides-data.js.

Usage:
    python slides_editor.py          # Launches Tkinter Desktop GUI
    python slides_editor.py --web    # Launches Local Web GUI with Direct Save API
"""

import os
import sys
import json
import shutil
import subprocess
import webbrowser
from datetime import datetime
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse

# Determine base paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SLIDES_DATA_FILE = os.path.join(SCRIPT_DIR, "slides-data.js")


# ==============================================================================
# DATA LOAD & SAVE ENGINE
# ==============================================================================

def load_slides_data(file_path=SLIDES_DATA_FILE):
    """Loads academicResources and academicFormulas from slides-data.js using Node.js or fallback."""
    if not os.path.exists(file_path):
        return [], []

    # 1. Try via Node.js for 100% perfect JS execution
    try:
        abs_path = os.path.abspath(file_path).replace("\\", "/")
        cmd = ["node", "-e", f"const d = require('{abs_path}'); console.log(JSON.stringify(d));"]
        res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", timeout=10)
        if res.returncode == 0 and res.stdout.strip():
            data = json.loads(res.stdout.strip())
            return data.get("academicResources", []), data.get("academicFormulas", [])
    except Exception as e:
        print(f"[Notice] Node loader note: {e}, falling back to parser...")

    # 2. Fallback text parsing
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        import re
        res_match = re.search(r"const\s+academicResources\s*=\s*(\[[\s\S]*?\]);\s*(?:const|\/\/|if)", content)
        form_match = re.search(r"const\s+academicFormulas\s*=\s*(\[[\s\S]*?\]);\s*(?:if|module|$)", content)

        resources = json.loads(res_match.group(1)) if res_match else []
        formulas = json.loads(form_match.group(1)) if form_match else []
        return resources, formulas
    except Exception as e:
        print(f"[Error] Fallback parser failed: {e}")
        return [], []


def generate_js_content(resources, formulas):
    """Generates clean, properly indented JavaScript code for slides-data.js."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    resources_json = json.dumps(resources, indent=2, ensure_ascii=False)
    formulas_json = json.dumps(formulas, indent=2, ensure_ascii=False)

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
        "if (typeof module !== 'undefined') {\n"
        "  module.exports = { academicResources, academicFormulas };\n"
        "}\n"
    )


def save_slides_data(file_path, resources, formulas):
    """Saves updated data directly to slides-data.js with automatic backup."""
    # Create backup first
    if os.path.exists(file_path):
        backup_path = file_path + ".bak"
        try:
            shutil.copy2(file_path, backup_path)
        except Exception:
            pass

    content = generate_js_content(resources, formulas)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    return True


# ==============================================================================
# TKINTER DESKTOP GUI IMPLEMENTATION
# ==============================================================================

def run_tkinter_app():
    import tkinter as tk
    from tkinter import ttk, messagebox, scrolledtext

    class SlidesEditorApp:
        def __init__(self, root):
            self.root = root
            self.root.title("EduSphere — Slides Data Desktop Studio (Python)")
            self.root.geometry("1200x820")
            self.root.minsize(1000, 700)

            # State
            self.resources = []
            self.formulas = []
            self.active_deck_idx = 0
            self.active_slide_idx = 0
            self.active_formula_idx = 0
            self.is_dirty = False

            # Configure Theme & Fonts
            self.setup_styles()

            # Build UI Layout
            self.build_top_bar()
            self.build_main_panels()
            self.build_status_bar()

            # Load Data
            self.reload_data(initial=True)

            # Keyboard Shortcuts
            self.root.bind("<Control-s>", lambda e: self.on_save())
            self.root.bind("<Control-S>", lambda e: self.on_save())

        def setup_styles(self):
            style = ttk.Style()
            try:
                style.theme_use("clam")
            except Exception:
                pass

            # Fonts
            self.font_title = ("Segoe UI", 12, "bold")
            self.font_bold = ("Segoe UI", 9, "bold")
            self.font_regular = ("Segoe UI", 9)
            self.font_mono = ("Consolas", 9)

            style.configure(".", font=self.font_regular)
            style.configure("Treeview", rowheight=24, font=self.font_regular)
            style.configure("Treeview.Heading", font=self.font_bold)
            style.configure("TNotebook.Tab", font=self.font_bold, padding=[12, 6])
            style.configure("Primary.TButton", font=self.font_bold)

        def build_top_bar(self):
            top_frame = tk.Frame(self.root, bg="#1e293b", height=54)
            top_frame.pack(side=tk.TOP, fill=tk.X)
            top_frame.pack_propagate(False)

            # Brand Title
            brand_frame = tk.Frame(top_frame, bg="#1e293b")
            brand_frame.pack(side=tk.LEFT, padx=16, pady=10)

            lbl_brand = tk.Label(brand_frame, text="🎓 EduSphere Slides Data Studio", font=("Segoe UI", 12, "bold"), fg="#ffffff", bg="#1e293b")
            lbl_brand.pack(side=tk.LEFT)

            lbl_sub = tk.Label(brand_frame, text="  [Direct Local File Editor]", font=("Segoe UI", 9), fg="#94a3b8", bg="#1e293b")
            lbl_sub.pack(side=tk.LEFT)

            # Actions on the right
            btn_frame = tk.Frame(top_frame, bg="#1e293b")
            btn_frame.pack(side=tk.RIGHT, padx=16, pady=8)

            btn_save = tk.Button(btn_frame, text="💾 Save to slides-data.js (Ctrl+S)", font=("Segoe UI", 9, "bold"),
                                 bg="#2563eb", fg="#ffffff", activebackground="#1d4ed8", activeforeground="#ffffff",
                                 relief=tk.FLAT, padx=14, pady=5, cursor="hand2", command=self.on_save)
            btn_save.pack(side=tk.LEFT, padx=4)

            btn_new = tk.Button(btn_frame, text="➕ New Deck", font=("Segoe UI", 9, "bold"),
                                bg="#334155", fg="#f8fafc", activebackground="#475569", activeforeground="#ffffff",
                                relief=tk.FLAT, padx=10, pady=5, cursor="hand2", command=self.on_new_deck)
            btn_new.pack(side=tk.LEFT, padx=4)

            btn_dup = tk.Button(btn_frame, text="📋 Duplicate", font=("Segoe UI", 9),
                                bg="#334155", fg="#f8fafc", activebackground="#475569", activeforeground="#ffffff",
                                relief=tk.FLAT, padx=8, pady=5, cursor="hand2", command=self.on_duplicate_deck)
            btn_dup.pack(side=tk.LEFT, padx=4)

            btn_del = tk.Button(btn_frame, text="🗑️ Delete", font=("Segoe UI", 9),
                                bg="#991b1b", fg="#ffffff", activebackground="#b91c1c", activeforeground="#ffffff",
                                relief=tk.FLAT, padx=8, pady=5, cursor="hand2", command=self.on_delete_deck)
            btn_del.pack(side=tk.LEFT, padx=4)

            btn_browser = tk.Button(btn_frame, text="🌐 Open Portal", font=("Segoe UI", 9),
                                    bg="#0f766e", fg="#ffffff", activebackground="#115e59", activeforeground="#ffffff",
                                    relief=tk.FLAT, padx=10, pady=5, cursor="hand2", command=self.open_in_browser)
            btn_browser.pack(side=tk.LEFT, padx=4)

        def build_main_panels(self):
            self.paned = ttk.PanedWindow(self.root, orient=tk.HORIZONTAL)
            self.paned.pack(fill=tk.BOTH, expand=True, padx=8, pady=8)

            # ================= Left Panel: Decks List =================
            left_frame = ttk.Frame(self.paned, width=340)
            self.paned.add(left_frame, weight=1)

            # Search bar
            search_frame = ttk.Frame(left_frame)
            search_frame.pack(fill=tk.X, padx=4, pady=4)

            ttk.Label(search_frame, text="Filter:").pack(side=tk.LEFT, padx=(0, 4))
            self.entry_search = ttk.Entry(search_frame)
            self.entry_search.pack(side=tk.LEFT, fill=tk.X, expand=True)
            self.entry_search.bind("<KeyRelease>", lambda e: self.filter_deck_list())

            # Decks Treeview
            columns = ("title", "category", "count")
            self.tree_decks = ttk.Treeview(left_frame, columns=columns, show="headings", selectmode="browse")
            self.tree_decks.heading("title", text="Title")
            self.tree_decks.heading("category", text="Discipline")
            self.tree_decks.heading("count", text="Slides")
            self.tree_decks.column("title", width=180)
            self.tree_decks.column("category", width=100)
            self.tree_decks.column("count", width=50, anchor="center")

            scroll_decks = ttk.Scrollbar(left_frame, orient=tk.VERTICAL, command=self.tree_decks.yview)
            self.tree_decks.configure(yscrollcommand=scroll_decks.set)

            scroll_decks.pack(side=tk.RIGHT, fill=tk.Y)
            self.tree_decks.pack(fill=tk.BOTH, expand=True, padx=4, pady=4)
            self.tree_decks.bind("<<TreeviewSelect>>", self.on_deck_select)

            # ================= Right Panel: Editor Notebook =================
            right_frame = ttk.Frame(self.paned)
            self.paned.add(right_frame, weight=3)

            self.notebook = ttk.Notebook(right_frame)
            self.notebook.pack(fill=tk.BOTH, expand=True)

            # Tab 1: Presentation Metadata
            self.tab_meta = ttk.Frame(self.notebook, padding=12)
            self.notebook.add(self.tab_meta, text="1. Deck Metadata")
            self.build_meta_tab()

            # Tab 2: Slide-by-Slide Content Builder
            self.tab_slides = ttk.Frame(self.notebook, padding=12)
            self.notebook.add(self.tab_slides, text="2. Slide-by-Slide Builder")
            self.build_slides_tab()

            # Tab 3: Scientific Formulas Directory
            self.tab_formulas = ttk.Frame(self.notebook, padding=12)
            self.notebook.add(self.tab_formulas, text="3. Scientific Formulas")
            self.build_formulas_tab()

            # Tab 4: Raw JavaScript Preview
            self.tab_code = ttk.Frame(self.notebook, padding=12)
            self.notebook.add(self.tab_code, text="4. Raw JS Code")
            self.build_code_tab()

        def build_meta_tab(self):
            from tkinter import scrolledtext
            # Form grid
            frame = self.tab_meta

            # Title
            ttk.Label(frame, text="Presentation Title *", font=self.font_bold).grid(row=0, column=0, sticky="w", pady=4)
            self.e_title = ttk.Entry(frame, font=self.font_bold)
            self.e_title.grid(row=0, column=1, columnspan=3, sticky="ew", pady=4, padx=4)

            # ID / Category
            ttk.Label(frame, text="ID Slug *", font=self.font_bold).grid(row=1, column=0, sticky="w", pady=4)
            self.e_id = ttk.Entry(frame, font=self.font_mono)
            self.e_id.grid(row=1, column=1, sticky="ew", pady=4, padx=4)

            ttk.Label(frame, text="Discipline *", font=self.font_bold).grid(row=1, column=2, sticky="w", pady=4)
            self.cb_category = ttk.Combobox(frame, values=[
                "Computer Science", "Biology & Health", "Economics & Social Studies",
                "Geography & Social Studies", "Electronics & IoT", "Public Speaking & Study Notes",
                "Mathematics & Science"
            ])
            self.cb_category.grid(row=1, column=3, sticky="ew", pady=4, padx=4)

            # Format & Author
            ttk.Label(frame, text="Format / Type *", font=self.font_bold).grid(row=2, column=0, sticky="w", pady=4)
            self.cb_type = ttk.Combobox(frame, values=["PPTX", "PDF", "Interactive HTML", "Canva"])
            self.cb_type.grid(row=2, column=1, sticky="ew", pady=4, padx=4)

            ttk.Label(frame, text="Author Name *", font=self.font_bold).grid(row=2, column=2, sticky="w", pady=4)
            self.e_author = ttk.Entry(frame)
            self.e_author.grid(row=2, column=3, sticky="ew", pady=4, padx=4)

            # File URL & Embed URL
            ttk.Label(frame, text="File URL / Path *", font=self.font_bold).grid(row=3, column=0, sticky="w", pady=4)
            self.e_fileurl = ttk.Entry(frame, font=self.font_mono)
            self.e_fileurl.grid(row=3, column=1, sticky="ew", pady=4, padx=4)

            ttk.Label(frame, text="Embed URL", font=self.font_bold).grid(row=3, column=2, sticky="w", pady=4)
            self.e_embedurl = ttk.Entry(frame, font=self.font_mono)
            self.e_embedurl.grid(row=3, column=3, sticky="ew", pady=4, padx=4)

            # File Size & Date
            ttk.Label(frame, text="File Size", font=self.font_bold).grid(row=4, column=0, sticky="w", pady=4)
            self.e_filesize = ttk.Entry(frame)
            self.e_filesize.grid(row=4, column=1, sticky="ew", pady=4, padx=4)

            ttk.Label(frame, text="Academic Level", font=self.font_bold).grid(row=4, column=2, sticky="w", pady=4)
            self.e_level = ttk.Entry(frame)
            self.e_level.grid(row=4, column=3, sticky="ew", pady=4, padx=4)

            # Summary
            ttk.Label(frame, text="Executive Summary *", font=self.font_bold).grid(row=5, column=0, sticky="nw", pady=6)
            self.txt_summary = scrolledtext.ScrolledText(frame, height=4, font=self.font_regular, wrap=tk.WORD)
            self.txt_summary.grid(row=5, column=1, columnspan=3, sticky="ew", pady=6, padx=4)

            # Topics Covered
            ttk.Label(frame, text="Topics Covered\n(one per line)", font=self.font_bold).grid(row=6, column=0, sticky="nw", pady=6)
            self.txt_topics = scrolledtext.ScrolledText(frame, height=4, font=self.font_regular, wrap=tk.WORD)
            self.txt_topics.grid(row=6, column=1, columnspan=3, sticky="ew", pady=6, padx=4)

            # Tags & Featured
            ttk.Label(frame, text="Tags (comma-separated)", font=self.font_bold).grid(row=7, column=0, sticky="w", pady=4)
            self.e_tags = ttk.Entry(frame)
            self.e_tags.grid(row=7, column=1, columnspan=2, sticky="ew", pady=4, padx=4)

            self.var_featured = tk.BooleanVar(value=True)
            self.chk_featured = ttk.Checkbutton(frame, text="Featured Presentation", variable=self.var_featured)
            self.chk_featured.grid(row=7, column=3, sticky="w", pady=4, padx=4)

            frame.columnconfigure(1, weight=1)
            frame.columnconfigure(3, weight=1)

            btn_apply_meta = tk.Button(frame, text="Apply Metadata Changes", bg="#2563eb", fg="#ffffff",
                                       font=self.font_bold, relief=tk.FLAT, padx=12, pady=6, command=self.apply_deck_meta)
            btn_apply_meta.grid(row=8, column=1, columnspan=3, sticky="e", pady=12)

        def build_slides_tab(self):
            from tkinter import scrolledtext
            paned_slides = ttk.PanedWindow(self.tab_slides, orient=tk.HORIZONTAL)
            paned_slides.pack(fill=tk.BOTH, expand=True)

            # Left sub-panel: Slides list
            left_s = ttk.Frame(paned_slides, width=220)
            paned_slides.add(left_s, weight=1)

            btn_s_frame = ttk.Frame(left_s)
            btn_s_frame.pack(fill=tk.X, pady=(0, 4))

            ttk.Button(btn_s_frame, text="+ Slide", width=8, command=self.on_add_slide).pack(side=tk.LEFT, padx=2)
            ttk.Button(btn_s_frame, text="▲", width=3, command=self.on_move_slide_up).pack(side=tk.LEFT, padx=1)
            ttk.Button(btn_s_frame, text="▼", width=3, command=self.on_move_slide_down).pack(side=tk.LEFT, padx=1)
            ttk.Button(btn_s_frame, text="✕", width=3, command=self.on_delete_slide).pack(side=tk.LEFT, padx=1)

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

            # Right sub-panel: Slide editor form
            right_s = ttk.Frame(paned_slides, padding=8)
            paned_slides.add(right_s, weight=3)

            ttk.Label(right_s, text="Slide Title *", font=self.font_bold).pack(anchor="w", pady=(0, 2))
            self.e_slide_title = ttk.Entry(right_s, font=self.font_bold)
            self.e_slide_title.pack(fill=tk.X, pady=(0, 8))

            ttk.Label(right_s, text="Slide Subtitle", font=self.font_bold).pack(anchor="w", pady=(0, 2))
            self.e_slide_sub = ttk.Entry(right_s)
            self.e_slide_sub.pack(fill=tk.X, pady=(0, 8))

            ttk.Label(right_s, text="Bullet Points (one bullet per line) *", font=self.font_bold).pack(anchor="w", pady=(0, 2))
            self.txt_slide_bullets = scrolledtext.ScrolledText(right_s, height=7, font=self.font_regular, wrap=tk.WORD)
            self.txt_slide_bullets.pack(fill=tk.BOTH, expand=True, pady=(0, 8))

            ttk.Label(right_s, text="Core Seminar Takeaway (Highlight Box)", font=self.font_bold).pack(anchor="w", pady=(0, 2))
            self.e_slide_takeaway = ttk.Entry(right_s)
            self.e_slide_takeaway.pack(fill=tk.X, pady=(0, 10))

            btn_apply_slide = tk.Button(right_s, text="Apply Slide Changes", bg="#2563eb", fg="#ffffff",
                                        font=self.font_bold, relief=tk.FLAT, padx=12, pady=5, command=self.apply_slide_changes)
            btn_apply_slide.pack(anchor="e")

        def build_formulas_tab(self):
            from tkinter import scrolledtext
            paned_f = ttk.PanedWindow(self.tab_formulas, orient=tk.HORIZONTAL)
            paned_f.pack(fill=tk.BOTH, expand=True)

            left_f = ttk.Frame(paned_f, width=280)
            paned_f.add(left_f, weight=1)

            btn_f_frame = ttk.Frame(left_f)
            btn_f_frame.pack(fill=tk.X, pady=(0, 4))
            ttk.Button(btn_f_frame, text="+ Formula", command=self.on_add_formula).pack(side=tk.LEFT, padx=2)
            ttk.Button(btn_f_frame, text="Delete Formula", command=self.on_delete_formula).pack(side=tk.LEFT, padx=2)

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

            # Right sub-panel: Formula Editor Form
            right_f = ttk.Frame(paned_f, padding=8)
            paned_f.add(right_f, weight=2)

            ttk.Label(right_f, text="Subject Area *", font=self.font_bold).pack(anchor="w", pady=(0, 2))
            self.e_f_subj = ttk.Entry(right_f)
            self.e_f_subj.pack(fill=tk.X, pady=(0, 8))

            ttk.Label(right_f, text="Formula / Theorem Title *", font=self.font_bold).pack(anchor="w", pady=(0, 2))
            self.e_f_title = ttk.Entry(right_f, font=self.font_bold)
            self.e_f_title.pack(fill=tk.X, pady=(0, 8))

            ttk.Label(right_f, text="Equation / Expression *", font=self.font_bold).pack(anchor="w", pady=(0, 2))
            self.e_f_code = ttk.Entry(right_f, font=self.font_mono)
            self.e_f_code.pack(fill=tk.X, pady=(0, 8))

            ttk.Label(right_f, text="Description & Scientific Context *", font=self.font_bold).pack(anchor="w", pady=(0, 2))
            self.txt_f_desc = scrolledtext.ScrolledText(right_f, height=6, font=self.font_regular, wrap=tk.WORD)
            self.txt_f_desc.pack(fill=tk.BOTH, expand=True, pady=(0, 10))

            btn_apply_f = tk.Button(right_f, text="Apply Formula Changes", bg="#2563eb", fg="#ffffff",
                                    font=self.font_bold, relief=tk.FLAT, padx=12, pady=5, command=self.apply_formula_changes)
            btn_apply_f.pack(anchor="e")

        def build_code_tab(self):
            from tkinter import scrolledtext
            top_c = ttk.Frame(self.tab_code)
            top_c.pack(fill=tk.X, pady=(0, 6))

            ttk.Label(top_c, text="Live Output for slides-data.js", font=self.font_bold).pack(side=tk.LEFT)
            ttk.Button(top_c, text="Refresh Code", command=self.update_code_preview).pack(side=tk.RIGHT, padx=4)

            self.txt_code = scrolledtext.ScrolledText(self.tab_code, font=self.font_mono, bg="#0f172a", fg="#34d399",
                                                     insertbackground="#ffffff", wrap=tk.NONE)
            self.txt_code.pack(fill=tk.BOTH, expand=True)

        def build_status_bar(self):
            self.status_bar = tk.Frame(self.root, bg="#f1f5f9", height=26, bd=1, relief=tk.SUNKEN)
            self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)

            self.lbl_status = tk.Label(self.status_bar, text="Ready", font=("Segoe UI", 9), bg="#f1f5f9", fg="#475569")
            self.lbl_status.pack(side=tk.LEFT, padx=10)

        # ================= Data Sync & Management =================

        def reload_data(self, initial=False):
            self.resources, self.formulas = load_slides_data(SLIDES_DATA_FILE)
            self.lbl_status.config(text=f"Loaded {len(self.resources)} decks and {len(self.formulas)} formulas from {SLIDES_DATA_FILE}")
            self.populate_decks_tree()
            self.populate_formulas_tree()
            if self.resources:
                self.select_deck_by_index(0)

        def populate_decks_tree(self, filter_text=""):
            for item in self.tree_decks.get_children():
                self.tree_decks.delete(item)

            filter_text = filter_text.lower().strip()
            for idx, deck in enumerate(self.resources):
                title = deck.get("title", "Untitled")
                category = deck.get("category", "")
                count = len(deck.get("slidesDeck", []))
                if filter_text and filter_text not in title.lower() and filter_text not in category.lower():
                    continue
                self.tree_decks.insert("", tk.END, iid=str(idx), values=(title, category, count))

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

            # Meta form
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

            # Populate slides tree
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

            # Refresh left tree title
            count = len(deck.get("slidesDeck", []))
            deck["slidesCount"] = f"{count} Slides"
            self.tree_decks.item(str(self.active_deck_idx), values=(deck["title"], deck["category"], count))

            self.lbl_status.config(text=f"Updated metadata for: {deck['title']} (Unsaved to disk)")
            self.is_dirty = True

        # ================= Slides Tree & Form =================

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
            self.lbl_status.config(text=f"Updated Slide {num}: {slide['title']} (Unsaved)")
            self.is_dirty = True

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
                    "Key observation and technical insight",
                    "Implementation consideration for students"
                ],
                "takeaway": "Emphasize key conclusion."
            }
            deck["slidesDeck"].append(new_slide)
            deck["slidesCount"] = f"{len(deck['slidesDeck'])} Slides"
            self.populate_slides_tree(deck["slidesDeck"])
            self.select_slide_by_index(len(deck["slidesDeck"]) - 1)
            self.is_dirty = True

        def on_delete_slide(self):
            deck = self.resources[self.active_deck_idx]
            slides = deck.get("slidesDeck", [])
            if not slides or not (0 <= self.active_slide_idx < len(slides)):
                return
            if not messagebox.askyesno("Confirm Delete", f"Delete Slide {self.active_slide_idx + 1}?"):
                return
            slides.pop(self.active_slide_idx)
            for i, s in enumerate(slides):
                s["slideNumber"] = i + 1
            deck["slidesCount"] = f"{len(slides)} Slides"
            self.populate_slides_tree(slides)
            self.is_dirty = True

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
            self.is_dirty = True

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
            self.is_dirty = True

        # ================= Deck Operations =================

        def on_new_deck(self):
            new_id = f"presentation-{int(datetime.now().timestamp()) % 10000}"
            new_deck = {
                "id": new_id,
                "title": "New Seminar Presentation",
                "category": "Computer Science",
                "type": "PPTX",
                "slidesCount": "3 Slides",
                "fileSize": "1.0 MB",
                "author": "Student Presenter",
                "summary": "Comprehensive seminar deck exploring fundamental concepts, methodology, and experimental results.",
                "topicsCovered": [
                    "Introduction and problem background",
                    "Methodology and system design",
                    "Empirical observations and conclusions"
                ],
                "fileUrl": f"slides/{new_id}.pptx",
                "tags": ["seminar", "presentation", "study"],
                "featured": True,
                "slidesDeck": [
                    {
                        "slideNumber": 1,
                        "title": "Agenda & Motivation",
                        "subtitle": "Overview & Problem Scope",
                        "bullets": [
                            "Understanding the core challenges and opportunities",
                            "Scope of topics covered in this presentation"
                        ],
                        "takeaway": "Frame the central problem clearly for the audience."
                    },
                    {
                        "slideNumber": 2,
                        "title": "Technical Methodology",
                        "subtitle": "Architecture & Analysis",
                        "bullets": [
                            "Core algorithmic and engineering approaches",
                            "Key benchmark metrics and performance comparisons"
                        ],
                        "takeaway": "Highlight the primary empirical breakthrough."
                    },
                    {
                        "slideNumber": 3,
                        "title": "Conclusions & Q&A",
                        "subtitle": "Practical Takeaways",
                        "bullets": [
                            "Summary of research findings and lessons learned",
                            "Open discussion and Q&A session"
                        ],
                        "takeaway": "Summarize core thesis before opening questions."
                    }
                ]
            }
            self.resources.insert(0, new_deck)
            self.populate_decks_tree()
            self.select_deck_by_index(0)
            self.notebook.select(self.tab_meta)
            self.is_dirty = True
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
            self.is_dirty = True
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
            self.is_dirty = True
            messagebox.showinfo("Deleted", "Deck removed. Click Save to write changes to slides-data.js.")

        # ================= Formulas Tab =================

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
            self.lbl_status.config(text=f"Updated formula: {f['title']} (Unsaved)")
            self.is_dirty = True

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
            self.is_dirty = True

        def on_delete_formula(self):
            if not (0 <= self.active_formula_idx < len(self.formulas)):
                return
            f = self.formulas[self.active_formula_idx]
            if not messagebox.askyesno("Confirm Delete", f"Delete formula '{f.get('title')}'?"):
                return
            self.formulas.pop(self.active_formula_idx)
            self.populate_formulas_tree()
            new_idx = max(0, self.active_formula_idx - 1)
            self.select_formula_by_index(new_idx)
            self.is_dirty = True

        # ================= Raw Code Preview & Save =================

        def update_code_preview(self):
            code = generate_js_content(self.resources, self.formulas)
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
            except Exception:
                pass

            success = save_slides_data(SLIDES_DATA_FILE, self.resources, self.formulas)
            if success:
                self.is_dirty = False
                self.lbl_status.config(text=f"✅ Successfully written to {SLIDES_DATA_FILE} at {datetime.now().strftime('%H:%M:%S')}")
                messagebox.showinfo("Saved!", f"Successfully saved directly to:\n\n{SLIDES_DATA_FILE}\n\n(A backup copy was created at slides-data.js.bak)")

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

                save_slides_data(SLIDES_DATA_FILE, resources, formulas)
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
