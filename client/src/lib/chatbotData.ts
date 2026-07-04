export type Language = "en" | "hi" | "mr";

export interface PurposeOption {
  id: string;
  icon: string;
  label: Record<Language, string>;
}

export const purposes: PurposeOption[] = [
  { id: "website", icon: "Globe", label: { en: "Website Development", hi: "वेबसाइट डेवलपमेंट", mr: "वेबसाइट डेव्हलपमेंट" } },
  { id: "mobile_app", icon: "Smartphone", label: { en: "Mobile App Development", hi: "मोबाइल ऐप डेवलपमेंट", mr: "मोबाइल अ‍ॅप डेव्हलपमेंट" } },
  { id: "ai_automation", icon: "Bot", label: { en: "AI Automation", hi: "एआई ऑटोमेशन", mr: "एआय ऑटोमेशन" } },
  { id: "graphic_design", icon: "Palette", label: { en: "Graphic Design", hi: "ग्राफिक डिज़ाइन", mr: "ग्राफिक डिझाइन" } },
  { id: "digital_marketing", icon: "TrendingUp", label: { en: "Digital Marketing", hi: "डिजिटल मार्केटिंग", mr: "डिजिटल मार्केटिंग" } },
  { id: "business_consultation", icon: "Briefcase", label: { en: "Business Consultation", hi: "बिज़नेस कंसल्टेशन", mr: "बिझनेस कन्सल्टेशन" } },
  { id: "software_development", icon: "Monitor", label: { en: "Software Development", hi: "सॉफ्टवेयर डेवलपमेंट", mr: "सॉफ्टवेअर डेव्हलपमेंट" } },
  { id: "cloud_solutions", icon: "Cloud", label: { en: "Cloud Solutions", hi: "क्लाउड सॉल्यूशंस", mr: "क्लाउड सोल्यूशन्स" } },
  { id: "data_analytics", icon: "BarChart3", label: { en: "Data Analytics", hi: "डेटा एनालिटिक्स", mr: "डेटा अ‍ॅनालिटिक्स" } },
  { id: "ecommerce", icon: "ShoppingCart", label: { en: "E-Commerce Solutions", hi: "ई-कॉमर्स सॉल्यूशंस", mr: "ई-कॉमर्स सोल्यूशन्स" } },
  { id: "technical_support", icon: "Wrench", label: { en: "Technical Support", hi: "टेक्निकल सपोर्ट", mr: "टेक्निकल सपोर्ट" } },
  { id: "training", icon: "BookOpen", label: { en: "Training & Workshops", hi: "ट्रेनिंग और वर्कशॉप", mr: "ट्रेनिंग आणि वर्कशॉप" } },
  { id: "general_inquiry", icon: "MessageCircle", label: { en: "General Inquiry", hi: "सामान्य पूछताछ", mr: "सर्वसाधारण चौकशी" } },
  { id: "other", icon: "PenLine", label: { en: "Other (Custom Message)", hi: "अन्य (कस्टम संदेश)", mr: "इतर (कस्टम मेसेज)" } },
];

export interface FollowUpQuestion {
  id: string;
  question: Record<Language, string>;
  options: { id: string; label: Record<Language, string> }[];
}

