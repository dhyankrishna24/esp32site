/**
 * Academic & Seminar Slides Data Repository
 * ==========================================
 * To add your own PPTs or seminar slides:
 * 1. Drop your .pptx, .pdf, or .html file into the /slides/ folder.
 * 2. Add a new item object to the academicResources array below.
 * 3. Save the file and refresh your browser!
 */

const academicResources = [
  {
    id: "spread-computer-viruses",
    title: "Spread of Computer Viruses: Vectors, Network Risk & Cyber Hygiene",
    category: "Computer Science",
    type: "PPTX",
    slidesCount: "9 Slides",
    academicLevel: "School / College Seminar",
    author: "Dhyan Krishna M",
    date: "2026",
    featured: true,
    summary: "Complete seminar presentation detailing how computer viruses replicate across removable storage, email attachments, unsafe web downloads, and shared network directories, with actionable cyber-hygiene defenses.",
    topicsCovered: [
      "Removable Storage risks: Flash drives, CDs, AutoRun exploits and host propagation",
      "Web downloads & drive-by infections: High-velocity malicious propagation",
      "Email attachments (.exe, .scr) and deceptive phishing lures",
      "Network shared folders risk and disciplined antivirus defense practices"
    ],
    fileUrl: "slides/Spread of Computer Viruses - Copy.pptx",
    previewUrl: "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Spread%20of%20Computer%20Viruses%20-%20Copy.pptx",
    tags: ["viruses", "malware", "cybersecurity", "computer science", "antivirus", "network", "seminar", "storage"]
  },
  {
    id: "signs-symptoms-allergies",
    title: "Biology: Signs, Symptoms & Physiological Mechanisms of Allergies",
    category: "Biology & Health",
    type: "PPTX",
    slidesCount: "10 Slides",
    academicLevel: "Biology / School Seminar",
    author: "Dhyan Krishna M (Group B)",
    date: "2026",
    featured: true,
    summary: "Detailed 10-minute seminar slide deck examining physiological and dermatological allergic reactions triggered by airborne particles, specific food allergens, drug sensitivities, and acute anaphylaxis.",
    topicsCovered: [
      "Inhaled allergens (dust, pollen, airborne particles) & airway contact symptoms",
      "Food allergens (milk, wheat, seafood) and gastrointestinal manifestations",
      "Seasonal factors, drug allergens (aspirin, penicillin) & insect stings",
      "Visible dermatological signs: erythema (>10 cm), urticaria, and acute multi-organ anaphylaxis"
    ],
    fileUrl: "slides/Signs and Symptoms of Allergies (10-Min Deck) - Copy.pptx",
    previewUrl: "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Signs%20and%20Symptoms%20of%20Allergies%20(10-Min%20Deck)%20-%20Copy.pptx",
    tags: ["biology", "allergies", "health", "science", "anaphylaxis", "immune system", "seminar"]
  },
  {
    id: "interactive-budgeting-seminar",
    title: "Financial Literacy: Real-Life Budgeting & Budget Curveballs Simulator",
    category: "Economics & Social Studies",
    type: "Interactive HTML",
    slidesCount: "5 Interactive Modules",
    academicLevel: "SmartBoard Seminar / College & School",
    author: "Classroom Interactive Seminar",
    date: "2026",
    featured: true,
    summary: "SmartBoard-ready interactive classroom seminar on budgeting realities. Features Maya's story, baseline budget allocations, a live unexpected expense (curveballs) simulator with dynamic Chart.js charts, and class discussion takeaways.",
    topicsCovered: [
      "Module 1: Real-life budgeting essentials, fixed vs variable costs",
      "Module 2: Maya's Case Study - Navigating lifestyle creep and savings",
      "Module 3: Amita's baseline budget breakdown with interactive visual charts",
      "Module 4: Dynamic Curveballs Simulator - Live financial shock resilience testing",
      "Module 5: Class discussion prompts, reflection notes & facilitator hints"
    ],
    fileUrl: "slides/interactive_seminar_real_life_budgeting_curveballs.html",
    previewUrl: "slides/interactive_seminar_real_life_budgeting_curveballs.html",
    tags: ["budgeting", "finance", "interactive", "economics", "chartjs", "smartboard", "seminar"]
  },
  {
    id: "world-river-systems",
    title: "World Geography: Major River Systems & Commercial Waterways",
    category: "Geography & Social Studies",
    type: "PPTX",
    slidesCount: "6 Slides",
    academicLevel: "Geography / School Presentation",
    author: "Group 3 (Roll No 15–21)",
    date: "2025-2026",
    featured: true,
    summary: "Visual geography presentation exploring the St. Lawrence Seaway, Mississippi River, Danube, Amazon River basin, and Rhine River, detailing drainage routes, economic significance, and ocean outlets.",
    topicsCovered: [
      "St. Lawrence River & Seaway: Connecting Great Lakes to Atlantic shipping routes",
      "Mississippi River: Origin at Lake Itasca and discharge into Gulf of Mexico",
      "Danube River: Trans-European waterway flowing through Germany to the Black Sea",
      "Amazon & Rhine Rivers: Continental discharge volume and European commercial transport"
    ],
    fileUrl: "slides/Group a3.pptx",
    previewUrl: "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Group%20a3.pptx",
    tags: ["geography", "rivers", "danube", "amazon", "mississippi", "rhine", "st lawrence", "seminar"]
  },
  {
    id: "school-assembly-speech",
    title: "Public Speaking: School Assembly Host & Presentation Script",
    category: "Study Notes",
    type: "PDF",
    slidesCount: "2 Pages",
    academicLevel: "Public Speaking & Assembly",
    author: "Dhyan Krishna M & Johan",
    date: "2026",
    featured: true,
    summary: "Complete structured assembly hosting script and speech guide. Includes opening wisdom quotes, stage etiquette, transition cues between class speakers, national pledge introduction, and ceremonial remarks.",
    topicsCovered: [
      "Opening stage hook: 'A wise man speaks because he has something to say...'",
      "Formal protocol: Inviting student leaders for the National Pledge",
      "Smooth transitions and speaker introductions across classes",
      "Speaker encouragement, time management, and closing ceremonial remarks"
    ],
    fileUrl: "slides/Speech.pdf",
    previewUrl: "slides/Speech.pdf",
    tags: ["speech", "assembly", "public speaking", "script", "school", "notes"]
  },
  {
    id: "iot-smart-systems",
    title: "Internet of Things (IoT) & Smart Systems Architecture",
    category: "Electronics & IoT",
    type: "PPTX",
    slidesCount: "38 Slides",
    academicLevel: "Undergraduate / Seminar",
    author: "Dhyan Krishna M",
    date: "2026",
    featured: true,
    summary: "Comprehensive seminar presentation covering IoT 4-layer architecture, edge sensor nodes, communication protocols (MQTT, CoAP, HTTP), and cloud telemetry integration.",
    topicsCovered: [
      "IoT 4-tier architectural stack: Perception, Network, Middleware, Application",
      "Wireless protocols comparison: Wi-Fi, BLE, Zigbee, LoRaWAN",
      "MQTT Broker-Publisher-Subscriber architecture with QoS levels",
      "Real-world case study: ESP32 remote weather and telemetry node"
    ],
    fileUrl: "esp32/weather_station.html",
    previewUrl: "esp32/weather_station.html",
    tags: ["iot", "sensors", "mqtt", "wireless", "telemetry", "seminar", "esp32"]
  },
  {
    id: "esp32-freertos",
    title: "ESP32 Dual-Core Architecture & FreeRTOS Concurrency",
    category: "Electronics & IoT",
    type: "PPTX",
    slidesCount: "42 Slides",
    academicLevel: "Undergraduate / Lab Study",
    author: "Dhyan Krishna M",
    date: "2026",
    featured: true,
    summary: "Deep dive into the Xtensa LX6 dual-core processor, FreeRTOS task scheduling, queues, semaphores, hardware timers, and low-power sleep modes.",
    topicsCovered: [
      "Xtensa LX6 architecture, memory mapping, SRAM & Flash cache",
      "FreeRTOS preemptive multitasking and core pin affinity",
      "Inter-Task Communication via Queues & Mutexes",
      "Deep sleep current optimization and ULP co-processor"
    ],
    fileUrl: "esp32/led_control.html",
    previewUrl: "esp32/led_control.html",
    tags: ["esp32", "freertos", "microcontroller", "embedded c", "concurrency", "rtos"]
  },
  {
    id: "dsa-optimization",
    title: "Data Structures & Algorithmic Complexity Cheat Sheet",
    category: "Computer Science",
    type: "PDF",
    slidesCount: "16 Pages",
    academicLevel: "All College Levels",
    author: "Dhyan Krishna M",
    date: "2026",
    featured: false,
    summary: "Concise revision notes and visual cheat sheets on Big-O time/space complexities, tree traversals, dynamic programming paradigms, and graph algorithms.",
    topicsCovered: [
      "Master Theorem & Recurrence relation solving",
      "Array, Linked List, Heap & Balanced BST complexities",
      "Graph traversal: BFS, DFS, Dijkstra, Prim & Kruskal",
      "Dynamic Programming patterns: 0/1 Knapsack, LCS, LIS"
    ],
    fileUrl: "#",
    previewUrl: "",
    tags: ["dsa", "algorithms", "cheat sheet", "computer science", "notes", "big o"]
  },
  {
    id: "math-calculus-transforms",
    title: "Engineering Mathematics: Laplace & Fourier Transforms",
    category: "Mathematics & Science",
    type: "PDF",
    slidesCount: "22 Pages",
    academicLevel: "Engineering Semester 2/3",
    author: "Academic Reference",
    date: "2026",
    featured: false,
    summary: "Essential formula sheet and solved step-by-step seminar examples for Laplace transform properties, inverse transforms, and Fourier series in signal analysis.",
    topicsCovered: [
      "Laplace transform of standard functions and shifting theorems",
      "Solving ordinary differential equations using Laplace transforms",
      "Fourier Series expansion for periodic and odd/even functions",
      "Applications in electrical RLC circuits and frequency domains"
    ],
    fileUrl: "#",
    previewUrl: "",
    tags: ["mathematics", "calculus", "laplace", "fourier", "formula sheet", "engineering"]
  },
  {
    id: "seminar-presentation-mastery",
    title: "How to Deliver an Outstanding Technical Seminar: Speaker Guide",
    category: "Study Notes",
    type: "PPTX",
    slidesCount: "20 Slides",
    academicLevel: "General Academic",
    author: "Dhyan Krishna M",
    date: "2026",
    featured: true,
    summary: "Practical guide for students on designing high-impact seminar slides, pacing technical presentations, handling audience Q&A sessions, and avoiding common pitfalls.",
    topicsCovered: [
      "The 10-20-30 Rule and slide visual hierarchy",
      "How to explain complex equations and architectures clearly",
      "Vocal delivery, eye contact, and stage presence",
      "Anticipating questions and handling uncertain answers gracefully"
    ],
    fileUrl: "#",
    previewUrl: "",
    tags: ["seminar", "presentation skills", "public speaking", "slides guide", "tips"]
  }
];

