/**
 * Academic & Seminar Slides Data Repository
 * ==========================================
 * Features rich slide-by-slide decks for in-browser presentation view,
 * full citations, interactive links, and study tools.
 *
 * Last updated via EduSphere Python Desktop Studio: 2026-11-15 12:22:07
 */

const academicResources = [
  {
    "id": "spread-computer-viruses",
    "title": "Spread of Computer Viruses: Vectors, Network Risk & Cyber Hygiene",
    "category": "Computer Science",
    "type": "PPTX",
    "slidesCount": "9 Slides",
    "fileSize": "788 KB",
    "academicLevel": "School / College Seminar",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": true,
    "summary": "Complete seminar presentation detailing how computer viruses replicate across removable storage, email attachments, unsafe web downloads, and shared network directories, with actionable cyber-hygiene defenses.",
    "topicsCovered": [
      "Removable Storage risks: Flash drives, CDs, AutoRun exploits and host propagation",
      "Web downloads & drive-by infections: High-velocity malicious propagation",
      "Email attachments (.exe, .scr) and deceptive phishing lures",
      "Network shared folders risk and disciplined antivirus defense practices"
    ],
    "fileUrl": "slides/Spread of Computer Viruses - Copy.pptx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Spread%20of%20Computer%20Viruses%20-%20Copy.pptx",
    "tags": [
      "viruses",
      "malware",
      "cybersecurity",
      "computer science",
      "antivirus",
      "network",
      "storage"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Spread of Computer Viruses: Vectors, Network Risk & Cyber Hygiene. Academic Seminar Series.",
      "ieee": "D. Krishna, 'Spread of Computer Viruses: Vectors, Network Risk & Cyber Hygiene,' presented at Academic Seminar Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Spread of Computer Viruses",
        "subtitle": "Infection Vectors, Transmission & Prevention",
        "bullets": [
          "Computer viruses are self-replicating programs that spread by infecting executable files and documents.",
          "Consequences range from sluggish system performance to critical data loss and infrastructure destruction.",
          "Presented as an essential cyber-awareness foundation for students and professionals."
        ],
        "takeaway": "Viruses require a transmission vector and human or automated execution to propagate."
      },
      {
        "slideNumber": 2,
        "title": "Core Transmission Vectors",
        "subtitle": "The 4 Main Infection Gateways",
        "bullets": [
          "1. Removable Storage: Physical devices (USB flash drives, external HDDs, SD cards, CDs/DVDs).",
          "2. The Internet: Compromised websites, malicious downloads, and drive-by scripts.",
          "3. Email Attachments: Disguised payloads delivered directly to personal inboxes.",
          "4. Shared Files & Folders: Local Area Networks (LAN) and unauthenticated cloud repositories."
        ],
        "takeaway": "Every data-transfer channel represents a potential infection surface."
      },
      {
        "slideNumber": 3,
        "title": "Vector 1: Removable Storage Devices",
        "subtitle": "USB Flash Drives, CDs & DVDs",
        "bullets": [
          "Viruses propagate when portable media is plugged across multiple untrusted computers.",
          "AutoRun/AutoPlay exploits execute malicious code the instant the storage drive is connected.",
          "The host computer becomes an active carrier, silently infecting every new USB inserted thereafter."
        ],
        "takeaway": "Always disable AutoRun and scan external drives before opening folders."
      },
      {
        "slideNumber": 4,
        "title": "Vector 2: Internet & Drive-By Downloads",
        "subtitle": "High-Velocity Online Networks",
        "bullets": [
          "Unsafe domains and malvertising attempt silent background payload drops.",
          "Visiting untrusted software repositories or pirated media hosts leads to immediate compromise.",
          "Compromised host systems are enrolled into botnets to spread infections to other internet peers."
        ],
        "takeaway": "Only download executables from verified, cryptographically signed developers."
      },
      {
        "slideNumber": 5,
        "title": "Vector 3: Malicious Email Attachments",
        "subtitle": "Phishing & Executable Disguises",
        "bullets": [
          "Malware is commonly disguised as executable files (.exe, .scr, .bat, or macro-enabled .docm).",
          "Attackers leverage social engineering: urgency, false invoices, or fake academic notices.",
          "A single click on an unexpected attachment triggers infection without visible warnings."
        ],
        "takeaway": "Verify the sender address and never open unexpected attachments."
      },
      {
        "slideNumber": 6,
        "title": "Vector 4: Shared Network Drives & Folders",
        "subtitle": "Rapid Lateral Movement",
        "bullets": [
          "When an infected file is written to a shared network share, all connected nodes become vulnerable.",
          "Mass infection: One compromised workstation can infect an entire institution's servers in minutes.",
          "Unpatched SMB protocols and weak network permissions accelerate lateral virus spread."
        ],
        "takeaway": "Apply principle of least privilege: isolate shares with strict read-only rights."
      },
      {
        "slideNumber": 7,
        "title": "How to Stop the Spread: Cyber Hygiene",
        "subtitle": "4 Defensive Best Practices",
        "bullets": [
          "1. Mandatory Scans: Automatically scan all removable media before access.",
          "2. Safe Browsing: Avoid unverified mirrors, torrents, and suspicious domains.",
          "3. Attachment Protocol: Immediately flag and delete unsolicited email attachments.",
          "4. Active Protection: Keep endpoint antivirus and OS security definitions continuously updated."
        ],
        "takeaway": "Disciplined personal habits prevent 95% of widespread malware infections."
      },
      {
        "slideNumber": 8,
        "title": "Conclusion & Key Takeaways",
        "subtitle": "Stay Vigilant • Stay Protected",
        "bullets": [
          "Computer viruses thrive on convenience, trust, and unverified data-sharing habits.",
          "A multi-layered defense strategy (storage scans, web hygiene, mail filters) breaks the infection chain.",
          "Continuous awareness is the most reliable defense in modern digital ecosystems."
        ],
        "takeaway": "Think before you click, connect, or share."
      },
      {
        "slideNumber": 9,
        "title": "Academic References & Media Sources",
        "subtitle": "Citations & Image Credits",
        "bullets": [
          "GeeksforGeeks Peer-to-Peer & Network Security Architecture (geeksforgeeks.org)",
          "Fortra Phishing & Malicious Email Attachment Case Studies (fortra.com)",
          "Vecteezy Cybersecurity Threat Concepts & Vector Illustrations (vecteezy.com)",
          "OWASP Endpoint Hygiene Guidelines & National Cybersecurity Standards"
        ],
        "takeaway": "Prepared for College & Academic Seminar presentation."
      }
    ]
  },
  {
    "id": "signs-symptoms-allergies",
    "title": "Biology: Signs, Symptoms & Physiological Mechanisms of Allergies",
    "category": "Biology & Health",
    "type": "PPTX",
    "slidesCount": "10 Slides",
    "fileSize": "614 KB",
    "academicLevel": "Biology / School Seminar",
    "author": "Dhyan Krishna M (Group B)",
    "date": "2026",
    "featured": true,
    "summary": "Detailed 10-minute seminar slide deck examining physiological and dermatological allergic reactions triggered by airborne particles, specific food allergens, drug sensitivities, and acute anaphylaxis.",
    "topicsCovered": [
      "Inhaled allergens (dust, pollen, airborne particles) & airway contact symptoms",
      "Food allergens (milk, wheat, seafood) and gastrointestinal manifestations",
      "Seasonal factors, drug allergens (aspirin, penicillin) & insect stings",
      "Visible dermatological signs: erythema (>10 cm), urticaria, and acute multi-organ anaphylaxis"
    ],
    "fileUrl": "slides/Signs and Symptoms of Allergies (10-Min Deck) - Copy.pptx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Signs%20and%20Symptoms%20of%20Allergies%20(10-Min%20Deck)%20-%20Copy.pptx",
    "tags": [
      "biology",
      "allergies",
      "health",
      "science",
      "anaphylaxis",
      "immune system",
      "seminar"
    ],
    "citation": {
      "apa": "Krishna, D., et al. (2026). Signs, Symptoms and Physiological Mechanisms of Allergies. Biology Group Seminar.",
      "ieee": "D. Krishna et al., 'Signs, Symptoms and Physiological Mechanisms of Allergies,' Biology Academic Seminar Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Signs and Symptoms of Allergies",
        "subtitle": "Biology Seminar • Prepared by Group B",
        "bullets": [
          "An allergy is an oversensitive immune reaction to harmless foreign substances (allergens).",
          "Manifestations range from localized ocular and respiratory irritation to acute systemic collapse.",
          "Overview of biological pathways: airborne, dietary, dermatological, and drug-induced."
        ],
        "takeaway": "The immune system mistaking harmless antigens for dangerous pathogens."
      },
      {
        "slideNumber": 2,
        "title": "Inhaled Allergens & Airway Contact",
        "subtitle": "Respiratory & Ocular Manifestations",
        "bullets": [
          "Airborne particles (dust mites, tree and grass pollens, fungal spores) contact mucous membranes.",
          "Local irritation: sneezing bursts, rhinorrhea (runny nose), and nasal congestion.",
          "Ocular distress: conjunctival redness, excessive lacrimation (watery eyes), and intense itching.",
          "Lower respiratory reaction: bronchospasms, coughing, wheezing, and excessive lung mucus."
        ],
        "takeaway": "Airway symptoms stem directly from mucosal mast cell degranulation releasing histamine."
      },
      {
        "slideNumber": 3,
        "title": "Food Allergens & Digestive Responses",
        "subtitle": "Gastrointestinal & Cutaneous Reactions",
        "bullets": [
          "Ingested allergens interact with the enteric immune system and gut lining.",
          "Key Textbook Note: 'Food allergies rarely cause isolated respiratory asthmatic symptoms.'",
          "Primary manifestations remain gastrointestinal: abdominal cramps, bloating, vomiting, and diarrhea.",
          "Secondary cutaneous signs: urticaria (hives), localized swelling, and severe pruritus (itching)."
        ],
        "takeaway": "Digestive symptoms appear rapidly after food allergen ingestion."
      },
      {
        "slideNumber": 4,
        "title": "Specific Common Food Allergens",
        "subtitle": "Milk, Wheat, Peanuts & Seafood",
        "bullets": [
          "Cow's Milk (Casein / Whey): Vomiting, abdominal colic, and early childhood hives.",
          "Wheat (Gluten proteins): Stomach upset, eczema flares, and rare exercise-induced reactions.",
          "Seafood & Shellfish (Tropomyosin): Acute lip/throat swelling, vomiting, high risk of anaphylaxis.",
          "Tree Nuts & Peanuts: Potent triggers capable of provoking life-threatening systemic shock."
        ],
        "takeaway": "Even micro-gram exposures can trigger massive immune cascade in sensitized individuals."
      },
      {
        "slideNumber": 5,
        "title": "Seasonal & Environmental Factors",
        "subtitle": "Spring Blossom vs Winter Smog",
        "bullets": [
          "Spring & Summer Pollen: Blossoming flora creates high airborne pollen counts, driving hay fever.",
          "Winter Airborne Pollutants: Sulphur dioxide (SO2) and nitrogen dioxide (NO2) in urban smog.",
          "Dust Mite Allergen: Indoor dust containing microscopic mite feces triggers chronic bronchial asthma."
        ],
        "takeaway": "Environmental meteorological conditions strongly influence allergy flare frequencies."
      },
      {
        "slideNumber": 6,
        "title": "Medication Triggers & Insect Bites",
        "subtitle": "Drug Sensitivities & Clinical Protocols",
        "bullets": [
          "Insect Stings (wasps, honeybees): Injected venom introduces foreign proteins directly into blood.",
          "Pharmaceutical Triggers: Aspirin (NSAIDs), Penicillin, and cephalosporin antibiotics.",
          "Clinical Precaution: 'Before administering antibiotics, doctors/nurses always verify patient allergy history.'"
        ],
        "takeaway": "Intravenous or injected allergens bypass mucosal barriers and enter circulation immediately."
      },
      {
        "slideNumber": 7,
        "title": "Anaphylaxis: Multi-Organ Involvement",
        "subtitle": "Acute Systemic Medical Emergency",
        "bullets": [
          "Multiple organ systems undergo simultaneous compromise; can onset in minutes or be delayed.",
          "Respiratory: Laryngeal edema (throat closing), severe bronchoconstriction, and asphyxiation risk.",
          "Circulatory: Massive vascular dilation causes profound hypotension (low blood pressure) and shock.",
          "Digestive: Acute abdominal cramping, projectile vomiting, and loss of bowel control."
        ],
        "takeaway": "Anaphylaxis requires immediate intramuscular epinephrine (adrenaline) injection."
      },
      {
        "slideNumber": 8,
        "title": "Visible Dermatological Signs",
        "subtitle": "Textbook Clinical Indicators",
        "bullets": [
          "(a) Reddened Skin (Erythema): Localized capillary engorgement across limbs and facial skin.",
          "(b) Skin Rashes: Eruptive wheals, hives (urticaria), and itchy inflammatory patches.",
          "(c) Angioedema: Deep tissue swelling affecting lips, eyelids, tongue, hands, and feet."
        ],
        "takeaway": "Skin markers provide the fastest visual cue of a spreading systemic reaction."
      },
      {
        "slideNumber": 9,
        "title": "Severity Metric: Rate of Anaphylaxis",
        "subtitle": "The 10 cm Diagnostic Benchmark",
        "bullets": [
          "Severity Threshold: Local skin reaction displaying an area of erythema greater than 10 cm in diameter.",
          "Rapid progression: From localized cutaneous swelling to bronchoconstriction and circulatory shock.",
          "Requires immediate hospital monitoring; secondary biphasic allergic reactions can occur hours later."
        ],
        "takeaway": "Erythema > 10 cm is a critical textbook indicator of severe hypersensitivity."
      },
      {
        "slideNumber": 10,
        "title": "Summary & Review",
        "subtitle": "Core Takeaways on Allergy Mechanisms",
        "bullets": [
          "Allergens encompass inhalants, dietary foods, seasonal factors, pharmaceuticals, and insect venoms.",
          "Severity ranges on a continuum from mild localized rhinitis to life-threatening anaphylaxis.",
          "Early recognition of symptoms and prompt medical response saves lives."
        ],
        "takeaway": "Prepared by Group B for Biology Seminar Assessment."
      }
    ]
  },
  {
    "id": "interactive-budgeting-seminar",
    "title": "Financial Literacy: Real-Life Budgeting & Budget Curveballs Simulator",
    "category": "Economics & Social Studies",
    "type": "Interactive HTML",
    "slidesCount": "5 Interactive Modules",
    "fileSize": "77 KB",
    "academicLevel": "SmartBoard Seminar / College & School",
    "author": "Classroom Interactive Seminar",
    "date": "2026",
    "featured": true,
    "summary": "SmartBoard-ready interactive classroom seminar on budgeting realities. Features Maya's story, baseline budget allocations, a live unexpected expense (curveballs) simulator with dynamic Chart.js charts, and class discussion takeaways.",
    "topicsCovered": [
      "Module 1: Real-life budgeting essentials, fixed vs variable costs",
      "Module 2: Maya's Case Study - Navigating lifestyle creep and savings",
      "Module 3: Amita's baseline budget breakdown with interactive visual charts",
      "Module 4: Dynamic Curveballs Simulator - Live financial shock resilience testing",
      "Module 5: Class discussion prompts, reflection notes & facilitator hints"
    ],
    "fileUrl": "slides/interactive_seminar_real_life_budgeting_curveballs.html",
    "previewUrl": "slides/interactive_seminar_real_life_budgeting_curveballs.html",
    "tags": [
      "budgeting",
      "finance",
      "interactive",
      "economics",
      "chartjs",
      "smartboard",
      "seminar"
    ],
    "citation": {
      "apa": "Educational Financial Literacy Group. (2026). Lesson 8: Real-Life Budgeting & Curveballs Interactive Seminar. SmartBoard Curriculum.",
      "ieee": "EduNexus, 'Lesson 8: Real-Life Budgeting & Curveballs Interactive Simulator,' Interactive Academic Modules, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Module 1: Real-Life Budgeting Overview",
        "subtitle": "Mindset, Principles & Common Hurdles",
        "bullets": [
          "Why traditional budgets fail: Unrealistic restriction vs dynamic adaptive planning.",
          "Distinction between Fixed Needs (rent, utilities), Variable Needs (groceries), and Discretionary Wants.",
          "The critical role of emergency buffers to absorb unexpected financial friction."
        ],
        "takeaway": "A budget is a tool for intentional freedom, not punishment."
      },
      {
        "slideNumber": 2,
        "title": "Module 2: Maya's Case Study",
        "subtitle": "Navigating Career Entry & Lifestyle Creep",
        "bullets": [
          "Maya transitions from college to her first salary of $3,200/month.",
          "Initial baseline: Modest savings, shared apartment, basic meal preparation.",
          "Lifestyle creep: Small recurring subscription add-ons, dining out, and impulse shopping gradually evaporate surplus."
        ],
        "takeaway": "Income increases rarely solve money issues without proactive expense boundaries."
      },
      {
        "slideNumber": 3,
        "title": "Module 3: Amita's Baseline Budget Breakdown",
        "subtitle": "Interactive Visual Allocations with Chart.js",
        "bullets": [
          "Housing & Utilities: 35% of net monthly income.",
          "Transportation & Insurance: 15% allocation.",
          "Food, Health & Essentials: 25% allocation.",
          "Emergency Savings & Debt Prepayment: 15% dedicated cushion.",
          "Discretionary Leisure: 10% guilt-free spending limit."
        ],
        "takeaway": "Visualizing percentage buckets prevents single-category overruns."
      },
      {
        "slideNumber": 4,
        "title": "Module 4: Dynamic Curveballs Simulator",
        "subtitle": "Stress-Testing Against Real-World Shocks",
        "bullets": [
          "Curveball 1: Urgent Car Transmission Repair ($650 surprise cost).",
          "Curveball 2: Medical Co-Pay & Prescription ($320).",
          "Curveball 3: Sudden Rent Increase or Security Deposit Adjustment ($200/month).",
          "Live interactive simulation shows which budget categories must flex to prevent high-interest debt."
        ],
        "takeaway": "Financial resilience is measured by how gracefully your budget absorbs curveballs."
      },
      {
        "slideNumber": 5,
        "title": "Module 5: Class Discussion & Seminar Takeaways",
        "subtitle": "Actionable Habits for Students",
        "bullets": [
          "1. Build the $1,000 Starter Emergency Fund before aggressive investing.",
          "2. Automate savings on payday before discretionary spending occurs.",
          "3. Review subscriptions every quarter to cancel unused recurring charges.",
          "4. Practice the 48-Hour Rule for non-essential purchases exceeding $50."
        ],
        "takeaway": "Mastering budgeting in school sets the foundation for lifelong financial independence."
      }
    ]
  },
  {
    "id": "world-river-systems",
    "title": "World Geography: Major River Systems & Commercial Waterways",
    "category": "Geography & Social Studies",
    "type": "PPTX",
    "slidesCount": "6 Slides",
    "fileSize": "9.9 MB",
    "academicLevel": "Geography / School Presentation",
    "author": "Group 3 (Roll No 15–21)",
    "date": "2025-2026",
    "featured": true,
    "summary": "Visual geography presentation exploring the St. Lawrence Seaway, Mississippi River, Danube, Amazon River basin, and Rhine River, detailing drainage routes, economic significance, and ocean outlets.",
    "topicsCovered": [
      "St. Lawrence River & Seaway: Connecting Great Lakes to Atlantic shipping routes",
      "Mississippi River: Origin at Lake Itasca and discharge into Gulf of Mexico",
      "Danube River: Trans-European waterway flowing through Germany to the Black Sea",
      "Amazon & Rhine Rivers: Continental discharge volume and European commercial transport"
    ],
    "fileUrl": "slides/Group a3.pptx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Group%20a3.pptx",
    "tags": [
      "geography",
      "rivers",
      "danube",
      "amazon",
      "mississippi",
      "rhine",
      "st lawrence",
      "seminar"
    ],
    "citation": {
      "apa": "Group 3. (2025). Major World River Systems: St. Lawrence to the Rhine. Geography Academic Seminar.",
      "ieee": "Group 3, 'Major World River Systems: St. Lawrence to the Rhine,' Geography Academic Seminar Series, 2025."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Major World River Systems",
        "subtitle": "Geography Seminar • Prepared by Group 3 (Roll No 15–21)",
        "bullets": [
          "Comprehensive survey of key global rivers shaping international commerce and civilizations.",
          "Featured Waterways: St. Lawrence, Mississippi, Danube, Amazon, and Rhine Rivers.",
          "Analysis of drainage basins, economic seaways, and environmental importance."
        ],
        "takeaway": "Rivers are the historical and economic lifelines of human civilizations."
      },
      {
        "slideNumber": 2,
        "title": "The St. Lawrence River & Seaway",
        "subtitle": "North American Great Lakes Gateway (Roll No 19, 15)",
        "bullets": [
          "Massive North American waterway connecting the Great Lakes directly to the Atlantic Ocean.",
          "Forms a vital commercial artery and international border between Canada and the United States.",
          "The St. Lawrence Seaway allows ocean-going freighters to navigate deep into North America's industrial heartland."
        ],
        "takeaway": "Crucial engineering marvel transforming inland lakes into global shipping ports."
      },
      {
        "slideNumber": 3,
        "title": "The Mississippi River",
        "subtitle": "The Spine of North America (Roll No 17)",
        "bullets": [
          "Second-longest river in the United States, spanning approximately 2,340 miles (3,766 km).",
          "Origin: Begins its journey as a modest stream at Lake Itasca in northern Minnesota.",
          "Outlet: Empties into the Gulf of Mexico via an extensive delta south of New Orleans.",
          "Drains all or parts of 32 US states and two Canadian provinces."
        ],
        "takeaway": "The primary agricultural transport corridor for grain and commodities in the USA."
      },
      {
        "slideNumber": 4,
        "title": "The Danube River",
        "subtitle": "Trans-European Artery (Roll No 16, 20)",
        "bullets": [
          "Second-longest river in Europe (after the Volga in Russia), flowing roughly 1,770 miles (2,850 km).",
          "Originates in the Black Forest of Western Germany and flows east through 10 countries.",
          "Passes through iconic European capitals: Vienna, Bratislava, Budapest, and Belgrade.",
          "Empties into the Black Sea via the ecologically rich Danube Delta."
        ],
        "takeaway": "A unifying waterway bridging Central and Southeastern European cultures and trade."
      },
      {
        "slideNumber": 5,
        "title": "The Amazon River",
        "subtitle": "The Giant of South America (Roll No 21)",
        "bullets": [
          "World's second-longest river (approx. 3,980 miles) and by far the largest by discharge volume.",
          "Accounts for approximately one-fifth (20%) of all river water entering the world's oceans.",
          "Flows through the vast Amazon Rainforest basin, supporting unmatched biodiversity.",
          "Discharges immense freshwater plume extending hundreds of miles into the Atlantic Ocean."
        ],
        "takeaway": "The planetary regulator of terrestrial biodiversity and freshwater cycles."
      },
      {
        "slideNumber": 6,
        "title": "The Rhine River",
        "subtitle": "Western Europe's Industrial Lifeline (Roll No 18)",
        "bullets": [
          "One of the most important and densely navigated rivers in European history.",
          "Origin: Begins in the Swiss canton of Graubünden high in the southeastern Swiss Alps.",
          "Flows north through Switzerland, Liechtenstein, Austria, Germany, France, and the Netherlands.",
          "Discharges into the North Sea at Rotterdam—Europe's busiest maritime seaport."
        ],
        "takeaway": "The historical foundation of the European industrial economy and trade."
      }
    ]
  },
  {
    "id": "school-assembly-speech",
    "title": "Public Speaking: School Assembly Host & Presentation Script",
    "category": "Study Notes",
    "type": "PDF",
    "slidesCount": "2 Pages (Teleprompter Ready)",
    "fileSize": "124 KB",
    "academicLevel": "Public Speaking & Assembly",
    "author": "Dhyan Krishna M & Johan",
    "date": "2026",
    "featured": true,
    "summary": "Complete structured assembly hosting script and speech guide. Includes opening wisdom quotes, stage etiquette, transition cues between class speakers, national pledge introduction, and ceremonial remarks.",
    "topicsCovered": [
      "Opening stage hook: 'A wise man speaks because he has something to say...'",
      "Formal protocol: Inviting student leaders for the National Pledge",
      "Smooth transitions and speaker introductions across classes",
      "Speaker encouragement, time management, and closing ceremonial remarks"
    ],
    "fileUrl": "slides/Speech.pdf",
    "previewUrl": "slides/Speech.pdf",
    "tags": [
      "speech",
      "assembly",
      "public speaking",
      "script",
      "school",
      "notes"
    ],
    "citation": {
      "apa": "Krishna, D., & Johan. (2026). School Assembly Host Protocol and Speech Script. Student Leadership Repository.",
      "ieee": "D. Krishna and Johan, 'School Assembly Host Protocol and Speech Script,' Student Leadership Guides, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Part 1: Stage Opening & National Pledge Protocol",
        "subtitle": "Hosts: Dhyan Krishna & Johan",
        "bullets": [
          "Opening Quote (Dhyan): 'A wise man speaks because he has something to say; a fool speaks because he has to say something.'",
          "Host Introduction (Johan): 'I am Dhyan and I am Johan, and we are your hosts for today’s assembly.'",
          "Solemn Protocol (Dhyan): 'I now request Master Megharoopan to lead us in the Pledge to remind us of our dues toward our great nation.'",
          "Transition: 'Thank you Megharoopan. Now we can proceed to the speeches of our classes.'"
        ],
        "takeaway": "Hook the audience within 10 seconds with an inspiring quote and clear voice projection."
      },
      {
        "slideNumber": 2,
        "title": "Part 2: Speaker Transitions, Remarks & Closing Anthem",
        "subtitle": "Class Presentations & Ceremonial Conclusion",
        "bullets": [
          "Class Speaker Introductions: Seamless handoffs ensuring each student speaker feels valued and welcomed.",
          "Teacher & Guest Address: Inviting Aswathy Ma'am for feedback and school leadership for the ceremonial message.",
          "Crowd Management Cues: 'Students are requested to be silent, settle down quickly, and rise for the school anthem.'",
          "Prize Ceremony & Vote of Thanks: Formal recognition of academic and athletic student achievements."
        ],
        "takeaway": "Mastering pacing and stage presence keeps an entire student body engaged and disciplined."
      }
    ]
  },
  {
    "id": "iot-smart-systems",
    "title": "Internet of Things (IoT) & Smart Systems Architecture",
    "category": "Electronics & IoT",
    "type": "PPTX",
    "slidesCount": "38 Slides",
    "fileSize": "1.8 MB",
    "academicLevel": "Undergraduate / Seminar",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": true,
    "summary": "Comprehensive seminar presentation covering IoT 4-layer architecture, edge sensor nodes, communication protocols (MQTT, CoAP, HTTP), and cloud telemetry integration.",
    "topicsCovered": [
      "IoT 4-tier architectural stack: Perception, Network, Middleware, Application",
      "Wireless protocols comparison: Wi-Fi, BLE, Zigbee, LoRaWAN",
      "MQTT Broker-Publisher-Subscriber architecture with QoS levels",
      "Real-world case study: ESP32 remote weather and telemetry node"
    ],
    "fileUrl": "esp32/weather_station.html",
    "previewUrl": "esp32/weather_station.html",
    "tags": [
      "iot",
      "sensors",
      "mqtt",
      "wireless",
      "telemetry",
      "seminar",
      "esp32"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Internet of Things Architecture and Edge Telemetry Systems. Embedded Systems Research.",
      "ieee": "D. Krishna, 'Internet of Things Architecture and Edge Telemetry Systems,' Embedded IoT Research, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "IoT 4-Layer Architectural Model",
        "subtitle": "Foundations of Connected Systems",
        "bullets": [
          "Perception Layer: Physical transducers, sensors (DHT11/BME280), and actuators.",
          "Network Layer: Wireless gateways, Wi-Fi 802.11 b/g/n, Cellular NB-IoT, and LoRaWAN long-range links.",
          "Middleware Layer: Message brokers (MQTT Mosquitto), Firebase RTDB, and data parsing pipelines.",
          "Application Layer: Responsive web dashboards, analytics charts, and mobile control interfaces."
        ],
        "takeaway": "Clean separation of layers ensures high scalability from 1 node to 100,000 nodes."
      },
      {
        "slideNumber": 2,
        "title": "MQTT Protocol Architecture & QoS Levels",
        "subtitle": "Lightweight Publish/Subscribe Paradigm",
        "bullets": [
          "Extremely compact 2-byte header optimized for battery-powered, bandwidth-constrained microcontrollers.",
          "Broker decouples publishers (sensors) from subscribers (web dashboards).",
          "QoS 0 (At most once), QoS 1 (At least once), QoS 2 (Exactly once guaranteed delivery).",
          "Live telemetry demonstration running on the ESP32 Lab subpage."
        ],
        "takeaway": "MQTT is the industry standard protocol for scalable industrial and smart-home telemetry."
      }
    ]
  },
  {
    "id": "esp32-freertos",
    "title": "ESP32 Dual-Core Architecture & FreeRTOS Concurrency",
    "category": "Electronics & IoT",
    "type": "PPTX",
    "slidesCount": "42 Slides",
    "fileSize": "2.4 MB",
    "academicLevel": "Undergraduate / Lab Study",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": true,
    "summary": "Deep dive into the Xtensa LX6 dual-core processor, FreeRTOS task scheduling, queues, semaphores, hardware timers, and low-power sleep modes.",
    "topicsCovered": [
      "Xtensa LX6 architecture, memory mapping, SRAM & Flash cache",
      "FreeRTOS preemptive multitasking and core pin affinity",
      "Inter-Task Communication via Queues & Mutexes",
      "Deep sleep current optimization and ULP co-processor"
    ],
    "fileUrl": "esp32/led_control.html",
    "previewUrl": "esp32/led_control.html",
    "tags": [
      "esp32",
      "freertos",
      "microcontroller",
      "embedded c",
      "concurrency",
      "rtos"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Real-Time Multitasking with FreeRTOS on ESP32 Dual-Core Processors. Embedded Computing Review.",
      "ieee": "D. Krishna, 'Real-Time Multitasking with FreeRTOS on ESP32 Dual-Core Processors,' Embedded Computing Review, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Xtensa LX6 Dual-Core Architecture",
        "subtitle": "PRO CPU (Core 0) & APP CPU (Core 1)",
        "bullets": [
          "Dual Xtensa 32-bit LX6 microprocessors running up to 240 MHz (up to 600 MIPS).",
          "Core 0 conventionally handles Wi-Fi/Bluetooth stack; Core 1 executes user applications.",
          "520 KB internal SRAM with external SPI flash mapping via MMU cache."
        ],
        "takeaway": "Dual-core processing allows non-blocking network communications alongside time-critical sensor loops."
      },
      {
        "slideNumber": 2,
        "title": "FreeRTOS Task Scheduling & Synchronization",
        "subtitle": "Preemptive Priority Scheduling & Mutex Protection",
        "bullets": [
          "xTaskCreatePinnedToCore() binds time-sensitive tasks to specific cores.",
          "Thread-safe inter-task communication via FreeRTOS Queues.",
          "Mutexes and binary semaphores prevent race conditions on shared I2C and SPI buses.",
          "Deep sleep consumes merely ~10 µA, waking via RTC timer or capacitive touch pads."
        ],
        "takeaway": "Mastering RTOS primitives is essential for robust commercial embedded firmware."
      }
    ]
  },
  {
    "id": "dsa-optimization",
    "title": "Data Structures & Algorithmic Complexity Cheat Sheet",
    "category": "Computer Science",
    "type": "PDF",
    "slidesCount": "16 Pages",
    "fileSize": "450 KB",
    "academicLevel": "All College Levels",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": false,
    "summary": "Concise revision notes and visual cheat sheets on Big-O time/space complexities, tree traversals, dynamic programming paradigms, and graph algorithms.",
    "topicsCovered": [
      "Master Theorem & Recurrence relation solving",
      "Array, Linked List, Heap & Balanced BST complexities",
      "Graph traversal: BFS, DFS, Dijkstra, Prim & Kruskal",
      "Dynamic Programming patterns: 0/1 Knapsack, LCS, LIS"
    ],
    "fileUrl": "#",
    "previewUrl": "",
    "tags": [
      "dsa",
      "algorithms",
      "cheat sheet",
      "computer science",
      "notes",
      "big o"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Algorithmic Complexity and Data Structure Optimization Handbook. Academic Notes.",
      "ieee": "D. Krishna, 'Algorithmic Complexity and Data Structure Optimization Handbook,' Computer Science Guides, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Asymptotic Notation & Big-O Hierarchy",
        "subtitle": "Time & Space Efficiency Benchmarking",
        "bullets": [
          "O(1) Constant < O(log n) Logarithmic < O(n) Linear < O(n log n) Linearithmic < O(n²) Quadratic.",
          "Master Theorem simplifies divide-and-conquer recurrence relations T(n) = aT(n/b) + f(n).",
          "Space-time trade-offs in hash tables vs sorted arrays."
        ],
        "takeaway": "Choosing the optimal data structure reduces runtimes from minutes to milliseconds."
      }
    ]
  },
  {
    "id": "math-calculus-transforms",
    "title": "Engineering Mathematics: Laplace & Fourier Transforms",
    "category": "Mathematics & Science",
    "type": "PDF",
    "slidesCount": "22 Pages",
    "fileSize": "680 KB",
    "academicLevel": "Engineering Semester 2/3",
    "author": "Academic Reference",
    "date": "2026",
    "featured": false,
    "summary": "Essential formula sheet and solved step-by-step seminar examples for Laplace transform properties, inverse transforms, and Fourier series in signal analysis.",
    "topicsCovered": [
      "Laplace transform of standard functions and shifting theorems",
      "Solving ordinary differential equations using Laplace transforms",
      "Fourier Series expansion for periodic and odd/even functions",
      "Applications in electrical RLC circuits and frequency domains"
    ],
    "fileUrl": "#",
    "previewUrl": "",
    "tags": [
      "mathematics",
      "calculus",
      "laplace",
      "fourier",
      "formula sheet",
      "engineering"
    ],
    "citation": {
      "apa": "Department of Mathematics. (2026). Transform Calculus for Electrical & Computer Engineers. University Courseware.",
      "ieee": "Academic Reference, 'Transform Calculus for Electrical & Computer Engineers,' Engineering Mathematics, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Laplace Transform & S-Domain Conversion",
        "subtitle": "Differential Equations to Algebraic Form",
        "bullets": [
          "L{f(t)} = F(s) = ∫[0 to ∞] e^(-st) f(t) dt.",
          "Converts time-domain differential equations into algebraic polynomials in the complex frequency s-domain.",
          "First Shifting Theorem: L{e^(at) f(t)} = F(s - a).",
          "Indispensable tool for analyzing stability in closed-loop feedback systems."
        ],
        "takeaway": "Simplifies differential circuit calculations into standard algebraic solving."
      }
    ]
  },
  {
    "id": "seminar-presentation-mastery",
    "title": "How to Deliver an Outstanding Technical Seminar: Speaker Guide",
    "category": "Study Notes",
    "type": "PPTX",
    "slidesCount": "20 Slides",
    "fileSize": "520 KB",
    "academicLevel": "General Academic",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": true,
    "summary": "Practical guide for students on designing high-impact seminar slides, pacing technical presentations, handling audience Q&A sessions, and avoiding common pitfalls.",
    "topicsCovered": [
      "The 10-20-30 Rule and slide visual hierarchy",
      "How to explain complex equations and architectures clearly",
      "Vocal delivery, eye contact, and stage presence",
      "Anticipating questions and handling uncertain answers gracefully"
    ],
    "fileUrl": "#",
    "previewUrl": "",
    "tags": [
      "seminar",
      "presentation skills",
      "public speaking",
      "slides guide",
      "tips"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Presentation Mastery: Delivering High-Impact Technical Seminars. Academic Communications.",
      "ieee": "D. Krishna, 'Presentation Mastery: Delivering High-Impact Technical Seminars,' Academic Communications Review, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "The Golden Rules of Technical Slide Design",
        "subtitle": "Visual Clarity & Audience Retention",
        "bullets": [
          "Never read your slides verbatim: slides are signposts for the audience, not teleprompters for you.",
          "Maintain high visual contrast: dark text on light backgrounds or crisp teal/white on navy.",
          "Limit each slide to one core engineering concept with bold architecture diagrams."
        ],
        "takeaway": "Your voice delivers the story; your slides provide the evidence."
      }
    ]
  },
  {
    "id": "quantum-computing-algorithms",
    "title": "Introduction to Quantum Computing Algorithms & Qubit Mechanics",
    "category": "Computer Science",
    "type": "PPTX",
    "slidesCount": "14 Slides",
    "fileSize": "Cloud Shared",
    "academicLevel": "Senior Secondary / Undergraduate",
    "author": "Arjun Menon (Grade 12)",
    "date": "2026",
    "featured": true,
    "isCommunity": true,
    "summary": "A student-authored seminar deck introducing qubits, superposition, Bloch sphere states, Hadamard and CNOT quantum gates, and Shor's factoring polynomial speedup.",
    "topicsCovered": [
      "Qubits, Dirac ket notation, and Bloch Sphere coordinates",
      "Quantum logic gates: Hadamard, Pauli-X, and CNOT entanglement",
      "Shor's and Grover's algorithms: Complexity advantages vs classical computing"
    ],
    "fileUrl": "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view?usp=sharing",
    "previewUrl": "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/preview",
    "embedUrl": "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/preview",
    "tags": [
      "quantum",
      "algorithms",
      "qubits",
      "computer science",
      "physics",
      "StudentDeck"
    ],
    "citation": {
      "apa": "Menon, A. (2026). Introduction to Quantum Computing Algorithms & Qubit Mechanics. EduSphere Academic Hub.",
      "ieee": "A. Menon, 'Introduction to Quantum Computing Algorithms & Qubit Mechanics,' EduSphere Academic Hub, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Introduction to Quantum Computing",
        "subtitle": "Presented by Arjun Menon (Grade 12)",
        "bullets": [
          "Classical bits exist strictly as 0 or 1, whereas quantum bits (qubits) exploit quantum superposition.",
          "State space expands exponentially: N entangled qubits can simultaneously represent 2^N complex amplitudes.",
          "Core objective: Harness constructive interference to amplify correct computational solutions."
        ],
        "takeaway": "Quantum computing is fundamentally probabilistic and non-deterministic prior to quantum measurement."
      },
      {
        "slideNumber": 2,
        "title": "The Qubit & Bloch Sphere",
        "subtitle": "Mathematical Representation of State Vectors",
        "bullets": [
          "State vector |ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1.",
          "Bloch sphere maps complex probability amplitudes onto a 3D unit sphere surface.",
          "Reversible transformations correspond to unitary rotations around axes on the sphere."
        ],
        "takeaway": "Measurement irreversibly collapses the superposition state vector into an orthonormal eigenstate."
      },
      {
        "slideNumber": 3,
        "title": "Quantum Gates & Circuits",
        "subtitle": "Unitary Matrix Operations",
        "bullets": [
          "Single-qubit gates: Hadamard (H) creates balanced superposition from pure basis states.",
          "Two-qubit gates: Controlled-NOT (CNOT) enables quantum entanglement between pairs of qubits.",
          "Universal quantum circuit sets can simulate any quantum mechanical physical system."
        ],
        "takeaway": "Entangled qubit states cannot be factored into tensor products of individual subsystem states."
      },
      {
        "slideNumber": 4,
        "title": "Shor's Algorithm & Cryptography Impact",
        "subtitle": "Polynomial Time Prime Factorization",
        "bullets": [
          "Classical RSA relies on the computational hardness of factoring large composite semi-primes.",
          "Shor's algorithm transforms factoring into a period-finding problem via the Quantum Fourier Transform (QFT).",
          "Executes in O((log N)³) polynomial time compared to classical sub-exponential general number field sieve."
        ],
        "takeaway": "Accelerates modern research into NIST post-quantum cryptographic primitives (lattices, isogenies)."
      }
    ]
  },
  {
    "id": "delhi-sultanate-expansion-worksheet",
    "title": "Class 7 History: Expansion of the Delhi Sultanate (Khilji & Tughlaq Dynasties)",
    "category": "History & Civics",
    "type": "DOCX",
    "slidesCount": "100 Questions",
    "fileSize": "63 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": true,
    "summary": "Comprehensive 100-mark assessment worksheet covering the Mamluk decline, Jalaluddin & Alauddin Khilji's conquests, market regulations, Ghiyasuddin, Muhammad bin Tughlaq's 5 ambitious projects, and Firoz Shah Tughlaq's welfare reforms.",
    "topicsCovered": [
      "Section A: 25 Fill in the Blanks on Khilji and Tughlaq rulers and chronology",
      "Section B: 25 Multiple Choice Questions on military campaigns, administration, and taxation",
      "Section C: 25 Match the Following historical terms (Diwan-i-Riyasat, Dag, Chehra, Token Currency)",
      "Section D: 25 Short & Structured Answer Questions with historical source analysis"
    ],
    "fileUrl": "slides/Class 7 History - Chapter 5 Delhi Sultanate Expansion Worksheet.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20History%20-%20Chapter%205%20Delhi%20Sultanate%20Expansion%20Worksheet.docx",
    "tags": [
      "history",
      "delhi sultanate",
      "alauddin khilji",
      "muhammad bin tughlaq",
      "icse",
      "class 7",
      "worksheet"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Expansion of the Delhi Sultanate: The Khilji and Tughlaq Dynasties Worksheet. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'Expansion of the Delhi Sultanate: The Khilji and Tughlaq Dynasties Worksheet,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Expansion of the Delhi Sultanate",
        "subtitle": "Transition to Imperial Rule (1290–1414 CE)",
        "bullets": [
          "Transition from the defensive Mamluk (Slave) Dynasty to aggressive pan-Indian imperial expansion.",
          "Alauddin Khilji becomes the first Delhi Sultan to cross the Vindhya mountains into South India.",
          "Integration of regional kingdoms (Gujarat, Malwa, Devagiri, Warangal, Dwarasamudra, Madurai) into the imperial tribute network."
        ],
        "takeaway": "The Sultanate expanded from a North Indian fortress-state into a centralized subcontinent-spanning empire."
      },
      {
        "slideNumber": 2,
        "title": "Alauddin Khilji's Military & Economic Reforms",
        "subtitle": "Total Administrative Discipline",
        "bullets": [
          "Military Innovation: Strict branding of cavalry horses (Dagh) and descriptive soldier rolls (Chehra) to eliminate phantom payrolls.",
          "Market Control: Fixed maximum retail prices for grains, textiles, horses, and daily provisions supervised by Shahna-i-Mandi.",
          "Agricultural Revenue: Fixed state land tax (Kharaj) at 50% of gross produce based on direct land measurement (Zabita)."
        ],
        "takeaway": "Strict economic market regulation allowed Alauddin to maintain a vast standing army at low state expense to repel Mongol invasions."
      },
      {
        "slideNumber": 3,
        "title": "Muhammad bin Tughlaq's Five Ambitious Experiments",
        "subtitle": "Visionary Ideas with Administrative Flaws",
        "bullets": [
          "Taxation in the Doab: Imposed enhanced taxation during severe drought, triggering rural rebellion.",
          "Capital Relocation: Shifted capital from Delhi to Daulatabad (Devagiri) to govern the Deccan, resulting in massive logistical hardship.",
          "Token Currency: Introduced bronze and brass tokens on par with silver tankas without state minting monopolies, causing widespread counterfeiting.",
          "Khurasan & Qarachil Expeditions: Massive military mobilization that depleted the royal treasury without territorial gains."
        ],
        "takeaway": "Tughlaq was brilliant and intellectually ahead of his era, but lacked practical execution safeguards."
      }
    ]
  },
  {
    "id": "delhi-sultanate-lecture-notes",
    "title": "Class 7 History: The Khilji & Tughlaq Dynasties Revision Notes",
    "category": "History & Civics",
    "type": "DOCX",
    "slidesCount": "4 Revision Modules",
    "fileSize": "13 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": false,
    "summary": "Concise, structured revision notes outlining chronology, military conquests, administrative reforms, and causes of decline of the Delhi Sultanate under the Khiljis and Tughlaqs.",
    "topicsCovered": [
      "Chronology: Jalaluddin Khilji (1290–1296) to Firoz Shah Tughlaq (1351–1388)",
      "Military campaigns: Gujarat, Ranthambore, Chittor, Malwa, and Malik Kafur's southern campaign",
      "Revenue reforms: Direct land measurement (Zabita), 50% Kharaj tax, spy network (Munhiyans)",
      "Timur's 1398 invasion of Delhi and collapse of the Tughlaq imperial authority"
    ],
    "fileUrl": "slides/Class 7 History - Chapter 5 Delhi Sultanate Lecture Notes.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20History%20-%20Chapter%205%20Delhi%20Sultanate%20Lecture%20Notes.docx",
    "tags": [
      "history",
      "delhi sultanate",
      "lecture notes",
      "alauddin khilji",
      "tughlaq",
      "icse",
      "class 7"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). The Khilji and Tughlaq Dynasties Lecture Notes. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'The Khilji and Tughlaq Dynasties Lecture Notes,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "The Khilji Dynasty (1290–1320 CE)",
        "subtitle": "Jalaluddin & Alauddin Khilji",
        "bullets": [
          "Jalaluddin Khilji founded the dynasty in 1290 CE after overthrowing the weak Mamluk ruler Kaiqubad.",
          "Alauddin Khilji ascended the throne in 1296 CE, initiating rapid conquests in Northern and Southern India.",
          "Constructed the famous Alai Darwaza, the Siri Fort, and the Hauz Khas reservoir in Delhi."
        ],
        "takeaway": "The Khilji era established Delhi as an impregnable military and administrative capital."
      },
      {
        "slideNumber": 2,
        "title": "The Tughlaq Dynasty & Firoz Shah's Reforms",
        "subtitle": "Public Works & Bureaucratic Decentralization",
        "bullets": [
          "Ghiyasuddin Tughlaq founded the dynasty in 1320 CE and constructed the fortress city of Tughlaqabad.",
          "Firoz Shah Tughlaq (1351–1388 CE) adopted conciliation: constructed canals, founded cities (Firozabad, Hissar, Jaunpur), and built charitable hospitals (Dar-ul-Shifa).",
          "Inheritable Iqta lands and hereditary army positions weakened central military efficiency over time."
        ],
        "takeaway": "Firoz Shah's welfare works improved public infrastructure but diluted military preparedness."
      }
    ]
  },
  {
    "id": "ethics-safety-measures-notes",
    "title": "Class 7 Computer Science: Ethics & Safety Measures in Computing",
    "category": "Computer Science",
    "type": "DOCX",
    "slidesCount": "5 Core Units",
    "fileSize": "12 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": true,
    "summary": "Complete textbook study notes covering computer ethics, intellectual property rights, software piracy, digital footprints, cyberbullying, phishing, and defensive cyber hygiene.",
    "topicsCovered": [
      "Internet architecture, advantages in distance learning, e-commerce, and communication",
      "Cyber security threats: Computer viruses, worms, trojans, ransomware, and spyware",
      "Cyber ethics & intellectual property: Copyright infringement, software licensing, and plagiarism",
      "Defensive hygiene: Strong authentication, biometric safeguards, firewalls, and data backups"
    ],
    "fileUrl": "slides/Class 7 Computer Science - Chapter 4 Ethics and Safety Measures Notes.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20Computer%20Science%20-%20Chapter%204%20Ethics%20and%20Safety%20Measures%20Notes.docx",
    "tags": [
      "computer science",
      "cyber ethics",
      "internet safety",
      "intellectual property",
      "malware",
      "icse",
      "class 7"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Ethics and Safety Measures in Computing Class Notes. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'Ethics and Safety Measures in Computing Class Notes,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Internet & Digital Society",
        "subtitle": "Global Connectivity & Ethical Responsibility",
        "bullets": [
          "Internet: A global network of interconnected computers communicating via standardized protocols (TCP/IP).",
          "Major Benefits: Instant communication, global knowledge repositories, collaborative research, and e-governance.",
          "Digital Footprint: Every interaction, search, post, and click leaves a traceable, permanent electronic record."
        ],
        "takeaway": "Digital citizenship requires ethical responsibility, respect for privacy, and adherence to legal norms."
      },
      {
        "slideNumber": 2,
        "title": "Intellectual Property & Plagiarism",
        "subtitle": "Protecting Creative & Technical Authorship",
        "bullets": [
          "Intellectual Property Rights (IPR): Legal protections granted to creators for literary, artistic, and software creations.",
          "Plagiarism: Copying someone else's work, code, or ideas without explicit attribution or citation.",
          "Software Piracy: Unauthorized copying, distribution, or cracking of copyrighted commercial software."
        ],
        "takeaway": "Always respect licensing models (Open Source, Creative Commons, Proprietary) and cite original sources."
      },
      {
        "slideNumber": 3,
        "title": "Cyber Hygiene & Defense Protocols",
        "subtitle": "Shielding Systems against Cyber Threats",
        "bullets": [
          "Malware Types: Viruses (host infectors), Worms (network propagators), Trojans (deceptive backdoors), Ransomware (data lockers).",
          "Phishing & Social Engineering: Deceptive emails and counterfeit portals designed to harvest credentials and OTPs.",
          "Defense Protocol: Employ multi-factor authentication (MFA), active firewall scanning, regular patched backups, and encryption."
        ],
        "takeaway": "Vigilance and proactive defense are the strongest safeguards against cyber exploits."
      }
    ]
  },
  {
    "id": "animal-classification-questions",
    "title": "Class 7 Biology: Classification of Animals — One-Mark Question Bank",
    "category": "Biology & Health",
    "type": "DOCX",
    "slidesCount": "66 Questions",
    "fileSize": "323 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": false,
    "summary": "High-yield one-mark question repository with complete scientific terminology across non-chordates (Porifera to Echinodermata) and chordates (Pisces, Amphibia, Reptilia, Aves, Mammalia).",
    "topicsCovered": [
      "Non-Chordates: Invertebrate phyla characteristics, body symmetry, and coelom",
      "Cnidarians & Porifera: Sponges, nematocysts, ostia, osculum, and water canal systems",
      "Platyhelminthes & Nematoda: Flatworms vs. roundworms, parasitic adaptations",
      "Vertebrate classes: Cold-blooded (poikilothermic) vs. warm-blooded (homeothermic) organisms"
    ],
    "fileUrl": "slides/Class 7 Biology - Classification of Animals One Mark Questions.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20Biology%20-%20Classification%20of%20Animals%20One%20Mark%20Questions.docx",
    "tags": [
      "biology",
      "classification of animals",
      "vertebrates",
      "invertebrates",
      "icse",
      "class 7",
      "taxonomy"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Classification of Animals: One-Mark Question Bank. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'Classification of Animals: One-Mark Question Bank,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Principles of Animal Taxonomy",
        "subtitle": "Basis of Animal Kingdom Classification",
        "bullets": [
          "Heterotrophic nutrition: Animals depend on plants or other organisms for organic food.",
          "Cellular to Organ-System organization: Progresses from cellular grade (Porifera) to organ-system grade (Chordata).",
          "Bilateral vs. Radial symmetry: Animals with distinct left and right mirror halves vs. radial circular axes."
        ],
        "takeaway": "Taxonomy arranges diverse organisms into logical hierarchies based on evolutionary relationships."
      },
      {
        "slideNumber": 2,
        "title": "Invertebrates vs. Vertebrates",
        "subtitle": "Major Morphological Benchmarks",
        "bullets": [
          "Invertebrates (Non-Chordata): Lack a dorsal vertebral column or notochord; ventral nerve cord; no internal bone skeleton.",
          "Vertebrates (Chordata): Possess a segmented spinal column, cranium protecting the brain, and closed circulatory system.",
          "Thermoregulation: Poikilotherms (fishes, amphibians, reptiles) adjust body temperature with environment; Homeotherms (birds, mammals) maintain constant internal temperature."
        ],
        "takeaway": "The development of a protected internal spinal column represents an evolutionary milestone in locomotion and brain function."
      }
    ]
  },
  {
    "id": "articles-practice-worksheet",
    "title": "Class 7 English Grammar: Definite & Indefinite Articles Practice Worksheet",
    "category": "English & Grammar",
    "type": "DOCX",
    "slidesCount": "52 Exercises",
    "fileSize": "10 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": false,
    "summary": "Interactive practice exercises testing identification and correct placement of indefinite articles ('a', 'an'), the definite article ('the'), and zero-article omission rules.",
    "topicsCovered": [
      "Phonetic vowel sounds vs. consonant letters ('an honest man', 'a European country', 'a university')",
      "Definite article ('the') with unique celestial objects, mountain ranges, rivers, holy books, and superlatives",
      "Zero Article: Omission before abstract qualities, sports, meals, materials, and proper names"
    ],
    "fileUrl": "slides/Class 7 English Grammar - Articles Practice Worksheet.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20English%20Grammar%20-%20Articles%20Practice%20Worksheet.docx",
    "tags": [
      "english",
      "grammar",
      "articles",
      "definite article",
      "indefinite article",
      "icse",
      "class 7"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Definite and Indefinite Articles Practice Worksheet. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'Definite and Indefinite Articles Practice Worksheet,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Articles in English Grammar",
        "subtitle": "Indefinite ('A' / 'An') vs. Definite ('The')",
        "bullets": [
          "Indefinite Articles ('A' / 'An'): Used before singular countable nouns spoken of for the first time or non-specifically.",
          "Phonetic Criterion: Choice of 'A' vs. 'An' is determined entirely by initial spoken sound, not alphabet letter.",
          "Definite Article ('The'): Refers to a particular, specific person, item, or previously mentioned entity."
        ],
        "takeaway": "Listen to the opening sound: vowel sounds (a, e, i, o, u) take 'an', consonant sounds take 'a'."
      },
      {
        "slideNumber": 2,
        "title": "Key Rules for Article Omission",
        "subtitle": "When Not to Use 'A', 'An', or 'The'",
        "bullets": [
          "Omit before names of countries, cities, individual peaks (Mount Everest), or continents.",
          "Omit before abstract nouns used in a general sense (e.g., 'Wisdom is the gift of heaven').",
          "Omit before meals ('Dinner is ready'), sports ('He plays cricket'), and academic subjects ('Mathematics')."
        ],
        "takeaway": "General concepts and proper names typically take zero article unless qualified by a defining clause."
      }
    ]
  },
  {
    "id": "nouns-grammar-worksheet",
    "title": "Class 7 English Grammar: Nouns Classification & Usage Worksheet",
    "category": "English & Grammar",
    "type": "DOCX",
    "slidesCount": "74 Exercises",
    "fileSize": "11 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": false,
    "summary": "Grammar worksheet focusing on the 5 kinds of nouns (Proper, Common, Collective, Abstract, Material), countability rules, irregular plural formation, and gender forms.",
    "topicsCovered": [
      "Identification of proper, common, abstract, collective, and material nouns",
      "Abstract noun derivation from adjectives, verbs, and base common nouns",
      "Countable vs. uncountable nouns with quantifiers ('fewer' vs. 'less', 'many' vs. 'much')"
    ],
    "fileUrl": "slides/Class 7 English Grammar - Nouns Worksheet.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20English%20Grammar%20-%20Nouns%20Worksheet.docx",
    "tags": [
      "english",
      "grammar",
      "nouns",
      "abstract nouns",
      "collective nouns",
      "icse",
      "class 7"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Nouns Classification and Usage Worksheet. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'Nouns Classification and Usage Worksheet,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Classification of Nouns",
        "subtitle": "Proper, Common, Collective, Abstract & Material",
        "bullets": [
          "Proper Noun: Specific name of an individual person, place, or entity (capitalized).",
          "Common Noun: General name shared by all members of a class or category.",
          "Collective Noun: Name of a group of persons or things taken as a single unit (herd, fleet, pride).",
          "Abstract Noun: Quality, action, state, or idea that cannot be physically touched (courage, truth, infancy)."
        ],
        "takeaway": "Nouns provide the fundamental grammatical subjects and objects of language syntax."
      }
    ]
  },
  {
    "id": "adjectives-grammar-worksheet",
    "title": "Class 7 English Grammar: Adjectives Classification, Formation & Degrees",
    "category": "English & Grammar",
    "type": "DOCX",
    "slidesCount": "213 Exercises",
    "fileSize": "19 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": false,
    "summary": "Extensive 200+ question worksheet covering adjective classification (Quality, Quantity, Number, Demonstrative, Interrogative, Possessive), degrees of comparison, and syntax order.",
    "topicsCovered": [
      "Identification of adjectives and distinguishing possessive adjectives from possessive pronouns",
      "Positive, Comparative, and Superlative degrees with regular and irregular forms",
      "Order of adjectives in descriptive writing (Opinion, Size, Age, Shape, Color, Origin, Material)"
    ],
    "fileUrl": "slides/Class 7 English Grammar - Adjectives Worksheet.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20English%20Grammar%20-%20Adjectives%20Worksheet.docx",
    "tags": [
      "english",
      "grammar",
      "adjectives",
      "degrees of comparison",
      "icse",
      "class 7"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Adjectives Classification and Degrees of Comparison. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'Adjectives Classification and Degrees of Comparison,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Adjectives & Descriptive Syntax",
        "subtitle": "Kinds of Adjectives & Functional Modifiers",
        "bullets": [
          "Adjective of Quality: Describes shape, character, condition, or nature of a noun (brave soldier, ancient ruins).",
          "Adjective of Quantity: Answers 'How much?' for uncountable nouns (some water, little hope, much patience).",
          "Adjective of Number: Answers 'How many?' for countable items (cardinal: one, two; ordinal: first, second).",
          "Demonstrative & Possessive: Pointing out (this, that, these, those) and ownership (my, your, his, her, their)."
        ],
        "takeaway": "Adjectives add precision, color, and qualification to nouns and pronouns."
      },
      {
        "slideNumber": 2,
        "title": "Degrees of Comparison",
        "subtitle": "Positive, Comparative & Superlative",
        "bullets": [
          "Positive Degree: Denotes the simple quality of a noun without comparison (e.g. 'He is tall').",
          "Comparative Degree: Compares two individuals or groups (e.g. 'He is taller than his brother').",
          "Superlative Degree: Compares more than two entities, taking 'the' (e.g. 'He is the tallest in the class').",
          "Irregular Forms: good/better/best, bad/worse/worst, little/less/least, far/further/furthest."
        ],
        "takeaway": "Never use double comparatives or superlatives ('more taller' is grammatically invalid)."
      }
    ]
  },
  {
    "id": "sentence-grammar-worksheet",
    "title": "Class 7 English Grammar: The Sentence — Structure & Kinds Worksheet",
    "category": "English & Grammar",
    "type": "DOCX",
    "slidesCount": "150 Questions",
    "fileSize": "14 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": false,
    "summary": "Comprehensive 50-mark grammar worksheet covering sentence classification (Declarative, Interrogative, Imperative, Exclamatory), subject & predicate bifurcation, and phrase vs. clause.",
    "topicsCovered": [
      "Subject and predicate identification in inverted and imperative sentences",
      "Transformation between affirmative, negative, interrogative, and exclamatory forms",
      "Punctuation conventions, question tags, and clause boundary rules"
    ],
    "fileUrl": "slides/Class 7 English Grammar - The Sentence Practice Worksheet.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20English%20Grammar%20-%20The%20Sentence%20Practice%20Worksheet.docx",
    "tags": [
      "english",
      "grammar",
      "the sentence",
      "subject and predicate",
      "icse",
      "class 7"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). The Sentence: Structure and Kinds Worksheet. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'The Sentence: Structure and Kinds Worksheet,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Anatomy of a Complete Sentence",
        "subtitle": "Subject & Predicate Framework",
        "bullets": [
          "A sentence is a grammatically complete group of words expressing a complete thought.",
          "Subject: The person, item, or concept performing the action or spoken of.",
          "Predicate: The part of the sentence containing the verb and stating something about the subject.",
          "Imperative Inversion: In commands ('Close the window'), the subject 'You' is grammatically understood/omitted."
        ],
        "takeaway": "Every valid sentence requires at least one finite verb and a distinct subject."
      }
    ]
  },
  {
    "id": "pronouns-grammar-worksheet",
    "title": "Class 7 English Grammar: Pronouns Classification & Practice Worksheet",
    "category": "English & Grammar",
    "type": "DOCX",
    "slidesCount": "85 Exercises",
    "fileSize": "12 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": false,
    "summary": "Practice worksheet classifying Personal, Demonstrative, Relative, Interrogative, Reflexive, Emphatic, and Indefinite pronouns with antecedent agreement exercises.",
    "topicsCovered": [
      "Differentiating Reflexive vs. Emphatic pronouns ('He hurt himself' vs. 'He himself said so')",
      "Relative pronouns ('who', 'whom', 'whose', 'which', 'that') in complex sentences",
      "Subjective vs. objective case pronouns in compound subjects and comparisons"
    ],
    "fileUrl": "slides/Class 7 English Grammar - Pronouns Practice Worksheet.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20English%20Grammar%20-%20Pronouns%20Practice%20Worksheet.docx",
    "tags": [
      "english",
      "grammar",
      "pronouns",
      "relative pronouns",
      "reflexive pronouns",
      "icse",
      "class 7"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Pronouns Classification and Practice Worksheet. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'Pronouns Classification and Practice Worksheet,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Pronouns & Antecedent Agreement",
        "subtitle": "Replacing Repetitive Nouns",
        "bullets": [
          "Personal Pronouns: 1st person (I, we), 2nd person (you), 3rd person (he, she, it, they).",
          "Reflexive Pronoun: The action of the subject reflects back upon the subject itself (e.g. 'She blamed herself').",
          "Emphatic Pronoun: Used alongside a noun or pronoun merely for rhetorical emphasis (e.g. 'The queen herself welcomed them').",
          "Relative Pronoun: Connects dependent clauses, referring back to an antecedent noun (e.g. 'The student who worked hard')."
        ],
        "takeaway": "Pronouns must agree in gender, number, and person with their antecedent noun."
      }
    ]
  },
  {
    "id": "sri-krishna-eating-house-study-notes",
    "title": "Class 7 English Literature: Sri Krishna Eating House (Anita Desai) Notes",
    "category": "English & Literature",
    "type": "DOCX",
    "slidesCount": "46 Detailed Answers",
    "fileSize": "12 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": false,
    "summary": "Textual question-and-answer study guide for Chapter 6 of 'The Village by the Sea' by Anita Desai, examining rural-to-urban migration, poverty, resilience, and character development.",
    "topicsCovered": [
      "Contrast between peaceful coastal Thul and chaotic, noisy industrial Bombay",
      "Conditions inside the Sri Krishna Eating House: dilapidation, heat, grime, and meager meals",
      "Hari's relationship with Jagu and the silent, overworked kitchen boys",
      "Themes of child labor, survival, human kindness, and hope in adversity"
    ],
    "fileUrl": "slides/Class 7 English Literature - Sri Krishna Eating House Study Notes.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20English%20Literature%20-%20Sri%20Krishna%20Eating%20House%20Study%20Notes.docx",
    "tags": [
      "english literature",
      "anita desai",
      "village by the sea",
      "sri krishna eating house",
      "icse",
      "class 7"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Sri Krishna Eating House Literary Analysis & Q&A. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'Sri Krishna Eating House Literary Analysis & Q&A,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Sri Krishna Eating House: Literary Overview",
        "subtitle": "'The Village by the Sea' by Anita Desai",
        "bullets": [
          "Setting: A cheap, gritty eating stall near the Bombay docks, starkly contrasted against rural fishing village Thul.",
          "Hari's Arrival: Driven to the city by crushing family debt, illness, and economic distress in his coastal village.",
          "Atmosphere: Thick smoke, blackened utensils, unremitting heat, and deafening street noise."
        ],
        "takeaway": "Desai paints an authentic, unsentimental portrait of migrant resilience amidst severe urban poverty."
      },
      {
        "slideNumber": 2,
        "title": "Key Themes & Character Dynamics",
        "subtitle": "Human Dignity in Gritty Realities",
        "bullets": [
          "Jagu's Gruff Compassion: Despite poverty and a harsh temper, Jagu feeds Hari and offers him work and shelter.",
          "The Silent Kitchen Boys: Mute testament to childhood lost to economic exploitation and physical exhaustion.",
          "Survival Instinct: Hari's willingness to scrub blackened pots reveals his determination to save his sisters in Thul."
        ],
        "takeaway": "Even in squalid environments, unexpected empathy provides a lifeline toward redemption."
      }
    ]
  },
  {
    "id": "loyola-class-vii-english-lit-paper",
    "title": "Loyola School Thiruvananthapuram: Class VII ICSE English Literature Paper",
    "category": "English & Literature",
    "type": "Interactive HTML",
    "slidesCount": "Interactive Examination Paper",
    "fileSize": "24 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Loyola School / Dhyan Krishna M",
    "date": "2026",
    "featured": true,
    "summary": "Interactive digital examination paper and revision guide styled for Loyola School Class VII English Literature, complete with Reference to Context (RTC) extracts and analytical questions.",
    "topicsCovered": [
      "Poetry comprehension: Theme, rhyme scheme, figures of speech, and imagery",
      "Prose section: Character motives, dramatic conflict, and narrative turning points",
      "Structured Reference to Context (RTC) practice with marking schemes"
    ],
    "fileUrl": "slides/Loyola School Class VII English Literature Question Paper.html",
    "previewUrl": "slides/Loyola School Class VII English Literature Question Paper.html",
    "tags": [
      "english literature",
      "loyola school",
      "question paper",
      "icse",
      "class 7",
      "interactive exam"
    ],
    "citation": {
      "apa": "Loyola School. (2026). Class VII ICSE English Literature Term Examination Paper. Thiruvananthapuram.",
      "ieee": "Loyola School, 'Class VII ICSE English Literature Term Examination Paper,' Thiruvananthapuram, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Examination Framework",
        "subtitle": "Loyola School Class VII ICSE English Literature",
        "bullets": [
          "Section A (Prose): Textual analysis, character intent, and vocabulary in narrative context.",
          "Section B (Poetry): Stanza interpretation, poetic devices (metaphor, alliteration, personification), and underlying themes.",
          "Section C (Long Form Analytical): Detailed thematic essays requiring textual references."
        ],
        "takeaway": "Effective literature examination preparation balances factual recall with nuanced literary appreciation."
      }
    ]
  },
  {
    "id": "geography-weather-climate-assessment",
    "title": "Class 7 Geography: Weather, Climate & Meteorology Chapter Solutions",
    "category": "Geography & Social Studies",
    "type": "DOCX",
    "slidesCount": "46 Solutions",
    "fileSize": "10 KB",
    "academicLevel": "Class 7 ICSE",
    "author": "Dhyan Krishna M",
    "date": "2026",
    "featured": false,
    "summary": "Chapter assessment solutions covering weather vs. climate distinctions, atmospheric instruments (barometer, anemometer, wind vane, rain gauge), insolation, and isotherms.",
    "topicsCovered": [
      "Multiple Choice & Objective questions on atmospheric science and meteorology",
      "Factors affecting temperature: Latitude, altitude, distance from sea, and ocean currents",
      "Atmospheric pressure belts, barometer readings, and wind direction analysis"
    ],
    "fileUrl": "slides/Class 7 Geography - Weather Climate and Atmosphere Solutions.docx",
    "previewUrl": "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/Class%207%20Geography%20-%20Weather%20Climate%20and%20Atmosphere%20Solutions.docx",
    "tags": [
      "geography",
      "meteorology",
      "weather and climate",
      "atmosphere",
      "barometer",
      "icse",
      "class 7"
    ],
    "citation": {
      "apa": "Krishna, D. (2026). Weather, Climate & Meteorology Assessment Solutions. EduSphere Academic Series.",
      "ieee": "D. Krishna, 'Weather, Climate & Meteorology Assessment Solutions,' EduSphere Academic Series, 2026."
    },
    "slidesDeck": [
      {
        "slideNumber": 1,
        "title": "Atmospheric Science & Instruments",
        "subtitle": "Measuring Weather Elements",
        "bullets": [
          "Meteorology: The scientific study of atmospheric conditions, weather forecasting, and climate systems.",
          "Atmospheric Pressure: Measured with a Mercury or Aneroid Barometer in millibars (mb) or hectopascals (hPa).",
          "Wind Direction & Speed: Wind Vane determines source direction; Anemometer measures velocity in km/h or knots."
        ],
        "takeaway": "Weather is the day-to-day state of the atmosphere, whereas climate is the 30-year average pattern."
      },
      {
        "slideNumber": 2,
        "title": "Insolation & Temperature Controls",
        "subtitle": "Solar Energy Distribution across Earth",
        "bullets": [
          "Insolation (Incoming Solar Radiation): Solar energy received by the Earth's surface.",
          "Angle of Sun's Rays: Vertical rays at the Equator concentrate heat over smaller surface areas; oblique polar rays spread heat thinly.",
          "Altitude Factor: Temperature decreases by ~6.5°C per 1,000 meters of elevation (Normal Lapse Rate)."
        ],
        "takeaway": "Latitude and altitude are the two primary geographic drivers of regional climate zones."
      }
    ]
  }
];

