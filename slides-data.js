/**
 * Academic & Seminar Slides Data Repository
 * ==========================================
 * Features rich slide-by-slide decks for in-browser presentation view,
 * full citations, interactive links, and study tools.
 */

const academicResources = [
  {
    id: "spread-computer-viruses",
    title: "Spread of Computer Viruses: Vectors, Network Risk & Cyber Hygiene",
    category: "Computer Science",
    type: "PPTX",
    slidesCount: "9 Slides",
    fileSize: "788 KB",
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
    tags: ["viruses", "malware", "cybersecurity", "computer science", "antivirus", "network", "storage"],
    citation: {
      apa: "Krishna, D. (2026). Spread of Computer Viruses: Vectors, Network Risk & Cyber Hygiene. Academic Seminar Series.",
      ieee: "D. Krishna, 'Spread of Computer Viruses: Vectors, Network Risk & Cyber Hygiene,' presented at Academic Seminar Series, 2026."
    },
    slidesDeck: [
      {
        slideNumber: 1,
        title: "Spread of Computer Viruses",
        subtitle: "Infection Vectors, Transmission & Prevention",
        bullets: [
          "Computer viruses are self-replicating programs that spread by infecting executable files and documents.",
          "Consequences range from sluggish system performance to critical data loss and infrastructure destruction.",
          "Presented as an essential cyber-awareness foundation for students and professionals."
        ],
        takeaway: "Viruses require a transmission vector and human or automated execution to propagate."
      },
      {
        slideNumber: 2,
        title: "Core Transmission Vectors",
        subtitle: "The 4 Main Infection Gateways",
        bullets: [
          "1. Removable Storage: Physical devices (USB flash drives, external HDDs, SD cards, CDs/DVDs).",
          "2. The Internet: Compromised websites, malicious downloads, and drive-by scripts.",
          "3. Email Attachments: Disguised payloads delivered directly to personal inboxes.",
          "4. Shared Files & Folders: Local Area Networks (LAN) and unauthenticated cloud repositories."
        ],
        takeaway: "Every data-transfer channel represents a potential infection surface."
      },
      {
        slideNumber: 3,
        title: "Vector 1: Removable Storage Devices",
        subtitle: "USB Flash Drives, CDs & DVDs",
        bullets: [
          "Viruses propagate when portable media is plugged across multiple untrusted computers.",
          "AutoRun/AutoPlay exploits execute malicious code the instant the storage drive is connected.",
          "The host computer becomes an active carrier, silently infecting every new USB inserted thereafter."
        ],
        takeaway: "Always disable AutoRun and scan external drives before opening folders."
      },
      {
        slideNumber: 4,
        title: "Vector 2: Internet & Drive-By Downloads",
        subtitle: "High-Velocity Online Networks",
        bullets: [
          "Unsafe domains and malvertising attempt silent background payload drops.",
          "Visiting untrusted software repositories or pirated media hosts leads to immediate compromise.",
          "Compromised host systems are enrolled into botnets to spread infections to other internet peers."
        ],
        takeaway: "Only download executables from verified, cryptographically signed developers."
      },
      {
        slideNumber: 5,
        title: "Vector 3: Malicious Email Attachments",
        subtitle: "Phishing & Executable Disguises",
        bullets: [
          "Malware is commonly disguised as executable files (.exe, .scr, .bat, or macro-enabled .docm).",
          "Attackers leverage social engineering: urgency, false invoices, or fake academic notices.",
          "A single click on an unexpected attachment triggers infection without visible warnings."
        ],
        takeaway: "Verify the sender address and never open unexpected attachments."
      },
      {
        slideNumber: 6,
        title: "Vector 4: Shared Network Drives & Folders",
        subtitle: "Rapid Lateral Movement",
        bullets: [
          "When an infected file is written to a shared network share, all connected nodes become vulnerable.",
          "Mass infection: One compromised workstation can infect an entire institution's servers in minutes.",
          "Unpatched SMB protocols and weak network permissions accelerate lateral virus spread."
        ],
        takeaway: "Apply principle of least privilege: isolate shares with strict read-only rights."
      },
      {
        slideNumber: 7,
        title: "How to Stop the Spread: Cyber Hygiene",
        subtitle: "4 Defensive Best Practices",
        bullets: [
          "1. Mandatory Scans: Automatically scan all removable media before access.",
          "2. Safe Browsing: Avoid unverified mirrors, torrents, and suspicious domains.",
          "3. Attachment Protocol: Immediately flag and delete unsolicited email attachments.",
          "4. Active Protection: Keep endpoint antivirus and OS security definitions continuously updated."
        ],
        takeaway: "Disciplined personal habits prevent 95% of widespread malware infections."
      },
      {
        slideNumber: 8,
        title: "Conclusion & Key Takeaways",
        subtitle: "Stay Vigilant • Stay Protected",
        bullets: [
          "Computer viruses thrive on convenience, trust, and unverified data-sharing habits.",
          "A multi-layered defense strategy (storage scans, web hygiene, mail filters) breaks the infection chain.",
          "Continuous awareness is the most reliable defense in modern digital ecosystems."
        ],
        takeaway: "Think before you click, connect, or share."
      },
      {
        slideNumber: 9,
        title: "Academic References & Media Sources",
        subtitle: "Citations & Image Credits",
        bullets: [
          "GeeksforGeeks Peer-to-Peer & Network Security Architecture (geeksforgeeks.org)",
          "Fortra Phishing & Malicious Email Attachment Case Studies (fortra.com)",
          "Vecteezy Cybersecurity Threat Concepts & Vector Illustrations (vecteezy.com)",
          "OWASP Endpoint Hygiene Guidelines & National Cybersecurity Standards"
        ],
        takeaway: "Prepared for College & Academic Seminar presentation."
      }
    ]
  },
  {
    id: "signs-symptoms-allergies",
    title: "Biology: Signs, Symptoms & Physiological Mechanisms of Allergies",
    category: "Biology & Health",
    type: "PPTX",
    slidesCount: "10 Slides",
    fileSize: "614 KB",
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
    tags: ["biology", "allergies", "health", "science", "anaphylaxis", "immune system", "seminar"],
    citation: {
      apa: "Krishna, D., et al. (2026). Signs, Symptoms and Physiological Mechanisms of Allergies. Biology Group Seminar.",
      ieee: "D. Krishna et al., 'Signs, Symptoms and Physiological Mechanisms of Allergies,' Biology Academic Seminar Series, 2026."
    },
    slidesDeck: [
      {
        slideNumber: 1,
        title: "Signs and Symptoms of Allergies",
        subtitle: "Biology Seminar • Prepared by Group B",
        bullets: [
          "An allergy is an oversensitive immune reaction to harmless foreign substances (allergens).",
          "Manifestations range from localized ocular and respiratory irritation to acute systemic collapse.",
          "Overview of biological pathways: airborne, dietary, dermatological, and drug-induced."
        ],
        takeaway: "The immune system mistaking harmless antigens for dangerous pathogens."
      },
      {
        slideNumber: 2,
        title: "Inhaled Allergens & Airway Contact",
        subtitle: "Respiratory & Ocular Manifestations",
        bullets: [
          "Airborne particles (dust mites, tree and grass pollens, fungal spores) contact mucous membranes.",
          "Local irritation: sneezing bursts, rhinorrhea (runny nose), and nasal congestion.",
          "Ocular distress: conjunctival redness, excessive lacrimation (watery eyes), and intense itching.",
          "Lower respiratory reaction: bronchospasms, coughing, wheezing, and excessive lung mucus."
        ],
        takeaway: "Airway symptoms stem directly from mucosal mast cell degranulation releasing histamine."
      },
      {
        slideNumber: 3,
        title: "Food Allergens & Digestive Responses",
        subtitle: "Gastrointestinal & Cutaneous Reactions",
        bullets: [
          "Ingested allergens interact with the enteric immune system and gut lining.",
          "Key Textbook Note: 'Food allergies rarely cause isolated respiratory asthmatic symptoms.'",
          "Primary manifestations remain gastrointestinal: abdominal cramps, bloating, vomiting, and diarrhea.",
          "Secondary cutaneous signs: urticaria (hives), localized swelling, and severe pruritus (itching)."
        ],
        takeaway: "Digestive symptoms appear rapidly after food allergen ingestion."
      },
      {
        slideNumber: 4,
        title: "Specific Common Food Allergens",
        subtitle: "Milk, Wheat, Peanuts & Seafood",
        bullets: [
          "Cow's Milk (Casein / Whey): Vomiting, abdominal colic, and early childhood hives.",
          "Wheat (Gluten proteins): Stomach upset, eczema flares, and rare exercise-induced reactions.",
          "Seafood & Shellfish (Tropomyosin): Acute lip/throat swelling, vomiting, high risk of anaphylaxis.",
          "Tree Nuts & Peanuts: Potent triggers capable of provoking life-threatening systemic shock."
        ],
        takeaway: "Even micro-gram exposures can trigger massive immune cascade in sensitized individuals."
      },
      {
        slideNumber: 5,
        title: "Seasonal & Environmental Factors",
        subtitle: "Spring Blossom vs Winter Smog",
        bullets: [
          "Spring & Summer Pollen: Blossoming flora creates high airborne pollen counts, driving hay fever.",
          "Winter Airborne Pollutants: Sulphur dioxide (SO2) and nitrogen dioxide (NO2) in urban smog.",
          "Dust Mite Allergen: Indoor dust containing microscopic mite feces triggers chronic bronchial asthma."
        ],
        takeaway: "Environmental meteorological conditions strongly influence allergy flare frequencies."
      },
      {
        slideNumber: 6,
        title: "Medication Triggers & Insect Bites",
        subtitle: "Drug Sensitivities & Clinical Protocols",
        bullets: [
          "Insect Stings (wasps, honeybees): Injected venom introduces foreign proteins directly into blood.",
          "Pharmaceutical Triggers: Aspirin (NSAIDs), Penicillin, and cephalosporin antibiotics.",
          "Clinical Precaution: 'Before administering antibiotics, doctors/nurses always verify patient allergy history.'"
        ],
        takeaway: "Intravenous or injected allergens bypass mucosal barriers and enter circulation immediately."
      },
      {
        slideNumber: 7,
        title: "Anaphylaxis: Multi-Organ Involvement",
        subtitle: "Acute Systemic Medical Emergency",
        bullets: [
          "Multiple organ systems undergo simultaneous compromise; can onset in minutes or be delayed.",
          "Respiratory: Laryngeal edema (throat closing), severe bronchoconstriction, and asphyxiation risk.",
          "Circulatory: Massive vascular dilation causes profound hypotension (low blood pressure) and shock.",
          "Digestive: Acute abdominal cramping, projectile vomiting, and loss of bowel control."
        ],
        takeaway: "Anaphylaxis requires immediate intramuscular epinephrine (adrenaline) injection."
      },
      {
        slideNumber: 8,
        title: "Visible Dermatological Signs",
        subtitle: "Textbook Clinical Indicators",
        bullets: [
          "(a) Reddened Skin (Erythema): Localized capillary engorgement across limbs and facial skin.",
          "(b) Skin Rashes: Eruptive wheals, hives (urticaria), and itchy inflammatory patches.",
          "(c) Angioedema: Deep tissue swelling affecting lips, eyelids, tongue, hands, and feet."
        ],
        takeaway: "Skin markers provide the fastest visual cue of a spreading systemic reaction."
      },
      {
        slideNumber: 9,
        title: "Severity Metric: Rate of Anaphylaxis",
        subtitle: "The 10 cm Diagnostic Benchmark",
        bullets: [
          "Severity Threshold: Local skin reaction displaying an area of erythema greater than 10 cm in diameter.",
          "Rapid progression: From localized cutaneous swelling to bronchoconstriction and circulatory shock.",
          "Requires immediate hospital monitoring; secondary biphasic allergic reactions can occur hours later."
        ],
        takeaway: "Erythema > 10 cm is a critical textbook indicator of severe hypersensitivity."
      },
      {
        slideNumber: 10,
        title: "Summary & Review",
        subtitle: "Core Takeaways on Allergy Mechanisms",
        bullets: [
          "Allergens encompass inhalants, dietary foods, seasonal factors, pharmaceuticals, and insect venoms.",
          "Severity ranges on a continuum from mild localized rhinitis to life-threatening anaphylaxis.",
          "Early recognition of symptoms and prompt medical response saves lives."
        ],
        takeaway: "Prepared by Group B for Biology Seminar Assessment."
      }
    ]
  },
  {
    id: "interactive-budgeting-seminar",
    title: "Financial Literacy: Real-Life Budgeting & Budget Curveballs Simulator",
    category: "Economics & Social Studies",
    type: "Interactive HTML",
    slidesCount: "5 Interactive Modules",
    fileSize: "77 KB",
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
    tags: ["budgeting", "finance", "interactive", "economics", "chartjs", "smartboard", "seminar"],
    citation: {
      apa: "Educational Financial Literacy Group. (2026). Lesson 8: Real-Life Budgeting & Curveballs Interactive Seminar. SmartBoard Curriculum.",
      ieee: "EduNexus, 'Lesson 8: Real-Life Budgeting & Curveballs Interactive Simulator,' Interactive Academic Modules, 2026."
    },
    slidesDeck: [
      {
        slideNumber: 1,
        title: "Module 1: Real-Life Budgeting Overview",
        subtitle: "Mindset, Principles & Common Hurdles",
        bullets: [
          "Why traditional budgets fail: Unrealistic restriction vs dynamic adaptive planning.",
          "Distinction between Fixed Needs (rent, utilities), Variable Needs (groceries), and Discretionary Wants.",
          "The critical role of emergency buffers to absorb unexpected financial friction."
        ],
        takeaway: "A budget is a tool for intentional freedom, not punishment."
      },
      {
        slideNumber: 2,
        title: "Module 2: Maya's Case Study",
        subtitle: "Navigating Career Entry & Lifestyle Creep",
        bullets: [
          "Maya transitions from college to her first salary of $3,200/month.",
          "Initial baseline: Modest savings, shared apartment, basic meal preparation.",
          "Lifestyle creep: Small recurring subscription add-ons, dining out, and impulse shopping gradually evaporate surplus."
        ],
        takeaway: "Income increases rarely solve money issues without proactive expense boundaries."
      },
      {
        slideNumber: 3,
        title: "Module 3: Amita's Baseline Budget Breakdown",
        subtitle: "Interactive Visual Allocations with Chart.js",
        bullets: [
          "Housing & Utilities: 35% of net monthly income.",
          "Transportation & Insurance: 15% allocation.",
          "Food, Health & Essentials: 25% allocation.",
          "Emergency Savings & Debt Prepayment: 15% dedicated cushion.",
          "Discretionary Leisure: 10% guilt-free spending limit."
        ],
        takeaway: "Visualizing percentage buckets prevents single-category overruns."
      },
      {
        slideNumber: 4,
        title: "Module 4: Dynamic Curveballs Simulator",
        subtitle: "Stress-Testing Against Real-World Shocks",
        bullets: [
          "Curveball 1: Urgent Car Transmission Repair ($650 surprise cost).",
          "Curveball 2: Medical Co-Pay & Prescription ($320).",
          "Curveball 3: Sudden Rent Increase or Security Deposit Adjustment ($200/month).",
          "Live interactive simulation shows which budget categories must flex to prevent high-interest debt."
        ],
        takeaway: "Financial resilience is measured by how gracefully your budget absorbs curveballs."
      },
      {
        slideNumber: 5,
        title: "Module 5: Class Discussion & Seminar Takeaways",
        subtitle: "Actionable Habits for Students",
        bullets: [
          "1. Build the $1,000 Starter Emergency Fund before aggressive investing.",
          "2. Automate savings on payday before discretionary spending occurs.",
          "3. Review subscriptions every quarter to cancel unused recurring charges.",
          "4. Practice the 48-Hour Rule for non-essential purchases exceeding $50."
        ],
        takeaway: "Mastering budgeting in school sets the foundation for lifelong financial independence."
      }
    ]
  },
  {
    id: "world-river-systems",
    title: "World Geography: Major River Systems & Commercial Waterways",
    category: "Geography & Social Studies",
    type: "PPTX",
    slidesCount: "6 Slides",
    fileSize: "9.9 MB",
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
    tags: ["geography", "rivers", "danube", "amazon", "mississippi", "rhine", "st lawrence", "seminar"],
    citation: {
      apa: "Group 3. (2025). Major World River Systems: St. Lawrence to the Rhine. Geography Academic Seminar.",
      ieee: "Group 3, 'Major World River Systems: St. Lawrence to the Rhine,' Geography Academic Seminar Series, 2025."
    },
    slidesDeck: [
      {
        slideNumber: 1,
        title: "Major World River Systems",
        subtitle: "Geography Seminar • Prepared by Group 3 (Roll No 15–21)",
        bullets: [
          "Comprehensive survey of key global rivers shaping international commerce and civilizations.",
          "Featured Waterways: St. Lawrence, Mississippi, Danube, Amazon, and Rhine Rivers.",
          "Analysis of drainage basins, economic seaways, and environmental importance."
        ],
        takeaway: "Rivers are the historical and economic lifelines of human civilizations."
      },
      {
        slideNumber: 2,
        title: "The St. Lawrence River & Seaway",
        subtitle: "North American Great Lakes Gateway (Roll No 19, 15)",
        bullets: [
          "Massive North American waterway connecting the Great Lakes directly to the Atlantic Ocean.",
          "Forms a vital commercial artery and international border between Canada and the United States.",
          "The St. Lawrence Seaway allows ocean-going freighters to navigate deep into North America's industrial heartland."
        ],
        takeaway: "Crucial engineering marvel transforming inland lakes into global shipping ports."
      },
      {
        slideNumber: 3,
        title: "The Mississippi River",
        subtitle: "The Spine of North America (Roll No 17)",
        bullets: [
          "Second-longest river in the United States, spanning approximately 2,340 miles (3,766 km).",
          "Origin: Begins its journey as a modest stream at Lake Itasca in northern Minnesota.",
          "Outlet: Empties into the Gulf of Mexico via an extensive delta south of New Orleans.",
          "Drains all or parts of 32 US states and two Canadian provinces."
        ],
        takeaway: "The primary agricultural transport corridor for grain and commodities in the USA."
      },
      {
        slideNumber: 4,
        title: "The Danube River",
        subtitle: "Trans-European Artery (Roll No 16, 20)",
        bullets: [
          "Second-longest river in Europe (after the Volga in Russia), flowing roughly 1,770 miles (2,850 km).",
          "Originates in the Black Forest of Western Germany and flows east through 10 countries.",
          "Passes through iconic European capitals: Vienna, Bratislava, Budapest, and Belgrade.",
          "Empties into the Black Sea via the ecologically rich Danube Delta."
        ],
        takeaway: "A unifying waterway bridging Central and Southeastern European cultures and trade."
      },
      {
        slideNumber: 5,
        title: "The Amazon River",
        subtitle: "The Giant of South America (Roll No 21)",
        bullets: [
          "World's second-longest river (approx. 3,980 miles) and by far the largest by discharge volume.",
          "Accounts for approximately one-fifth (20%) of all river water entering the world's oceans.",
          "Flows through the vast Amazon Rainforest basin, supporting unmatched biodiversity.",
          "Discharges immense freshwater plume extending hundreds of miles into the Atlantic Ocean."
        ],
        takeaway: "The planetary regulator of terrestrial biodiversity and freshwater cycles."
      },
      {
        slideNumber: 6,
        title: "The Rhine River",
        subtitle: "Western Europe's Industrial Lifeline (Roll No 18)",
        bullets: [
          "One of the most important and densely navigated rivers in European history.",
          "Origin: Begins in the Swiss canton of Graubünden high in the southeastern Swiss Alps.",
          "Flows north through Switzerland, Liechtenstein, Austria, Germany, France, and the Netherlands.",
          "Discharges into the North Sea at Rotterdam—Europe's busiest maritime seaport."
        ],
        takeaway: "The historical foundation of the European industrial economy and trade."
      }
    ]
  },
  {
    id: "school-assembly-speech",
    title: "Public Speaking: School Assembly Host & Presentation Script",
    category: "Study Notes",
    type: "PDF",
    slidesCount: "2 Pages (Teleprompter Ready)",
    fileSize: "124 KB",
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
    tags: ["speech", "assembly", "public speaking", "script", "school", "notes"],
    citation: {
      apa: "Krishna, D., & Johan. (2026). School Assembly Host Protocol and Speech Script. Student Leadership Repository.",
      ieee: "D. Krishna and Johan, 'School Assembly Host Protocol and Speech Script,' Student Leadership Guides, 2026."
    },
    slidesDeck: [
      {
        slideNumber: 1,
        title: "Part 1: Stage Opening & National Pledge Protocol",
        subtitle: "Hosts: Dhyan Krishna & Johan",
        bullets: [
          "Opening Quote (Dhyan): 'A wise man speaks because he has something to say; a fool speaks because he has to say something.'",
          "Host Introduction (Johan): 'I am Dhyan and I am Johan, and we are your hosts for today’s assembly.'",
          "Solemn Protocol (Dhyan): 'I now request Master Megharoopan to lead us in the Pledge to remind us of our dues toward our great nation.'",
          "Transition: 'Thank you Megharoopan. Now we can proceed to the speeches of our classes.'"
        ],
        takeaway: "Hook the audience within 10 seconds with an inspiring quote and clear voice projection."
      },
      {
        slideNumber: 2,
        title: "Part 2: Speaker Transitions, Remarks & Closing Anthem",
        subtitle: "Class Presentations & Ceremonial Conclusion",
        bullets: [
          "Class Speaker Introductions: Seamless handoffs ensuring each student speaker feels valued and welcomed.",
          "Teacher & Guest Address: Inviting Aswathy Ma'am for feedback and school leadership for the ceremonial message.",
          "Crowd Management Cues: 'Students are requested to be silent, settle down quickly, and rise for the school anthem.'",
          "Prize Ceremony & Vote of Thanks: Formal recognition of academic and athletic student achievements."
        ],
        takeaway: "Mastering pacing and stage presence keeps an entire student body engaged and disciplined."
      }
    ]
  },
  {
    id: "iot-smart-systems",
    title: "Internet of Things (IoT) & Smart Systems Architecture",
    category: "Electronics & IoT",
    type: "PPTX",
    slidesCount: "38 Slides",
    fileSize: "1.8 MB",
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
    tags: ["iot", "sensors", "mqtt", "wireless", "telemetry", "seminar", "esp32"],
    citation: {
      apa: "Krishna, D. (2026). Internet of Things Architecture and Edge Telemetry Systems. Embedded Systems Research.",
      ieee: "D. Krishna, 'Internet of Things Architecture and Edge Telemetry Systems,' Embedded IoT Research, 2026."
    },
    slidesDeck: [
      {
        slideNumber: 1,
        title: "IoT 4-Layer Architectural Model",
        subtitle: "Foundations of Connected Systems",
        bullets: [
          "Perception Layer: Physical transducers, sensors (DHT11/BME280), and actuators.",
          "Network Layer: Wireless gateways, Wi-Fi 802.11 b/g/n, Cellular NB-IoT, and LoRaWAN long-range links.",
          "Middleware Layer: Message brokers (MQTT Mosquitto), Firebase RTDB, and data parsing pipelines.",
          "Application Layer: Responsive web dashboards, analytics charts, and mobile control interfaces."
        ],
        takeaway: "Clean separation of layers ensures high scalability from 1 node to 100,000 nodes."
      },
      {
        slideNumber: 2,
        title: "MQTT Protocol Architecture & QoS Levels",
        subtitle: "Lightweight Publish/Subscribe Paradigm",
        bullets: [
          "Extremely compact 2-byte header optimized for battery-powered, bandwidth-constrained microcontrollers.",
          "Broker decouples publishers (sensors) from subscribers (web dashboards).",
          "QoS 0 (At most once), QoS 1 (At least once), QoS 2 (Exactly once guaranteed delivery).",
          "Live telemetry demonstration running on the ESP32 Lab subpage."
        ],
        takeaway: "MQTT is the industry standard protocol for scalable industrial and smart-home telemetry."
      }
    ]
  },
  {
    id: "esp32-freertos",
    title: "ESP32 Dual-Core Architecture & FreeRTOS Concurrency",
    category: "Electronics & IoT",
    type: "PPTX",
    slidesCount: "42 Slides",
    fileSize: "2.4 MB",
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
    tags: ["esp32", "freertos", "microcontroller", "embedded c", "concurrency", "rtos"],
    citation: {
      apa: "Krishna, D. (2026). Real-Time Multitasking with FreeRTOS on ESP32 Dual-Core Processors. Embedded Computing Review.",
      ieee: "D. Krishna, 'Real-Time Multitasking with FreeRTOS on ESP32 Dual-Core Processors,' Embedded Computing Review, 2026."
    },
    slidesDeck: [
      {
        slideNumber: 1,
        title: "Xtensa LX6 Dual-Core Architecture",
        subtitle: "PRO CPU (Core 0) & APP CPU (Core 1)",
        bullets: [
          "Dual Xtensa 32-bit LX6 microprocessors running up to 240 MHz (up to 600 MIPS).",
          "Core 0 conventionally handles Wi-Fi/Bluetooth stack; Core 1 executes user applications.",
          "520 KB internal SRAM with external SPI flash mapping via MMU cache."
        ],
        takeaway: "Dual-core processing allows non-blocking network communications alongside time-critical sensor loops."
      },
      {
        slideNumber: 2,
        title: "FreeRTOS Task Scheduling & Synchronization",
        subtitle: "Preemptive Priority Scheduling & Mutex Protection",
        bullets: [
          "xTaskCreatePinnedToCore() binds time-sensitive tasks to specific cores.",
          "Thread-safe inter-task communication via FreeRTOS Queues.",
          "Mutexes and binary semaphores prevent race conditions on shared I2C and SPI buses.",
          "Deep sleep consumes merely ~10 µA, waking via RTC timer or capacitive touch pads."
        ],
        takeaway: "Mastering RTOS primitives is essential for robust commercial embedded firmware."
      }
    ]
  },
  {
    id: "dsa-optimization",
    title: "Data Structures & Algorithmic Complexity Cheat Sheet",
    category: "Computer Science",
    type: "PDF",
    slidesCount: "16 Pages",
    fileSize: "450 KB",
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
    tags: ["dsa", "algorithms", "cheat sheet", "computer science", "notes", "big o"],
    citation: {
      apa: "Krishna, D. (2026). Algorithmic Complexity and Data Structure Optimization Handbook. Academic Notes.",
      ieee: "D. Krishna, 'Algorithmic Complexity and Data Structure Optimization Handbook,' Computer Science Guides, 2026."
    },
    slidesDeck: [
      {
        slideNumber: 1,
        title: "Asymptotic Notation & Big-O Hierarchy",
        subtitle: "Time & Space Efficiency Benchmarking",
        bullets: [
          "O(1) Constant < O(log n) Logarithmic < O(n) Linear < O(n log n) Linearithmic < O(n²) Quadratic.",
          "Master Theorem simplifies divide-and-conquer recurrence relations T(n) = aT(n/b) + f(n).",
          "Space-time trade-offs in hash tables vs sorted arrays."
        ],
        takeaway: "Choosing the optimal data structure reduces runtimes from minutes to milliseconds."
      }
    ]
  },
  {
    id: "math-calculus-transforms",
    title: "Engineering Mathematics: Laplace & Fourier Transforms",
    category: "Mathematics & Science",
    type: "PDF",
    slidesCount: "22 Pages",
    fileSize: "680 KB",
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
    tags: ["mathematics", "calculus", "laplace", "fourier", "formula sheet", "engineering"],
    citation: {
      apa: "Department of Mathematics. (2026). Transform Calculus for Electrical & Computer Engineers. University Courseware.",
      ieee: "Academic Reference, 'Transform Calculus for Electrical & Computer Engineers,' Engineering Mathematics, 2026."
    },
    slidesDeck: [
      {
        slideNumber: 1,
        title: "Laplace Transform & S-Domain Conversion",
        subtitle: "Differential Equations to Algebraic Form",
        bullets: [
          "L{f(t)} = F(s) = ∫[0 to ∞] e^(-st) f(t) dt.",
          "Converts time-domain differential equations into algebraic polynomials in the complex frequency s-domain.",
          "First Shifting Theorem: L{e^(at) f(t)} = F(s - a).",
          "Indispensable tool for analyzing stability in closed-loop feedback systems."
        ],
        takeaway: "Simplifies differential circuit calculations into standard algebraic solving."
      }
    ]
  },
  {
    id: "seminar-presentation-mastery",
    title: "How to Deliver an Outstanding Technical Seminar: Speaker Guide",
    category: "Study Notes",
    type: "PPTX",
    slidesCount: "20 Slides",
    fileSize: "520 KB",
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
    tags: ["seminar", "presentation skills", "public speaking", "slides guide", "tips"],
    citation: {
      apa: "Krishna, D. (2026). Presentation Mastery: Delivering High-Impact Technical Seminars. Academic Communications.",
      ieee: "D. Krishna, 'Presentation Mastery: Delivering High-Impact Technical Seminars,' Academic Communications Review, 2026."
    },
    slidesDeck: [
      {
        slideNumber: 1,
        title: "The Golden Rules of Technical Slide Design",
        subtitle: "Visual Clarity & Audience Retention",
        bullets: [
          "Never read your slides verbatim: slides are signposts for the audience, not teleprompters for you.",
          "Maintain high visual contrast: dark text on light backgrounds or crisp teal/white on navy.",
          "Limit each slide to one core engineering concept with bold architecture diagrams."
        ],
        takeaway: "Your voice delivers the story; your slides provide the evidence."
      }
    ]
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
    title: "Allergy Severity Benchmark",
    formula: "Erythema Area > 10 cm  |  Anaphylaxis Protocol",
    description: "Clinical textbook indicator of severe acute hypersensitivity requiring immediate medical monitoring."
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