// Quick formula cards for the academic toolkit
const academicFormulas = [
  {
    subject: "Electronics & IoT",
    title: "Ohm's Law & Power Dissipation",
    formula: "V = I · R  |  P = V · I = I²R = V² / R",
    description: "Fundamental relationship between voltage (V), current (I), resistance (R), and dissipated electrical power (P)."
  },
  {
    subject: "Electronics & IoT",
    title: "Capacitor & Inductor Time Constants",
    formula: "τ_RC = R · C   |   τ_RL = L / R",
    description: "Time required to charge or discharge a capacitor/inductor through a resistor to ~63.2% of total value."
  },
  {
    subject: "Computer Science",
    title: "Shannon-Hartley Channel Capacity",
    formula: "C = B · log₂(1 + S/N)",
    description: "Theoretical upper bound on information rate that can be transmitted over a communication channel with bandwidth B and SNR."
  },
  {
    subject: "Mathematics",
    title: "Euler's Formula & Complex Exponentials",
    formula: "e^(jθ) = cos(θ) + j·sin(θ)   =>   e^(jπ) + 1 = 0",
    description: "Connects trigonometric functions and complex exponential functions; critical for AC circuit and signal analysis."
  },
  {
    subject: "Biology & Health",
    title: "Allergy Threshold & Anaphylaxis Rule",
    formula: "Erythema Area > 10 cm  |  Immediate Epinephrine 0.3 mg IM",
    description: "Clinical indicator of severe acute allergic reaction requiring immediate intramuscular intervention."
  },
  {
    subject: "Computer Science",
    title: "Amdahl's Law (Parallel Speedup)",
    formula: "S_latency = 1 / ((1 - p) + (p / s))",
    description: "Predicts theoretical speedup of execution of a whole task when using multiple processor cores where fraction p is parallelizable."
  }
];

if (typeof module !== 'undefined') {
  module.exports = { academicResources, academicFormulas };
}