// Quick formula cards for the academic toolkit
const academicFormulas = [
  {
    "subject": "Electronics & IoT",
    "title": "Ohm's Law & Power Dissipation",
    "formula": "V = I · R  |  P = V · I = I²R = V² / R",
    "description": "Fundamental relationship between voltage (V), current (I), resistance (R), and dissipated electrical power (P)."
  },
  {
    "subject": "Electronics & IoT",
    "title": "Capacitor & Inductor Time Constants",
    "formula": "τ_RC = R · C   |   τ_RL = L / R",
    "description": "Time required to charge or discharge a capacitor/inductor through a resistor to ~63.2% of total value."
  },
  {
    "subject": "Computer Science",
    "title": "Shannon-Hartley Channel Capacity",
    "formula": "C = B · log₂(1 + S/N)",
    "description": "Theoretical upper bound on information rate that can be transmitted over a communication channel with bandwidth B and SNR."
  },
  {
    "subject": "Mathematics",
    "title": "Euler's Formula & Complex Exponentials",
    "formula": "e^(jθ) = cos(θ) + j·sin(θ)   =>   e^(jπ) + 1 = 0",
    "description": "Connects trigonometric functions and complex exponential functions; critical for AC circuit and signal analysis."
  },
  {
    "subject": "Biology & Health",
    "title": "Allergy Severity Benchmark",
    "formula": "Erythema Area > 10 cm  |  Anaphylaxis Protocol",
    "description": "Clinical textbook indicator of severe acute hypersensitivity requiring immediate medical monitoring."
  },
  {
    "subject": "Computer Science",
    "title": "Amdahl's Law (Parallel Speedup)",
    "formula": "S_latency = 1 / ((1 - p) + (p / s))",
    "description": "Predicts theoretical speedup of execution of a whole task when using multiple processor cores where fraction p is parallelizable."
  }
];