export const followUpQuestions: Record<string, FollowUpQuestion[]> = {
  website: [
    {
      id: "website_type",
      question: { en: "What type of website do you need?", hi: "आपको किस प्रकार की वेबसाइट चाहिए?", mr: "तुम्हाला कोणत्या प्रकारची वेबसाइट हवी आहे?" },
      options: [
        { id: "personal", label: { en: "Personal website", hi: "व्यक्तिगत वेबसाइट", mr: "वैयक्तिक वेबसाइट" } },
        { id: "business", label: { en: "Business website", hi: "बिज़नेस वेबसाइट", mr: "बिझनेस वेबसाइट" } },
        { id: "ecommerce", label: { en: "E-commerce", hi: "ई-कॉमर्स", mr: "ई-कॉमर्स" } },
        { id: "portfolio", label: { en: "Portfolio", hi: "पोर्टफोलियो", mr: "पोर्टफोलिओ" } },
        { id: "government", label: { en: "Government Project", hi: "सरकारी प्रोजेक्ट", mr: "सरकारी प्रकल्प" } },
      ],
    },
    {
      id: "budget",
      question: { en: "What is your approximate budget?", hi: "आपका अनुमानित बजट क्या है?", mr: "तुमचे अंदाजे बजेट किती आहे?" },
      options: [
        { id: "under_25k", label: { en: "Under ₹25,000", hi: "₹25,000 से कम", mr: "₹25,000 पेक्षा कमी" } },
        { id: "25k_75k", label: { en: "₹25,000 – ₹75,000", hi: "₹25,000 – ₹75,000", mr: "₹25,000 – ₹75,000" } },
        { id: "75k_2l", label: { en: "₹75,000 – ₹2,00,000", hi: "₹75,000 – ₹2,00,000", mr: "₹75,000 – ₹2,00,000" } },
        { id: "above_2l", label: { en: "Above ₹2,00,000", hi: "₹2,00,000 से अधिक", mr: "₹2,00,000 पेक्षा जास्त" } },
      ],
    },
    {
      id: "deadline",
      question: { en: "What is your expected deadline?", hi: "आपकी अपेक्षित समय-सीमा क्या है?", mr: "तुमची अपेक्षित मुदत काय आहे?" },
      options: [
        { id: "urgent", label: { en: "As soon as possible", hi: "जल्द से जल्द", mr: "लवकरात लवकर" } },
        { id: "1_month", label: { en: "Within 1 month", hi: "1 महीने के भीतर", mr: "1 महिन्यात" } },
        { id: "flexible", label: { en: "Flexible", hi: "लचीला", mr: "लवचिक" } },
      ],
    },
  ],
  mobile_app: [
    {
      id: "platform",
      question: { en: "Which platform do you need?", hi: "आपको किस प्लेटफॉर्म की आवश्यकता है?", mr: "तुम्हाला कोणते प्लॅटफॉर्म हवे आहे?" },
      options: [
        { id: "android", label: { en: "Android", hi: "एंड्रॉइड", mr: "अँड्रॉइड" } },
        { id: "ios", label: { en: "iOS", hi: "आईओएस", mr: "आयओएस" } },
        { id: "both", label: { en: "Both", hi: "दोनों", mr: "दोन्ही" } },
      ],
    },
    {
      id: "budget",
      question: { en: "What is your approximate budget?", hi: "आपका अनुमानित बजट क्या है?", mr: "तुमचे अंदाजे बजेट किती आहे?" },
      options: [
        { id: "under_1l", label: { en: "Under ₹1,00,000", hi: "₹1,00,000 से कम", mr: "₹1,00,000 पेक्षा कमी" } },
        { id: "1l_3l", label: { en: "₹1,00,000 – ₹3,00,000", hi: "₹1,00,000 – ₹3,00,000", mr: "₹1,00,000 – ₹3,00,000" } },
        { id: "above_3l", label: { en: "Above ₹3,00,000", hi: "₹3,00,000 से अधिक", mr: "₹3,00,000 पेक्षा जास्त" } },
      ],
    },
    {
      id: "timeline",
      question: { en: "What is your expected timeline?", hi: "आपकी अपेक्षित समय-सीमा क्या है?", mr: "तुमची अपेक्षित कालमर्यादा काय आहे?" },
      options: [
        { id: "urgent", label: { en: "As soon as possible", hi: "जल्द से जल्द", mr: "लवकरात लवकर" } },
        { id: "1_3_months", label: { en: "1-3 months", hi: "1-3 महीने", mr: "1-3 महिने" } },
        { id: "flexible", label: { en: "Flexible", hi: "लचीला", mr: "लवचिक" } },
      ],
    },
  ],
  ai_automation: [
    {
      id: "process",
      question: { en: "What process would you like to automate?", hi: "आप किस प्रक्रिया को स्वचालित करना चाहते हैं?", mr: "तुम्हाला कोणती प्रक्रिया स्वयंचलित करायची आहे?" },
      options: [
        { id: "customer_support", label: { en: "Customer support", hi: "ग्राहक सहायता", mr: "ग्राहक सहाय्य" } },
        { id: "data_entry", label: { en: "Data entry / processing", hi: "डेटा एंट्री / प्रोसेसिंग", mr: "डेटा एंट्री / प्रक्रिया" } },
        { id: "marketing", label: { en: "Marketing / outreach", hi: "मार्केटिंग / आउटरीच", mr: "मार्केटिंग / आउटरीच" } },
        { id: "other", label: { en: "Something else", hi: "कुछ और", mr: "इतर काहीतरी" } },
      ],
    },
    {
      id: "budget",
      question: { en: "What is your approximate budget?", hi: "आपका अनुमानित बजट क्या है?", mr: "तुमचे अंदाजे बजेट किती आहे?" },
      options: [
        { id: "under_1l", label: { en: "Under ₹1,00,000", hi: "₹1,00,000 से कम", mr: "₹1,00,000 पेक्षा कमी" } },
        { id: "1l_5l", label: { en: "₹1,00,000 – ₹5,00,000", hi: "₹1,00,000 – ₹5,00,000", mr: "₹1,00,000 – ₹5,00,000" } },
        { id: "above_5l", label: { en: "Above ₹5,00,000", hi: "₹5,00,000 से अधिक", mr: "₹5,00,000 पेक्षा जास्त" } },
      ],
    },
  ],
};

