// Static guides and complete 7 Agricultural Knowledge Centers for AgriFriend Portal
// Bangladesh Agricultural Context - Farmer Friendly Bilingual Edition
module.exports ={
  // 7 AGRICULTURAL KNOWLEDGE CENTERS (৭টি কৃষি জ্ঞান কেন্দ্র)
  knowledgeCenters:[
    {
      id: "crops",
      number: 1,
      title: "ফসলের গাইড",
      titleFull: "১. ফসলভিত্তিক জ্ঞান কেন্দ্র",
      titleEn: "Crop Cultivation Guide",
      subtitle: "চাষ পদ্ধতি ও পরিচর্যা",
      subtitleEn: "Cultivation Methods & Crop Care",
      tagline: "বীজ বপন থেকে ফসল সংগ্রহ পর্যন্ত সম্পূর্ণ চাষ পদ্ধতি ও দিকনির্দেশনা",
      icon: "fa-seedling",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      badge: "Must Have",
      featuredCrops: ["ধান", "গম", "ভুট্টা", "আলু", "টমেটো", "বেগুন", "পাট", "সরিষা", "মরিচ"]
    },
    {
      id: "diseases",
      number: 2,
      title: "রোগ শনাক্তকরণ",
      titleFull: "২. রোগ ও পোকামাকড় শনাক্তকরণ কেন্দ্র",
      titleEn: "Disease & Pest Diagnostics",
      subtitle: "ছবি ও রোগের লক্ষণ",
      subtitleEn: "Photo Symptoms & Diagnostics",
      tagline: "ফসলের রোগ ও পোকার ছবি, লক্ষণ, কারণ ও এআই-ভিত্তিক রোগ শনাক্তকরণ সহকারী",
      icon: "fa-bug",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80",
      badge: "AI Powered",
      featuredDiseases:["ধানের ব্লাস্ট", "আলুর নাবি ধসা", "বেগুনের ডগা ছিদ্রকারী", "মরিচের অ্যানথ্রাকনোজ", "ভুট্টার ফল আর্মিওয়ার্ম"]
    },
    {
      id:"inputs",
      number: 3,
      title: "সার ও উপকরণ গাইড",
      titleFull: "৩. সার, বীজ ও কৃষি উপকরণ গাইড",
      titleEn: "Fertilizer, Seed & Inputs Guide",
      subtitle: "সুষম সার প্রয়োগ ও মাটির স্বাস্থ্য",
      subtitleEn: "Balanced Fertilizer & Soil Health",
      tagline: "জৈব-রাসায়নিক সার মাত্রা, উন্নত জাতের বীজ, মাটির pH ও ইন্টারঅ্যাকটিভ সার ক্যালকুলেটর",
      icon: "fa-flask-vial",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
      badge: "Smart Calculator",
      featuredInputs: ["ইউরিয়া", "টিএসপি", "এমওপি (পটাশ)", "জিপসাম", "ট্রাইকো-কম্পোস্ট", "উন্নত বীজ"]
    },
    {
      id: "seasonal",
      number: 4,
      title: "মৌসুমভিত্তিক পরামর্শ",
      titleFull: "৪. মৌসুমভিত্তিক কৃষি পরামর্শ",
      titleEn: "Seasonal Advisory & Disaster Prep",
      subtitle: "উপযুক্ত ফসল ও দুর্যোগ প্রস্তুতি",
      subtitleEn: "Seasonal Crops & Disaster Prep",
      tagline: "রবি, খরিপ-১, খরিপ-২ মৌসুমের উপযুক্ত ফসল এবং বন্যা, খরা ও অতিবৃষ্টির জরুরি প্রস্তুতি",
      icon: "fa-cloud-sun-rain",
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80",
      badge: "Climate Smart",
      featuredTopics: ["রবি মৌসুম", "খরিপ-১", "খরিপ-২", "বন্যা প্রস্তুতি", "খরা ব্যবস্থাপনা", "অতিবৃষ্টি প্রস্তুতি"]
    },
    {
      id: "calendar",
      number: 5,
      title: "ফসলের ক্যালেন্ডার",
      titleFull: "৫. ফসলের ক্যালেন্ডার ও কাজের সময়সূচি",
      titleEn: "Crop Calendar & Schedule",
      subtitle: "কখন কোন ফসল আবাদ ও পরিচর্যা",
      subtitleEn: "Timeline & Farm Task Reminders",
      tagline: "বীজ বপন, সার প্রয়োগ, সেচ ও ফসল কাটার সময়সূচি এবং সরাসরি ফার্ম ড্যাশবোর্ডে টাস্ক যুক্ত করার সুবিধা",
      icon: "fa-calendar-check",
      image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80",
      badge: "Farm Task Sync",
      featuredSchedules: ["বীজ বপনের সময়", "চারা রোপণের সময়", "সার ও সেচ প্রয়োগ", "আগাছা দমন", "ফসল সংগ্রহ"]
    },
    {
      id: "troubleshoot",
      number: 6,
      title: "সমস্যা ও সমাধান কেন্দ্র",
      titleFull: "৬. কৃষি সমস্যা ও সমাধান কেন্দ্র",
      titleEn: "Agricultural Troubleshooting Center",
      subtitle: "সাধারণ সমস্যার সহজ সমাধান ও হটলাইন",
      subtitleEn: "Common Issues & Helpline 16123",
      tagline: "পাতা হলুদ হওয়া, বৃদ্ধি কম হওয়া, পানি জমে থাকা, ফল ঝরা ও পোকার আক্রমণ সমাধান",
      icon: "fa-circle-question",
      image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
      badge: "Helpline 16123",
      featuredProblems: ["পাতা হলুদ হয়ে যাওয়া", "গাছের বৃদ্ধি কম হওয়া", "জমিতে পানি জমে থাকা", "ফল ঝরে পড়া", "কীটপতঙ্গের আক্রমণ"]
    },
    {
      id: "tutorials",
      number: 7,
      title: "ভিডিও ও টিউটোরিয়াল",
      titleFull: "৭. ভিডিও, ছবি ও বাংলা টিউটোরিয়াল কেন্দ্র",
      titleEn: "Visuals, Videos & Bangla Tutorials",
      subtitle: "দেখে শিখুন ও ভিডিও প্লেয়ার",
      subtitleEn: "Watch Videos & Visual Guides",
      tagline: "বাংলায় চাষাবাদের ভিডিও, সুস্থ বনাম আক্রান্ত পাতার তুলনামূলক চিত্র, ধাপে ধাপে ফটো গাইড ও সহজ শব্দকোষ",
      icon: "fa-circle-play",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
      badge: "Watch & Learn",
      featuredTutorials: ["বাংলা চাষাবাদ ভিডিও", "রোগের তুলনামূলক চিত্র", "চিত্রসহ ব্যবহারিক গাইড", "সহজ FAQ ও শব্দকোষ"]
    }
  ],

  // 1. CROPS DATA (ফসলভিত্তিক জ্ঞান কেন্দ্র)
  crops: [
    {
      id: "crop_rice",
      name: "Rice / ধান",
      scientificName: "Oryza sativa",
      type:"Cereal / দানাশস্য",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Fertile Clay-Loam Soil / উর্বর এটেল ও দোআঁশ মাটি (Clay-Loam)",
      optimalPH: "5.5 - 6.5",
      waterRequirement: "High (1200-1500 mm standing water) / বেশি (১২০০-১৫০০ মিমি, দাঁড়িয়ে থাকা পানি)",
      growthDuration: "100 - 150 Days (variety dependent) / ১০০ - ১৫০ দিন (জাতভেদে)",
      temperatureRange: "20°C - 35°C / ২০°সে - ৩৫°সে",
      plantingSeason: "Boro (Nov-Dec), Aman (Jun-Jul), Aush (Mar-Apr) / বোরো (কার্তিক-অগ্রহায়ণ), আমন (আষাঢ়-শ্রাবণ), আউশ (চৈত্র-বৈশাখ)",
      bighaSeedRate: "3.5 - 4 kg per bigha (transplanting method) / ৩.৫ - ৪ কেজি প্রতি বিঘা (রোপণ পদ্ধতিতে)",
      seedInfo: {
        rate: "25-30 kg/ha (3.5-4 kg/bigha) / ২৫-৩০ কেজি/হেক্টর (বিঘায় ৩.৫-৪ কেজি)",
        depth: "2-3 cm (1 inch) / ২-৩ সেমি (১ ইঞ্চি)",
        spacing: "Row distance 8 in (20 cm), seedling distance 6 in (15 cm) / সারির দূরত্ব ৮ ইঞ্চি (২০ সেমি), চারার দূরত্ব ৬ ইঞ্চি (১৫ সেমি)",
        popularVarieties: "BRRI Dhan28, BRRI Dhan29, BRRI Dhan89, BRRI Dhan92, Banglamoti / ব্রি ধান২৮, ব্রি ধান২৯, ব্রি ধান৮৯, ব্রি ধান৯২, ব্রি হাইব্রিড ধান৬, বাংলামতি (ব্রি ধান৫০)"
      },
      bighaFertilizer: {
        urea: "33 kg (3 splits: 1/3 tilling, 1/3 tillering, 1/3 panicle) / ৩৩ কেজি (তিন কিস্তিতে: জমি তৈরিতে ১/৩, কুশি আসার সময় ১/৩, কাইচ থোড়ে ১/৩)",
        tsp: "13 kg (at final tilling) / ১৩ কেজি (জমি তৈরির শেষ চাষে)",
        mop: "15 kg (10kg tilling, 5kg before booting) / ১৫ কেজি (জমি তৈরিতে ১০ কেজি, থোড় আসার আগে ৫ কেজি)",
        gypsum: "9 kg (during tilling) / ৯ কেজি (জমি তৈরিতে)",
        zinc: "1.5 kg Zinc Sulphate (during tilling) / ১.৫ কেজি (দস্তা সার জমি তৈরিতে)"
      },
      farmerTips: "Transplant 25-30 day old seedlings. Keep 2-3 inches standing water during boot stage. Avoid excess urea to prevent blast. / ধানের চারা ২৫-৩০ দিন বয়সে রোপণ করুন। কাইচ থোড় আসার সময় জমিতে ২-৩ ইঞ্চি পানি ধরে রাখা অত্যন্ত জরুরি। ব্লাস্ট রোগের আক্রমণ এড়াতে অতিরিক্ত ইউরিয়া দেওয়া থেকে বিরত থাকুন।",
      description: "বাংলাদেশের প্রধান খাদ্য ফসল। বিআরআরআই (BRRI) নির্দেশিকা অনুযায়ী বোরো, আমন ও আউশ মৌসুমে উচ্চ ফলনশীল জাত চাষ করে বিঘায় ২০-২৫ মন ফলন সম্ভব।",
      fertilizers: ["Urea", "TSP", "MOP", "Gypsum", "Zinc Sulphate"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি প্রস্তুতি (Land Preparation)",
          details: "জমি ৪-৫টি আড়াআড়ি চাষ ও মই দিয়ে থকথকে কাদা তৈরি করুন। জমিতে পানি নিষ্কাশন ও ধরে রাখার জন্য শক্ত আইল বাঁধুন। শেষ চাষে টিএসপি, জিপসাম ও পটাশের অর্ধেক প্রয়োগ করুন।",
          duration: "১০-১৫ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "বীজ নির্বাচন ও শোধন (Seed Selection & Treatment)",
          details: "ইউরিয়া মিশ্রিত পানিতে সুস্থ পুষ্ট বীজ নির্বাচন করুন। প্রতি কেজি বীজে ২.৫ গ্রাম প্রভ্যাক্স বা কারবেনডাজিম দিয়ে বীজ শোধন করে জাগ দিয়ে অঙ্কুরোদগম করান।",
          duration: "২-৩ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "চারা রোপণ (Transplanting)",
          details: "বীজতলার চারা ২৫-৩০ দিন বয়সে মূল জমিতে সারি করে লাগান। সারি থেকে সারির দূরত্ব ২০ সেমি (৮ ইঞ্চি) এবং গুছি থেকে গুছির দূরত্ব ১৫ সেমি (৬ ইঞ্চি)। প্রতি গুছিতে ২-৩টি সতেজ চারা দিন।",
          duration: "১-২ দিন",
          image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "সার প্রয়োগ ও সেচ (Fertilization & Irrigation)",
          details: "ইউরিয়া সমান ৩ কিস্তিতে দিন: চারা লাগানোর ১৫ দিন পর ১ম কিস্তি, কুশি আসার সময় ২য় কিস্তি এবং কাইচ থোড় আসার ৫-৭ দিন পূর্বে শেষ কিস্তি। থোড় থেকে ফুল ফোটা পর্যন্ত জমিতে ২-৩ ইঞ্চি পানি রাখুন।",
          duration: "২০-৫৫ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "রোগ ও পোকা ব্যবস্থাপনা (Pest & Disease Management)",
          details: "মাজরা পোকা দমনে আলোক ফাঁদ ও পার্চিং (ডাল পোতা) করুন। ব্লাস্ট রোগের আক্রমণ ঠেকাতে অতিরিক্ত ইউরিয়া বন্ধ রাখুন এবং লক্ষণ দেখা দিলে নাটিভো বা ট্রুপার স্প্রে করুন।",
          duration: "৩০-৮০ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "ফসল সংগ্রহ ও শুকানো (Harvesting & Storage)",
          details: "শীষের ৮০% ধান সোনালী বা খড়ের রঙ ধারণ করলে কেটে ফেলুন। মাড়াইয়ের পর ভালো রোদে শুকিয়ে আর্দ্রতা ১২% এ নামিয়ে বায়ুরোধী ড্রামে বা পাত্রে সংরক্ষণ করুন।",
          duration: "১১০-১৪৫ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "crop_wheat",
      name: "Wheat / গম",
      scientificName: "Triticum aestivum",
      type: "Cereal / দানাশস্য",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Fertile Loam & Silt-Loam Soil / উর্বর দোআঁশ ও পলি-দোআঁশ মাটি",
      optimalPH: "6.0 - 7.0",
      waterRequirement: "Medium (400-500 mm, 3 irrigations) / মাঝারি (৪০০-৫০০ মিমি, ৩টি সেচ)",
      growthDuration: "105 - 115 Days / ১০৫ - ১১৫ দিন",
      temperatureRange: "12°C - 25°C (Cool & Dry) / ১২°সে - ২৫°সে (ঠান্ডা ও শুষ্ক আবহাওয়া)",
      plantingSeason: "Rabi / Winter (15 Nov - 30 Nov) / রবি/শীতকাল (১৫ নভেম্বর - ৩০ নভেম্বর / ১-১৫ অগ্রহায়ণ)",
      bighaSeedRate: "16 - 17 kg per bigha / ১৬ - ১৭ কেজি প্রতি বিঘা",
      seedInfo: {
        rate: "120-130 kg/ha (16-17 kg/bigha) / ১২০-১৩০ কেজি/হেক্টর (বিঘায় ১৬-১৭ কেজি)",
        depth: "3-5 cm (1.5-2 inches) / ৩-৫ সেমি (১.৫-২ ইঞ্চি)",
        spacing: "Row distance 8 in (20 cm) / সারির দূরত্ব ৮ ইঞ্চি (২০ সেমি)",
        popularVarieties: "BARI Gom 26 (Hasna), BARI Gom 28, BARI Gom 30, BARI Gom 33 (Zinc & Blast resistant) / বারি গম ২৬ (হাসনা), বারি গম ২৮, বারি গম ৩০, বারি গম ৩৩ (জিংক ও ব্লাস্ট প্রতিরোধী)"
      },
      bighaFertilizer: {
        urea: "28 kg (2/3 during tilling, 1/3 at 1st irrigation) / ২৮ কেজি (জমি তৈরিতে ২/৩ অংশ, প্রথম সেচের সময় ১/৩ অংশ)",
        tsp: "18 kg (during tilling) / ১৮ কেজি (জমি তৈরিতে)",
        mop: "12 kg (during tilling) / ১২ কেজি (জমি তৈরিতে)",
        gypsum: "11 kg / ১১ কেজি",
        boron: "1.5 kg Solubor Boron / ১.৫ কেজি (সোলুবোর বোরন)"
      },
      farmerTips: "First irrigation at 17-21 days (Crown Root Initiation) is vital. BARI Gom 33 provides blast resistance. / গম বুনে প্রথম সেচ রোপণের ১৭-২১ দিনের মাথায় (মুকুট শিকড় গজানো পর্যায়) অবশ্যই দিন। ব্লাস্ট প্রতিরোধী বারি গম ৩৩ জাত চাষ করলে গমের ফলন ও নিরাপত্তা নিশ্চিত হয়।",
      description: "উত্তর ও পশ্চিমাঞ্চলে শীতকালের লাভজনক দানা ফসল। সময়মতো সঠিক সেচ দিলে বিঘায় ১২-১৫ মন দানা পাওয়া যায়।",
      fertilizers: ["Urea", "TSP", "DAP", "MOP", "Boron"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি প্রস্তুতি (Land Preparation)",
          details: "জমি ৩-৪ বার আড়াআড়ি চাষ ও মই দিয়ে ঝুরঝুরে করে তৈরি করুন যাতে মাটির ডেলা ভেঙে যায়। পর্যাপ্ত জো (রস) অবস্থায় জমি চাষ করা আবশ্যক।",
          duration: "৭-১০ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "বীজ নির্বাচন ও শোধন (Seed Selection)",
          details: "উচ্চফলনশীল ও ব্লাস্ট প্রতিরোধী বারি গম ৩৩ নির্বাচন করুন। প্রভ্যাক্স ২০০ ডাব্লিউপি (৩ গ্রাম/কেজি বীজ) দিয়ে শোধন করে সুস্থ চারা নিশ্চিত করুন।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "বীজ বপন (Sowing)",
          details: "১৫-৩০ নভেম্বরের মধ্যে বীজ সারিতে বপন করুন। সারি থেকে সারির দূরত্ব ২০ সেমি এবং মাটির গভীরতা ৩-৫ সেমি রাখুন।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "সার ও সেচ ব্যবস্থাপনা (Irrigation & Fertilizer)",
          details: "বীজ বপনের ১৭-২১ দিনের মাথায় প্রথম সেচ (মুকুট শিকড় পর্যায়) ও ইউরিয়া টপড্রেসিং দিন। ৪৫-৫৫ দিনে ২য় সেচ এবং ৭৫-৮০ দিনে দানা পুষ্ট হওয়ার সময় ৩য় সেচ দিন।",
          duration: "১৭-৮০ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "রোগ ও বালাই দমন (Disease & Pest Management)",
          details: "গমের ব্লাস্ট ও মরচে রোগ দেখা দিলে টিল্ট ২৫০ ইসি (১ মিলি/লিটার) বা নেটিভো স্প্রে করুন। জমিতে ইঁদুর দমন নিশ্চিত করুন।",
          duration: "৪৫-৮৫ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "ফসল কর্তন ও সংরক্ষণ (Harvesting & Storage)",
          details: "গাছ ও শীষ সম্পূর্ণ হলদেটে হয়ে শুকিয়ে গেলে কেটে মাড়াই করুন। রোদে ভালো করে শুকিয়ে ১২% আর্দ্রতায় সংরক্ষণ করুন।",
          duration: "১০০-১১৫ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "crop_corn",
      name: "Maize (Corn) / ভুট্টা",
      scientificName: "Zea mays",
      type: "Cereal / দানাশস্য",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Well-drained Sandy-Loam & Loam Soil / পানি নিষ্কাশনযুক্ত বেলে-দোআঁশ ও দোআঁশ মাটি",
      optimalPH: "5.8 - 7.0",
      waterRequirement: "Medium (3-4 irrigations) / মাঝারি (৩-৪টি সেচ)",
      growthDuration: "120-140 Days (Rabi), 90-110 Days (Kharif) / ১২০ - ১৪০ দিন (রবি/শীত), ৯০-১১০ দিন (খরিপ)",
      temperatureRange: "18°C - 32°C / ১৮°সে - ৩২°সে",
      plantingSeason: "Rabi (Oct-Nov) & Kharif (Mar-Apr) / রবি (আশ্বিন-কার্তিক / অক্টো-নভেম্বর) ও খরিপ (চৈত্র-বৈশাখ)",
      bighaSeedRate: "2.5 - 3 kg per bigha / ২.৫ - ৩ কেজি প্রতি বিঘা",
      seedInfo: {
        rate: "20-25 kg/ha (2.5-3 kg/bigha) / ২০-২৫ কেজি/হেক্টর (বিঘায় ২.৫-৩ কেজি)",
        depth: "4-5 cm (2 inches) / ৪-৫ সেমি (২ ইঞ্চি)",
        spacing: "Row distance 24 in (60 cm), plant distance 8 in (20 cm) / সারির দূরত্ব ২৪ ইঞ্চি (৬০ সেমি), চারার দূরত্ব ৮ ইঞ্চি (২০ সেমি)",
        popularVarieties: "BARI Hybrid Maize 9, BARI Hybrid Maize 14, NK-40, Pioneer / বারি হাইব্রিড ভুট্টা ৯, বারি হাইব্রিড ভুট্টা ১৪, এনকে-৪০ (NK-40), সুপার শাইন, পায়োনিয়ার"
      },
      bighaFertilizer: {
        urea: "40 kg (3 splits) / ৪০ কেজি (তিন কিস্তিতে)",
        dap: "25 kg (tilling) / ২৫ কেজি (জমি তৈরিতে)",
        mop: "20 kg / ২০ কেজি",
        gypsum: "15 kg / ১৫ কেজি",
        zinc: "2 kg Zinc Sulphate / ২ কেজি (দস্তা সার)"
      },
      farmerTips: "Spray Spinotoram or Neem oil into central whorls for Fall Armyworm control. Yield up to 35-40 maunds/bigha. / ভুট্টায় ফল আরমিওয়ার্ম পোকার আক্রমণ ঠেকাতে কচি গাছে চোঙার ভেতর ছাই বা নিম তেল অথবা স্পিনোটোরাম ছিটান। বিঘায় ৩৫-৪০ মন ফলন পাওয়া সম্ভব।",
      description: "পোল্ট্রি ফিড ও দানাদার খাদ্যের জন্য বাংলাদেশে দ্রুত বর্ধনশীল অর্থকরী ফসল। আধুনিক চাষে বিপুল ফলন পাওয়া যায়।",
      fertilizers: ["Urea", "DAP", "MOP", "Zinc Sulphate", "Gypsum"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি প্রস্তুতি (Land Preparation)",
          details: "গভীরভাবে ৪-৫টি চাষ ও মই দিয়ে মাটি ঝুরঝুরে করুন। জমিতে পানি নিষ্কাশনের ড্রেন রাখুন যাতে পানি না জমে।",
          duration: "৭-১০ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "বীজ নির্বাচন ও শোধন (Seed Selection)",
          details: "বারি হাইব্রিড ভুট্টা ৯ বা এনকে-৪০ বীজ নির্বাচন করুন। প্রতি কেজি বীজে ২ গ্রাম কারবেনডাজিম মিশিয়ে শোধন করুন।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "বীজ বপন (Sowing)",
          details: "সারি থেকে সারির দূরত্ব ৬০ সেমি (২৪ ইঞ্চি) এবং গাছ থেকে গাছের দূরত্ব ২০ সেমি (৮ ইঞ্চি) রেখে ৪-৫ সেমি গভীরে বীজ পুঁতুন।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "সার ও সেচ প্রয়োগ (Fertilizer & Irrigation)",
          details: "গাছ হাঁটু সমান হলে প্রথম কিস্তির ইউরিয়া এবং মোচা আসার আগে ২য় কিস্তির ইউরিয়া দিন। ফুল ও মোচায় দানা বাঁধার সময় পর্যাপ্ত সেচ দিন।",
          duration: "২৫-৭০ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "পোকা ও রোগ ব্যবস্থাপনা (Pest Control)",
          details: "ফল আর্মিওয়ার্ম পোকার আক্রমণ প্রতিরোধে কচি চোঙার ভেতর ছাই বা স্পিনোটোরাম স্প্রে করুন। পাতা ঝলসানো রোগ রোধে সুষম পটাশ দিন।",
          duration: "২০-৮০ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "ফসল সংগ্রহ (Harvesting)",
          details: "মোচার খোসা শুকিয়ে খড়ের মতো হলে এবং দানার গোড়ায় কালো দাগ দেখা দিলে মোচা ভেঙে রোদে শুকিয়ে মাড়াই করুন।",
          duration: "১২০-১৪০ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "crop_potato",
      name: "Potato / আলু",
      scientificName: "Solanum tuberosum",
      type: "Tuber / কন্দজাতীয় ফসল",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Friable Sandy-Loam & Alluvial Soil / ঝুরঝুরে বেলে-দোআঁশ ও পলি মাটি",
      optimalPH: "5.2 - 6.4",
      waterRequirement: "Medium (400-600 mm, 3-4 irrigations) / মাঝারি (৪০০-৬০০ মিমি, ৩-৪ সেচ)",
      growthDuration: "85 - 95 Days / ৮৫ - ৯৫ দিন",
      temperatureRange: "15°C - 22°C / ১৫°সে - ২২°সে",
      plantingSeason: "Rabi / Winter (Oct-Nov) / রবি/শীতকাল (আশ্বিন-কার্তিক / অক্টোবর-নভেম্বর)",
      bighaSeedRate: "200 - 250 kg per bigha (seed tubers) / ২০০ - ২৫০ কেজি প্রতি বিঘা (বীজ আলু)",
      seedInfo: {
        rate: "1.5-2.0 ton/ha (200-250 kg/bigha) / ১.৫-২.০ টন/হেক্টর (বিঘায় ২০০-২৫০ কেজি বীজ আলু)",
        depth: "7-10 cm (3-4 inches) / ৭-১০ সেমি (৩-৪ ইঞ্চি)",
        spacing: "Row distance 24 in (60 cm), tuber distance 8 in (20 cm) / সারির দূরত্ব ২৪ ইঞ্চি (৬০ সেমি), আলুর দূরত্ব ৮ ইঞ্চি (২০ সেমি)",
        popularVarieties: "Diamant, Asterix (Red Potato), Cardinal, BARI Alu-7, BARI Alu-25 / ডায়মন্ট (Diamant), অ্যাস্টেরিক্স (লাল আলু), কার্ডিনাল, বারি আলু-৭, বারি আলু-২৫"
      },
      bighaFertilizer: {
        urea: "35 kg (split doses) / ৩৫ কেজি (কিস্তিতে)",
        tsp: "25 kg (tilling) / ২৫ কেজি (জমি তৈরিতে)",
        mop: "30 kg (MOP Potash) / ৩০ কেজি (এমওপি পটাশ)",
        gypsum: "12 kg / ১২ কেজি",
        vermi: "200 kg Vermicompost / ২০০ কেজি (কেঁচো সার/কম্পোস্ট)"
      },
      farmerTips: "Apply preventive Ridomil Gold or Mancozeb spray during foggy, humid weather for Late Blight prevention. / নাবি ধসা (Late Blight) রোগ প্রতিরোধে কুয়াশাচ্ছন্ন ও আর্দ্র আবহাওয়া দেখামাত্র আগাম ডাইথেন এম-৪৫ বা রিডোমিল গোল্ড স্প্রে করুন। গাছ লাগানোর ৪৫ দিনের মাথায় ভেল্কি তুলে গোড়ায় মাটি তুলে দিন।",
      description: "মুন্সীগঞ্জ, বগুড়া ও রংপুর অঞ্চলের প্রধান বাণিজ্যিক ফসল। সঠিক পরিচর্যায় বিঘায় ৮০-১০০ মন আলু উৎপন্ন হয়।",
      fertilizers: ["Urea", "TSP", "MOP", "Gypsum", "Magnesium Sulphate", "Vermicompost"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি প্রস্তুতি (Land Preparation)",
          details: "জমি ৫-৬ বার চাষ ও মই দিয়ে গভীর ঝুরঝুরে মাটি তৈরি করুন। শেষ চাষে পর্যাপ্ত জৈব সার, টিএসপি, পটাশ ও জিপসাম দিন।",
          duration: "১০-১২ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "বীজ আলু শোধন ও গজানো (Seed Sprouting)",
          details: "সুস্থ বীজ আলুর চোখ গজিয়ে নিন। বড় আলু কেটে লাগালে ছাই বা ডাইথেন এম-৪৫ মিশ্রণে ডুবিয়ে নিন যেন পচন না ধরে।",
          duration: "৫-৭ দিন",
          image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "আলু রোপণ (Planting)",
          details: "৬০ সেমি দূরত্বের সারিতে ৮ ইঞ্চি ব্যবধানে আলু বসিয়ে ৭-১০ সেমি মাটি দিয়ে ভেল্কি বা উঁচু বেড তৈরি করুন।",
          duration: "১-২ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "সার, সেচ ও গোড়ায় মাটি তোলা (Earthing Up & Irrigation)",
          details: "গাছ বের হওয়ার ২০-২৫ দিনে হালকা সেচ ও নিড়ানি দিন। ৩৫-৪০ দিনে ইউরিয়া দিয়ে গাছের গোড়ায় উঁচু করে মাটি তুলে দিন যাতে আলু রোদে সবুজ না হয়।",
          duration: "২০-৫০ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "নাবি ধসা রোগ প্রতিরোধ (Late Blight Management)",
          details: "ঘন কুয়াশা ও স্যাঁতসেঁতে আবহাওয়ায় ডাইথেন এম-৪৫ বা রিডোমিল গোল্ড স্প্রে করুন। রোগ দেখা দিলে সিকিউর স্প্রে করুন।",
          duration: "৪০-৭০ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "আলু উত্তোলন ও কিউরিং (Harvesting & Curing)",
          details: "তোলার ১০ দিন আগে সেচ বন্ধ করুন ও পাতা কেটে ফেলুন। রোদহীন সকালে আলু তুলে ছায়াযুক্ত স্থানে ১০ দিন কিউরিং করে গুদামজাত করুন।",
          duration: "৮৫-১০০ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "crop_tomato",
      name: "Tomato / টমেটো",
      scientificName: "Solanum lycopersicum",
      type: "Vegetable / সবজি",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Light Silt-Loam & Loam Soil / হালকা পলি-দোআঁশ ও দোআঁশ মাটি",
      optimalPH: "6.0 - 6.8",
      waterRequirement: "Medium (Regular irrigation) / মাঝারি (নিয়মিত সেচ)",
      growthDuration: "70 - 90 Days (after transplanting) / ৭০ - ৯০ দিন (চারা রোপণের পর)",
      temperatureRange: "15°C - 30°C / ১৫°সে - ৩০°সে",
      plantingSeason: "Winter (Oct-Nov) & Summer (BARI Tomato 4/8) / শীতকাল (কার্তিক-অগ্রহায়ণ) ও গ্রীষ্মকাল (বারি টমেটো ৪/৮)",
      bighaSeedRate: "30 - 40 g per bigha (nursery seedlings) / ৩০ - ৪০ গ্রাম প্রতি বিঘা (বীজতলায় চারা তৈরি)",
      seedInfo: {
        rate: "200-250 g/ha (30-40 g/bigha) / ২০০-২৫০ গ্রাম/হেক্টর (বিঘায় ৩০-৪০ গ্রাম বীজ)",
        depth: "0.5-1 cm / ০.৫-১ সেমি",
        spacing: "Row distance 24 in (60 cm), plant distance 16 in (40 cm) / সারির দূরত্ব ২৪ ইঞ্চি (৬০ সেমি), চারার দূরত্ব ১৬ ইঞ্চি (৪০ সেমি)",
        popularVarieties: "BARI Tomato 14 (Bahar), BARI Tomato 15, Bijli, Summer BARI Tomato 8 / বারি টমেটো ১৪ (বাহার), বারি টমেটো ১৫, বিজলী, বিজলী প্লাস, গ্রীষ্মকালীন বারি টমেটো ৮"
      },
      bighaFertilizer: {
        urea: "30 kg / ৩০ কেজি",
        tsp: "25 kg / ২৫ কেজি",
        mop: "25 kg / ২৫ কেজি",
        vermi: "150 kg Tricho-Compost / ১৫০ কেজি (ট্রাইকো-কম্পোস্ট)",
        boron: "1 kg (prevents fruit cracking) / ১ কেজি (ফল ফাটা রোধে)"
      },
      farmerTips: "Provide staking support to avoid ground contact. Spray Solubor Boron 1.5g/L during flowering to prevent fruit cracking. / টমেটো গাছে খুঁটি (স্টেকিং) বেঁধে দিন যাতে ফল মাটিতে না ঠেকে। টমেটো ফাটা বন্ধ করতে ফুল আসার সময় সোলুবোর বোরন ১.৫ গ্রাম/লিটার পানিতে স্প্রে করুন।",
      description: "সবজি হিসেবে অত্যন্ত সুস্বাদু ও লাভজনক ফসল। বিঘায় ১৫০-২০০ মন টমেটো পাওয়া সম্ভব।",
      fertilizers: ["Urea", "TSP", "MOP", "Tricho-Compost", "Boron"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি ও বেড তৈরি (Land Preparation)",
          details: "জমি ৪-৫ বার চাষ দিয়ে ১ মিটার চওড়া উঁচু বেড তৈরি করুন। দুই বেডের মাঝে ৩০ সেমি সেচ ও পানি নিষ্কাশন নালা রাখুন।",
          duration: "৭ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "বীজতলা ও চারা তৈরি (Nursery Raising)",
          details: "বীজতলায় ভালো জাতের বীজ বুনে ২০-২৫ দিনের সবল সুস্থ চারা তৈরি করুন। চারা তোলার পূর্বে বীজতলায় হালকা পানি দিন।",
          duration: "২০-২৫ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "চারা রোপণ (Transplanting)",
          details: "বিকেলে সারি করে ৬০ সেমি দূরত্বে এবং চারা থেকে চারা ৪০ সেমি দূরত্বে লাগান। চারা লাগানোর পর গোড়ায় পানি দিন।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "খুঁটি বাঁধা ও সার প্রয়োগ (Staking & Fertilizer)",
          details: "গাছ ২৫-৩০ দিন বয়সে বাঁশের খুঁটি দিয়ে বেঁধে দিন। ফুল আসার সময় ইউরিয়া ও পটাশ উপরিপ্রয়োগ করুন এবং সোলুবোর বোরন স্প্রে করুন।",
          duration: "২৫-৫৫ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "রোগ ও পোকা নিয়ন্ত্রণ (Pest & Disease Control)",
          details: "টমেটোর নাবি ধসা দেখা দিলে রিডোমিল গোল্ড এবং সাদা মাছি পোকার আক্রমণ রোধে হলুদ আঠালো ফাঁদ বা ইমিডাক্লোপ্রিড স্প্রে করুন।",
          duration: "৩০-৭০ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "টমেটো সংগ্রহ ও বাজারজাতকরণ (Harvesting)",
          details: "দূরবর্তী বাজারে পাঠাতে হালকা লালচে রঙের আধাপাকা টমেটো এবং স্থানীয় বিক্রির জন্য পাকা টমেটো বোঁটাসহ সংগ্রহ করুন।",
          duration: "৭০-১০০ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "crop_eggplant",
      name: "Eggplant (Brinjal) / বেগুন",
      scientificName: "Solanum melongena",
      type: "Vegetable / সবজি",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Well-drained Fertile Silt-Loam Soil / সুনিষ্কাশিত উর্বর পলি-দোআঁশ মাটি",
      optimalPH: "5.5 - 6.8",
      waterRequirement: "Medium to High / মাঝারি থেকে বেশি",
      growthDuration: "110 - 140 Days (Long duration) / ১১০ - ১৪০ দিন (দীর্ঘ মেয়াদী)",
      temperatureRange: "20°C - 32°C / ২০°সে - ৩২°সে",
      plantingSeason: "Year-round (Rabi, Kharif, Summer) / সারা বছর (রোজ, খরিপ ও গ্রীষ্মকাল)",
      bighaSeedRate: "40 - 50 g per bigha / ৪০ - ৫০ গ্রাম প্রতি বিঘা",
      seedInfo: {
        rate: "250-300 g/ha (40-50 g/bigha) / ২৫০-৩০০ গ্রাম/হেক্টর (বিঘায় ৪০-৫০ গ্রাম)",
        depth: "1 cm / ১ সেমি",
        spacing: "Row distance 30 in (75 cm), plant distance 24 in (60 cm) / সারির দূরত্ব ৩০ ইঞ্চি (৭৫ সেমি), চারার দূরত্ব ২৪ ইঞ্চি (৬০ সেমি)",
        popularVarieties: "BARI Bt Begun 2/4 (Pest Resistant), Kazla, Uttara, Nayantara / বারি বিটি বেগুন ২/৪ (পোকা প্রতিরোধী), কাজলা, উত্তরা, নয়নতারা, সেঁওতি, ইসলামপুরী"
      },
      bighaFertilizer: {
        urea: "35 kg / ৩৫ কেজি",
        tsp: "30 kg / ৩০ কেজি",
        mop: "25 kg / ২৫ কেজি",
        vermi: "200 kg Compost / ২০০ কেজি (জৈব কম্পোস্ট)"
      },
      farmerTips: "Use sex pheromone lures for Fruit & Shoot Borer control. Bt Begun reduces pesticide cost by 90%. / ডগা ও ফল ছিদ্রকারী পোকা দমনে লিয়ুরেল সেক্স ফেরোমন ফাঁদ ব্যবহার করুন। বিটি বেগুন চাষ করলে বিষাক্ত কীটনাশকের খরচ ৯০% কমে যায়।",
      description: "বাংলাদেশের সবচেয়ে জনপ্রিয় ও সারা বছর চাষযোগ্য লাভজনক সবজি ফসল। সঠিক ব্যবস্থাপনায় বিঘায় ১০০-১২০ মন বেগুন পাওয়া যায়।",
      fertilizers: ["Urea", "TSP", "MOP", "Tricho-Compost", "Vermicompost"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি প্রস্তুতি (Land Preparation)",
          details: "জমি ৪-৫ বার গভীর চাষ দিয়ে মাটি ঝুরঝুরে করুন। ড্রেনযুক্ত বেড তৈরি করে জমিতে গোবর বা ট্রাইকো-কম্পোস্ট মিশিয়ে দিন।",
          duration: "৭-১০ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "বীজ শোধন ও চারা তৈরি (Seedling Prep)",
          details: "বীজতলায় বীজ বুনে ৩০-৩৫ দিনের শক্ত চারা তৈরি করুন। পোকার আক্রমণ এড়াতে বারি বিটি বেগুন জাত নির্বাচন করা উত্তম।",
          duration: "৩০ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "চারা রোপণ (Transplanting)",
          details: "সারি থেকে সারি ৭৫ সেমি এবং চারা থেকে চারা ৬০ সেমি দূরত্বে লাগান। রোপণের পর হালকা সেচ দিন।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "সার প্রয়োগ ও সেচ (Fertilizer & Irrigation)",
          details: "গাছ বৃদ্ধির সাথে সাথে ৩ কিস্তিতে ইউরিয়া ও পটাশ দিন। ফুল ও ফল ধারণের সময় মাটিতে নিয়মিত রস বজায় রাখুন।",
          duration: "২০-৮০ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "ডগা ও ফল ছিদ্রকারী পোকা দমন (Borer Management)",
          details: "বিঘায় ৫-৬টি সেক্স ফেরোমন ট্র্যাপ ঝুলান এবং আক্রান্ত ডগা দেখামাত্র কাঁচি দিয়ে কেটে মাটির নিচে পুঁতে ফেলুন।",
          duration: "৩০-১০০ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "বেগুন সংগ্রহ ও পরিচর্যা (Harvesting)",
          details: "বেগুন পূর্ণ আকার পেলে চকচকে নরম থাকা অবস্থায় ধারালো ছুরি দিয়ে বোঁটাসহ কেটে সংগ্রহ করুন।",
          duration: "৬০-১৪০ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "crop_jute",
      name: "Jute / পাট (সোনালী আঁশ)",
      scientificName: "Corchorus olitorius / Corchorus capsularis",
      type: "Fiber / আঁশ ফসল",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Fertile Alluvial & Tosha Loam Soil / উর্বর পলি মাটি ও তোষা দোআঁশ মাটি",
      optimalPH: "6.0 - 7.5",
      waterRequirement: "High (Rainfall & Irrigation) / বেশি (বৃষ্টিপাত ও সেচ)",
      growthDuration: "110 - 130 Days / ১১০ - ১৩০ দিন",
      temperatureRange: "24°C - 38°C / ২৪°সে - ৩৮°সে",
      plantingSeason: "Kharif-1 (Mar-Apr) / খরিপ-১ (চৈত্র - বৈশাখ / মার্চ - এপ্রিল)",
      bighaSeedRate: "800g - 1kg (Tosha), 1.2kg (Deshi) / ৮০০ গ্রাম - ১ কেজি (তোষা পাট), ১.২ কেজি (দেশি পাট)",
      seedInfo: {
        rate: "5-6 kg/ha (Tosha), 7-8 kg/ha (Deshi) / ৫-৬ কেজি/হেক্টর (তোষা), ৭-৮ কেজি/হেক্টর (দেশি)",
        depth: "2-3 cm / ২-৩ সেমি",
        spacing: "Row distance 12 in (30 cm), plant distance 3 in (7 cm) / সারির দূরত্ব ১২ ইঞ্চি (৩০ সেমি), চারার দূরত্ব ৩ ইঞ্চি (৭ সেমি)",
        popularVarieties: "BJRI Tosha Jute 8 (Robi-1), O-9897, C-6 (Deshi) / বিজেআরআই তোষা পাট ৮ (রবি-১), ও-৯৮৯৭, সি-৬ (দেশি পাট)"
      },
      bighaFertilizer: {
        urea: "18 kg (2 splits) / ১৮ কেজি (দুই কিস্তিতে)",
        tsp: "7 kg / ৭ কেজি",
        mop: "8 kg / ৮ কেজি"
      },
      farmerTips: "First weeding & thinning at 20-25 days after sowing. Treat seeds with Provax/Autostin against stem rot. / পাট বোনার ২০-২৫ দিন পর ১ম বার পাতলাকরণ ও নিড়ানি দিন। কাণ্ড পচা রোধে প্রভ্যাক্স বা অটোস্টিন দিয়ে বীজ শোধন করে বপন করুন।",
      description: "বাংলাদেশের ঐতিহ্যবাহী পরিবেশবান্ধব অর্থকরী ফসল। উঁচু আঁশ ও উন্নত পাট উৎপাদনে শীর্ষ।",
      fertilizers: ["Urea", "TSP", "MOP"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি প্রস্তুতি (Land Preparation)",
          details: "জমি ৫-৬ বার আড়াআড়ি চাষ ও মই দিয়ে আগাছামুক্ত ধুলিময় করে সমতল করুন।",
          duration: "৭-১০ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "বীজ শোধন (Seed Treatment)",
          details: "প্রতি কেজি তোষা পাট বীজে ২.৫ গ্রাম কারবেনডাজিম বা অটোস্টিন মিশিয়ে শোধন করুন যাতে কাণ্ড পচা না হয়।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "বীজ বপন (Sowing)",
          details: "সারিতে ৩০ সেমি দূরে দূরে লাইনে বীজ বুনে পাতলা মাটি দিয়ে ঢেকে দিন। চৈত্র-বৈশাখ মাসে বপন উত্তম।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "পাতলাকরণ ও নিড়ানি (Thinning & Weeding)",
          details: "গাছ ৩-৪ ইঞ্চি লম্বা হলে গাছ পাতলা করে ৭-৮ সেমি পর পর একটি সবল গাছ রাখুন। ইউরিয়া উপরিপ্রয়োগ করুন।",
          duration: "২০-৩৫ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "রোগ ও হলুদ মাকড় দমন (Pest Management)",
          details: "হলুদ মাকড় দেখা দিলে ভার্টিমেক বা নিমতেল স্প্রে করুন। কাণ্ড পচা রোধে জমিতে পানি জমতে দেবেন না।",
          duration: "৪০-৮০ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "পাট কাটা, জাগ ও আঁশ ছাড়ানো (Harvesting & Retting)",
          details: "১০০-১২০ দিনে গাছে ফুল আসার মুখে পাট কেটে আঁটি বেঁধে পরিষ্কার পানিতে জাগ দিন। পচে গেলে আঁশ ছাড়িয়ে রোদে শুকান।",
          duration: "১০০-১৩০ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "crop_mustard",
      name: "Mustard / সরিষা",
      scientificName: "Brassica napus / Brassica juncea",
      type: "Oilseed / তেলবীজ",
      image: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Fertile Loam & Clay-Loam Soil / উর্বর দোআঁশ ও এটেল-দোআঁশ মাটি",
      optimalPH: "6.0 - 7.2",
      waterRequirement: "Low (1-2 light irrigations) / কম (১-২টি হালকা সেচ)",
      growthDuration: "75 - 90 Days (short duration) / ৭৫ - ৯০ দিন (স্বল্প মেয়াদী)",
      temperatureRange: "15°C - 25°C / ১৫°সে - ২৫°সে",
      plantingSeason: "Rabi / Winter (Oct-Nov) / রবি/শীতকাল (কার্তিক মাস / অক্টোবর-নভেম্বর)",
      bighaSeedRate: "1 - 1.25 kg per bigha / ১ - ১.২৫ কেজি প্রতি বিঘা",
      seedInfo: {
        rate: "7-8 kg/ha (1-1.25 kg/bigha) / ৭-৮ কেজি/হেক্টর (বিঘায় ১-১.২৫ কেজি)",
        depth: "2-3 cm / ২-৩ সেমি",
        spacing: "Row distance 12 in (30 cm) / সারির দূরত্ব ১২ ইঞ্চি (৩০ সেমি)",
        popularVarieties: "BARI Mustard 14 (matures in 75-80 days), BARI Mustard 17, BARI Mustard 18 (Canola type), Tori-7 / বারি সরিষা ১৪ (৭৫-৮০ দিনে পাকে), বারি সরিষা ১৭, বারি সরিষা ১৮, টোড়ি-৭"
      },
      bighaFertilizer: {
        urea: "33 kg / ৩৩ কেজি",
        tsp: "18 kg / ১৮ কেজি",
        mop: "15 kg / ১৫ কেজি",
        gypsum: "20 kg (Sulfur boosts oil content) / ২০ কেজি (সালফার তেলের পরিমাণ বাড়ায়)",
        boron: "1.5 kg Boron / ১.৫ কেজি (বোরন দানা পুষ্ট করে)"
      },
      farmerTips: "Cultivating mustard after Aman rice provides high profit. Use yellow sticky traps or Admire spray for aphids. / আমনের পর সরিষা আবাদ করলে অতিরিক্ত লাভ হয়। জাব পোকা দমনে গাছে হলুদ ফাঁদ বা এডমিয়ার স্প্রে করুন। সালফার সার ব্যবহারে সরিষায় তেলের শতাংশ বাড়ে।",
      description: "বাংলাদেশের প্রধান ভোজ্য তেল ফসল। রোপণের মাত্র ৭৫-৮০ দিনের মধ্যে বিঘায় ৫-৭ মন সরিষা পাওয়া যায়।",
      fertilizers: ["Urea", "TSP", "MOP", "Gypsum", "Boron"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি প্রস্তুতি (Land Preparation)",
          details: "আমন ধান কাটার পর জো অবস্থায় ৩-৪টি চাষ ও মই দিয়ে মাটি ঝুরঝুরে করুন। সালফার হিসেবে পর্যাপ্ত জিপসাম ও বোরন দিন।",
          duration: "৫ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "উন্নত জাত নির্বাচন (Seed Selection)",
          details: "স্বল্পমেয়াদী বারি সরিষা ১৪ বা উচ্চফলনশীল বারি সরিষা ১৭ নির্বাচন করুন। রোভরাল দিয়ে বীজ শোধন করুন।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "বীজ বপন (Sowing)",
          details: "কার্তিক মাসে (অক্টোবরের শেষ থেকে নভেম্বরের প্রথম সপ্তাহ) সারিতে ৩০ সেমি দূরে ছিটিয়ে বা লাইন করে বীজ বুনে দিন।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "সার ও সেচ প্রয়োগ (Fertilization & Irrigation)",
          details: "বীজ গজানোর ২০-২৫ দিনে প্রথম হালকা সেচ ও অবশিষ্ট ইউরিয়া উপরিপ্রয়োগ করুন। ফুল ফোটার সময় যেন জমিতে খরা না থাকে।",
          duration: "২০-৪০ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "জাব পোকা ও ব্লাইট দমন (Aphid & Blight Control)",
          details: "ফুল ও ফলে জাব পোকা দেখা দিলে হলুদ আঠালো ফাঁদ অথবা ইমিডাক্লোপ্রিড স্প্রে করুন। অলটারনারিয়া ব্লাইট রোধে রোভরাল স্প্রে করুন।",
          duration: "৩৫-৬৫ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "ফসল সংগ্রহ ও মাড়াই (Harvesting)",
          details: "গাছ ও ফল ৭৫-৮০% হলদেটে বা তামাটে রঙ ধারণ করলে সকালের দিকে কেটে রোদে শুকিয়ে মাড়াই করুন।",
          duration: "৭৫-৯০ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "crop_chilli",
      name: "Chilli (Pepper) / মরিচ",
      scientificName: "Capsicum annuum",
      type: "Spice / মসলা ফসল",
      image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Well-drained Fertile Sandy-Loam Soil / সুনিষ্কাশিত বেলে-দোআঁশ ও দোআঁশ মাটি",
      optimalPH: "6.0 - 7.0",
      waterRequirement: "Medium (Sensitive to waterlogging) / মাঝারি (পানি জমে থাকা একদম সহ্য করতে পারে না)",
      growthDuration: "120 - 150 Days / ১২০ - ১৫০ দিন",
      temperatureRange: "18°C - 35°C / ১৮°সে - ৩৫°সে",
      plantingSeason: "Winter (Oct-Nov) & Summer/Monsoon (Mar-Apr) / রবি (আশ্বিন-কার্তিক) ও খরিপ (ফাল্গুন-চৈত্র)",
      bighaSeedRate: "120 - 150 g per bigha (nursery) / ১২০ - ১৫০ গ্রাম প্রতি বিঘা (বীজতলায় চারা তৈরি)",
      seedInfo: {
        rate: "1 kg/ha (120-150 g/bigha) / ১ কেজি/হেক্টর (বিঘায় ১২০-১৫০ গ্রাম)",
        depth: "1 cm / ১ সেমি",
        spacing: "Row distance 20 in (50 cm), plant distance 16 in (40 cm) / সারির দূরত্ব ২০ ইঞ্চি (৫০ সেমি), চারার দূরত্ব ১৬ ইঞ্চি (৪০ সেমি)",
        popularVarieties: "BARI Morich 1, BARI Morich 2, Bindu, Kamranga, Sonic, Bijli Plus / বারি মরিচ ১, বারি মরিচ ২, বিন্দু, কামরাঙা, সোনিক, বিজলী প্লাস"
      },
      bighaFertilizer: {
        urea: "30 kg (3 splits) / ৩০ কেজি (তিন কিস্তিতে)",
        tsp: "20 kg / ২০ কেজি",
        mop: "20 kg / ২০ কেজি",
        gypsum: "12 kg / ১২ কেজি",
        zinc: "1.5 kg / ১.৫ কেজি",
        vermi: "150 kg Vermicompost / ১৫০ কেজি (কেঁচো সার)"
      },
      farmerTips: "Thrips cause leaf curling; spray Vertimec or Admire with soap water. Never allow standing water in chilli beds. / মরিচের পাতা কোকড়ানো রোগ মূলত চুষি পোকা (থ্রিপস ও মাকড়) দিয়ে হয়। ভার্টিমেক ও এডমিয়ার স্প্রে করুন। মরিচ ক্ষেতে কখনই পানি জমতে দেবেন না।",
      description: "বাংলাদেশের সর্বাধিক ব্যবহৃত ও অত্যন্ত অর্থকরী মসলা ফসল। কাঁচা ও শুকনা মরিচ হিসেবে বিঘায় ৬০-৮০ মন পর্যন্ত ফলন পাওয়া যায়।",
      fertilizers: ["Urea", "TSP", "MOP", "Gypsum", "Vermicompost"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি ও উঁচু বেড তৈরি (Land Preparation)",
          details: "জমি ৪-৫ বার চাষ দিয়ে মাটি ঝুরঝুরে করুন। মরিচের জন্য ৩০-৪০ সেমি উঁচু বেড ও নিষ্কাশন নালা তৈরি করা আবশ্যক।",
          duration: "৭ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "বীজ শোধন ও চারা তৈরি (Seedling Raising)",
          details: "বীজতলায় বীজ বুনে ৩০-৩৫ দিনের সুস্থ চারা তৈরি করুন। বীজ বপনের আগে প্রভ্যাক্স বা ট্রাইকোডার্মা দিয়ে শোধন করুন।",
          duration: "৩০ দিন",
          image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "চারা রোপণ (Transplanting)",
          details: "উঁচু বেডে সারি করে ৫০ সেমি দূরত্বে এবং চারা থেকে চারা ৪০ সেমি দূরত্বে রোপণ করুন। বিকেলে চারা লাগান।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "সার ও সেচ ব্যবস্থাপনা (Fertilizer & Irrigation)",
          details: "ইউরিয়া ও পটাশ সার চারা লাগানোর ২৫, ৫০ ও ৭৫ দিনের মাথায় ৩ কিস্তিতে উপরিপ্রয়োগ করুন। হালকা সেচ দিন।",
          duration: "২৫-৮০ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "পাতা কোকড়ানো ও ফল পচা রোগ দমন (Pest Control)",
          details: "পাতা কোকড়ানো রোধে ইমিডাক্লোপ্রিড ও ভার্টিমেক স্প্রে করুন। অ্যানথ্রাকনোজ (ফল পচা) রোগ দমনে নাটিভো বা টিল্ট স্প্রে করুন।",
          duration: "৩৫-১০০ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "মরিচ সংগ্রহ ও শুকানো (Harvesting & Drying)",
          details: "কাঁচা মরিচ পর্যাপ্ত বড় ও শক্ত হলে বোঁটাসহ তুলুন। শুকনা মরিচের জন্য গাছপাকা টকটকে লাল মরিচ তুলে রোদে শুকিয়ে নিন।",
          duration: "৮০-১৫০ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "crop_lentil",
      name: "Lentil / মসুর ডাল",
      scientificName: "Lens culinaris",
      type: "Pulse / ডাল ফসল",
      image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Fertile Loam & Alluvial Soil / উর্বর দোআঁশ ও পলি মাটি",
      optimalPH: "6.0 - 7.5",
      waterRequirement: "Low (1 light irrigation if needed) / কম (প্রয়োজনে ১টি হালকা সেচ)",
      growthDuration: "95 - 110 Days / ৯৫ - ১১০ দিন",
      temperatureRange: "14°C - 25°C / ১৪°সে - ২৫°সে",
      plantingSeason: "Rabi / Winter (Oct-Nov) / রবি/শীতকাল (কার্তিক - অগ্রহায়ণ / মধ্য অক্টোবর - মধ্য নভেম্বর)",
      bighaSeedRate: "4 - 4.5 kg per bigha / ৪ - ৪.৫ কেজি প্রতি বিঘা",
      seedInfo: {
        rate: "30-35 kg/ha (4-4.5 kg/bigha) / ৩০-৩৫ কেজি/হেক্টর (বিঘায় ৪-৪.৫ কেজি)",
        depth: "3-4 cm / ৩-৪ সেমি",
        spacing: "Row distance 10 in (25 cm) / সারির দূরত্ব ১০ ইঞ্চি (২৫ সেমি)",
        popularVarieties: "BARI Masur 6, BARI Masur 7, BARI Masur 8 (Stemphylium blight resistant) / বারি মসুর ৬, বারি মসুর ৭, বারি মসুর ৮ (স্টেমফিলিয়াম ব্লাইট প্রতিরোধী)"
      },
      bighaFertilizer: {
        urea: "6 kg (low N requirement) / ৬ কেজি (নাইট্রোজেন কম লাগে)",
        tsp: "12 kg (boosts root growth) / ১২ কেজি (ফসফরাস মূল বাড়ায়)",
        mop: "8 kg / ৮ কেজি",
        bio: "Rhizobium Bio-fertilizer (100g/kg seed) / রাইজোবিয়াম অণুজীব সার (১০০ গ্রাম/কেজি বীজ)"
      },
      farmerTips: "Inoculate seeds with Rhizobium bio-fertilizer to reduce urea cost and fix atmospheric nitrogen into soil. / রাইজোবিয়াম অণুজীব সার দিয়ে বীজ শোধন করলে ইউরিয়া দেওয়ার প্রয়োজন পড়ে না এবং মাটির উর্বরতা বাড়ে। শিকড়ে পানি জমতে দেবেন না।",
      description: "প্রোটিন সমৃদ্ধ প্রধান ডাল ফসল। জমিকে নাইট্রোজেনে সমৃদ্ধ করে পরবর্তী ফসলের সার খরচ কমায়।",
      fertilizers: ["TSP", "MOP", "Bio-fertilizer (Rhizobium)"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি প্রস্তুতি (Land Preparation)",
          details: "আমনের পর জো অবস্থায় ২-৩টি চাষ ও মই দিয়ে জমি সমতল করুন।",
          duration: "৫ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "রাইজোবিয়াম শোধন (Bio-Inoculation)",
          details: "প্রতি কেজি বীজে ১০০ গ্রাম রাইজোবিয়াম অণুজীব সার ও চিটাগুড়ের মিশ্রণ মিশিয়ে ছায়ায় শুকিয়ে নিন।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "বীজ বপন (Sowing)",
          details: "কার্তিক মাসে সারিতে ২৫ সেমি দূরত্বে বীজ বুনে দিন। বীজ ৩-৪ সেমি গভীরে রাখুন।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "পরিচর্যা ও সেচ (Care & Irrigation)",
          details: "গাছ গজানোর ২৫ দিনে আগাছা নিড়ানি দিন। অতিরিক্ত খরা থাকলে ফুল আসার আগে ১টি হালকা সেচ দিন।",
          duration: "২৫-৫০ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "স্টেমফিলিয়াম ব্লাইট দমন (Blight Control)",
          details: "কুয়াশা ও মেঘলা আবহাওয়ায় রোভরাল বা নাটিভো স্প্রে করুন যেন পাতা ও ফুল ঝরে না যায়।",
          duration: "৪০-৭০ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "ফসল তোলা ও মাড়াই (Harvesting)",
          details: "গাছের পাতা ও শুঁটি হলদে-বাদামি হয়ে শুকিয়ে গেলে তুলে সকালে মাড়াই করে শুকান।",
          duration: "৯৫-১১০ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: "crop_onion",
      name: "Onion / পেঁয়াজ",
      scientificName: "Allium cepa",
      type: "Spice & Vegetable / পেঁয়াজ ও মশলা",
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=700&q=80",
      idealSoil: "Friable Well-drained Sandy-Loam Soil / ঝুরঝুরে সুনিষ্কাশিত বেলে-দোআঁশ মাটি",
      optimalPH: "6.0 - 7.0",
      waterRequirement: "Medium (4-5 light irrigations) / মাঝারি (৪-৫টি হালকা সেচ)",
      growthDuration: "90 - 110 Days / ৯০ - ১১০ দিন",
      temperatureRange: "15°C - 28°C / ১৫°সে - ২৮°সে",
      plantingSeason: "Rabi (Oct-Nov) & Summer (BARI Onion 5) / রবি/শীতকাল (কার্তিক-অগ্রহায়ণ) ও গ্রীষ্মকাল (বারি পেঁয়াজ ৫)",
      bighaSeedRate: "1 - 1.2 kg seeds or 100-120 kg sets / ১ - ১.২ কেজি (বীজ) অথবা ১০০-১২০ কেজি (কন্দ/গুটি)",
      seedInfo: {
        rate: "8-10 kg/ha seeds or 1000 kg sets / ৮-১০ কেজি/হেক্টর (বীজ) বা ১০০০০ কেজি গুটি",
        depth: "1.5-2 cm / ১.৫-২ সেমি",
        spacing: "Row distance 6 in (15 cm), plant distance 4 in (10 cm) / সারির দূরত্ব ৬ ইঞ্চি (১৫ সেমি), গাছের দূরত্ব ৪ ইঞ্চি (১০ সেমি)",
        popularVarieties: "BARI Onion 1, BARI Onion 4, BARI Onion 5 (Summer), Taherpuri, Faridpuri / বারি পেঁয়াজ ১, বারি পেঁয়াজ ৪, বারি পেঁয়াজ ৫ (গ্রীষ্মকালীন), তাহেরপুরী, ফরিদপুরী"
      },
      bighaFertilizer: {
        urea: "30 kg / ৩০ কেজি",
        tsp: "25 kg / ২৫ কেজি",
        mop: "25 kg / ২৫ কেজি",
        gypsum: "15 kg / ১৫ কেজি",
        zinc: "1.5 kg / ১.৫ কেজি"
      },
      farmerTips: "Spray Rovral or Nativo upon observing Purple Blotch spots. Stop watering 15 days before harvest to prevent rot. / পেঁয়াজের বেগুনী দাগ (Purple Blotch) দেখা দিলে রোভরাল বা নাটিভো স্প্রে করুন। কন্দ পরিপক্ক হলে সেচ বন্ধ রাখুন যেন পেঁয়াজ পচে না যায়।",
      description: "ফরিদপুর, পাবনা ও রাজশাহী অঞ্চলের অন্যতম লাভজনক মশলা ফসল। বিঘায় ৫০-৭০ মন পেঁয়াজ পাওয়া যায়।",
      fertilizers: ["Urea", "TSP", "MOP", "Gypsum", "Zinc Sulphate"],
      cultivationStages: [
        {
          step: 1,
          name: "জমি প্রস্তুতি (Land Preparation)",
          details: "জমি ৪-৫ বার চাষ দিয়ে মাটি ঝুরঝুরে করুন এবং ড্রেনযুক্ত উঁচু বেড তৈরি করুন।",
          duration: "৭ দিন",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 2,
          name: "চারা তৈরি ও শোধন (Seedling Prep)",
          details: "বীজতলায় বীজ বুনে ৪০-৪৫ দিনের চারা তৈরি করুন। চারা অটোস্টিন দিয়ে শোধন করে নিন।",
          duration: "৪৫ দিন",
          image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 3,
          name: "চারা রোপণ (Transplanting)",
          details: "সারি থেকে সারি ১৫ সেমি ও চারা থেকে চারা ১০ সেমি দূরত্বে লাগান।",
          duration: "১ দিন",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 4,
          name: "সার ও সেচ প্রয়োগ (Fertilizer & Irrigation)",
          details: "ইউরিয়া কিস্তিতে দিন এবং কন্দ বৃদ্ধির সময় মাটির আর্দ্রতা বজায় রাখতে হালকা সেচ দিন।",
          duration: "২০-৬০ দিন",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 5,
          name: "রোগ ও পোকা নিয়ন্ত্রণ (Pest & Disease)",
          details: "বেগুনী দাগ রোগ হলে রোভরাল এবং থ্রিপস পোকা হলে এডমিয়ার স্প্রে করুন।",
          duration: "৩০-৭০ দিন",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80"
        },
        {
          step: 6,
          name: "পেঁয়াজ উত্তোলন ও কিউরিং (Harvesting & Curing)",
          details: "গাছের পাতা ভেঙে পড়লে পেঁয়াজ তুলে ছায়ায় শুকিয়ে গুদামজাত করুন।",
          duration: "৯০-১১০ দিন",
          image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
        }
      ]
    }
  ],

  // 2. DISEASES & PESTS (রোগ ও পোকামাকড় শনাক্তকরণ কেন্দ্র)
  diseases: [
    {
      id: "dis_rice_blast",
      cropIds: ["crop_rice"],
      name: "Rice Blast / ধানের ব্লাস্ট রোগ",
      pathogen: "Magnaporthe oryzae (Fungus / ছত্রাক)",
      targetCrops: "Rice (Boro, Aman, Aush) / ধান (আমন, বোরো ও আউশ ধান)",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
      easySymptoms: "Eye-shaped brown lesions on leaves. Black rotted neck nodes causing empty white panicles. / পাতায় চোখের মতো বা মাকু আকৃতির বাদামি দাগ (মাঝখান ধূসর)। শীষের গোড়া বা গিরার অংশ কালো হয়ে পচে ভেঙে পড়ে এবং শীষের পুরো ধান চিটা হয়ে সাদা হয়ে যায়।",
      symptoms: "Spindle shaped leaf spots with gray centers and neck rot turning panicles white. / পাতায় চোখের মতো লম্বাটে দাগ পড়ে যার চারপাশ বাদামি ও মাঝখানটা ধূসর হয়। গিট ব্লাস্ট হলে গিরার অংশ কালো হয়ে পচে যায় এবং শীষের ধান চিটা হয়ে যায়।",
      prevention: "Avoid excess urea, use balanced potash, treat seeds with Trichoderma, grow BRRI Dhan28/89. / ১. অতিরিক্ত ইউরিয়া দেওয়া বন্ধ রাখুন। ২. সুষম পটাশ (এমওপি) সার ব্যবহার করুন। ৩. বীজ বপনের পূর্বে প্রভ্যাক্স বা ট্রাইকোডার্মা দিয়ে বীজ শোধন করুন। ৪. প্রতিরোধশীল জাত (ব্রি ধান২৮/৮৯) চাষ করুন।",
      brandNames: "Nativo 75WG, Trooper 75WP, Tricyclazole, Amistar Top / নাটিভো ৭৫ ডাব্লিউজি, ট্রুপার, ট্রাইসাইক্লাজোল",
      tankDosage: "10g Nativo or 12g Trooper per 16L spray tank. / ১৬ লিটারের ১ স্প্রে ট্যাংকে: নাটিভো ১০ গ্রাম অথবা ট্রুপার ১২ গ্রাম পানির সাথে মিশিয়ে বিকেলে স্প্রে করুন।",
      treatment: "Spray Tricyclazole (Trooper 0.8g/L) or Nativo 0.6g/L twice at 7-10 day intervals. / লক্ষণ দেখা দিলে ট্রাইসাইক্লাজোল বা নাটিভো (যেমন- ট্রুপার ৭৫ ডাব্লিউপি প্রতি লিটার পানিতে ০.৮ গ্রাম অথবা নাটিভো ০.৬ গ্রাম মিশিয়ে) ৭-১০ দিন পর পর ২ বার স্প্রে করুন।",
      organicTreatment: "Spray 5ml Neem Oil + 2g detergent/L or apply 50kg Tricho-compost/bigha. / দেশি টোটকা: ৫ মিলি নিম তেল + ২ গ্রাম সাবানের গুঁড়ো প্রতি লিটার পানিতে মিশিয়ে স্প্রে করুন। বিঘায় ৫০ কেজি ট্রাইকো-কম্পোস্ট দিন।",
      emergencyNotice: "Cool humid nights accelerate blast. Stop urea immediately and broadcast potash. Call 16123 helpline. / সতর্কতা: আর্দ্র বাতাস ও রাতে ঠাণ্ডা পরলে রোগ দ্রুত ছড়ায়। সাথে সাথে ইউরিয়া দেওয়া বন্ধ করে পটাশ ছিটান। সহায়তার জন্য কৃষি কল সেন্টার ১৬১২৩ এ কথা বলুন।"
    },
    {
      id: "dis_late_blight",
      cropIds: ["crop_potato", "crop_tomato"],
      name: "Late Blight / আলু ও টমেটোর নাবি ধসা রোগ",
      pathogen: "Phytophthora infestans (Oomycete Fungus / ছত্রাক)",
      targetCrops: "Potato & Tomato / আলু, টমেটো",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
      easySymptoms: "Water-soaked dark lesions on leaves with white powdery fungal growth underneath in morning fog. / কালো-বাদামি ভেজা দাগ পাতা ও কাণ্ডে ছড়ায়। ভোরে পাতার নিচে সাদা পাউডারের মতো ছাতা পড়ে এবং ১-২ দিনের মধ্যে পুরো ক্ষেত পুড়ে যাওয়ার মতো পচে যায়।",
      symptoms: "Water-soaked dark lesions on leaves, white fungal powder underneath during humid weather, rapid rot of tubers/fruits. / পাতায় ভেজা কালচে দাগ দেখা যায়, আর্দ্র ও স্যাঁতসেঁতে আবহাওয়ায় পাতার নিচে সাদা ছত্রাকের গুঁড়ো জমে এবং দ্রুত আলু বা টমেটো পচে যায়।",
      prevention: "Use disease-free seed potatoes, earthing up ridges, apply preventive Mancozeb in fog. / ১. প্রত্যয়িত নিরাময়মুক্ত বীজ আলু ব্যবহার করুন। ২. গাছের গোড়ায় মাটি উঁচু করে দিন যাতে পানি না জমে। ৩. কুয়াশাচ্ছন্ন আবহাওয়ায় আগাম প্রতিরোধমূলক ম্যানকোজেব স্প্রে করুন।",
      brandNames: "Secure, Ridomil Gold MZ, Dithane M-45, Melody Duo / সিকিউর, রিডোমিল গোল্ড, ডাইথেন এম-৪৫, মেলোডি ডিও",
      tankDosage: "32g Secure or Ridomil Gold per 16L spray tank. / ১৬ লিটারের ১ স্প্রে ট্যাংকে: সিকিউর বা রিডোমিল গোল্ড ৩২ গ্রাম পানির সাথে মিশিয়ে ভালো করে পাতা ও কাণ্ড ভিজিয়ে স্প্রে করুন।",
      treatment: "Spray Secure or Ridomil Gold (2g/L) at 5-7 day intervals upon first symptom. / লক্ষণ দেখা দিলে প্রতি লিটার পানিতে ২ গ্রাম সিকিউর বা রিডোমিল গোল্ড অথবা ম্যানকোজেব জাতীয় ছত্রাকনাশক ৫-৭ দিন পর পর স্প্রে করুন।",
      organicTreatment: "Spray 1% Bordeaux mixture (Copper sulphate + Lime 1:1). / ঘোরোয়া উপায়: ১% বর্দো মিক্সচার (তুঁতে ও চুন ১:১ অনুপাতে) তৈরি করে গাছে ছিটান।",
      emergencyNotice: "During cold waves and dense fog, spray after 12 PM on damp days. / জরুরি টিপস: শৈত্যপ্রবাহ ও ঘন কুয়াশায় স্প্রে স্থগিত না রেখে স্যাঁতসেঁতে দিনে দুপুর ১২টার পর স্প্রে করুন।"
    },
    {
      id: "dis_eggplant_borer",
      cropIds: ["crop_eggplant"],
      name: "Fruit & Shoot Borer / বেগুনের ডগা ও ফল ছিদ্রকারী পোকা",
      pathogen: "Leucinodes orbonalis (Insect Pest / কীটপতঙ্গ)",
      targetCrops: "Eggplant (Brinjal) / বেগুন",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
      easySymptoms: "Tender shoots wilt and dry up. Bore holes on brinjal fruits containing frass. / কচি ডগা হেলে পড়ে ও শুকিয়ে যায়। বেগুনের গায়ে ছিদ্র দেখা যায় এবং কাটার পর ভেতরে পোকা ও মল পাওয়া যায়।",
      symptoms: "Wilted shoot tips and bored fruits packed with insect larvae and excrement. / কচি ডগা হেলে পড়ে ও শুকিয়ে যায়। বেগুনের গায়ে ছিদ্র দেখা যায় এবং কাটার পর ভেতরে পোকা ও মল পাওয়া যায়।",
      prevention: "Clip and bury infested shoots; install 5-6 sex pheromone traps per bigha. / ১. আক্রান্ত ডগা কাঁচি দিয়ে কেটে মাটির নিচে পুঁতে ফেলুন। ২. বিঘায় ৫-৬টি সেক্স ফেরোমন ট্র্যাপ (ফাঁদ) ঝুলিয়ে দিন।",
      brandNames: "Proclaim 5SG, Cypermethrin (Ripcord / Cymbush), Voliam Flexi / প্রোক্লেম, সাইপারমেথ্রিন, ভলিউম ফ্লেক্সি",
      tankDosage: "16g Proclaim or 16ml Cypermethrin per 16L spray tank in evening. / ১৬ লিটারের ১ স্প্রে ট্যাংকে: প্রোক্লেম ১৬ গ্রাম অথবা সাইপারমেথ্রিন ১৬ মিলি বিকেলের দিকে স্প্রে করুন।",
      treatment: "Spray Cypermethrin 1ml/L or Proclaim 1g/L during late afternoon. / লক্ষণ দেখা দিলে সাইপারমেথ্রিন (১ মিলি/লিটার) অথবা প্রোক্লেম (১ গ্রাম/লিটার) বিকেলের দিকে স্প্রে করুন।",
      organicTreatment: "Install pheromone traps and spray Neem Oil (5ml/L) + soap solution. / জৈব সমাধান: সেক্স ফেরোমন ট্র্যাপ ঝুলানো এবং নিম তেল (৫ মিলি/লিটার) + সাবান পানি স্প্রে করা।",
      emergencyNotice: "Growing Bt Eggplant eliminates the need for chemical spraying against fruit borer. / কৃষক টিপস: বিটি বেগুন (Bt Begun) চাষ করলে ফল ছিদ্রকারী পোকার জন্য কোন কীটনাশক ছিটানো লাগে না।"
    },
    {
      id: "dis_corn_armyworm",
      cropIds: ["crop_corn"],
      name: "Fall Armyworm / ভুট্টার ফল আর্মিওয়ার্ম পোকা",
      pathogen: "Spodoptera frugiperda (Insect Pest / কীটপতঙ্গ)",
      targetCrops: "Maize (Corn) / ভুট্টা",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
      easySymptoms: "Caterpillars bore into central whorls leaving large ragged holes and frass pellets. / ভুট্টার কচি চোঙা বা মাইজ পাতার ভেতর পোকা ঢুকে গোল ছিদ্র করে পাতা চিবিয়ে ফেলে এবং চালের গুঁড়োর মতো বর্জ্য জমা করে।",
      symptoms: "Saw-toothed holes on leaf whorls with frass accumulated in central cone. / ভুট্টার মাইজ (চোঙা) পাতার গোড়ায় পোকা ঢুকে গোল গোল ছিদ্র করে পাতায় করাত কাটার দাগ ফেলে ও বর্জ্য জমা করে।",
      prevention: "Install sex pheromone traps; check young corn whorls daily. / ১. ক্ষেতে সেক্স ফেরোমন ট্র্যাপ ও হলুদ ফাঁদ দিন। ২. কচি গাছে নিয়মিত চোঙা পরীক্ষা করুন।",
      brandNames: "Proclaim 5SG, Spinotoram (Delegate), Belt Expert / প্রোক্লেম, স্পিনোটোরাম, বেল্ট এক্সপার্ট",
      tankDosage: "16g Proclaim or 16ml Spinotoram per 16L tank directly into whorls. / ১৬ লিটারের ১ স্প্রে ট্যাংকে: প্রোক্লেম ১৬ গ্রাম অথবা স্পিনোটোরাম ১৬ মিলি সরাসরি ভুট্টার চোঙার ভেতরে স্প্রে করুন।",
      treatment: "Spray Proclaim (1g/L) or Spinotoram (1ml/L) directly inside central whorl. / প্রোক্লেম (৫ এসজি ১ গ্রাম/লিটার) অথবা স্পিনোটোরাম (১ মিলি/লিটার) চোঙার ভেতর সরাসরি স্প্রে করুন।",
      organicTreatment: "Drop dry wood ash or fine sand into central whorls to kill larvae. / ঘোরোয়া টোটকা: ভুট্টার পাতার চোঙার মধ্যে শুকনো কাঠের ছাই বা বেলে মাটি গুঁড়ো করে ফেলে দিলে পোকা মরে যায়।",
      emergencyNotice: "Direct spray nozzle into central whorls late in afternoon when larvae emerge. / সতর্কতা: বিকেলের দিকে যখন পোকা বের হয় তখন চোঙার ভেতরে স্প্রে নল ঢুকিয়ে ছিটান।"
    },
    {
      id: "dis_chilli_anthracnose",
      cropIds: ["crop_chilli"],
      name: "Anthracnose & Dieback / মরিচের ফল পচা ও ডাইব্যাক রোগ",
      pathogen: "Colletotrichum capsici (Fungus / ছত্রাক)",
      targetCrops: "Chilli (Pepper) / মরিচ",
      image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80",
      easySymptoms: "Sunken circular dark spots on ripening chillies with black concentric rings; twigs die from tip downward. / পাকা বা কাঁচা মরিচের গায়ে গোল দেবে যাওয়া কালচে দাগ পড়ে ও মরিচ পচে শুকিয়ে যায়। গাছের ডাল আগা থেকে শুকিয়ে মারা যায়।",
      symptoms: "Circular sunken black spots on fruit turning straw color, drying up of branches from apex. / মরিচের গায়ে বাদামি-কালো দাগ হয়ে মরিচ পচে যায় এবং ডালের আগা মরে নিচের দিকে শুকিয়ে আসে।",
      prevention: "Treat seeds with Provax (2.5g/kg); prune and destroy dried twigs; ensure bed drainage. / ১. প্রভ্যাক্স দিয়ে বীজ শোধন করুন। ২. আক্রান্ত ডাল কেটে পুড়িয়ে ফেলুন। ৩. জমিতে পানি জমতে দেবেন না।",
      brandNames: "Nativo 75WG, Tilt 250EC, Amistar Top, Dithane M-45 / নাটিভো, টিল্ট, অ্যামিস্টার টপ, ডাইথেন এম-৪৫",
      tankDosage: "10g Nativo or 16ml Tilt per 16L spray tank. / ১৬ লিটারের ১ স্প্রে ট্যাংকে: নাটিভো ১০ গ্রাম অথবা টিল্ট ১৬ মিলি মিশিয়ে স্প্রে করুন।",
      treatment: "Spray Nativo (0.6g/L) or Tilt 250EC (1ml/L) twice at 10-day intervals during flowering and fruit setting. / ফুল আসা ও মরিচ ধরার সময় প্রতি লিটার পানিতে নাটিভো ০.৬ গ্রাম বা টিল্ট ১ মিলি মিশিয়ে স্প্রে করুন।",
      organicTreatment: "Spray Garlic extract (50g crushed garlic in 1L water) + Neem oil. / দেশি উপায়: রসুনের রস ও নিম তেল স্প্রে করুন।",
      emergencyNotice: "Pick all affected fruits immediately before spraying to prevent fungal sporulation. / টিপস: স্প্রে করার আগে আক্রান্ত মরিচগুলো ছিঁড়ে নষ্ট করে ফেলুন।"
    },
    {
      id: "dis_jute_rot",
      cropIds: ["crop_jute"],
      name: "Stem Rot & Foot Rot / পাটের কাণ্ড পচা ও গোড়া পচা রোগ",
      pathogen: "Macrophomina phaseolina (Fungus / ছত্রাক)",
      targetCrops: "Jute / পাট",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
      easySymptoms: "Black spots on jute stem, black rotting at stem base with foul odor, stem breaks in wind. / পাটের কান্ডে ছোট কালো ফোটা ছোপ দাগ পড়ে, গোড়া কালো হয়ে পচে গন্ধ বের হয় এবং বাতাসে কান্ড ভেঙে পড়ে।",
      symptoms: "Black specks on stems, rotted black foot base, stem snapping in wind. / পাটের কান্ডে কালো ফোটা দাগ পড়ে, গোড়া কালো হয়ে পচে যায় এবং বাতাসে কান্ড ভেঙে পড়ে।",
      prevention: "Treat seeds with Provax/Autostin (2.5g/kg seed); ensure proper land drainage. / ১. বীজ বপনের পূর্বে অটোস্টিন বা প্রভ্যাক্স (২.৫ গ্রাম/কেজি) দিয়ে বীজ শোধন করুন। ২. সেচের পর পানি জমে থাকতে দেবেন না।",
      brandNames: "Autostin 50WP (Carbendazim), Provax 200WP / অটোস্টিন, প্রভ্যাক্স",
      tankDosage: "32g Autostin per 16L spray tank drenching stem base. / ১৬ লিটারের ১ স্প্রে ট্যাংকে: অটোস্টিন ৩২ গ্রাম মিশিয়ে পাটের কাণ্ড ও গোড়া ভিজিয়ে স্প্রে করুন।",
      treatment: "Spray Carbendazim (Autostin 2g/L) twice at 7-10 day intervals. / কারবেনডাজিম গ্রুপের ওষুধ (অটোস্টিন ২ গ্রাম/লিটার) ৭-১০ দিন পর পর ২ বার স্প্রে করুন।",
      organicTreatment: "Soak seeds in Trichoderma bio-fungicide solution for 20 mins before sowing. / বীজ বপনের পূর্বে ট্রাইকোডার্মা বায়ো-ফাঙ্গিসাইড মিশিয়ে ২০ মিনিট বীজ ভিজিয়ে ছেঁকে শুকিয়ে নিন।",
      emergencyNotice: "Water stagnation rapidly spreads stem rot. Maintain proper drainage channels. / সতর্কতা: জমিতে পানি জমে থাকলে পচন রোগ দ্রুত ছড়ায়। পানি নিষ্কাশনের ভালো নালা রাখুন।"
    },
    {
      id: "dis_mustard_aphid",
      cropIds: ["crop_mustard"],
      name: "Mustard Aphid / সরিষার জাব পোকা",
      pathogen: "Lipaphis erysimi (Insect Pest / পোকা)",
      targetCrops: "Mustard / সরিষা",
      image: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?auto=format&fit=crop&w=600&q=80",
      easySymptoms: "Hundreds of tiny green/black insects sucking sap from flower buds and pods, coating plants in sticky honey-dew. / সরিষার ফুল ও কচি ফলে শত শত ক্ষুদ্র সবুজ-কালো পোকা দলবেঁধে রস চুষে খায়। গাছের ডালপালা আঠালো হয়ে যায়।",
      symptoms: "Clustered colonies of aphids sucking sap from inflorescence, resulting in curled flowers and empty pods. / ফুল ও শুঁটিতে দলবদ্ধভাবে অবস্থান নিয়ে রস চুষে গাছ দুর্বল করে ফেলে।",
      prevention: "Sow mustard early (late Oct); install yellow sticky traps (15-20 per bigha). / ১. কার্তিকের শুরুতে আগাম সরিষা বুনুন। ২. বিঘায় ১৫-২০টি হলুদ আঠালো ফাঁদ পাতুন।",
      brandNames: "Admire 200SL, Imidacloprid, Malathion 57EC, Actara / এডমিয়ার, ইমিডাক্লোপ্রিড, মেলাথিয়ন",
      tankDosage: "8ml Admire or 32ml Malathion per 16L spray tank. / ১৬ লিটারের ১ স্প্রে ট্যাংকে: এডমিয়ার ৮ মিলি অথবা মেলাথিয়ন ৩২ মিলি মিশিয়ে বিকেলের দিকে স্প্রে করুন।",
      treatment: "Spray Imidacloprid (0.5ml/L) or Malathion (2ml/L) late in afternoon when bees return to hives. / বিকেলে মৌমাছি বাসায় ফিরে গেলে এডমিয়ার বা ইমিডাক্লোপ্রিড স্প্রে করুন যাতে মৌমাছির ক্ষতি না হয়।",
      organicTreatment: "Spray Soap water (5g washing powder/L) or Neem seed kernel extract (50g/L). / প্রতি লিটার পানিতে ৫ গ্রাম সাবান গুঁড়ো গুলে স্প্রে করলে জাব পোকা দম বন্ধ হয়ে মারা যায়।",
      emergencyNotice: "Spray only in late afternoon to protect pollinating honeybees! / বিশেষ সতর্কতা: সরিষা ক্ষেতে মৌমাছি পরাগায়ন করে, তাই কখনই সকালে বা দুপুরে কীটনাশক ছিটাবেন না।"
    }
  ],

  // 3. FERTILIZER, SEED & INPUTS GUIDE (সার, বীজ ও কৃষি উপকরণ গাইড)
  inputs: {
    fertilizers: [
      {
        id: "fert_urea",
        name: "Urea / ইউরিয়া সার",
        type: "Chemical (Nitrogen) / রাসায়নিক (নাইট্রোজেন ৪৬%)",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80",
        purpose: "গাছের পাতা ও কাণ্ডের দ্রুত বৃদ্ধি ঘটায় এবং পাতাকে ঘন সবুজ করে।",
        usageMethod: "কখনই একবারে পুরোটা দেবেন না। জমি তৈরির পর সমান ২-৩ কিস্তিতে উপরিপ্রয়োগ করুন। সকালে শিশির ভেজা পাতায় ইউরিয়া দিলে পাতা পুড়ে যেতে পারে, তাই বিকেলে ছিটান।",
        precaution: "অতিরিক্ত ইউরিয়া প্রয়োগে গাছ দুর্বল হয়ে রোগ-পোকার আক্রমণ বেড়ে যায়।"
      },
      {
        id: "fert_tsp_dap",
        name: "TSP & DAP / টিএসপি ও ডিএপি সার",
        type: "Chemical (Phosphorus) / রাসায়নিক (ফসফরাস ৪৬%)",
        image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80",
        purpose: "শিকড়ের শক্তিশালী বৃদ্ধি ত্বরান্বিত করে, কুশি বাড়ায় এবং ফসলকে যথাসময়ে ফুল ও ফল দিতে সহায়তা করে।",
        usageMethod: "জমি তৈরির শেষ চাষে পুরো মাত্রা মাটির সাথে ভালোভাবে মিশিয়ে দিতে হবে।",
        precaution: "মাটির উপরে ছড়িয়ে না রেখে মাটির ভেতরে মেশানো জরুরি।"
      },
      {
        id: "fert_mop",
        name: "MOP (Potash) / এমওপি (পটাশ) সার",
        type: "Chemical (Potassium) / রাসায়নিক (পটাশিয়াম ৬০%)",
        image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80",
        purpose: "গাছের রোগ প্রতিরোধ ক্ষমতা বাড়ায়, গাছকে খরা ও ঠান্ডায় শক্ত রাখে এবং দানা ও ফল পুষ্ট ও উজ্জ্বল করে।",
        usageMethod: "অর্ধেক জমি তৈরির সময় এবং বাকি অর্ধেক ফুল/থোড় আসার আগে উপরিপ্রয়োগ করুন।",
        precaution: "পটাশ সারের ঘাটতি হলে পাতার কিনার পুড়ে যাওয়ার মতো শুকিয়ে যায়।"
      },
      {
        id: "fert_vermi_tricho",
        name: "Vermicompost & Tricho-Compost / ভার্মিকম্পোস্ট ও ট্রাইকো-কম্পোস্ট",
        type: "Organic Bio-Fertilizer / জৈব সার",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
        purpose: "মাটির জৈব পদার্থ ও পানি ধারণক্ষমতা বাড়ায়। ট্রাইকোডার্মা মাটির ক্ষতিকর ছত্রাক ও কৃমি ধ্বংস করে।",
        usageMethod: "জমি তৈরির সময় বিঘা প্রতি ১৫০-২০০ কেজি মাটির সাথে মিশিয়ে দিন।",
        precaution: "রোদে শুকাবেন না, আর্দ্র ও ছায়াযুক্ত স্থানে রাখুন।"
      },
      {
        id: "fert_gypsum_zinc_boron",
        name: "Gypsum, Zinc & Boron / জিপসাম, দস্তা ও বোরন",
        type: "Micronutrients / অণুখাদ্য",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80",
        purpose: "জিপসাম (সালফার) তেলের পরিমাণ বাড়ায়; দস্তা পাতা ছোট হওয়া রোধ করে; বোরন ফুল-ফল ঝরা ও ফল ফাটা বন্ধ করে।",
        usageMethod: "জিপসাম ও দস্তা জমি তৈরিতে দিন। বোরন (সোলুবোর ১.৫ গ্রাম/লিটার) ফুল আসার সময় গাছে স্প্রে করুন।",
        precaution: "দস্তা ও টিএসপি সার একসাথে মেশাবেন না, এতে রাসায়নিক বিক্রিয়ায় অকার্যকর হয়ে যায়।"
      }
    ],
    soilHealth: {
      idealSoil: "উর্বর দোআঁশ ও পলি-দোআঁশ মাটি অধিকাংশ ফসলের জন্য আদর্শ। মাটির উপযুক্ত pH মান ৬.০ থেকে ৭.০।",
      acidicSoilGuide: "মাটির pH ৫.৫ এর নিচে নামলে তা অম্লীয় হয়। এতে ফসফরাস আটকে যায়। প্রতিকার: জমি তৈরির ৩-৪ সপ্তাহ আগে বিঘা প্রতি ২০-২৫ কেজি ডলোমাইট বা চুন প্রয়োগ করুন।",
      salineSoilGuide: "উপকূলীয় অঞ্চলে লবণাক্ততা কমাতে উঁচু বেড, মালচিং ও নিয়মিত মিষ্টি পানির সেচ নালা ব্যবস্থা রাখুন।",
      testingGuide: "উপজেলা কৃষি অফিসে বা মাটি পরীক্ষা কিট দিয়ে বছরে একবার মাটির স্বাস্থ্য ও pH পরীক্ষা করান।"
    },
    certifiedSeedsGuide: [
      { crop: "ধান", varieties: "ব্রি ধান২৮, ব্রি ধান২৯, ব্রি ধান৮৯, ব্রি ধান৯২, বাংলামতি", source: "বিএডিসি / ব্রি অনুমোদিত ডিলার" },
      { crop: "গম", varieties: "বারি গম ৩৩ (ব্লাস্ট প্রতিরোধী), বারি গম ২৮, বারি গম ৩০", source: "বিএডিসি / বারি" },
      { crop: "ভুট্টা", varieties: "বারি হাইব্রিড ভুট্টা ৯, এনকে-৪০, সুপার শাইন", source: "বিএডিসি / অনুমোদিত বীজ কোম্পানি" },
      { crop: "আলু", varieties: "ডায়মন্ট, কার্ডিনাল, অ্যাস্টেরিক্স (লাল আলু), বারি আলু-৭", source: "বিএডিসি সার্টিফাইড বীজ আলু" },
      { crop: "টমেটো", varieties: "বারি টমেটো ১৪ (বাহার), বিজলী প্লাস, গ্রীষ্মকালীন বারি টমেটো ৮", source: "বারি / ব্র্যাক সিড" },
      { crop: "বেগুন", varieties: "বারি বিটি বেগুন ২/৪ (পোকা প্রতিরোধী), কাজলা, উত্তরা", source: "বিএডিসি / বারি" },
      { crop: "সরিষা", varieties: "বারি সরিষা ১৪, বারি সরিষা ১৭, বারি সরিষা ১৮ (ক্যানোলা জাত)", source: "বিএডিসি" },
      { crop: "মরিচ", varieties: "বারি মরিচ ১, বিজলী প্লাস, বিন্দু, কামরাঙা", source: "বারি / স্থানীয় অনুমোদিত ডিলার" },
      { crop: "পাট", varieties: "বিজেআরআই তোষা পাট ৮ (রবি-১), ও-৯৮৯৭", source: "বিজেআরআই / বিএডিসি" }
    ],
    cropInputCalculatorPresets: {
      crop_tomato: {
        name: "টমেটো / Tomato",
        urea: 30,
        tsp: 25,
        mop: 25,
        gypsum: 10,
        organic: 200,
        boron: 1,
        waterStages: "রোপণের পর, ফুল আসার সময়, ফল বৃদ্ধির সময় (মোট ৪-৫টি সেচ)",
        phRange: "৬.০ - ৬.৮ (দোআঁশ মাটি)",
        specialNote: "গাছে খুঁটি দিন এবং ফুল আসার সময় সোলুবোর বোরন ১.৫ গ্রাম/লিটার স্প্রে করুন।"
      },
      crop_rice: {
        name: "ধান / Rice",
        urea: 33,
        tsp: 13,
        mop: 15,
        gypsum: 9,
        organic: 150,
        boron: 0.5,
        waterStages: "চারা রোপণ, কুশি পর্যায় ও কাইচ থোড়ে ২-৩ ইঞ্চি পানি রাখুন",
        phRange: "৫.৫ - ৬.৫ (এঁটেল ও দোআঁশ)",
        specialNote: "ব্লাস্ট প্রতিরোধে ইউরিয়া ৩ কিস্তিতে সুষম পটাশের সাথে প্রয়োগ করুন।"
      },
      crop_potato: {
        name: "আলু / Potato",
        urea: 35,
        tsp: 25,
        mop: 30,
        gypsum: 12,
        organic: 250,
        boron: 1,
        waterStages: "২০-২৫ দিনে প্রথম সেচ, ৪৫-৫০ দিনে ২য় সেচ (মোট ৩-৪ সেচ)",
        phRange: "৫.২ - ৬.৪ (বেলে-দোআঁশ)",
        specialNote: "ঘন কুয়াশায় নাবি ধসা রোধে আগাম ম্যানকোজেব স্প্রে করুন এবং গোড়ায় উঁচু মাটি দিন।"
      },
      crop_wheat: {
        name: "গম / Wheat",
        urea: 28,
        tsp: 18,
        mop: 12,
        gypsum: 11,
        organic: 150,
        boron: 1.5,
        waterStages: "১৭-২১ দিনে মুকুট শিকড় সেচ, ৪৫ দিনে ২য় সেচ, ৭৫ দিনে ৩য় সেচ",
        phRange: "৬.০ - ৭.০ (পলি-দোআঁশ)",
        specialNote: "প্রথম সেচ অত্যন্ত জরুরি। ব্লাস্ট প্রতিরোধী বারি গম ৩৩ চাষ করুন।"
      },
      crop_corn: {
        name: "ভুট্টা / Maize",
        urea: 40,
        tsp: 22,
        mop: 20,
        gypsum: 15,
        organic: 200,
        boron: 1,
        waterStages: "হাঁটু সমান উচ্চতায় ১ম সেচ, ফুল আসার সময় ২য় সেচ, মোচা পুষ্ট হতে ৩য় সেচ",
        phRange: "৫.৮ - ৭.০ (পানি নিষ্কাশনযুক্ত দোআঁশ)",
        specialNote: "ফল আর্মিওয়ার্ম দমনে কচি চোঙার ভেতর ছাই বা স্পিনোটোরাম দিন।"
      },
      crop_eggplant: {
        name: "বেগুন / Eggplant",
        urea: 35,
        tsp: 30,
        mop: 25,
        gypsum: 10,
        organic: 200,
        boron: 1,
        waterStages: "মাটিতে রস কমলেই হালকা সেচ দিন, গোড়ায় পানি জমতে দেবেন না",
        phRange: "৫.৫ - ৬.৮ (উর্বর দোআঁশ)",
        specialNote: "ডগা ছিদ্রকারী পোকা দমনে সেক্স ফেরোমন ট্র্যাপ ব্যবহার করুন।"
      },
      crop_mustard: {
        name: "সরিষা / Mustard",
        urea: 33,
        tsp: 18,
        mop: 15,
        gypsum: 20,
        organic: 150,
        boron: 1.5,
        waterStages: "২০-২৫ দিনে ১টি হালকা সেচ (প্রয়োজনে ফুল আসার পূর্বে ২য় সেচ)",
        phRange: "৬.০ - ৭.২ (দোআঁশ)",
        specialNote: "সালফার ও জিপসাম সারের ব্যবহারে বীজে তেলের পরিমাণ উল্লেখযোগ্যভাবে বাড়ে।"
      },
      crop_chilli: {
        name: "মরিচ / Chilli",
        urea: 30,
        tsp: 20,
        mop: 20,
        gypsum: 12,
        organic: 180,
        boron: 1,
        waterStages: "উঁচু বেডে নিয়মিত হালকা সেচ, জলাবদ্ধতা সম্পূর্ণ পরিহারযোগ্য",
        phRange: "৬.০ - ৭.০ (সুনিষ্কাশিত বেলে-দোআঁশ)",
        specialNote: "পাতা কোকড়ানো রোধে চুষি পোকা দমন ও ফল পচা রোধে নাটিভো স্প্রে করুন।"
      },
      crop_jute: {
        name: "পাট / Jute",
        urea: 18,
        tsp: 7,
        mop: 8,
        gypsum: 5,
        organic: 100,
        boron: 0.5,
        waterStages: "খরা থাকলে চারা গজানোর পর হালকা সেচ, অতিরিক্ত জলাবদ্ধতা পরিহার",
        phRange: "৬.০ - ৭.৫ (পলি মাটি)",
        specialNote: "বীজ বপনের পূর্বে কারবেনডাজিম দিয়ে শোধন করুন।"
      }
    }
  },

  // 4. SEASONAL ADVISORY & DISASTER PREPAREDNESS (মৌসুমভিত্তিক কৃষি পরামর্শ)
  seasonal: [
    {
      id: "season_rabi",
      title: "Rabi Season (Winter) / রবি মৌসুম (শীতকাল)",
      period: "১৫ অক্টোবর থেকে ১৫ মার্চ (কার্তিক - ফাল্গুন)",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80",
      description: "শীতকালীন শুষ্ক ও শীতল আবহাওয়া। দেশের সবচেয়ে বড় ফসল আবাদের মৌসুম।",
      suitableCrops: [
        { name: "বোরো ধান", tip: "কার্তিক-অগ্রহায়ণে বীজতলা তৈরি করে পৌষে মূল জমিতে রোপণ।" },
        { name: "গম", tip: "১৫-৩০ নভেম্বরের মধ্যে বারি গম ৩৩ বপন সম্পন্ন করুন।" },
        { name: "আলু", tip: "অক্টোবর-নভেম্বরে রোপণ, কুয়াশায় নাবি ধসা রোগ প্রতিরোধমূলক স্প্রে।" },
        { name: "সরিষা", tip: "কার্তিকের শুরুতে বোনা শেষ করুন যেন জাব পোকার আক্রমণ এড়ানো যায়।" },
        { name: "ভুট্টা", tip: "অক্টোবর-নভেম্বরে রোপণ, চারা অবস্থায় সেচ ও আর্মিওয়ার্ম দমন।" },
        { name: "শাকসবজি ও ডাল", tip: "টমেটো, ফুলকপি, বাঁধাকপি, মসুর, ছোলা, পেঁয়াজ ও রসুন।" }
      ],
      keyActions: [
        "শীতের শুরুতে কুয়াশাচ্ছন্ন আবহাওয়ায় আলু ও টমেটোতে আগাম ছত্রাকনাশক স্প্রে করুন।",
        "গম ও ভুট্টার মুকুট শিকড় পর্যায়ে প্রথম সেচ দেওয়া মিস করবেন না।",
        "বোরো ধানের বীজতলায় তীব্র শীতে রাতে পলিথিন দিয়ে ঢেকে রাখুন এবং সকালে পানি বদলে দিন।"
      ]
    },
    {
      id: "season_kharif_1",
      title: "Kharif-1 Season (Summer) / খরিপ-১ মৌসুম (গ্রীষ্মকাল)",
      period: "১৫ মার্চ থেকে ১৫ জুলাই (চৈত্র - আষাঢ়)",
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=700&q=80",
      description: "উচ্চ তাপমাত্রা, ঝড়-বৃষ্টি ও কালবৈশাখীর মৌসুম। পানির প্রাপ্যতা ও নিষ্কাশন অত্যন্ত গুরুত্বপূর্ণ।",
      suitableCrops: [
        { name: "আউশ ধান", tip: "চৈত্র-বৈশাখে সরাসরি বোনা বা চারা রোপণ করুন (ব্রি ধান৪৮, ব্রি ধান৮২)।" },
        { name: "তোষা ও দেশি পাট", tip: "চৈত্র থেকে বৈশাখের মধ্যে সারিতে বীজ বুনে দিন।" },
        { name: "গ্রীষ্মকালীন সবজি", tip: "ঢ্যাঁড়শ, করলা, ঝিঙা, চিচিঙ্গা, চালকুমড়া, পুইশাক, বরবটি।" },
        { name: "তিল ও মুগডাল", tip: "স্বল্পমেয়াদী লাভজনক ফসল হিসেবে চাষ করুন।" }
      ],
      keyActions: [
        "কালবৈশাখী ঝড়ে গাছ ভেঙে পড়া ঠেকাতে সবজি মাচায় বাঁশের শক্ত খুঁটি দিন।",
        "তীব্র রোদে ফসলের গোড়ার আর্দ্রতা ধরে রাখতে খড়কুটার মালচিং ব্যবহার করুন।",
        "হঠাৎ শিলাবৃষ্টির পূর্বাভাস পেলে পরিপক্ক আউশ বা বোরো ধান ৮০% পাকলেই দ্রুত কেটে ঘরে তুলুন।"
      ]
    },
    {
      id: "season_kharif_2",
      title: "Kharif-2 Season (Monsoon) / খরিপ-২ মৌসুম (বর্ষাকাল)",
      period: "১৫ জুলাই থেকে ১৫ অক্টোবর (শ্রাবণ - কার্তিক)",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80",
      description: "প্রচুর বৃষ্টিপাত, আর্দ্র আবহাওয়া ও আকস্মিক বন্যার ঝুঁকিযুক্ত মৌসুম। প্রধান ফসল রোপা আমন।",
      suitableCrops: [
        { name: "রোপা আমন ধান", tip: "শ্রাবণ-ভাদ্রে ২৫-৩০ দিনের চারা রোপণ (ব্রি ধান৪৯, ব্রি ধান৭৫, ব্রি ধান৮৭)।" },
        { name: "জলমগ্নতা সহনশীল ধান", tip: "বন্যাপ্রবণ নিচু এলাকায় ব্রি ধান৫১, ব্রি ধান৫২ ও ব্রি ধান৭৯।" },
        { name: "বর্ষাকালীন সবজি", tip: "উঁচু বেডে বেগুন, লাউ, মিষ্টি কুমড়া, বরবটি ও কাঁচামরিচ।" }
      ],
      keyActions: [
        "জমির আইল শক্ত করে বেঁধে রাখুন যেন বৃষ্টির পানি জমা রেখে সার কাজে লাগানো যায়।",
        "নিচু এলাকার জন্য কমিউনিটি ভাসমান বীজতলা আগে থেকেই প্রস্তুত রাখুন।",
        "আমন ধানের জমিতে মাজরা পোকা ও পাতা মোড়ানো পোকার আক্রমণ নিয়মিত তদারকি করুন।"
      ]
    },
    {
      id: "disaster_flood",
      title: "Flood & Waterlogging Preparedness / বন্যা ও জলাবদ্ধতা প্রস্তুতি",
      period: "জরুরি দুর্যোগ ব্যবস্থাপনা গাইড",
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=700&q=80",
      description: "আকস্মিক বন্যা ও অতিবৃষ্টিতে ফসল রক্ষা এবং দুর্যোগ-পরবর্তী দ্রুত ঘুরে দাঁড়ানোর পদক্ষেপ।",
      suitableCrops: [
        { name: "জলমগ্নতা সহনশীল জাত", tip: "ব্রি ধান৫১, ব্রি ধান৫২ (পানিতে ডুবে থাকলেও ১৪-১৭ দিন টিকে থাকে)।" },
        { name: "নাবি জাত", tip: "বন্যার পানি নেমে গেলে দ্রুত ব্রি ধান৪৬ বা বিআর২২ লাগান।" },
        { name: "ভাসমান বীজতলা", tip: "কলাগাছ ও বাঁশের খাঁচায় কচুরিপানা পচিয়ে ভাসমান বেডে চারা তৈরি।" }
      ],
      keyActions: [
        "বন্যার পূর্বাভাস পেলে জমির পানি নিষ্কাশন নালাগুলো পরিষ্কার করে দ্রুত খুলে দিন।",
        "পানি নেমে যাওয়ার সাথে সাথে ধানের পাতায় জমে থাকা কাদা পরিষ্কার পানি দিয়ে ধুয়ে দিন।",
        "বন্যা পরবর্তী জমিতে পটাশ ও ইউরিয়া সার উপরিপ্রয়োগ করুন এবং মূল পচা রোধে কপার ছত্রাকনাশক স্প্রে করুন।"
      ]
    },
    {
      id: "disaster_drought",
      title: "Drought & Heatwave Management / খরা ও অনাবৃষ্টি ব্যবস্থাপনা",
      period: "শুকনো মৌসুম ও পানির সংকট মোকাবেলা",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80",
      description: "ভূগর্ভস্থ পানির অপচয় রোধ, পানি সাশ্রয়ী এডব্লিউডি পদ্ধতি ও খরা সহনশীল চাষাবাদ।",
      suitableCrops: [
        { name: "খরা সহনশীল ধান", tip: "ব্রি ধান৫৬, ব্রি ধান৫৭ ও ব্রি ধান৭১ চাষ করুন।" },
        { name: "স্বল্প পানির ফসল", tip: "ভুট্টা, সরিষা, তরমুজ, চিনাবাদাম ও ডাল ফসল।" }
      ],
      keyActions: [
        "এডব্লিউডি (Alternate Wetting and Drying) পাইপ বসিয়ে সেচ দিন, এতে ২৫-৩০% পানি ও বিদ্যুৎ সাশ্রয় হয়।",
        "মাটির রস ধরে রাখতে ফসলের গোড়ায় শুকনো খড়কুটা, কচুরিপানা বা কালো পলিথিন মালচিং দিন।",
        "খরার সময় ইউরিয়া সার প্রয়োগ স্থগিত রেখে হালকা সেচ নিশ্চিত করুন।"
      ]
    },
    {
      id: "disaster_storm",
      title: "Heavy Rain & Storm Preparedness / অতিবৃষ্টি ও ঘূর্ণিঝড় প্রস্তুতি",
      period: "কালবৈশাখী ও বর্ষাকালের জরুরি সুরক্ষা",
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=700&q=80",
      description: "ঝড়-তুফান ও অতিবৃষ্টির প্রভাবে ফসলের ক্ষতি ন্যূনতম রাখার বাস্তবসম্মত পদক্ষেপ।",
      suitableCrops: [
        { name: "উঁচু বেডের ফসল", tip: "টমেটো, মরিচ, বেগুন ও শাকসবজি।" }
      ],
      keyActions: [
        "ঝড়ের পূর্বে জমির আইল কেটে অন্তত ৪-৬ ইঞ্চি চওড়া জরুরি পানি নিষ্কাশন মুখ বানিয়ে রাখুন।",
        "কলাগাছ, পেঁপে গাছ ও টমেটোর খুঁটি শক্ত সুতলি দিয়ে বেঁধে দিন।",
        "ঝড় ও বৃষ্টি থামার পরপরই ভেজা পাতা শুকালে দ্রুত ছত্রাকনাশক ও ব্যাকটেরিসাইড স্প্রে করুন যাতে ক্ষত দিয়ে রোগ না ছড়ায়।"
      ]
    }
  ],

  // 5. CROP CALENDAR & FARM SCHEDULE (ফসলের ক্যালেন্ডার ও কাজের সময়সূচি)
  calendar: [
    {
      id: "cal_rice_boro",
      cropId: "crop_rice",
      name: "Boro Rice / বোরো ধান",
      season: "কার্তিক - বৈশাখ (Nov - May)",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
      milestones: [
        { phase: "বীজ বপন ও বীজতলা তৈরি", timing: "১৫ নভেম্বর - ১০ ডিসেম্বর (কার্তিক শেষ - অগ্রহায়ণ)", task: "বীজ শোধন করে বীজতলায় বীজ বপন এবং ঠান্ডায় রাতে পলিথিনে ঢাকা।" },
        { phase: "মূল জমিতে চারা রোপণ", timing: "২০ ডিসেম্বর - ২৫ জানুয়ারি (পৌষ - মাঘ)", task: "২৫-৩০ দিনের চারা মূল জমিতে ২০×১৫ সেমি দূরত্বে সারি করে রোপণ।" },
        { phase: "১ম ও ২য় সার প্রয়োগ ও সেচ", timing: "১৫ জানুয়ারি - ২০ ফেব্রুয়ারি (মাঘ - ফাল্গুন)", task: "কুশি আসার সময় ইউরিয়া টপড্রেসিং ও জমিতে ১-২ ইঞ্চি পানি নিশ্চিতকরণ।" },
        { phase: "আগাছা নিড়ানি ও রোগ তদারকি", timing: "১ ফেব্রুয়ারি - ১৫ মার্চ (ফাল্গুন - চৈত্র)", task: "আগাছা দমন এবং ব্লাস্ট ও মাজরা পোকা নিয়মিত পর্যবেক্ষণ।" },
        { phase: "ফসল কর্তন ও মাড়াই", timing: "১৫ এপ্রিল - ১০ মে (বৈশাখ)", task: "শীষের ৮০% সোনালী হলে ধান কেটে শুকিয়ে সংরক্ষণ।" }
      ]
    },
    {
      id: "cal_potato",
      cropId: "crop_potato",
      name: "Potato / আলু",
      season: "আশ্বিন - মাঘ (Oct - Feb)",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
      milestones: [
        { phase: "জমি প্রস্তুতি ও বীজ শোধন", timing: "২০ অক্টোবর - ১৫ নভেম্বর (কার্তিক)", task: "গভীর চাষ, ডেলা ভাঙা এবং বীজ আলু ডায়মন্ট বা কার্ডিনাল অঙ্কুরিত করা।" },
        { phase: "বীজ আলু রোপণ ও বেড তৈরি", timing: "১ নভেম্বর - ৩০ নভেম্বর (কার্তিক - অগ্রহায়ণ)", task: "৬০ সেমি দূরত্বে সারিতে আলু বসিয়ে উঁচু ভেল্কি তৈরি।" },
        { phase: "প্রথম সেচ ও গোড়ায় মাটি তোলা", timing: "২৫ নভেম্বর - ২০ ডিসেম্বর (অগ্রহায়ণ - পৌষ)", task: "রোপণের ২৫-৩০ দিনে প্রথম সেচ ও ইউরিয়া দিয়ে গোড়ায় উঁচু মাটি দেওয়া।" },
        { phase: "নাবি ধসা রোগ পর্যবেক্ষণ ও স্প্রে", timing: "১৫ ডিসেম্বর - ২০ জানুয়ারি (পৌষ - মাঘ)", task: "কুয়াশায় ডাইথেন এম-৪৫ বা রিডোমিল গোল্ড আগাম স্প্রে।" },
        { phase: "ফসল উত্তোলন ও কিউরিং", timing: "২৫ জানুয়ারি - ২৫ ফেব্রুয়ারি (মাঘ - ফাল্গুন)", task: "তোলার ১০ দিন আগে গাছ কাটা এবং ছায়ায় ১০ দিন কিউরিং করা।" }
      ]
    },
    {
      id: "cal_wheat",
      cropId: "crop_wheat",
      name: "Wheat / গম",
      season: "কার্তিক - ফাল্গুন (Nov - March)",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
      milestones: [
        { phase: "জমি প্রস্তুতি ও বীজ বপন", timing: "১৫ নভেম্বর - ৩০ নভেম্বর (১-১৫ অগ্রহায়ণ)", task: "ঝুরঝুরে জমি তৈরি এবং বারি গম ৩৩ সারিতে ২০ সেমি ব্যবধানে বপন।" },
        { phase: "মুকুট শিকড় সেচ (১ম সেচ)", timing: "৫ ডিসেম্বর - ২০ ডিসেম্বর (পৌষের শুরু)", task: "বপনের ১৭-২১ দিনে প্রথম সেচ ও ইউরিয়ার শেষ কিস্তি প্রয়োগ।" },
        { phase: "২য় সেচ ও ফুল আসার পরিচর্যা", timing: "১০ জানুয়ারি - ২৫ জানুয়ারি (পৌষ শেষ)", task: "গাছ বের হওয়ার ৪৫-৫৫ দিনে ২য় সেচ এবং ইঁদুর ফাঁদ স্থাপন।" },
        { phase: "দানা বাঁধার সময় ৩য় সেচ", timing: "১ ফেব্রুয়ারি - ১৫ ফেব্রুয়ারি (ফাল্গুন শুরু)", task: "দানা পুষ্ট হওয়ার সময় মাটির রস বজায় রাখতে হালকা সেচ।" },
        { phase: "ফসল সংগ্রহ ও শুকানো", timing: "১০ মার্চ - ২৫ মার্চ (ফাল্গুন শেষ)", task: "গাছ হলদেটে হয়ে শুকিয়ে গেলে কেটে মাড়াই ও রোদে শুকানো।" }
      ]
    },
    {
      id: "cal_tomato",
      cropId: "crop_tomato",
      name: "Tomato / টমেটো",
      season: "আশ্বিন - ফাল্গুন (Oct - March)",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
      milestones: [
        { phase: "বীজতলায় চারা উৎপাদন", timing: "১ অক্টোবর - ২৫ অক্টোবর (আশ্বিন)", task: "উন্নত জাতের বীজতলায় বীজ বুনে সুস্থ সবল চারা তৈরি।" },
        { phase: "মূল জমিতে চারা রোপণ", timing: "২৫ অক্টোবর - ২০ নভেম্বর (কার্তিক)", task: "উঁচু বেডে ৬০×৪০ সেমি ব্যবধানে বিকেলে চারা রোপণ।" },
        { phase: "বাঁশের খুঁটি বাঁধা ও নিড়ানি", timing: "১৫ নভেম্বর - ১০ ডিসেম্বর (অগ্রহায়ণ)", task: "গাছে খুঁটি দেওয়া যাতে ফল মাটিতে না ঠেকে এবং ইউরিয়া দেওয়া।" },
        { phase: "ফুল আসার সময় বোরন স্প্রে", timing: "১০ ডিসেম্বর - ১৫ জানুয়ারি (পৌষ)", task: "ফল ফাটা রোধে সোলুবোর বোরন ১.৫ গ্রাম/লিটার স্প্রে।" },
        { phase: "টমেটো সংগ্রহ ও বাজারজাত", timing: "১ জানুয়ারি - ২৮ ফেব্রুয়ারি (মাঘ - ফাল্গুন)", task: "আধাপাকা ও পাকা টমেটো ধাপে ধাপে সংগ্রহ।" }
      ]
    },
    {
      id: "cal_mustard",
      cropId: "crop_mustard",
      name: "Mustard / সরিষা",
      season: "কার্তিক - মাঘ (Late Oct - Jan)",
      image: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?auto=format&fit=crop&w=600&q=80",
      milestones: [
        { phase: "জমি প্রস্তুতি ও বীজ বপন", timing: "২০ অক্টোবর - ১৫ নভেম্বর (কার্তিক)", task: "আমনের পর জো অবস্থায় জমি চাষ দিয়ে বারি সরিষা ১৪/১৭ বপন।" },
        { phase: "হালকা সেচ ও আগাছা নিড়ানি", timing: "১০ নভেম্বর - ৩০ নভেম্বর (অগ্রহায়ণ)", task: "২০-২৫ দিনে প্রথম হালকা সেচ ও গাছ পাতলাকরণ।" },
        { phase: "ফুল আসার পরিচর্যা ও জাব দমন", timing: "১ ডিসেম্বর - ২৫ ডিসেম্বর (পৌষ)", task: "হলুদ আঠালো ফাঁদ স্থাপন এবং জাব পোকা পর্যবেক্ষণ।" },
        { phase: "ফসল কর্তন ও শুকানো", timing: "১৫ জানুয়ারি - ৩০ জানুয়ারি (মাঘ)", task: "ফল ৭৫-৮০% হলদেটে হলে সকালে কেটে রোদে শুকিয়ে মাড়াই।" }
      ]
    }
  ],

  // 6. AGRICULTURAL PROBLEM & SOLUTION CENTER (কৃষি সমস্যা ও সমাধান কেন্দ্র)
  troubleshoot: [
    {
      id: "prob_yellow_leaves",
      title: "পাতার রঙ হলুদ হয়ে যাওয়া (Leaf Yellowing / Chlorosis)",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80",
      icon: "fa-leaf",
      severity: "উচ্চ (জরুরি পরিচর্যা প্রয়োজন)",
      causes: [
        "১. নাইট্রোজেনের (ইউরিয়া) তীব্র ঘাটতি হলে পুরনো নিচের পাতাগুলো প্রথমে হলুদ হতে শুরু করে।",
        "২. জমিতে অতিরিক্ত পানি জমে শিকড়ে বাতাস না পেলে পাতা হলুদ হয়ে নুয়ে পড়ে।",
        "৩. জিংক বা লোহার ঘাটতি হলে কচি ওপরের পাতার শিরা সবুজ থেকে মাঝের অংশ হলুদ হয়।",
        "৪. মাটির নিচে শিকড় পচা রোগ বা নেমাটোড (কৃমি) আক্রমণ।"
      ],
      organicSolution: "গাছের গোড়া নিড়ানি দিয়ে মাটি আলগা করুন যাতে বাতাস পায়। প্রতি লিটার পানিতে ৫ মিলি নিমতেল বা ভার্মিকম্পোস্টের নির্যাস (Vermiwash) স্প্রে করুন।",
      chemicalSolution: "ইউরিয়া ২০ গ্রাম ও চিলেটেড জিংক ১ গ্রাম প্রতি লিটার পানিতে মিশিয়ে বিকেলে গাছে ফলিয়ার স্প্রে করুন। জলাবদ্ধতা থাকলে দ্রুত ড্রেন কেটে পানি বের করে দিন।",
      officerAdvice: "পাতা হলুদ হয়ে সাথে কিনার শুকিয়ে গেলে পটাশের ঘাটতি হতে পারে। নিকটস্থ উপসহকারী কৃষি কর্মকর্তার পরামর্শে সার পরীক্ষা করান বা কল করুন ১৬১২৩ নম্বরে।"
    },
    {
      id: "prob_stunted_growth",
      title: "গাছের স্বাভাবিক বৃদ্ধি থমকে যাওয়া বা খর্বাকৃতি হওয়া (Stunted Growth)",
      image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80",
      icon: "fa-arrow-down-short-wide",
      severity: "মাঝারি",
      causes: [
        "১. মাটিতে ফসফরাস বা জিংক সারের ঘাটতি থাকলে শিকড় বাড়ে না ও গাছ খর্বাকৃতি থাকে।",
        "২. মাটি অতিরিক্ত শক্ত বা এঁটেল হলে এবং জমিতে জো ছাড়া চাষ দিলে শিকড় ছড়াতে পারে না।",
        "৩. মাটির অতিরিক্ত অম্লতা (pH ৫.০ এর নিচে) পুষ্টি উপাদান শোষণ বাধাগ্রস্ত করে।",
        "৪. ভাইরাসজনিত রোগ (যেমন ডোয়ার্ফ ভাইরাস বা টুংরো)।"
      ],
      organicSolution: "জমিতে ট্রাইকো-কম্পোস্ট ও ভার্মিকম্পোস্ট দিন। চারা লাগানোর আগে শিকড় ট্রাইকোডার্মা দিয়ে শোধন করে নিন।",
      chemicalSolution: "ডিএপি বা টিএসপি এবং জিংক সালফেট জমি তৈরিতে সুষম মাত্রায় দিন। গাছ বড় না হলে প্রতি লিটার পানিতে ২ গ্রাম ফ্লোরা (PGR) স্প্রে করতে পারেন।",
      officerAdvice: "মাটি পরীক্ষা করে pH মান দেখুন। যদি মাটি অ্যাসিডিক হয় তবে বিঘা প্রতি ২৫ কেজি ডলোমাইট বা চুন প্রয়োগ করুন।"
    },
    {
      id: "prob_waterlogging",
      title: "জমিতে দীর্ঘক্ষণ পানি জমে থাকা ও শিকড় পচন (Waterlogging & Root Suffocation)",
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80",
      icon: "fa-water",
      severity: "অতি উচ্চ (তাৎক্ষণিক ব্যবস্থা জরুরি)",
      causes: [
        "১. জমিতে উপযুক্ত পানি নিষ্কাশন নালার অভাব বা আইল উঁচু করে আটকে রাখা।",
        "২. অতিরিক্ত সেচ বা ভারী বৃষ্টিপাতের পর পানি বের হওয়ার পথ না থাকা।",
        "৩. মাটিতে বাতাস চলাচল বন্ধ হয়ে শিকড় পচে কালো হয়ে গন্ধ ছড়ানো।"
      ],
      organicSolution: "জমি শুকিয়ে যাওয়ার পর গোড়ার শক্ত মাটি আলগা করে ছাই ও ট্রাইকো-কম্পোস্ট দিন যাতে ক্ষতিকর ছত্রাক না ছড়ায়।",
      chemicalSolution: "তাত্ক্ষণিকভাবে জমির আইল কেটে নালা তৈরি করে পানি বের করে দিন। এরপর কপার অক্সিক্লোরাইড (যেমন চ্যাম্পিয়ন ২ গ্রাম/লিটার) দিয়ে গাছের গোড়া ভিজিয়ে দিন।",
      officerAdvice: "সবজি চাষে সমতল মাটির বদলে সবসময় ৩০ সেমি উঁচু বেড তৈরি করুন। জরুরি সহায়তার জন্য ১৬১২৩ ডায়াল করুন।"
    },
    {
      id: "prob_flower_fruit_drop",
      title: "ফুল ও কচি ফল ঝরে পড়া এবং ফল ফেটে যাওয়া (Flower & Fruit Drop)",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
      icon: "fa-burst",
      severity: "মাঝারি থেকে উচ্চ",
      causes: [
        "১. বোরন ও ক্যালসিয়াম সারের তীব্র ঘাটতি থাকলে ফুল ঝরে ও টমেটো-বেগুন ফেটে যায়।",
        "২. ফুল আসার সময় জমিতে তীব্র খরা বা হঠাৎ মাত্রাতিরিক্ত পানি সেচ।",
        "৩. তাপমাত্রা ৩৫ ডিগ্রি সেলসিয়াসের বেশি হলে পরাগায়ন ব্যর্থ হওয়া।",
        "৪. থ্রিপস বা চুষি পোকা ফুল চুষে খাওয়া।"
      ],
      organicSolution: "জৈব ছাই ও ডিমের খোসার গুঁড়ো গাছের গোড়ায় দিন। ফুল ফোটার সময় মৃদু ভোরে গাছে হালকা পানি ছিটিয়ে পরাগায়ন সহজ করুন।",
      chemicalSolution: "ফুল আসার শুরুতে প্রতি লিটার পানিতে সোলুবোর বোরন ১.৫ গ্রাম এবং প্লানোফিক্স (আলফা ন্যাপথাইল অ্যাসিটিক অ্যাসিড) ০.৫ মিলি মিশিয়ে স্প্রে করুন।",
      officerAdvice: "ফুল ফোটার পূর্ণ সময়ে কড়া কীটনাশক স্প্রে করবেন না, এতে উপকারী মৌমাছি ও পরাগায়নকারী কীট মারা যায়।"
    },
    {
      id: "prob_pest_infestation",
      title: "ক্ষতিকর পোকামাকড়ের উপদ্রব ও পাতা কোকড়ানো (Insect Pest Attacks)",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
      icon: "fa-bug",
      severity: "উচ্চ",
      causes: [
        "১. ডগা ছিদ্রকারী, ফল আর্মিওয়ার্ম বা মাজরা পোকার লার্ভা পাতার ভেতরে লুকিয়ে খাওয়া।",
        "২. জাব পোকা, সাদা মাছি বা থ্রিপস রস চুষে খেয়ে পাতাকে তামাক পাতার মতো কোঁকড়া বানিয়ে ফেলা।",
        "৩. জমিতে পর্যাপ্ত উপকারী বন্ধু পোকা (যেমন লেডিবার্ড বিটল) না থাকা।"
      ],
      organicSolution: "বিঘায় ৫-৬টি সেক্স ফেরোমন ট্র্যাপ ও ১০-১২টি হলুদ আঠালো ফাঁদ দিন। ৫ মিলি নিমতেল + ২ গ্রাম সাবান গুঁড়ো প্রতি লিটার পানিতে মিশিয়ে স্প্রে করুন।",
      chemicalSolution: "লেদা ও ছিদ্রকারী পোকার জন্য প্রোক্লেম ১ গ্রাম/লিটার এবং চুষি পোকার জন্য এডমিয়ার ০.৫ মিলি/লিটার বিকেলের দিকে স্প্রে করুন।",
      officerAdvice: "পোকামাকড়ের আক্রমণের ধরন বুঝতে না পারলে AgriFriend এর 'এআই রোগ ও পোকা শনাক্তকরণ' টুলে ছবি আপলোড করুন অথবা ১৬১২৩ এ কল করুন।"
    }
  ],

  // 7. VISUALS, VIDEO & BANGLA TUTORIALS (ভিডিও, ছবি ও বাংলা টিউটোরিয়াল কেন্দ্র)
  tutorials: {
    videos: [
      {
        id: "vid_rice_cultivation",
        title: "আধুনিক ধান চাষ ও সুষম সার ব্যবস্থাপনা",
        titleEn: "Modern Rice Cultivation & Balanced Fertilization",
        duration: "০৮:৪৫ মিনিট",
        thumbnail: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        youtubeId: "1NSprRUHnaM",
        topic: "ধান চাষ ও বীজ শোধন",
        description: "বীজতলা তৈরি, সুষম ইউরিয়া-পটাশ কিস্তিবন্দী প্রয়োগ এবং ব্লাস্ট রোগ প্রতিরোধের সহজ কৌশল।"
      },
      {
        id: "vid_vermicompost",
        title: "সহজে কেঁচো সার (ভার্মিকম্পোস্ট) তৈরি ও ব্যবহার",
        titleEn: "How to Make Vermicompost at Home",
        duration: "০৬:২০ মিনিট",
        thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
        youtubeId: "hDg5UH_VrTk",
        topic: "জৈব সার উৎপাদন",
        description: "গোবর ও খড়কুটা দিয়ে উন্নতমানের কেঁচো সার তৈরি ও ফসলের জমিতে সঠিক প্রয়োগ মাত্রা।"
      },
      {
        id: "vid_tomato_pruning",
        title: "উন্নত পদ্ধতিতে টমেটো চাষ ও মাচা তৈরি",
        titleEn: "Tomato Staking, Pruning & Disease Care",
        duration: "০৭:১৫ মিনিট",
        thumbnail: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
        youtubeId: "JLO6q3DsvyM",
        topic: "টমেটো চাষাবাদ",
        description: "টমেটো গাছের সাকার ছাঁটাই, মালচিং ব্যবহার ও ফুল-ফল ঝরা বন্ধে বোরন প্রয়োগের নিয়ম।"
      },
      {
        id: "vid_spray_safety",
        title: "কীটনাশক স্প্রে করার সঠিক ও নিরাপদ নিয়ম",
        titleEn: "Safe and Effective Pesticide Spraying Techniques",
        duration: "০৫:৫০ মিনিট",
        thumbnail: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
        youtubeId: "TGmTa480pkk",
        topic: "কৃষক স্বাস্থ্য ও সুরক্ষা",
        description: "বাতাসের বিপরীতে স্প্রে না করা, মাস্ক পরা এবং স্প্রে করার কতদিন পর ফসল তোলা নিরাপদ।"
      }
    ],
    comparisons: [
      {
        id: "comp_blast",
        title: "সুস্থ ধানের পাতা বনাম ব্লাস্ট আক্রান্ত পাতা",
        healthyImg: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
        diseasedImg: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=500&q=80",
        healthyDesc: "সতেজ ঘন সবুজ পাতা, সমান কিনার, কোনো দাগ বা পচন নেই।",
        diseasedDesc: "চোখের মতো মাকু আকৃতির বাদামি দাগ, মাঝখান ধূসর এবং পাতার ডগা শুকিয়ে সাদা।"
      },
      {
        id: "comp_blight",
        title: "সুস্থ আলুর ক্ষেত বনাম নাবি ধসা (Late Blight) আক্রান্ত ক্ষেত",
        healthyImg: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80",
        diseasedImg: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=500&q=80",
        healthyDesc: "গাছ সতেজ খাড়া, চকচকে সবুজ পাতা ও সুস্থ কাণ্ড।",
        diseasedDesc: "পাতায় ভেজা কালচে দাগ, পোড়া পোড়া ভাব এবং ভোরে পাতার নিচে সাদা ছাতা।"
      },
      {
        id: "comp_chilli",
        title: "সুস্থ সতেজ মরিচ বনাম অ্যানথ্রাকনোজ (ফল পচা) আক্রান্ত মরিচ",
        healthyImg: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=500&q=80",
        diseasedImg: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=500&q=80",
        diseasedDesc: "মরিচের গায়ে বৃত্তাকার দেবে যাওয়া কালো দাগ, শুকিয়ে চামড়ার মতো হয়ে যাওয়া।"
      }
    ],
    stepGuides: [
      {
        title: "ট্রাইকোডার্মা দিয়ে বীজ শোধন পদ্ধতি",
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80",
        steps: [
          "১. প্রতি কেজি বীজের জন্য ২-৩ গ্রাম ট্রাইকোডার্মা বা প্রভ্যাক্স পাউডার নিন।",
          "২. সামান্য চিটাগুড়ের পানি দিয়ে বীজ হালকা ভিজিয়ে নিন যাতে পাউডার লেগে থাকে।",
          "৩. বীজের সাথে ভালো করে মিশিয়ে ছায়াযুক্ত স্থানে ২০ মিনিট শুকিয়ে নিয়ে জমিতে বা বীজতলায় বুনে দিন।"
        ]
      },
      {
        title: "সেক্স ফেরোমন ট্র্যাপ (পোকার ফাঁদ) স্থাপনের নিয়ম",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
        steps: [
          "১. প্লাস্টিকের বয়ামের দুই পাশে ত্রিকোণাকার জানালা কেটে সাবান পানি দিয়ে ভরাট করুন।",
          "২. ঢাকনার ঠিক নিচে লিয়ুরেল ফেরোমন টিউব ঝুলিয়ে দিন।",
          "৩. ফাঁদটি ফসলের গাছের উচ্চতা বরাবর খুঁটি দিয়ে বেঁধে দিন। পুরুষ পোকা আকর্ষিত হয়ে সাবান পানিতে পড়ে মারা যাবে।"
        ]
      }
    ],
    glossary: [
      { term: "কুশি (Tillering)", meaning: "ধান বা গমের মূল চারা থেকে পাশে নতুন যে ডালপালা বা কুশি গজায়।" },
      { term: "কাইচ থোড় (Booting Stage)", meaning: "ধান গাছের পেটের ভেতর যখন শীষ তৈরি হতে শুরু করে এবং কাণ্ড ফুলে ওঠে।" },
      { term: "টপড্রেসিং (Top-dressing)", meaning: "ফসল মাঠে থাকা অবস্থায় উপরিভাগে সার ছড়িয়ে দেওয়া।" },
      { term: "পিএইচআই (PHI - Pre-Harvest Interval)", meaning: "কীটনাশক স্প্রে করার পর কতদিন পর্যন্ত ওই ফসল তোলা বা খাওয়া নিষেধ, সেই অপেক্ষার সময়কাল।" },
      { term: "মালচিং (Mulching)", meaning: "মাটির আর্দ্রতা ধরে রাখতে ও আগাছা রোধে গাছের গোড়ায় খড় বা পলিথিনের ঢাকনা দেওয়া।" },
      { term: "বালাইনাশক (Pesticides)", meaning: "ক্ষতিকর পোকা, রোগজীবাণু বা আগাছা দমনের জন্য ব্যবহৃত উপাদান।" }
    ],
    faqs: [
      {
        q: "ধানের পাতায় পোকা লাগলে কখন স্প্রে করা সবচেয়ে ভালো?",
        a: "কীটনাশক বা ছত্রাকনাশক সবসময় বিকেলে রোদ পড়ে এলে স্প্রে করা সবচেয়ে কার্যকর। সকালে শিশির ভেজা পাতায় স্প্রে করলে ওষুধ ধুয়ে যায় এবং দুপুরের কড়া রোদে ওষুধের কার্যকারিতা কমে যেতে পারে।"
      },
      {
        q: "একই জমিতে প্রতি বছর একই ফসল চাষ করলে কী ক্ষতি হয়?",
        a: "মাটির নির্দিষ্ট পুষ্টি উপাদান দ্রুত নিঃশেষ হয়ে যায় এবং ওই ফসলের বিশেষ রোগজীবাণু ও পোকার বংশবৃদ্ধি ঘটে। তাই শস্য পর্যায় (Crop Rotation) মেনে ডাল বা তেলবীজ চাষ করা উচিত।"
      },
      {
        q: "ইউরিয়া ও পটাশ সার কি একসাথে প্রয়োগ করা যায়?",
        a: "হ্যাঁ, ইউরিয়া ও এমওপি পটাশ সার একসাথে মিশিয়ে দ্রুত প্রয়োগ করা যায়। তবে টিএসপি ও জিংক সার একসাথে মেশানো যাবে না।"
      },
      {
        q: "জরুরি কৃষি পরামর্শের জন্য কোথায় যোগাযোগ করব?",
        a: "যেকোনো মোবাইল থেকে টোল-ফ্রি নম্বর ১৬১২৩ এ কল করে সরাসরি সরকারি কৃষি বিশেষজ্ঞের সাথে বিনামূল্যে পরামর্শ নেওয়া যায়।"
      }
    ]
  },

  // Retain fertilizers & pesticides for backwards compatibility
  fertilizers: [
    {
      id: "fert_urea",
      name: "Urea / ইউরিয়া সার",
      type: "Chemical (Inorganic) / রাসায়নিক সার",
      composition: "46% Nitrogen (N) / ৪৬% নাইট্রোজেন",
      purpose: "Promotes rapid vegetative leaf growth and green chlorophyll pigmentation. / উদ্ভিদের দ্রুত শারীরিক বৃদ্ধি ও পাতা সবুজ রাখতে সহায়তা করে।",
      applicationRate: "15-20 kg/bigha in 2-3 splits. / বিঘা প্রতি ১৫-২০ কেজি (২-৩ কিস্তিতে)।",
      method: "Top-dressing on moist soil. Never apply on dry cracked ground. / মাটির পর্যাপ্ত আর্দ্রতায় উপরিপ্রয়োগ করুন।",
      targetCrops: "Rice, Wheat, Corn, Vegetables, Jute / ধান, গম, ভুট্টা, সবজি, পাট"
    },
    {
      id: "fert_tsp",
      name: "TSP (Triple Super Phosphate) / টিএসপি সার",
      type: "Chemical (Inorganic) / রাসায়নিক সার",
      composition: "46% Phosphorus (P2O5) / ৪৬% ফসফরাস",
      purpose: "Strong root development, tillering, and timely maturity. / শক্তিশালী শিকড় গঠন ও ফুল-ফল ধারণে সহায়তা করে।",
      applicationRate: "12-15 kg/bigha at final land preparation. / বিঘা প্রতি ১২-১৫ কেজি (জমি তৈরির শেষ চাষে)।",
      method: "Basal application mixed into soil before sowing. / বপনের পূর্বে মাটির সাথে মিশিয়ে দিন।",
      targetCrops: "All field crops / সব ধরনের মাঠ ফসল"
    },
    {
      id: "fert_mop",
      name: "MOP (Muriate of Potash) / এমওপি (পটাশ) সার",
      type: "Chemical (Inorganic) / রাসায়নিক সার",
      composition: "60% Potassium (K2O) / ৬০% পটাশিয়াম",
      purpose: "Disease resistance, grain filling, drought tolerance. / রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি ও দানা পুষ্ট করতে সহায়ক।",
      applicationRate: "10-15 kg/bigha (split or basal). / বিঘা প্রতি ১০-১৫ কেজি।",
      method: "Half at land preparation, half at boot/flowering stage. / অর্ধেক জমি তৈরিতে, বাকি অর্ধেক থোড় আসার পূর্বে।",
      targetCrops: "Rice, Potato, Tomato, Wheat, Corn / ধান, আলু, টমেটো, গম, ভুট্টা"
    },
    {
      id: "fert_vermicompost",
      name: "Vermicompost / কেঁচো সার (জৈব সার)",
      type: "Organic / জৈব সার",
      composition: "Rich in humus, N, P, K, and beneficial microbial flora. / হিউমাস, নাইট্রোজেন, ফসফরাস ও অণুজীব সমৃদ্ধ।",
      purpose: "Restores soil biological health and water retention. / মাটির উর্বরতা ও পানি ধারণক্ষমতা বৃদ্ধি করে।",
      applicationRate: "150-200 kg/bigha. / বিঘা প্রতি ১৫০-২০০ কেজি।",
      method: "Broadcast evenly during primary tilling. / জমি তৈরির সময় সমানভাবে ছিটিয়ে চাষ দিন।",
      targetCrops: "Vegetables, Fruit Orchards, Potato / সবজি, ফলবাগান, আলু"
    }
  ],

  pesticides: [
    {
      id: "pest_nativo",
      tradeName: "Nativo 75WG / নাটিভো ৭৫ ডব্লিউজি",
      activeIngredient: "Tebuconazole 50% + Trifloxystrobin 25%",
      targetPests: "Rice Blast, Sheath Blight, Fruit Rot / ধানের ব্লাস্ট, খোলা পোড়া, মরিচের ফল পচা",
      recommendedDose: "0.6 g/L water (10g per 16L spray tank) / প্রতি লিটার পানিতে ০.৬ গ্রাম।",
      waitingPeriod: "14 Days (PHI) / ফসল তোলার ১৪ দিন আগে প্রয়োগ বন্ধ করুন।",
      safetyInstructions: "Wear gloves and face mask. Do not spray against the wind. / মুখে মাস্ক ও হাতে গ্লাভস পরে বিকেলের দিকে স্প্রে করুন।"
    },
    {
      id: "pest_proclaim",
      tradeName: "Proclaim 5SG / প্রোক্লেম ৫ এসজি",
      activeIngredient: "Emamectin Benzoate 5%",
      targetPests: "Fruit & Shoot Borer, Armyworm, Caterpillars / ডগা ও ফল ছিদ্রকারী পোকা, লেদা পোকা",
      recommendedDose: "1 g/L water (16g per 16L spray tank) / প্রতি লিটার পানিতে ১ গ্রাম।",
      waitingPeriod: "7 Days (PHI) / ফসল তোলার ৭ দিন আগে প্রয়োগ বন্ধ করুন।",
      safetyInstructions: "Spray during late afternoon when caterpillars emerge. / বিকেলের দিকে লার্ভা বের হলে স্প্রে করুন।"
    },
    {
      id: "pest_admire",
      tradeName: "Admire 200SL / এডমিয়ার ২০০ এসএল",
      activeIngredient: "Imidacloprid 20%",
      targetPests: "Aphids, Jassids, Whiteflies, Thrips / জাব পোকা, সাদা মাছি, চুষি পোকা",
      recommendedDose: "0.5 ml/L water (8ml per 16L tank) / প্রতি লিটার পানিতে ০.৫ মিলি।",
      waitingPeriod: "10 Days (PHI) / ফসল তোলার ১০ দিন আগে প্রয়োগ বন্ধ করুন।",
      safetyInstructions: "Do not spray in morning during active honeybee pollination. / সকালে মৌমাছির পরাগায়নের সময় স্প্রে করবেন না।"
    }
  ]
};