// Curated academic & seminar flashcards
const academicFlashcards = [
  {
    "id": "fc-cs-bst",
    "category": "Computer Science",
    "question": "What is the time complexity of searching in a Balanced Binary Search Tree (AVL / Red-Black)?",
    "answer": "O(log N). Because the tree maintains height balance (h ≤ c·log₂ N), every comparison halves the remaining search space.",
    "tip": "Contrast with an unbalanced BST which can degenerate into a linked list of O(N)."
  },
  {
    "id": "fc-iot-sleep",
    "category": "Electronics & IoT",
    "question": "How does ESP32 Deep Sleep mode achieve ultra-low power consumption (<10 µA)?",
    "answer": "The dual-core Xtensa CPU, high-speed RAM, and radio modules (Wi-Fi/BLE) are powered down. Only the Ultra Low Power (ULP) coprocessor, RTC timer, and RTC slow memory remain active.",
    "tip": "Wakeup triggers include RTC timer alarm, external GPIO interrupts, or touchpad touch."
  },
  {
    "id": "fc-bio-ige",
    "category": "Biology & Health",
    "question": "Which antibody isotype mediates immediate Type I Hypersensitivity (Allergic Anaphylaxis)?",
    "answer": "Immunoglobulin E (IgE). IgE binds with high affinity to FcεRI receptors on tissue mast cells and basophils, causing cross-linking and rapid release of histamine, leukotrienes, and prostaglandins.",
    "tip": "Sensitization occurs on first allergen exposure; clinical degranulation occurs on subsequent re-exposure."
  },
  {
    "id": "fc-cs-crypto",
    "category": "Computer Science",
    "question": "Explain the difference between Symmetric and Asymmetric encryption.",
    "answer": "Symmetric encryption (e.g. AES-256, ChaCha20) uses a single shared secret key for both encryption and decryption (very fast). Asymmetric encryption (e.g. RSA, ECC, Ed25519) uses a public/private keypair (used for key exchange & digital signatures).",
    "tip": "Modern TLS 1.3 combines both: ECDHE for asymmetric key agreement, AES-GCM for payload encryption."
  },
  {
    "id": "fc-iot-nyquist",
    "category": "Electronics & IoT",
    "question": "What is the Nyquist-Shannon Sampling Theorem requirement for signal reconstruction?",
    "answer": "The sampling frequency (f_s) must be strictly greater than twice the highest frequency component (f_max) of the analog signal: f_s > 2·f_max.",
    "tip": "Sampling below 2·f_max results in aliasing distortion. Hardware anti-aliasing low-pass filters are placed before the ADC."
  },
  {
    "id": "fc-econ-trilemma",
    "category": "Economics & Social Studies",
    "question": "What constitutes the 'Impossible Trinity' (Mundell-Fleming Trilemma) in monetary policy?",
    "answer": "A central bank can simultaneously choose only two of the three: 1) Fixed exchange rate, 2) Free capital mobility, and 3) Independent monetary policy.",
    "tip": "For instance, the Eurozone chose (1) and (2), sacrificing independent member monetary policy."
  },
  {
    "id": "fc-math-euler",
    "category": "Mathematics & Science",
    "question": "What does Euler's Identity e^(iπ) + 1 = 0 signify in mathematical analysis?",
    "answer": "It establishes the profound connection between the five fundamental constants of mathematics: e (base of natural log), i (imaginary unit), π (ratio of circumference to diameter), 1 (multiplicative identity), and 0 (additive identity).",
    "tip": "Derived directly from Euler's Formula: e^(iθ) = cos(θ) + i·sin(θ) evaluated at θ = π."
  },
  {
    "id": "fc-iot-i2c",
    "category": "Electronics & IoT",
    "question": "Why are pull-up resistors mandatory on I2C bus SDA and SCL lines?",
    "answer": "I2C drivers use open-drain (or open-collector) transistors that can only pull the bus line LOW to Ground. External pull-up resistors (typically 2.2kΩ - 10kΩ) are required to pull the bus HIGH to VCC when all devices are idle.",
    "tip": "Open-drain allows multi-master arbitration and clock stretching without risk of short-circuits."
  }
];

if (typeof module !== 'undefined') {
  module.exports = { academicResources, academicFormulas, academicFlashcards };
}