export const genericFollowUp: FollowUpQuestion[] = [
  {
    id: "budget",
    question: { en: "What is your approximate budget?", hi: "आपका अनुमानित बजट क्या है?", mr: "तुमचे अंदाजे बजेट किती आहे?" },
    options: [
      { id: "under_50k", label: { en: "Under ₹50,000", hi: "₹50,000 से कम", mr: "₹50,000 पेक्षा कमी" } },
      { id: "50k_2l", label: { en: "₹50,000 – ₹2,00,000", hi: "₹50,000 – ₹2,00,000", mr: "₹50,000 – ₹2,00,000" } },
      { id: "above_2l", label: { en: "Above ₹2,00,000", hi: "₹2,00,000 से अधिक", mr: "₹2,00,000 पेक्षा जास्त" } },
      { id: "not_sure", label: { en: "Not sure yet", hi: "अभी तय नहीं", mr: "अजून ठरलेले नाही" } },
    ],
  },
  {
    id: "timeline",
    question: { en: "What is your expected timeline?", hi: "आपकी अपेक्षित समय-सीमा क्या है?", mr: "तुमची अपेक्षित कालमर्यादा काय आहे?" },
    options: [
      { id: "urgent", label: { en: "As soon as possible", hi: "जल्द से जल्द", mr: "लवकरात लवकर" } },
      { id: "1_month", label: { en: "Within 1 month", hi: "1 महीने के भीतर", mr: "1 महिन्यात" } },
      { id: "flexible", label: { en: "Flexible", hi: "लचीला", mr: "लवचिक" } },
    ],
  },
];

export const meetingModes: { id: string; icon: string; label: Record<Language, string> }[] = [
  { id: "google_meet", icon: "Video", label: { en: "Google Meet", hi: "गूगल मीट", mr: "गूगल मीट" } },
  { id: "zoom", icon: "Video", label: { en: "Zoom", hi: "ज़ूम", mr: "झूम" } },
  { id: "phone_call", icon: "Phone", label: { en: "Phone Call", hi: "फ़ोन कॉल", mr: "फोन कॉल" } },
  { id: "whatsapp_call", icon: "MessageCircle", label: { en: "WhatsApp Call", hi: "व्हाट्सएप कॉल", mr: "व्हॉट्सअ‍ॅप कॉल" } },
  { id: "office_visit", icon: "Building2", label: { en: "Office Visit", hi: "ऑफिस विज़िट", mr: "ऑफिस भेट" } },
];

export const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

export interface FaqEntry {
  keywords: string[];
  answer: Record<Language, string>;
}

