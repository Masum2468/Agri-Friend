// Static guides and database for the public portal (Bangladesh Agricultural Context - 10 items per category)
module.exports = {
  crops: [
    {
      id: "crop_rice",
      name: "Rice / ধান",
      scientificName: "Oryza sativa",
      type: "Cereal",
      idealSoil: "Clayey, Clay-Loam / এটেল ও দোআঁশ মাটি",
      optimalPH: "5.5 - 6.5",
      waterRequirement: "High (1200-1500 mm, standing water)",
      growthDuration: "100 - 150 days",
      temperatureRange: "20°C - 35°C",
      plantingSeason: "Boro (Winter/Rabi), Aman (Kharif-2), Aus (Kharif-1)",
      seedInfo: {
        rate: "25-30 kg/hectare (Transplanted)",
        depth: "2-3 cm",
        spacing: "20 x 15 cm",
        popularVarieties: "BRRI dhan28, BRRI dhan29, BRRI dhan89, BRRI dhan92, Banglamati (BRRI dhan50)"
      },
      description: "Rice is Bangladesh's primary dietary staple. Cultivated extensively across Boro, Aman, and Aus seasons under BRRI management guidelines."
    },
    {
      id: "crop_wheat",
      name: "Wheat / গম",
      scientificName: "Triticum aestivum",
      type: "Cereal",
      idealSoil: "Loamy, Silt-Clay / উর্বর দোআঁশ ও পলি-দোআঁশ মাটি",
      optimalPH: "6.0 - 7.0",
      waterRequirement: "Medium (400-500 mm)",
      growthDuration: "105 - 115 days",
      temperatureRange: "12°C - 25°C",
      plantingSeason: "Rabi / শীতকাল (কার্তিক-অগ্রহায়ণ / Nov-Dec)",
      seedInfo: {
        rate: "120-130 kg/hectare",
        depth: "3-5 cm",
        spacing: "20 cm row spacing",
        popularVarieties: "BARI Gom 26 (Hasna), BARI Gom 28, BARI Gom 30, BARI Gom 33 (Zinc enriched)"
      },
      description: "Major cereal crop grown in North-Western districts of Bangladesh during dry winter months."
    },
    {
      id: "crop_corn",
      name: "Maize (Corn) / ভুট্টা",
      scientificName: "Zea mays",
      type: "Cereal",
      idealSoil: "Well-drained Loam, Sandy Loam / বেলে-দোআঁশ মাটি",
      optimalPH: "5.8 - 7.0",
      waterRequirement: "Medium (500-700 mm)",
      growthDuration: "120 - 140 days (Rabi), 90 - 110 days (Kharif)",
      temperatureRange: "18°C - 32°C",
      plantingSeason: "Rabi (Oct-Nov) & Kharif (March-April)",
      seedInfo: {
        rate: "20-25 kg/hectare",
        depth: "4-5 cm",
        spacing: "60 x 20 cm",
        popularVarieties: "BARI Hybrid Bhutta 9, BARI Hybrid Bhutta 14, NK-40, Super Shine"
      },
      description: "High-yielding cash crop in Bangladesh used extensively for poultry feed and human consumption."
    },
    {
      id: "crop_potato",
      name: "Potato / আলু",
      scientificName: "Solanum tuberosum",
      type: "Tuber",
      idealSoil: "Loose Sandy Loam / বেলে-দোআঁশ ও পলি মাটি",
      optimalPH: "5.2 - 6.4",
      waterRequirement: "Medium (400-600 mm)",
      growthDuration: "85 - 95 days",
      temperatureRange: "15°C - 22°C",
      plantingSeason: "Rabi / শীতকাল (আশ্বিন-কার্তিক / Oct-Nov)",
      seedInfo: {
        rate: "1.5-2.0 tons/hectare (seed tubers)",
        depth: "7-10 cm",
        spacing: "60 x 20 cm",
        popularVarieties: "Diamant, Asterix, Cardinal, BARI Alu-7, BARI Alu-25"
      },
      description: "Top commercial tuber crop in Munshiganj, Bogura, and Rangpur regions of Bangladesh."
    },
    {
      id: "crop_jute",
      name: "Jute / পাট (গোল্ডেন ফাইবার)",
      scientificName: "Corchorus olitorius / Corchorus capsularis",
      type: "Fiber",
      idealSoil: "Alluvial Loam, Silt Soil / পলি মাটি ও তোষা দোআঁশ মাটি",
      optimalPH: "6.0 - 7.5",
      waterRequirement: "High (1500-2000 mm)",
      growthDuration: "110 - 130 days",
      temperatureRange: "24°C - 38°C",
      plantingSeason: "Kharif-1 (March - April / চৈত্র-বৈশাখ)",
      seedInfo: {
        rate: "5-6 kg/hectare (Tossa), 7-8 kg/hectare (Deshi)",
        depth: "2-3 cm",
        spacing: "30 x 7 cm",
        popularVarieties: "BJRI Tossa Pat 8 (Robi-1), O-9897, C-6 (Deshi Pat)"
      },
      description: "Golden fiber of Bangladesh. Eco-friendly commercial cash crop yielding high-quality natural textile fiber."
    },
    {
      id: "crop_mustard",
      name: "Mustard / সরিষা",
      scientificName: "Brassica napus / Brassica juncea",
      type: "Oilseed",
      idealSoil: "Loam, Clay-Loam / দোআঁশ ও এটেল মাটি",
      optimalPH: "6.0 - 7.2",
      waterRequirement: "Low (200-350 mm)",
      growthDuration: "75 - 90 days",
      temperatureRange: "15°C - 25°C",
      plantingSeason: "Rabi (Oct - Nov / আশ্বিন-কার্তিক)",
      seedInfo: {
        rate: "7-8 kg/hectare",
        depth: "2-3 cm",
        spacing: "30 cm row spacing",
        popularVarieties: "BARI Sarisha 14, BARI Sarisha 17, BARI Sarisha 18 (Canola type), Tori-7"
      },
      description: "Primary edible oilseed crop of Bangladesh. Short duration winter crop ideal for intercropping with rice."
    },
    {
      id: "crop_tomato",
      name: "Tomato / টমেটো",
      scientificName: "Solanum lycopersicum",
      type: "Vegetable",
      idealSoil: "Sandy Loam, Loam / হালকা দোআঁশ মাটি",
      optimalPH: "6.0 - 6.8",
      waterRequirement: "Medium (400-600 mm)",
      growthDuration: "70 - 90 days (post transplant)",
      temperatureRange: "15°C - 30°C",
      plantingSeason: "Rabi (Winter) & Summer (BARI Tomato 4/8)",
      seedInfo: {
        rate: "200-250 g/hectare (Nursery)",
        depth: "0.5-1 cm",
        spacing: "60 x 40 cm",
        popularVarieties: "BARI Tomato 14, BARI Tomato 15, Bahar, Bijli, Summer BARI Tomato 8"
      },
      description: "High-value vegetable crop grown across Bangladesh both in open fields and greenhouses."
    },
    {
      id: "crop_eggplant",
      name: "Eggplant (Brinjal) / বেগুন",
      scientificName: "Solanum melongena",
      type: "Vegetable",
      idealSoil: "Well-drained Silt Loam / পলি-দোআঁশ মাটি",
      optimalPH: "5.5 - 6.8",
      waterRequirement: "Medium to High (600-800 mm)",
      growthDuration: "110 - 140 days",
      temperatureRange: "20°C - 32°C",
      plantingSeason: "Year-round (Rabi & Kharif)",
      seedInfo: {
        rate: "250-300 g/hectare",
        depth: "1 cm",
        spacing: "75 x 60 cm",
        popularVarieties: "Bt Begun (BARI Bt Begun 2/4), Kazla, Uttara, Islampuri, Chela"
      },
      description: "Extensively cultivated vegetable in Bangladesh available throughout all agricultural seasons."
    },
    {
      id: "crop_lentil",
      name: "Lentil / মসুর ডাল",
      scientificName: "Lens culinaris",
      type: "Pulse",
      idealSoil: "Loam, Clay-Loam / দোআঁশ ও পলি মাটি",
      optimalPH: "6.0 - 7.5",
      waterRequirement: "Low (200-300 mm)",
      growthDuration: "95 - 110 days",
      temperatureRange: "14°C - 25°C",
      plantingSeason: "Rabi (Nov - Dec / কার্তিক-অগ্রহায়ণ)",
      seedInfo: {
        rate: "30-35 kg/hectare",
        depth: "3-4 cm",
        spacing: "25 cm row spacing",
        popularVarieties: "BARI Masur 6, BARI Masur 7, BARI Masur 8 (Stemphylium blight resistant)"
      },
      description: "Top leguminous pulse crop of Bangladesh rich in dietary protein and soil nitrogen fixing capacity."
    },
    {
      id: "crop_onion",
      name: "Onion / পেঁয়াজ",
      scientificName: "Allium cepa",
      type: "Vegetable",
      idealSoil: "Friable Sandy Loam / ঝুরঝুরে বেলে-দোআঁশ মাটি",
      optimalPH: "6.0 - 7.0",
      waterRequirement: "Medium (350-500 mm)",
      growthDuration: "90 - 110 days",
      temperatureRange: "15°C - 28°C",
      plantingSeason: "Winter (Rabi) & Summer (BARI Piaz 5)",
      seedInfo: {
        rate: "8-10 kg/hectare (seed) or 1000 kg sets",
        depth: "1.5-2 cm",
        spacing: "15 x 10 cm",
        popularVarieties: "BARI Piaz 1, BARI Piaz 4, BARI Piaz 5 (Summer variety), Taherpuri"
      },
      description: "Crucial culinary spice and cash crop widely grown in Faridpur, Pabna, and Rajshahi."
    }
  ],
  diseases: [
    {
      id: "dis_rice_blast",
      name: "Rice Blast / ধানের ব্লাস্ট রোগ (পাতা ও গিট ব্লাস্ট)",
      pathogen: "Magnaporthe oryzae (Fungus)",
      targetCrops: "ধান (আমন, বোরো ও আউশ ধান)",
      symptoms: "পাতায় চোখের মতো লম্বাটে দাগ পড়ে যার চারপাশ বাদামি ও মাঝখানটা ধূসর হয়। গিট ব্লাস্ট হলে গিরার অংশ কালো হয়ে পচে যায় এবং শীষের ধান চিটা হয়ে যায়।",
      prevention: "ইউরিয়া সার অতিরিক্ত মাত্রায় ব্যবহার করবেন না, জমিতে সুষম পটাশ সার ব্যবহার করুন এবং ব্লাস্ট-প্রতিরোধী জাতের ধান (যেমন- বিআরআরআই ধান২৮) চাষ করুন।",
      treatment: "লক্ষণ দেখা দিলে ট্রাইসাইক্লাজোল বা নাটিভো গ্রুপের ওষুধ (যেমন- ট্রুপার ৭৫ ডব্লিউপি প্রতি লিটার পানিতে ০.৮ গ্রাম অথবা নাটিভো ০.৬ গ্রাম মিশিয়ে) ১০-১২ দিন অন্তর ২ বার স্প্রে করুন।"
    },
    {
      id: "dis_late_blight",
      name: "Late Blight / আলু ও টমেটোর নাবি ধসা রোগ",
      pathogen: "Phytophthora infestans (Oomycete)",
      targetCrops: "আলু, টমেটো (Potato & Tomato)",
      symptoms: "পাতায় ভেজা কালচে দাগ দেখা যায়, আর্দ্র ও স্যাঁতসেঁতে আবহাওয়ায় পাতার নিচে সাদা ছত্রাকের গুঁড়ো জমে এবং দ্রুত আলু বা টমেটো পচে যায়।",
      prevention: "রোগমুক্ত প্রত্যয়িত বীজ ব্যবহার করুন, শস্য পর্যায় অবলম্বন করুন এবং জমিতে পানি জমে থাকতে দেবেন না।",
      treatment: "লক্ষণ দেখা দিলে প্রতি লিটার পানিতে ২ গ্রাম সিকিউর বা রিডোমিল গোল্ড অথবা ম্যানকোজেব জাতীয় ছত্রাকনাশক ৫-৭ দিন পর পর স্প্রে করুন।"
    },
    {
      id: "dis_bacterial_blight",
      name: "Bacterial Leaf Blight / ধানের ব্যাকটেরিয়াজনিত পাতা পোড়া রোগ",
      pathogen: "Xanthomonas oryzae pv. oryzae",
      targetCrops: "ধান (Rice)",
      symptoms: "পাতার ডগা বা কিনার থেকে হলুদ ও পরবর্তীতে খড়ির মতো শুকিয়ে সাদা হয়ে যায়। পাতায় ঢেউখেলানো দাগ দেখা যায়।",
      prevention: "সুষম পটাশ সার ব্যবহার করুন, অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন এবং সেচের পানি অন্য জমিতে যেতে দেবেন না।",
      treatment: "রোগের প্রাদুর্ভাব হলে প্রতি শতকে ৬০ গ্রাম থিওভিট ও ২০ গ্রাম জিংক সালফেট অথবা কপার অকিসক্লোরাইড স্প্রে করুন।"
    },
    {
      id: "dis_bacterial_wilt",
      name: "Bacterial Wilt / বেগুন ও টমেটোর ঢলে পড়া রোগ",
      pathogen: "Ralstonia solanacearum",
      targetCrops: "বেগুন, টমেটো, মরিচ, আলু",
      symptoms: "সবুজ তরতাজা গাছ হঠাৎ দুপুরের কড়া রোদে ঢলে পড়ে এবং রাতের দিকে কিছুটা স্বাভাবিক হলেও কয়েক দিনের মধ্যে পুরো গাছ শুকিয়ে মারা যায়।",
      prevention: "ট্রাইকো-কম্পোস্ট ও ব্লিচিং পাউডার মাটিতে প্রয়োগ করুন, শস্য পর্যায় অবলম্বন করুন এবং প্রতিরোধী জাত চাষ করুন।",
      treatment: "আক্রান্ত গাছ তুলে পুড়িয়ে ফেলুন। গোড়ায় চুন ভিজানো পানি বা কপার আক্সিক্লোরাইড (২ গ্রাম/লিটার) দিয়ে ভিজিয়ে দিন।"
    },
    {
      id: "dis_powdery_mildew",
      name: "Powdery Mildew / পাউডারি মিলডিউ (সাদা ছত্রাক রোগ)",
      pathogen: "Erysiphales family (Fungi)",
      targetCrops: "লাউ, কুমড়ো, শসা, আম ও মটরশুঁটি",
      symptoms: "পাতার উপরে ও নিচে সাদা আটার মতো পাউডারের প্রলেপ পড়ে, পাতা কুঁকড়ে যায় এবং গাছ দুর্বল হয়ে পড়ে।",
      prevention: "সূর্যরশ্মি ও বাতাস চলাচলের ব্যবস্থা রাখুন, খুব ঘন বীজ বপন করবেন না।",
      treatment: "নিম তেল (৫ মিলি নিম তেল + ২ মিলি সাবান পানি প্রতি লিটারে) স্প্রে করুন অথবা থিওভিট ৮০ ডব্লিউডিজি (২ গ্রাম/লিটার) ছিটান।"
    },
    {
      id: "dis_sheath_blight",
      name: "Sheath Blight / ধানের খোলা পোড়া রোগ",
      pathogen: "Rhizoctonia solani (Fungus)",
      targetCrops: "ধান (Rice)",
      symptoms: "পানির উপরিভাগে গাছের খোল বা কাণ্ডে সাপের চামড়ার মতো ডিম্বাকৃতির ধূসর-সাদা দাগ পড়ে যার চারপাশ বাদামি হয়ে যায়।",
      prevention: "জমি পরিষ্কার পরিচ্ছন্ন রাখুন, অতিরিক্ত ইউরিয়া এড়ান এবং গাছ ঘন হলে বাতাস চলাচলের সুযোগ দিন।",
      treatment: "লক্ষণ দেখা দিলে হেক্সাকোনাজোল (যেমন- কন্টাফ ৫ ইসি ২ মিলি/লিটার) অথবা অ্যামিস্টার টপ (১ মিলি/লিটার) খোল ভিজিয়ে স্প্রে করুন।"
    },
    {
      id: "dis_jute_rot",
      name: "Stem Rot & Foot Rot / পাটের কাণ্ড পচা ও গোড়া পচা রোগ",
      pathogen: "Macrophomina phaseolina (Fungus)",
      targetCrops: "পাট (Jute)",
      symptoms: "পাটের কান্ডে কালো ফোটা দাগ পড়ে, গোড়া কালো হয়ে পচে যায় এবং বাতাসে কান্ড ভেঙে পড়ে।",
      prevention: "বীজ শোধন (অটোস্টিন বা প্রভ্যাক্স ২.৫ গ্রাম/কেজি) করে বপন করুন এবং পানি নিষ্কাশন নিশ্চিত করুন।",
      treatment: "কারবেনডাজিম গ্রুপের ওষুধ (অটোস্টিন ২ গ্রাম/লিটার) স্প্রে করুন।"
    },
    {
      id: "dis_purple_blotch",
      name: "Purple Blotch / পেঁয়াজের বেগুনী দাগ রোগ",
      pathogen: "Alternaria porri (Fungus)",
      targetCrops: "পেঁয়াজ ও রসুন (Onion & Garlic)",
      symptoms: "পাতায় ছোট ছোট চোখার মতো বেগুনি বা বাদামি দাগ পড়ে, পরবর্তীতে পাতা ভেঙে পড়ে এবং পেঁয়াজের আকার ছোট হয়।",
      prevention: "রোগমুক্ত বীজ ব্যবহার করুন ও জমিতে অতিরিক্ত পানি জমা রোধ করুন।",
      treatment: "রোভরাল ৫০ ডব্লিউপি (২ গ্রাম/লিটার) অথবা নাটিভো (০.৬ গ্রাম/লিটার) ৭-১০ দিন পর পর ২ বার স্প্রে করুন।"
    },
    {
      id: "dis_chili_leaf_curl",
      name: "Leaf Curl Virus / মরিচের পাতা কোঁকড়ানো রোগ",
      pathogen: "Chilli Leaf Curl Begomovirus (Virus transmitted by Whitefly)",
      targetCrops: "মরিচ, টমেটো, পেঁপে",
      symptoms: "পাতা ছোট হয়ে নৌকার মতো কোঁকড়ে যায়, গাছ ঝোপালো হয়ে বাড়ে এবং ফুল-ফল ধরা বন্ধ হয়ে যায়।",
      prevention: "বাহক পোকা (সাদা মাছি) নিয়ন্ত্রণে হলুদ কালার ট্র্যাপ ঝুলিয়ে রাখুন।",
      treatment: "সাদা মাছি দমনে ইমিডাক্লোপ্রিড (এডমিয়ার ০.৫ মিলি/লিটার) অথবা পেগাসাস (১ গ্রাম/লিটার) স্প্রে করুন।"
    },
    {
      id: "dis_citrus_canker",
      name: "Citrus Canker / লেবুর ক্যানকার রোগ",
      pathogen: "Xanthomonas citri (Bacteria)",
      targetCrops: "কাগজী লেবু, জাম্বুরা ও কমলা",
      symptoms: "পাতা, কাণ্ড ও লেবুর গায়ে খসখসে বাদামি বা বরফ কুচির মতো উঁচু ক্ষত দাগ পড়ে এবং ফল ঝরে যায়।",
      prevention: "আক্রান্ত ডালপালা ছেঁটে ফেলে ছাই বা বর্দো মিক্সচার দিন।",
      treatment: "কপার অক্সিক্লোরাইড (৪ গ্রাম/লিটার) সাথে স্ট্রেপ্টোমাইসিন (০.২ গ্রাম/লিটার) মিশিয়ে স্প্রে করুন।"
    }
  ],
  fertilizers: [
    {
      id: "fert_urea",
      name: "Urea / ইউরিয়া সার (৪৬% নাইট্রোজেন)",
      composition: "46% Nitrogen (N)",
      type: "Chemical / Inorganic",
      targetCrops: "ধান, গম, ভুট্টা, পাট ও সকল শাকসবজি",
      applicationRate: "বিঘায় ১৫-২৫ কেজি (ফসলের ধরন অনুযায়ী তিন কিস্তিতে)",
      method: "উপরি প্রয়োগ (Broadcasting in split doses)",
      purpose: "উদ্ভিদের দ্রুত কায়িক বৃদ্ধি, কান্ড শক্ত করা এবং পাতার গাঢ় সবুজ রঙ নিশ্চিত করা।"
    },
    {
      id: "fert_tsp",
      name: "TSP / টিএসপি সার (ট্রিপল সুপার ফসফেট)",
      composition: "46% Phosphorus (P2O5) + 1.3% Sulfur",
      type: "Chemical / Inorganic",
      targetCrops: "ধান, আলু, সরিষা, গম, ডাল ও ফলমূল",
      applicationRate: "বিঘায় ১০-১৫ কেজি",
      method: "জমি তৈরির শেষ চাষের সময় (Basal application at sowing)",
      purpose: "শক্তিশালী শিকড় গজানো, কান্ড শক্ত করা এবং সময়মতো ফুল ও ফল ধরতে সাহায্য করা।"
    },
    {
      id: "fert_dap",
      name: "DAP / ডিএপি সার (ডাই-অ্যামোনিয়াম ফসফেট)",
      composition: "18% Nitrogen (N) + 46% Phosphorus (P2O5)",
      type: "Chemical / Inorganic",
      targetCrops: "ধান, আলু, ভুট্টা, সরিষা ও ডাল ফসল",
      applicationRate: "বিঘায় ১২-১৮ কেজি",
      method: "জমি তৈরির শেষ চাষে প্রয়োগযোগ্য",
      purpose: "একই সাথে নাইট্রোজেন ও ফসফরাসের চাহিদা পূরণ করে এবং চারা দ্রুত বড় হতে সাহায্য করে।"
    },
    {
      id: "fert_mop",
      name: "MOP / পটাশ সার (Muriate of Potash)",
      composition: "60% Potassium (K2O)",
      type: "Chemical / Inorganic",
      targetCrops: "ধান, আলু, ফলমূল, শাকসবজি ও সরিষা",
      applicationRate: "বিঘায় ১০-১৫ কেজি",
      method: "জমি তৈরিতে ও কাইচ থোড় আসার আগে উপরি প্রয়োগ",
      purpose: "দানার আকার বড় করা, রোগ ও পোকা প্রতিরোধ ক্ষমতা বাড়ানো এবং খরা সহনশীলতা দান করা।"
    },
    {
      id: "fert_gypsum",
      name: "Gypsum / জিপসাম সার (ক্যালসিয়াম ও সালফার)",
      composition: "17% Sulfur (S) & 22% Calcium (Ca)",
      type: "Chemical / Inorganic",
      targetCrops: "ধান, সরিষা, চিনাবাদাম ও তেলজাতীয় ফসল",
      applicationRate: "বিঘায় ৮-১২ কেজি",
      method: "জমি তৈরির সময় প্রয়োগযোগ্য",
      purpose: "তেলজাতীয় ফসলে তেলের পরিমাণ বাড়ানো এবং ধানের কুশির সংখ্যা বৃদ্ধি।"
    },
    {
      id: "fert_zinc",
      name: "Zinc Sulphate / জিংক সালফেট (দস্তা সার)",
      composition: "36% Zinc (Zn) & 17% Sulfur (S)",
      type: "Micro-nutrient",
      targetCrops: "ধান, ভুট্টা, আলু",
      applicationRate: "বিঘায় ১.৫-২ কেজি",
      method: "জমি তৈরির সময় বা পাতায় স্প্রে",
      purpose: "ধানের খৈরা রোগ প্রতিরোধ করা, পাতার হলুদ ভাব কাটানো ও হরমোন তৈরি।"
    },
    {
      id: "fert_tricho",
      name: "Tricho-Compost / ট্রাইকো-কম্পোস্ট ও জৈব সার",
      composition: "Decomposed organic matter enriched with Trichoderma harzianum fungi",
      type: "Organic / Bio-fertilizer",
      targetCrops: "সকল ফসল ও জৈব কৃষি ব্যবস্থা",
      applicationRate: "বিঘায় ২০০- ৩০০ কেজি",
      method: "জমি তৈরির সময় মাটিতে মিশিয়ে দেওয়া",
      purpose: "মাটির অণুজীব সক্রিয় করা, মাটির মাটির পানি ধারণক্ষমতা বাড়ানো এবং মাটিবাহিত রোগজীবাণু দমন।"
    },
    {
      id: "fert_boron",
      name: "Solubor Boron / সোলুবোর বা বোরন সার",
      composition: "20% Boron (B)",
      type: "Micro-nutrient",
      targetCrops: "গম, সরিষা, ফুলকপি, টমেটো, আম ও লিচু",
      applicationRate: "বিঘায় ১-১.৫ কেজি অথবা ১.৫ গ্রাম/লিটার পাতায় স্প্রে",
      method: "জমি তৈরির সময় বা ফুল আসার আগে পাতায় স্প্রে",
      purpose: "ফসলের দানা পুষ্ট করা, গম/সরিষার বন্ধ্যাত্ব দূর করা এবং ফুল ও ফল ঝরে পড়া রোধ।"
    },
    {
      id: "fert_magnesium",
      name: "Magnesium Sulphate / ম্যাগনেসিয়াম সালফেট",
      composition: "9.6% Magnesium (Mg) & 12% Sulfur (S)",
      type: "Micro-nutrient",
      targetCrops: "পান, আলু, টমেটো, চা ও ফলগাছ",
      applicationRate: "বিঘায় ৩-৫ কেজি",
      method: "জমি তৈরিতে বা স্প্রে আকারে",
      purpose: "পাতার ক্লোরোফিল বজায় রাখা এবং পুরনো পাতা হলুদ হয়ে যাওয়া দূর করা।"
    },
    {
      id: "fert_vermi",
      name: "Vermicompost / ভার্মিকম্পোস্ট (কেঁচো সার)",
      composition: "Rich organic humic materials, NPK & micro-nutrients produced by Earthworms",
      type: "Organic Fertilizer",
      targetCrops: "শাকসবজি, ফুলমূল, ফলদ বৃক্ষ ও নার্সারি",
      applicationRate: "বিঘায় ১৫০-২৫০ কেজি",
      method: "জমি তৈরিতে ও গাছের গোড়ায় প্রয়োগ",
      purpose: "গাছের সুষম পুষ্টি নিশ্চিত করা, মাটির বুনট উন্নত করা এবং বিষমুক্ত নিরাপদ ফসল উৎপাদন।"
    }
  ],
  pesticides: [
    {
      id: "pest_neem_oil",
      name: "Neem Oil / নিম তেল (জৈব বালাইনাশক)",
      activeIngredient: "Azadirachtin",
      type: "Organic / Botanical",
      targetPests: "জাব পোকা, সাদা মাছি, থ্রিপস, লাল মাকড় ও পাতা খেকো পোকা",
      dilutionRate: "৫ মিলি নিম তেল + ২ মিলি তরল সাবান প্রতি লিটার পানিতে",
      safetyInterval: "০ দিন (ফসল তোলার দিনও নিরাপদ)",
      safetyInstructions: "সকালের মিষ্টি রোদে বা বিকেলে স্প্রে করুন। বন্ধুভাবাপন্ন পোকা (লেডিবার্ড বিটল) বা মৌমাছির ক্ষতি করে না।"
    },
    {
      id: "pest_imidacloprid",
      name: "Imidacloprid / ইমিডাক্লোপ্রিড (যেমন- এডমিয়ার / ইমিটাফ)",
      activeIngredient: "Imidacloprid 20SL / 70WG",
      type: "Chemical / Systemic Insecticide",
      targetPests: "ধানের কারেন্ট পোকা (BPH), শোষক পোকা, জাব পোকা, থ্রিপস",
      dilutionRate: "০.৫ মিলি প্রতি লিটার পানিতে",
      safetyInterval: "৭-১০ দিন (ফসল সংগ্রহ স্থগিত রাখুন)",
      safetyInstructions: "সুরক্ষামূলক মাস্ক ব্যবহার করুন। জলাশয় থেকে দূরে স্প্রে করুন।"
    },
    {
      id: "pest_cartap",
      name: "Cartap / কার্টাপ (যেমন- সানটাপ / ফুরাদান দানাদার)",
      activeIngredient: "Cartap Hydrochloride 50SP / 4G",
      type: "Chemical / Contact & Stomach Insecticide",
      targetPests: "ধানের মাজরা পোকা, পাতার মোড়ানো পোকা, মাটির কাটুই পোকা",
      dilutionRate: "১.৫ গ্রাম প্রতি লিটার পানি অথবা ৩ কেজি দানাদার প্রতি বিঘায়",
      safetyInterval: "১৪ দিন",
      safetyInstructions: "গ্লাভস পরে মাটিতে ছিটাতে হবে। হাত ভাল করে সাবান দিয়ে ধুয়ে ফেলুন।"
    },
    {
      id: "pest_cypermethrin",
      name: "Cypermethrin / সাইপারমেথ্রিন (যেমন- রিকর্ড / রিপ্রকর্ড)",
      activeIngredient: "Cypermethrin 10EC",
      type: "Chemical / Synthetic Pyrethroid",
      targetPests: "বেগুনের ডগা ও ফল ছিদ্রকারী পোকা, লেদা পোকা, তামাকের শুঁয়োপোকা",
      dilutionRate: "১ মিলি প্রতি লিটার পানিতে",
      safetyInterval: "১৪ দিন",
      safetyInstructions: "স্প্রে করার সময় বাতাস যেদিকে বয় সেদিকে হাত রেখে স্প্রে করুন।"
    },
    {
      id: "pest_bt",
      name: "Bacillus thuringiensis (Bt) / বিটি বায়ো-কীটনাশক",
      activeIngredient: "Bt crystals (Endotoxin)",
      type: "Biological / Microbial",
      targetPests: "সবজির কচি পাতার লেদা পোকা, ফল ছিদ্রকারী পোকা",
      dilutionRate: "২ গ্রাম প্রতি লিটার পানিতে",
      safetyInterval: "১ দিন",
      safetyInstructions: "কচি লেদা পোকা দেখামাত্র স্প্রে করুন। মানুষ ও পশুপাখির জন্য সম্পূর্ণ নিরাপদ।"
    },
    {
      id: "pest_nitro",
      name: "Nitro / নাইট্রো (ক্লোরপাইরিফস + সাইপারমেথ্রিন)",
      activeIngredient: "Chlorpyrifos 50% + Cypermethrin 5% EC",
      type: "Chemical Insecticide",
      targetPests: "ধানের মাজরা পোকা, আমগাছের হপার পোকা, চোষক পোকা ও কান্ড ছিদ্রকারী",
      dilutionRate: "২ মিলি প্রতি লিটার পানিতে",
      safetyInterval: "১৫ দিন",
      safetyInstructions: "তীব্র বিষাক্ত। স্প্রে করার পর ফেস মাস্ক ও চশমা ব্যবহার নিশ্চিত করুন।"
    },
    {
      id: "pest_proclaim",
      name: "Proclaim / প্রোক্লেম (এমামেকটিন বেনজোয়েট)",
      activeIngredient: "Emamectin Benzoate 5SG",
      type: "Chemical / Non-systemic Insecticide",
      targetPests: "টমেটো ও বেগুনের ফল ও ডগা ছিদ্রকারী লেদা পোকা, থ্রিপস",
      dilutionRate: "১ গ্রাম প্রতি লিটার পানিতে",
      safetyInterval: "৭ দিন",
      safetyInstructions: "বিকেলের দিকে স্প্রে করা উত্তম।"
    },
    {
      id: "pest_mancozeb",
      name: "Dithane M-45 / ডাইথেন এম-৪৫ (ম্যানকোজেব)",
      activeIngredient: "Mancozeb 80% WP",
      type: "Fungicide (Protective)",
      targetCrops: "আলু, টমেটো, ধান, আম ও সবজি",
      targetPests: "নাবি ধসা, পাতার দাগ রোগ, ফল পচা রোগ",
      dilutionRate: "২ গ্রাম প্রতি লিটার পানিতে",
      safetyInterval: "৭ দিন",
      safetyInstructions: "গাছের পাতায় সমানভাবে স্প্রে করুন। স্প্রে করার সময় পানাহার করবেন না।"
    },
    {
      id: "pest_hexaconazole",
      name: "Contaf / কন্টাফ (হেক্সাকোনাজোল)",
      activeIngredient: "Hexaconazole 5% EC",
      type: "Systemic Fungicide",
      targetPests: "ধানের খোলা পোড়া (Sheath blight), মরচে রোগ ও পাউডারি মিলডিউ",
      dilutionRate: "২ মিলি প্রতি লিটার পানিতে",
      safetyInterval: "১০ দিন",
      safetyInstructions: "লক্ষণ দেখা দেওয়ামাত্রই গাছের গোড়াসহ ভেজাতে হবে।"
    },
    {
      id: "pest_abamectin",
      name: "Vertimec / ভার্টিমেক (অ্যাবামেকটিন)",
      activeIngredient: "Abamectin 1.8% EC",
      type: "Acaricide / Insecticide",
      targetPests: "মরিচ, পাট ও সবজির লাল মাকড় (Mites) এবং থ্রিপস পোকা",
      dilutionRate: "১.৫ মিলি প্রতি লিটার পানিতে",
      safetyInterval: "৭ দিন",
      safetyInstructions: "পাতার নিচে যেখানে মাকড় থাকে সেদিকে লক্ষ্য রেখে স্প্রে করুন।"
    }
  ]
};