export const faqEntries: FaqEntry[] = [
  {
    keywords: ["company", "about", "who are you", "rajsanyog"],
    answer: {
      en: "Rajsanyog is a government-registered digital innovation company (UDYAM-MH-20-0234334) offering web, app, AI and digital consulting services. Our motto: Be Better. Achieve Greater.",
      hi: "राजsanyog एक सरकार-पंजीकृत डिजिटल इनोवेशन कंपनी है (UDYAM-MH-20-0234334) जो वेब, ऐप, एआई और डिजिटल कंसल्टिंग सेवाएं प्रदान करती है। हमारा आदर्श वाक्य: Be Better. Achieve Greater.",
      mr: "राजsanyog ही सरकार-नोंदणीकृत डिजिटल इनोव्हेशन कंपनी आहे (UDYAM-MH-20-0234334) जी वेब, अ‍ॅप, एआय आणि डिजिटल कन्सल्टिंग सेवा पुरवते. आमचे ब्रीदवाक्य: Be Better. Achieve Greater.",
    },
  },
  {
    keywords: ["service", "services", "offer", "what do you do"],
    answer: {
      en: "We offer Website Development, Mobile Apps, AI Automation, Graphic Design, Digital Marketing, Business Consultation, Software Development, Cloud Solutions, Data Analytics and E-Commerce Solutions.",
      hi: "हम वेबसाइट डेवलपमेंट, मोबाइल ऐप्स, एआई ऑटोमेशन, ग्राफिक डिज़ाइन, डिजिटल मार्केटिंग, बिज़नेस कंसल्टेशन, सॉफ्टवेयर डेवलपमेंट, क्लाउड सॉल्यूशंस, डेटा एनालिटिक्स और ई-कॉमर्स सॉल्यूशंस प्रदान करते हैं।",
      mr: "आम्ही वेबसाइट डेव्हलपमेंट, मोबाइल अ‍ॅप्स, एआय ऑटोमेशन, ग्राफिक डिझाइन, डिजिटल मार्केटिंग, बिझनेस कन्सल्टेशन, सॉफ्टवेअर डेव्हलपमेंट, क्लाउड सोल्यूशन्स, डेटा अ‍ॅनालिटिक्स आणि ई-कॉमर्स सोल्यूशन्स पुरवतो.",
    },
  },
  {
    keywords: ["price", "pricing", "cost", "charges", "fee"],
    answer: {
      en: "Pricing depends on the scope of your project. Share your requirements with us and our team will provide a custom quote.",
      hi: "मूल्य आपके प्रोजेक्ट के दायरे पर निर्भर करता है। हमें अपनी आवश्यकताएं बताएं और हमारी टीम एक कस्टम कोटेशन देगी।",
      mr: "किंमत तुमच्या प्रकल्पाच्या व्याप्तीवर अवलंबून असते. तुमच्या गरजा सांगा आणि आमची टीम कस्टम कोटेशन देईल.",
    },
  },
  {
    keywords: ["hour", "timing", "time", "open", "available"],
    answer: {
      en: "Our team is available Monday to Saturday, 10:00 AM to 7:00 PM IST. This chatbot is available 24/7 to assist you.",
      hi: "हमारी टीम सोमवार से शनिवार, सुबह 10:00 बजे से शाम 7:00 बजे तक उपलब्ध है। यह चैटबॉट 24/7 उपलब्ध है।",
      mr: "आमची टीम सोमवार ते शनिवार, सकाळी 10:00 ते संध्याकाळी 7:00 पर्यंत उपलब्ध आहे. हा चॅटबॉट 24/7 उपलब्ध आहे.",
    },
  },
  {
    keywords: ["process", "how it works", "steps", "workflow"],
    answer: {
      en: "Our process: 1) Understand your requirements 2) Share a proposal & timeline 3) Design & development 4) Review & feedback 5) Launch & support.",
      hi: "हमारी प्रक्रिया: 1) आपकी आवश्यकताओं को समझना 2) प्रस्ताव और समय-सीमा साझा करना 3) डिज़ाइन और डेवलपमेंट 4) समीक्षा और फीडबैक 5) लॉन्च और सपोर्ट।",
      mr: "आमची प्रक्रिया: 1) तुमच्या गरजा समजून घेणे 2) प्रस्ताव आणि कालमर्यादा शेअर करणे 3) डिझाइन आणि डेव्हलपमेंट 4) पुनरावलोकन आणि अभिप्राय 5) लाँच आणि सपोर्ट.",
    },
  },
  {
    keywords: ["technology", "tech stack", "stack", "tools"],
    answer: {
      en: "We work with modern technologies including React, Node.js, TypeScript, Python, cloud platforms (AWS/GCP/Azure), and AI/ML tools depending on project needs.",
      hi: "हम React, Node.js, TypeScript, Python, क्लाउड प्लेटफॉर्म (AWS/GCP/Azure), और AI/ML टूल्स जैसी आधुनिक तकनीकों के साथ काम करते हैं।",
      mr: "आम्ही React, Node.js, TypeScript, Python, क्लाउड प्लॅटफॉर्म (AWS/GCP/Azure), आणि AI/ML टूल्ससह आधुनिक तंत्रज्ञानावर काम करतो.",
    },
  },
  {
    keywords: ["support", "help", "maintenance"],
    answer: {
      en: "Yes, we provide ongoing support and maintenance packages after project delivery. Ask our team for details during your consultation.",
      hi: "हां, हम प्रोजेक्ट डिलीवरी के बाद निरंतर सहायता और रखरखाव पैकेज प्रदान करते हैं। परामर्श के दौरान हमारी टीम से विवरण पूछें।",
      mr: "होय, आम्ही प्रकल्प वितरणानंतर सतत सहाय्य आणि देखभाल पॅकेजेस पुरवतो. सल्लामसलतीदरम्यान आमच्या टीमला तपशील विचारा.",
    },
  },
  {
    keywords: ["portfolio", "work", "projects", "examples"],
    answer: {
      en: "We'd love to show you our past work. Please book a consultation and our team will share relevant case studies for your industry.",
      hi: "हमें अपना पिछला काम दिखाना अच्छा लगेगा। कृपया एक परामर्श बुक करें और हमारी टीम आपके उद्योग के लिए प्रासंगिक केस स्टडी साझा करेगी।",
      mr: "आम्हाला आमचे मागील काम दाखवायला आवडेल. कृपया सल्लामसलत बुक करा आणि आमची टीम तुमच्या उद्योगासाठी संबंधित केस स्टडी शेअर करेल.",
    },
  },
];

export const uiText = {
  welcomeTitle: {
    en: "👋 Welcome to Rajsanyog.",
    hi: "👋 राजsanyog में आपका स्वागत है।",
    mr: "👋 राजsanyog मध्ये आपले स्वागत आहे.",
  },
  welcomeSubtitle: {
    en: "We're happy to assist you. Please select your preferred language.",
    hi: "हमें आपकी सहायता करके खुशी होगी। कृपया अपनी पसंदीदा भाषा चुनें।",
    mr: "तुम्हाला मदत करताना आम्हाला आनंद होईल. कृपया तुमची पसंतीची भाषा निवडा.",
  },
  askName: {
    en: "Great! Let's get started. What is your full name?",
    hi: "बढ़िया! चलिए शुरू करते हैं। आपका पूरा नाम क्या है?",
    mr: "छान! चला सुरुवात करूया. तुमचे पूर्ण नाव काय आहे?",
  },
  askMobile: {
    en: "Thanks! Could you share your mobile number?",
    hi: "धन्यवाद! क्या आप अपना मोबाइल नंबर साझा कर सकते हैं?",
    mr: "धन्यवाद! तुम्ही तुमचा मोबाइल नंबर शेअर करू शकता का?",
  },
  askEmail: {
    en: "And your email address?",
    hi: "और आपका ईमेल पता?",
    mr: "आणि तुमचा ईमेल पत्ता?",
  },
  askCompany: {
    en: "What's your company/organization name? (optional, type 'skip' if none)",
    hi: "आपकी कंपनी/संस्था का नाम क्या है? (वैकल्पिक, यदि नहीं है तो 'skip' टाइप करें)",
    mr: "तुमच्या कंपनी/संस्थेचे नाव काय आहे? (ऐच्छिक, नसल्यास 'skip' टाइप करा)",
  },
  askCityState: {
    en: "Which city & state are you based in?",
    hi: "आप किस शहर और राज्य से हैं?",
    mr: "तुम्ही कोणत्या शहर आणि राज्यातून आहात?",
  },
  askPurpose: {
    en: "What can we help you with today?",
    hi: "आज हम आपकी किस प्रकार मदद कर सकते हैं?",
    mr: "आज आम्ही तुम्हाला कशी मदत करू शकतो?",
  },
  askCustomMessage: {
    en: "Please describe what you need help with.",
    hi: "कृपया बताएं कि आपको किस चीज़ में मदद चाहिए।",
    mr: "कृपया तुम्हाला कशात मदत हवी आहे ते सांगा.",
  },
  askMeeting: {
    en: "Would you like to schedule a meeting with our team?",
    hi: "क्या आप हमारी टीम के साथ मीटिंग शेड्यूल करना चाहेंगे?",
    mr: "तुम्हाला आमच्या टीमसोबत मीटिंग शेड्यूल करायची आहे का?",
  },
  meetingYes: { en: "Yes", hi: "हां", mr: "होय" },
  meetingNo: { en: "Not Now", hi: "अभी नहीं", mr: "आत्ता नाही" },
  askDate: {
    en: "Please pick a preferred date for the meeting.",
    hi: "कृपया मीटिंग के लिए एक पसंदीदा तारीख चुनें।",
    mr: "कृपया मीटिंगसाठी पसंतीची तारीख निवडा.",
  },
  askTime: {
    en: "Please select a time slot.",
    hi: "कृपया एक समय स्लॉट चुनें।",
    mr: "कृपया वेळ स्लॉट निवडा.",
  },
  askMode: {
    en: "How would you like to meet?",
    hi: "आप कैसे मिलना चाहेंगे?",
    mr: "तुम्हाला कसे भेटायचे आहे?",
  },
  meetingConfirmed: {
    en: "Your meeting request has been received! Our team will confirm shortly.",
    hi: "आपका मीटिंग अनुरोध प्राप्त हो गया है! हमारी टीम जल्द ही पुष्टि करेगी।",
    mr: "तुमची मीटिंग विनंती मिळाली आहे! आमची टीम लवकरच पुष्टी करेल.",
  },
  contactOptionsTitle: {
    en: "Here are some quick ways to reach us:",
    hi: "हमसे संपर्क करने के कुछ त्वरित तरीके यहां दिए गए हैं:",
    mr: "आमच्याशी संपर्क साधण्याचे काही जलद मार्ग येथे आहेत:",
  },
  askUpdates: {
    en: "Would you like to receive updates, offers, and new service announcements?",
    hi: "क्या आप अपडेट, ऑफ़र और नई सेवा घोषणाएं प्राप्त करना चाहेंगे?",
    mr: "तुम्हाला अपडेट्स, ऑफर्स आणि नवीन सेवा घोषणा प्राप्त करायच्या आहेत का?",
  },
  thankYou: {
    en: "Thank you for reaching out to Rajsanyog! Our team will get back to you very soon. Have a great day! 🙌",
    hi: "राजsanyog से संपर्क करने के लिए धन्यवाद! हमारी टीम जल्द ही आपसे संपर्क करेगी। आपका दिन शुभ हो! 🙌",
    mr: "राजsanyog शी संपर्क साधल्याबद्दल धन्यवाद! आमची टीम लवकरच तुमच्याशी संपर्क साधेल. तुमचा दिवस शुभ जावो! 🙌",
  },
  faqPrompt: {
    en: "Ask me anything about Rajsanyog, or choose an option below.",
    hi: "राजsanyog के बारे में मुझसे कुछ भी पूछें, या नीचे दिए गए विकल्प में से चुनें।",
    mr: "राजsanyog बद्दल मला काहीही विचारा, किंवा खालील पर्यायातून निवडा.",
  },
  faqFallback: {
    en: "I don't have that information yet. Would you like me to connect you with our team?",
    hi: "मेरे पास अभी वह जानकारी नहीं है। क्या आप चाहेंगे कि मैं आपको हमारी टीम से जोड़ूं?",
    mr: "माझ्याकडे अजून ती माहिती नाही. मी तुम्हाला आमच्या टीमशी जोडावे असे तुम्हाला वाटते का?",
  },
  typePlaceholder: {
    en: "Type your message...",
    hi: "अपना संदेश लिखें...",
    mr: "तुमचा संदेश टाइप करा...",
  },
  menuOptions: {
    en: "What would you like to do next?",
    hi: "आप आगे क्या करना चाहेंगे?",
    mr: "तुम्हाला पुढे काय करायचे आहे?",
  },
};

export const menuActions: { id: string; label: Record<Language, string>; icon: string }[] = [
  { id: "new_inquiry", label: { en: "Start a new inquiry", hi: "नई पूछताछ शुरू करें", mr: "नवीन चौकशी सुरू करा" }, icon: "MessageSquarePlus" },
  { id: "faq", label: { en: "Ask a question", hi: "एक प्रश्न पूछें", mr: "प्रश्न विचारा" }, icon: "HelpCircle" },
  { id: "contact", label: { en: "Contact options", hi: "संपर्क विकल्प", mr: "संपर्क पर्याय" }, icon: "PhoneCall" },
];
