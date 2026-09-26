// Translations dictionary and engine for English and Bangla toggling
(function(){
  const translations = {
    en: {
      // Navbar links
      nav_weather: "Weather Advisory",
      nav_guides: "Ag-Guides",
      nav_marketplace: "Marketplace",
      nav_back: "Back to Portal",
      nav_dashboard: "Farm Dashboard",
      nav_admin: "Admin Panel",
      nav_signout: "Sign Out",
      nav_signin: "Sign In / Register",
      
      // Hero section
      hero_title_1: "Empowering Farmers with",
      hero_title_2: "Smart Digital Agriculture",
      hero_weather_btn: "Check Weather Advice",
      hero_dashboard_btn: "Go to My Farm Dashboard",
      
      // Weather section
      weather_section_title: "Weather-Based Agricultural Advice",
      weather_section_desc: "Enter your location below. Our engine analyzes meteorological parameters to deliver customized farming actions, spray safety advisories, and irrigation plans.",
      weather_report_title: "Location Weather",
      weather_search_placeholder: "Search District (e.g. Dhaka, Bogura)...",
      weather_search_btn: "Search",
      quick_districts_label: "Popular Districts:",
      weather_humidity_label: "Humidity",
      weather_wind_label: "Wind Speed",
      weather_advice_title: "Farming Recommendations",
      
      // Marketplace section
      marketplace_section_title: "Equipment & Seed Marketplace",
      marketplace_section_desc: "Rent tractors, exchange seeds, or buy tools directly from verified farmers in your community.",
      marketplace_community_title: "Community Listings",
      marketplace_post_btn: "Post a Listing",
      
      // Marketplace Modal Form
      modal_title: "Create Marketplace Listing",
      form_title_label: "Listing Title",
      form_title_placeholder: "e.g. Hand Seeder for Sale, Power Tiller for Rent",
      form_itemtype_label: "Item Type",
      form_dealtype_label: "Listing Category",
      form_price_label: "Price (TK)",
      form_contact_label: "Contact Info",
      form_contact_placeholder: "e.g. Phone number, Email",
      form_image_label: "Upload Picture (Optional)",
      choose_file_btn: "Click to browse & upload item photo",
      upload_auto_hint: "(Leave blank for automatic smart picture)",
      form_desc_label: "Item Description",
      form_desc_placeholder: "Mention item age, condition, delivery availability, etc.",
      form_submit_btn: "Submit Post",
      
      // Marketplace listing options
      opt_equipment: "Equipment",
      opt_seed: "Seeds / Plants",
      opt_crop: "Crops",
      opt_service: "Labor / Service",
      opt_sale: "For Sale",
      opt_rent: "For Rent",
      opt_share: "Free Share",
      
      // Footer
      footer_brand_desc: "A smart, digital hub designed for local farmers. Access guides, manage crop records, optimize inventory stock levels, and coordinate local marketplaces in a single application.",
      footer_section_title: "Sections",
      footer_user_console: "User Console",
      footer_farmer_signin: "Farmer Sign In",
      footer_register_farm: "Register Farm",
      footer_copyright: "© 2026 AgriFriend Digital Agriculture Systems. Developed By Masum Reza, Department of Computer Science, Pirojpur Science and Technology University. All rights reserved.",
      
      // Knowledge Hub
      guides_title: "Agricultural Knowledge Hub",
      guides_desc: "Search through crop catalogs, plant diagnostic charts, fertilization guides, and safe chemical pesticide usage policies.",
      tab_crops: "Crop & Seed Catalog",
      tab_diseases: "Disease Library",
      tab_fertilizers: "Fertilizer Advisor",
      tab_pesticides: "Pesticide Guide",
      
      // Login & Register
      auth_tab_login: "Sign In",
      auth_tab_register: "Register Farm",
      login_title: "Welcome Back",
      login_subtitle: "Access your crop scheduler and inventories logs",
      login_username_label: "Username",
      login_password_label: "Password",
      login_submit_btn: "Sign In",
      register_title: "Create Farm Account",
      register_subtitle: "Join the AgriSphere community network",
      register_username_label: "Username",
      register_email_label: "Email Address",
      register_password_label: "Password",
      register_role_label: "Account Role",
      opt_farmer_role: "Farmer / Grower",
      opt_admin_role: "Administrator",
      register_farmname_label: "Farm Entity Name",
      register_location_label: "Location / Region",
      register_contact_label: "Contact Phone",
      register_submit_btn: "Initialize Account",

      // Dashboard Common
      dash_header_title: "Farmer Console",
      dash_header_subtitle: "Real-time agricultural statistics & records",
      dash_menu_overview: "Overview",
      dash_menu_farms: "Farm Fields",
      dash_menu_crops: "Crops Track",
      dash_menu_inventory: "Inventory Logs",
      dash_menu_equipment: "Equipment Logs",
      dash_menu_finance: "Financials",
      dash_menu_harvest: "Harvests & Sales",
      dash_menu_reports: "Charts & Reports",
      dash_menu_notifications: "Alert Center",
      dash_signout: "Sign Out",

      // Dashboard Metrics
      metric_revenue: "Total Revenue",
      metric_expenses: "Total Expenses",
      metric_active_crops: "Active Crops",
      metric_low_stock: "Low Stock Items",

      // Dashboard Overview Section
      overview_crops_title: "Recent Crop Timelines",
      overview_crops_btn: "Manage Crops",
      overview_weather_title: "Quick Weather",
      overview_transactions_title: "Recent Transactions",
      overview_transactions_btn: "All Logs",

      // Dashboard Section Titles
      farms_sec_title: "Farm fields and Plots",
      farms_add_btn: "Add New Field",
      crops_sec_title: "Seasonal Crops Tracking",
      crops_add_btn: "Plant Crop",
      inv_sec_title: "Fertilizer & Inventory Stock",
      inv_add_btn: "Add Stock Item",
      eq_sec_title: "Farm Equipment Inventory",
      eq_add_btn: "Register Equipment",
      fin_sec_title: "Income & Expenses Ledger",
      fin_add_btn: "Log Transaction",
      har_sec_title: "Yield Harvest Records",
      har_add_btn: "Log Yield Harvest",
      sales_sec_title: "Crop Distribution & Sales",
      sales_add_btn: "Record Sale Log",
      reports_fin_title: "Revenue vs. Expenses",
      reports_crop_title: "Crop Status Distribution",
      reports_yield_title: "Harvest Quantity Yields (kg)",
      notif_sec_title: "Inventory Alerts & Broadcasts",
      notif_read_all_btn: "Mark All as Read",

      // Dashboard Table Headers
      th_crop_variety: "Crop / Variety",
      th_date_planted: "Date Planted",
      th_expected_harvest: "Expected Harvest",
      th_status: "Status",
      th_date: "Date",
      th_category: "Category",
      th_type: "Type",
      th_amount: "Amount",
      th_description: "Description",
      th_field_name: "Field Name",
      th_location: "Location",
      th_size_acres: "Size (Acres)",
      th_soil_type: "Soil Type",
      th_actions: "Actions",
      th_crop_name: "Crop Name",
      th_variety: "Variety",
      th_field_plot: "Field / Plot",
      th_planting_date: "Planting Date",
      th_notes: "Notes",
      th_item_name: "Item Name",
      th_current_stock: "Current Stock",
      th_unit: "Unit",
      th_safety_threshold: "Safety Threshold",
      th_purchase_date: "Purchase Date",
      th_harvest_date: "Harvest Date",
      th_crop: "Crop",
      th_qty_collected: "Quantity Collected",
      th_quality_grade: "Quality Grade",
      th_sale_date: "Sale Date",
      th_harvest_ref: "Harvest Reference",
      th_buyer_name: "Buyer Name",
      th_qty_sold: "Quantity Sold",
      th_revenue: "Revenue (TK)",
      // Modals
      modal_farm_title: "Create Field Plot",
      label_farm_name: "Field/Plot Name",
      label_farm_location: "Field Location",
      label_farm_size: "Plot Size (Acres)",
      label_farm_soil: "Soil Texture Type",
      label_farm_desc: "Field Comments",
      btn_register_field: "Register Field",

      modal_crop_title: "Plant New Crop",
      label_crop_farm: "Select Field Plot",
      label_crop_name: "Crop Name",
      label_crop_variety: "Crop Variety",
      label_crop_planted: "Sowing Date",
      label_crop_expected: "Expected Harvest Date",
      label_crop_status: "Current Phase",
      label_crop_notes: "Crop Timeline Notes",
      btn_save_crop: "Save Crop Schedule",

      modal_inv_title: "Add Stock Item",
      label_inv_name: "Item Name",
      label_inv_type: "Item Category",
      label_inv_qty: "Quantity",
      label_inv_unit: "Measurement Unit",
      label_inv_threshold: "Safety Limit Threshold (Alert Trigger)",
      label_inv_notes: "Inventory Notes",
      btn_record_stock: "Record Stock",

      modal_eq_title: "Register Farm Equipment",
      label_eq_name: "Equipment Name",
      label_eq_type: "Equipment Category",
      label_eq_status: "Operational Status",
      label_eq_date: "Purchase Date",
      label_eq_desc: "Technical Description",
      btn_save_eq: "Save Equipment Log",

      modal_fin_title: "Log Transaction Ledger",
      label_fin_type: "Transaction Type",
      label_fin_category: "Category",
      label_fin_amount: "Amount (TK)",
      label_fin_date: "Date logged",
      label_fin_desc: "Transaction Comments",
      btn_log_ledger: "Log to Ledger",

      modal_har_title: "Record Yield Harvest",
      label_har_crop: "Select Planted Crop",
      label_har_qty: "Quantity Harvested",
      label_har_unit: "Unit",
      label_har_date: "Harvest Date",
      label_har_quality: "Yield Quality Rating",
      label_har_notes: "Harvest Comments",
      btn_record_harvest: "Record Harvest Yield",

      modal_sale_title: "Log Sales Transaction",
      label_sale_harvest: "Select Harvest Yield Reference",
      label_sale_buyer: "Buyer / Distributing Entity Name",
      label_sale_qty: "Quantity Disposed",
      label_sale_rev: "Total Sale Revenue (TK)",
      label_sale_date: "Sale Date",
      label_sale_notes: "Sales Comments",
      btn_log_sale: "Log Sale & Sync Revenue",

      modal_edit_crop_title: "Update Crop Stage",
      label_edit_crop_status: "Current Phase",
      label_edit_crop_notes: "Progress Updates",
      btn_apply_crop_update: "Apply Status Update"
    },
    bn: {
      // Navbar links
      nav_weather: "আবহাওয়া পরামর্শ",
      nav_guides: "কৃষি নির্দেশিকা",
      nav_marketplace: "বাজারক্ষেত্র",
      nav_back: "পোর্টালে ফিরে যান",
      nav_dashboard: "খামার ড্যাশবোর্ড",
      nav_admin: "অ্যাডমিন প্যানেল",
      nav_signout: "সাইন আউট",
      nav_signin: "সাইন ইন / নিবন্ধন",
      
      // Hero section
      hero_title_1: "স্মার্ট ডিজিটাল কৃষির সাথে",
      hero_title_2: "কৃষকদের ক্ষমতায়ন",
      hero_weather_btn: "আবহাওয়ার পরামর্শ দেখুন",
      hero_dashboard_btn: "আমার খামার ড্যাশবোর্ডে যান",
      
      // Weather section
      weather_section_title: "আবহাওয়াভিত্তিক কৃষি পরামর্শ",
      weather_section_desc: "নিচে আপনার অবস্থান লিখুন। আমাদের ইঞ্জিন কাস্টমাইজড কৃষি কাজ, স্প্রে নিরাপত্তা পরামর্শ এবং সেচ পরিকল্পনা প্রদান করতে আবহাওয়া সংক্রান্ত পরামিতি বিশ্লেষণ করে।",
      weather_report_title: "অবস্থানের আবহাওয়া",
      weather_search_placeholder: "জেলা অনুসন্ধান করুন (যেমন: ঢাকা, বগুড়া)...",
      weather_search_btn: "অনুসন্ধান",
      quick_districts_label: "জনপ্রিয় জেলাসমূহ:",
      weather_humidity_label: "আর্দ্রতা",
      weather_wind_label: "বাতাসের গতি",
      weather_advice_title: "কৃষি সুপারিশমালা",
      
      // Marketplace section
      marketplace_section_title: "যন্ত্রপাতি ও বীজ বাজারক্ষেত্র",
      marketplace_section_desc: "আপনার সম্প্রদায়ের যাচাইকৃত কৃষকদের কাছ থেকে সরাসরি ট্রাক্টর ভাড়া নিন, বীজ বিনিময় করুন বা সরঞ্জাম কিনুন।",
      marketplace_community_title: "সম্প্রদায় লিস্টিং সমূহ",
      marketplace_post_btn: "একটি লিস্টিং পোস্ট করুন",
      
      // Marketplace Modal Form
      modal_title: "বাজার লিস্টিং তৈরি করুন",
      form_title_label: "লিস্টিংয়ের শিরোনাম",
      form_title_placeholder: "যেমন: বিক্রয়ের জন্য হ্যান্ড সিডার, ভাড়ার জন্য পাওয়ার টিলার",
      form_itemtype_label: "সরঞ্জামের ধরন",
      form_dealtype_label: "লিস্টিং বিভাগ",
      form_price_label: "মূল্য (টাকা)",
      form_contact_label: "যোগাযোগের তথ্য",
      form_contact_placeholder: "যেমন: ফোন নম্বর, ইমেল",
      form_image_label: "ছবি আপলোড করুন (ঐচ্ছিক)",
      choose_file_btn: "আইটেমের ছবি নির্বাচন করতে ক্লিক করুন",
      upload_auto_hint: "(স্বয়ংক্রিয় ছবির জন্য ফাঁকা রাখুন)",
      form_desc_label: "বিবরণ",
      form_desc_placeholder: "আইটেমের বয়স, অবস্থা, ডেলিভারির প্রাপ্যতা ইত্যাদি উল্লেখ করুন",
      form_submit_btn: "পোস্ট জমা দিন",
      
      // Marketplace listing options
      opt_equipment: "যন্ত্রপাতি",
      opt_seed: "বীজ / উদ্ভিদ",
      opt_crop: "ফসল",
      opt_service: "শ্রমিক / সেবা",
      opt_sale: "বিক্রয়ের জন্য",
      opt_rent: "ভাড়ার জন্য",
      opt_share: "বিনামূল্যে শেয়ার",
      
      // Footer
      footer_brand_desc: "স্থানীয় কৃষকদের জন্য ডিজাইন করা একটি স্মার্ট ডিজিটাল হাব। একটিমাত্র অ্যাপ্লিকেশনে নির্দেশিকা অ্যাক্সেস করুন, ফসলের রেকর্ড পরিচালনা করুন, ইনভেন্টরি স্টক অপ্টিমাইজ করুন এবং স্থানীয় বাজারের সমন্বয় করুন।",
      footer_section_title: "বিভাগসমূহ",
      footer_user_console: "ইউজার কনসোল",
      footer_farmer_signin: "কৃষক সাইন ইন",
      footer_register_farm: "খামার নিবন্ধন",
      footer_admin_panel: "অ্যাডমিন প্যানেল",
      footer_copyright: "© ২০২৬ AgriFriend ডিজিটাল কৃষি ব্যবস্থা। পিরোজপুর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়ের কম্পিউটার সায়েন্স বিভাগ-এর মাসুম রেজা কর্তৃক উন্নয়ন করা হয়েছে। সর্বস্বত্ব সংরক্ষিত।",
      
      // Knowledge Hub
      guides_title: "কৃষি তথ্য ও জ্ঞান কেন্দ্র",
      guides_desc: "ফসল ক্যাটালগ, উদ্ভিদ রোগ নির্ণয় চার্ট, সার নির্দেশিকা এবং নিরাপদ রাসায়নিক কীটনাশক ব্যবহার নীতি অনুসন্ধান করুন।",
      tab_crops: "ফসল ও বীজ ক্যাটালগ",
      tab_diseases: "উদ্ভিদ রোগ লাইব্রেরি",
      tab_fertilizers: "সার উপদেষ্টা",
      tab_pesticides: "কীটনাশক নির্দেশিকা",
      search_guides_placeholder: "নির্দেশিকা অনুসন্ধান করুন (যেমন: Wheat, Rust, Organic)...",
      
      // Login & Register
      auth_tab_login: "সাইন ইন",
      auth_tab_register: "খামার নিবন্ধন",
      login_title: "স্বাগত",
      login_subtitle: "আপনার ফসলের সময়সূচী এবং ইনভেন্টরি লগ অ্যাক্সেস করুন",
      login_username_label: "ইউজারনেম",
      login_password_label: "পাসওয়ার্ড",
      login_submit_btn: "সাইন ইন করুন",
      register_title: "খামার অ্যাকাউন্ট তৈরি করুন",
      register_subtitle: "এগ্রিস্ফিয়ার কমিউনিটি নেটওয়ার্কে যোগ দিন",
      register_username_label: "ইউজারনেম",
      register_email_label: "ইমেল ঠিকানা",
      register_password_label: "পাসওয়ার্ড",
      register_role_label: "অ্যাকাউন্টের ভূমিকা",
      opt_farmer_role: "কৃষক / চাষী",
      opt_admin_role: "অ্যাডমিনিস্ট্রেটর",
      register_farmname_label: "খামারের নাম",
      register_location_label: "অবস্থান / অঞ্চল",
      register_contact_label: "যোগাযোগের ফোন নম্বর",
      register_submit_btn: "অ্যাকাউন্ট চালু করুন",

      // Dashboard Common
      dash_header_title: "কৃষক কনসোল",
      dash_header_subtitle: "রিয়েল-টাইম কৃষি পরিসংখ্যান ও রেকর্ড",
      dash_menu_overview: "সারসংক্ষেপ",
      dash_menu_farms: "খামারের জমি",
      dash_menu_crops: "ফসলের ট্র্যাকিং",
      dash_menu_inventory: "ইনভেন্টরি লগ",
      dash_menu_equipment: "যন্ত্রপাতি লগ",
      dash_menu_finance: "আর্থিক হিসাব",
      dash_menu_harvest: "সংগ্রহ ও বিক্রয়",
      dash_menu_reports: "চার্ট ও রিপোর্ট",
      dash_menu_notifications: "সতর্কতা কেন্দ্র",
      dash_signout: "সাইন আউট",

      // Dashboard Metrics
      metric_revenue: "মোট রাজস্ব",
      metric_expenses: "মোট ব্যয়",
      metric_active_crops: "সক্রিয় ফসল",
      metric_low_stock: "স্বল্প মজুতের আইটেম",

      // Dashboard Overview Section
      overview_crops_title: "সাম্প্রতিক ফসলের সময়রেখা",
      overview_crops_btn: "ফসল পরিচালনা করুন",
      overview_weather_title: "আবহাওয়া একনজরে",
      overview_transactions_title: "সাম্প্রতিক লেনদেন",
      overview_transactions_btn: "সকল লগ",

      // Dashboard Section Titles
      farms_sec_title: "খামারের জমি ও প্লট",
      farms_add_btn: "নতুন জমি যোগ করুন",
      crops_sec_title: "মৌসুমী ফসলের ট্র্যাকিং",
      crops_add_btn: "ফসল রোপণ করুন",
      inv_sec_title: "সার ও ইনভেন্টরি মজুত",
      inv_add_btn: "স্টক আইটেম যোগ করুন",
      eq_sec_title: "খামারের যন্ত্রপাতির ইনভেন্টরি",
      eq_add_btn: "যন্ত্রপাতি নিবন্ধন করুন",
      fin_sec_title: "আয় ও ব্যয়ের খতিয়ান",
      fin_add_btn: "লেনদেন যুক্ত করুন",
      har_sec_title: "ফসল উৎপাদনের রেকর্ড",
      har_add_btn: "ফসল সংগ্রহ রেকর্ড করুন",
      sales_sec_title: "ফসল বিতরণ ও বিক্রয়",
      sales_add_btn: "বিক্রয় রেকর্ড করুন",
      reports_fin_title: "রাজস্ব বনাম ব্যয়",
      reports_crop_title: "ফসলের অবস্থার বিন্যাস",
      reports_yield_title: "ফসল উৎপাদনের পরিমাণ (কেজি)",
      notif_sec_title: "ইনভেন্টরি সতর্কতা ও সম্প্রচার",
      notif_read_all_btn: "সব পঠিত হিসেবে চিহ্নিত করুন",

      // Dashboard Table Headers
      th_crop_variety: "ফসল / জাত",
      th_date_planted: "বপনের তারিখ",
      th_expected_harvest: "প্রত্যাশিত সংগ্রহের তারিখ",
      th_status: "অবস্থা",
      th_date: "তারিখ",
      th_category: "বিভাগ",
      th_type: "ধরন",
      th_amount: "পরিমাণ",
      th_description: "বিবরণ",
      th_field_name: "জমির নাম",
      th_location: "অবস্থান",
      th_size_acres: "আকার (একর)",
      th_soil_type: "মাটির ধরন",
      th_actions: "কার্যক্রম",
      th_crop_name: "ফসলের নাম",
      th_variety: "জাত",
      th_field_plot: "জমি / প্লট",
      th_planting_date: "বপনের তারিখ",
      th_notes: "মন্তব্য",
      th_item_name: "আইটেমের নাম",
      th_current_stock: "বর্তমান স্টক",
      th_unit: "একক",
      th_safety_threshold: "নিরাপত্তা সীমা",
      th_purchase_date: "ক্রয়ের তারিখ",
      th_harvest_date: "সংগ্রহের তারিখ",
      th_crop: "ফসল",
      th_qty_collected: "সংগৃহীত পরিমাণ",
      th_quality_grade: "মানের গ্রেড",
      th_sale_date: "বিক্রয়ের তারিখ",
      th_harvest_ref: "সংগ্রহ রেফারেন্স",
      th_buyer_name: "ক্রেতার নাম",
      th_qty_sold: "বিক্রিত পরিমাণ",
      th_revenue: "রাজস্ব (টাকা)",
      // Modals
      modal_farm_title: "খামারের জমি তৈরি করুন",
      label_farm_name: "জমির নাম",
      label_farm_location: "জমির অবস্থান",
      label_farm_size: "জমির আকার (একর)",
      label_farm_soil: "মাটির ধরন",
      label_farm_desc: "জমির মন্তব্য",
      btn_register_field: "জমি নিবন্ধিত করুন",

      modal_crop_title: "নতুন ফসল রোপণ করুন",
      label_crop_farm: "খামারের জমি নির্বাচন করুন",
      label_crop_name: "ফসলের নাম",
      label_crop_variety: "ফসলের জাত",
      label_crop_planted: "বপনের তারিখ",
      label_crop_expected: "প্রত্যাশিত সংগ্রহের তারিখ",
      label_crop_status: "বর্তমান পর্যায়",
      label_crop_notes: "ফসলের সময়সূচীর নোট",
      btn_save_crop: "ফসলের সময়সূচী সংরক্ষণ করুন",

      modal_inv_title: "স্টক আইটেম যোগ করুন",
      label_inv_name: "আইটেমের নাম",
      label_inv_type: "আইটেমের বিভাগ",
      label_inv_qty: "পরিমাণ",
      label_inv_unit: "পরিমাপের একক",
      label_inv_threshold: "নিরাপত্তা সীমা (সতর্কতা ট্রিগার)",
      label_inv_notes: "ইনভেন্টরি নোট",
      btn_record_stock: "স্টক তথ্য সংরক্ষণ করুন",

      modal_eq_title: "খামারের যন্ত্রপাতি নিবন্ধন করুন",
      label_eq_name: "যন্ত্রপাতির নাম",
      label_eq_type: "যন্ত্রপাতির বিভাগ",
      label_eq_status: "কার্যক্ষম অবস্থা",
      label_eq_date: "ক্রয়ের তারিখ",
      label_eq_desc: "কারিগরি বিবরণ",
      btn_save_eq: "যন্ত্রপাতির লগ সংরক্ষণ করুন",

      modal_fin_title: "লেনদেন লেজার রসিদ দিন",
      label_fin_type: "লেনদেনের ধরন",
      label_fin_category: "বিভাগ",
      label_fin_amount: "পরিমাণ (টাকা)",
      label_fin_date: "নথিবদ্ধ তারিখ",
      label_fin_desc: "লেনদেনের মন্তব্য",
      btn_log_ledger: "লেজারে সংরক্ষণ করুন",

      modal_har_title: "ফসল সংগ্রহের রেকর্ড যোগ করুন",
      label_har_crop: "রোপণকৃত ফসল নির্বাচন করুন",
      label_har_qty: "সংগৃহীত পরিমাণ",
      label_har_unit: "একক",
      label_har_date: "সংগ্রহের তারিখ",
      label_har_quality: "ফসলের মানের গ্রেড",
      label_har_notes: "সংগ্রহের মন্তব্য",
      btn_record_harvest: "ফসল সংগ্রহের তথ্য সংরক্ষণ করুন",

      modal_sale_title: "বিক্রয় লেনদেন লগ করুন",
      label_sale_harvest: "ফসল সংগ্রহের রেফারেন্স নির্বাচন করুন",
      label_sale_buyer: "ক্রেতা বা বিতরণকারী প্রতিষ্ঠানের নাম",
      label_sale_qty: "বিক্রীত পরিমাণ",
      label_sale_rev: "মোট বিক্রয় রাজস্ব (টাকা)",
      label_sale_date: "বিক্রয়ের তারিখ",
      label_sale_notes: "বিক্রয়ের মন্তব্য",
      btn_log_sale: "বিক্রয় সংরক্ষণ ও রাজস্ব সিঙ্ক করুন",

      modal_edit_crop_title: "ফসলের পর্যায় হালনাগাদ করুন",
      label_edit_crop_status: "বর্তমান পর্যায়",
      label_edit_crop_notes: "অগ্রগতির আপডেট",
      btn_apply_crop_update: "অবস্থা আপডেট প্রয়োগ করুন"
    }
  };

  // Substring translation map for dynamic variables
  const translationDictionary = {
    // Weather Conditions
    'Sunny': 'রৌদ্রোজ্জ্বল',
    'Cloudy': 'মেঘলা',
    'Overcast with Rain': 'বৃষ্টিসহ মেঘলা আকাশ',
    'Windy': 'ঝড়ো বাতাস',
    'Drizzle': 'গুড়ি গুড়ি বৃষ্টি',
    'Partly Cloudy': 'আংশিক মেঘলা',
    'Rainy': 'বৃষ্টিপাত',
    
    // Weather advices
    "Natural irrigation active. Postpone scheduled field watering.": "প্রাকৃতিক সেচ সক্রিয়। নির্ধারিত জমিতে পানি দেওয়া স্থগিত করুন।",
    "Avoid applying foliar spray pesticides or chemical fertilizers since rain will wash them away.": "পত্রঝিল্লি স্প্রে কীটনাশক বা রাসায়নিক সার প্রয়োগ করা এড়িয়ে চলুন কারণ বৃষ্টিতে এগুলো ধুয়ে যাবে।",
    "Ensure proper drainage in fields to prevent waterlogging and root rot.": "জলাবদ্ধতা এবং শিকড় পচা রোধ করতে জমিতে সঠিক নিষ্কাশন ব্যবস্থা নিশ্চিত করুন।",
    "Standard irrigation schedule recommended.": "স্বাভাবিক সেচ সময়সূচী সুপারিশ করা হয়।",
    "High temperature detected. Increase watering frequency for shallow-rooted crops.": "উচ্চ তাপমাত্রা সনাক্ত করা হয়েছে। অগভীর শিকড়যুক্ত ফসলের জন্য সেচের ফ্রিকোয়েন্সি বাড়ান।",
    "Excellent conditions for soil drying and land clearing.": "মাটি শুকানো এবং জমি পরিষ্কার করার জন্য চমৎকার পরিবেশ।",
    "Avoid transplanting delicate seedlings during mid-day heat to prevent transplant shock.": "স্থানান্তরজনিত শক এড়াতে দুপুরের রোদে নরম চারা রোপণ করা এড়াতে দুপুরের রোদে নরম চারা রোপণ করা এড়িয়ে চলুন।",
    "Favorable ambient temperature for sowing and crop maintenance.": "বপন এবং ফসল রক্ষণাবেক্ষণের জন্য অনুকূল পারিপার্শ্বিক তাপমাত্রা।",
    "High humidity levels. Monitor susceptible plants for fungal leaf spots or Powdery Mildew.": "উচ্চ আর্দ্রতা মাত্রা। ছত্রাকজনিত পাতার দাগ বা পাউডারি মিলডিউ-এর জন্য সংবেদনশীল উদ্ভিদ পর্যবেক্ষণ করুন।",
    "Limit morning watering; water closer to the soil to avoid wet leaves.": "সকালের সেচ সীমিত করুন; ভেজা পাতা এড়াতে মাটির কাছাকাছি পানি দিন।",
    "Strong winds alert. Avoid spraying liquid chemicals as drift will reduce efficiency and harm surrounding areas.": "ঝড়ো বাতাসের সতর্কতা। তরল রাসায়নিক স্প্রে করা এড়িয়ে চলুন কারণ বাতাস এর কার্যকারিকা কমাবে এবং আশেপাশের ক্ষতি করবে।",
    "Inspect tall crop stakes or netting supports for wind stability.": "বাতাসের স্থায়িত্বের জন্য লম্বা ফসলের খুঁটি বা জালের সমর্থনগুলো পরিদর্শন করুন।",
    "Calm winds, but postpone spraying pesticides or fertilizers until active precipitation stops.": "শান্ত বাতাস, তবে সক্রিয় বৃষ্টিপাত না থামা পর্যন্ত কীটনাশক বা সার স্প্রে করা স্থগিত করুন।",
    "Calm winds. Perfect time for spraying organic pesticides or foliar feeds.": "শান্ত বাতাস। জৈব কীটনাশক বা পত্রঝিল্লি ফিড স্প্রে করার জন্য উপযুক্ত সময়।",
    
    // Weather labels
    'Humidity': 'আর্দ্রতা',
    'Wind Speed': 'বাতাসের গতি',
    'Fetching weather data...': 'আবহাওয়ার তথ্য আনা হচ্ছে...',
    'Weather lookup failed': 'আবহাওয়া অনুসন্ধান ব্যর্থ হয়েছে',
    '(Simulated offline weather. Configure OPENWEATHER_API_KEY for real data.)': '(অনুকরণকৃত অফলাইন আবহাওয়া। প্রকৃত তথ্যের জন্য OPENWEATHER_API_KEY কনফিগার করুন।)',
    '(Simulated offline weather. Configure OPENWEATHER_API_KEY for real data.)': '(অনুকরণকৃত অফলাইন আবহাওয়া। প্রকৃত তথ্যের জন্য OPENWEATHER_API_KEY কনফিগার করুন।)',
    '(Live weather data loaded!)': '(সরাসরি আবহাওয়ার তথ্য লোড হয়েছে!)',
    'Loading Location...': 'অবস্থান লোড হচ্ছে...',
    'Checking agricultural advice...': 'কৃষি পরামর্শ পরীক্ষা করা হচ্ছে...',

    // Marketplace listings labels
    'Listed by: ': 'তালিকাবদ্ধ করেছেন: ',
    'Listed by': 'তালিকাবদ্ধ করেছেন',
    'Contact: ': 'যোগাযোগ: ',
    'Contact': 'যোগাযোগ',
    'Delete Post': 'পোস্টটি ডিলিট করুন',
    'No listings active in the marketplace.': 'বাজারক্ষেত্রে কোনো সক্রিয় লিস্টিং নেই।',
    'Are you sure you want to delete this listing?': 'আপনি কি নিশ্চিত যে আপনি এই লিস্টিংটি ডিলিট করতে চান?',
    'Listing Title': 'লিস্টিং শিরোনাম',
    
    // Categories & Deal Types
    'Equipment': 'যন্ত্রপাতি',
    'Seed': 'বীজ / উদ্ভিদ',
    'Crop': 'ফসল',
    'Service': 'শ্রমিক / সেবা',
    'Sale': 'বিক্রয়',
    'Rent': 'ভাড়া',
    'Share': 'শেয়ার',
    'For Sale': 'বিক্রয়ের জন্য',
    'For Rent': 'ভাড়ার জন্য',
    'Free Share': 'বিনামূল্যে শেয়ার',
    'day': 'দিন',
    'Fertilizer': 'সার',
    'Pesticide': 'কীটনাশক',
    'Other': 'অন্যান্য',

    // Section Banner Titles & Sidebar Items
    'Overview': 'সারসংক্ষেপ',
    'Farm Fields': 'খামারের জমি',
    'Crops Track': 'ফসলের ট্র্যাকিং',
    'Inventory Logs': 'ইনভেন্টরি লগ',
    'Equipment Logs': 'যন্ত্রপাতি লগ',
    'Financials': 'আর্থিক হিসাব',
    'Harvests & Sales': 'সংগ্রহ ও বিক্রয়',
    'Charts & Reports': 'চার্ট ও রিপোর্ট',
    'Alert Center': 'সতর্কতা কেন্দ্র',
    'Sign Out': 'সাইন আউট',
    'Farmer Console': 'কৃষক কনসোল',
    'Real-time agricultural statistics & records': 'রিয়েল-টাইম কৃষি পরিসংখ্যান ও রেকর্ড',
    'Total Revenue': 'মোট রাজস্ব',
    'Total Expenses': 'মোট ব্যয়',
    'Active Crops': 'সক্রিয় ফসল',
    'Low Stock Items': 'স্বল্প মজুতের আইটেম',
    'Farmer Console Overview': 'কৃষক কনসোল সারসংক্ষেপ',
    'My Farm Fields': 'আমার খামারের জমি',
    'Seasonal Crop Scheduler': 'মৌসুমী ফসলের সময়সূচী',
    'Inventory & Resource Ledger': 'ইনভেন্টরি ও সম্পদ খতিয়ান',
    'Operations Equipment Logs': 'কার্যক্রমের যন্ত্রপাতি লগ',
    'Cash Flow Ledgers': 'নগদ প্রবাহের লেজার',
    'Harvest yields & Sale Logs': 'ফসল সংগ্রহ ও বিক্রয়ের লগ',
    'Analytical Charts & Reports': 'বিশ্লেষণাত্মক চার্ট ও রিপোর্ট',
    'Alert Center Notifications': 'সতর্কতা কেন্দ্র নোটিফিকেশন',
    'System Administration Overview': 'সিস্টেম অ্যাডমিনিস্ট্রেশন সারসংক্ষেপ',
    'Farmers Accounts Registry': 'কৃষকদের অ্যাকাউন্ট রেজিস্ট্রি',
    'Global Alert Broadcast System': 'গ্লোবাল অ্যালার্ট ব্রডকাস্ট সিস্টেম',
    'Community Marketplace Moderation': 'কমিউনিটি মার্কেটপ্লেস মডারেশন',

    // Statuses & Types
    'Planted': 'রোপণকৃত',
    'Growing': 'বর্ধিষ্ণু',
    'Harvested': 'সংগৃহীত',
    'Failed': 'ক্ষতিগ্রস্ত',
    'Available': 'উপলব্ধ',
    'In Use': 'ব্যবহারাধীন',
    'Maintenance': 'রক্ষণাবেক্ষণ',
    'Income': 'আয়',
    'Expense': 'ব্যয়',
    'FARMER': 'কৃষক',
    'ADMIN': 'অ্যাডমিন',
    'farmer': 'কৃষক',
    'admin': 'অ্যাডমিন',
    'Excellent': 'চমৎকার',
    'Good': 'ভালো',
    'Fair': 'মাঝারি',
    'Poor': 'নিম্নমানের',

    // Soil Types
    'Loamy': 'দোআঁশ',
    'Clay': 'এটেল',
    'Sandy': 'বেলে',
    'Silt': 'পলি',
    'Peat': 'পিট',

    // Empty Table Messages
    'No crops registered yet.': 'এখনো কোনো ফসল নিবন্ধিত হয়নি।',
    'No transactions recorded.': 'কোনো লেনদেন রেকর্ড করা হয়নি।',
    'No field plots registered. Click \'Add New Field\' to start.': 'কোনো খামারের জমি নিবন্ধিত হয়নি। শুরু করতে \'নতুন জমি যোগ করুন\' ক্লিক করুন।',
    'No crops active. Click \'Plant Crop\' to log.': 'কোনো সক্রিয় ফসল নেই। রেকর্ড করতে \'ফসল রোপণ করুন\' ক্লিক করুন।',
    'No inventory records. Click \'Add Stock Item\' to record resource stocks.': 'কোনো ইনভেন্টরি রেকর্ড নেই। রিসোর্স স্টক রেকর্ড করতে \'স্টক আইটেম যোগ করুন\' ক্লিক করুন।',
    'No operational equipment logged.': 'কোনো সক্রিয় যন্ত্রপাতি নিবন্ধিত হয়নি।',
    'No ledger transactions recorded.': 'কোনো লেজার লেনদেন রেকর্ড করা হয়নি।',
    'No yields harvested. Log harvest fields outputs here.': 'কোনো ফসল সংগ্রহ করা হয়নি।',
    'No sales log transactions.': 'কোনো বিক্রয় লেনদেন নেই।',
    'No alerts registered in notification center.': 'নোটিফিকেশন কেন্দ্রে কোনো সতর্কতা নেই।',
    'No user accounts found.': 'কোনো ব্যবহারকারী অ্যাকাউন্ট পাওয়া যায়নি।',

    // Action Buttons
    'Update': 'হালনাগাদ',
    'Delete': 'মুছে ফেলুন',
    'Restock': 'পুনরায় স্টক করুন',
    'Change Status': 'অবস্থা পরিবর্তন',
    'Read': 'পঠিত',
    'Dismiss': 'বাতিল করুন',
    'Terminate': 'বাতিল করুন',
    'Protected Admin': 'সংরক্ষিত অ্যাডমিন',
    'Manage Crops': 'ফসল পরিচালনা করুন',
    'All Logs': 'সকল লগ',

    // Guides Card Labels
    'Guide': 'নির্দেশিকা',
    'Sowing Rate:': 'বপনের হার:',
    'Sowing Depth:': 'বপনের গভীরতা:',
    'Spacing:': 'দূরত্ব:',
    'Varieties:': 'জাতসমূহ:',
    'Soil pH:': 'মাটির পিএইচ:',
    'Duration:': 'সময়কাল:',
    'Agent:': 'রোগজীবাণু:',
    'Susceptible:': 'আক্রান্ত ফসল:',
    'Symptoms:': 'রোগের লক্ষণ:',
    'Prevention:': 'প্রতিরোধ:',
    'Treatment:': 'চিকিৎসা/প্রতিকার:',
    'Composition:': 'উপাদান:',
    'Category:': 'শ্রেণী:',
    'Rate:': 'প্রয়োগের হার:',
    'Method:': 'প্রয়োগ পদ্ধতি:',
    'Target Crops:': 'লক্ষ্যভিত্তিক ফসল:',
    'Active:': 'কার্যকর উপাদান:',
    'Effective For:': 'কার্যকর দমন:',
    'Pesticide Type:': 'কীটনাশকের ধরন:',
    'Dilution Rate:': 'মিশ্রণের হার:',
    'Harvest Wait:': 'সংগ্রহের অপেক্ষাকাল:',
    'Safety:': 'সতর্কতা:',
    'Pathological Library': 'উদ্ভিদ রোগ লাইব্রেরি',
    'Soil Nutrients': 'মাটির পুষ্টি উপাদান',
    'Pest Management': 'কীটপতঙ্গ ব্যবস্থাপনা',
    'Cereal Guide': 'দানাশস্য নির্দেশিকা',
    'Vegetable Guide': 'সবজি নির্দেশিকা',
    'Tuber Guide': 'কন্দজাতীয় ফসল নির্দেশিকা',

    // Guides categories & plant names
    'Wheat': 'গম',
    'Rice': 'ধান',
    'Maize (Corn)': 'ভুট্টা',
    'Tomato': 'টমেটো',
    'Potato': 'আলু',
    'Cereal': 'দানাশস্য',
    'Vegetable': 'সবজি',
    'Tuber': 'কন্দজাতীয় ফসল',

    // Units & Measures
    'Acres': 'একর',
    'units': 'একক',
    'Low': 'স্বল্প',
    'Clear': 'পরিষ্কার',
    'Clear Sky': 'পরিষ্কার আকাশ',
    'Mainly Clear': 'বেশিরভাগ পরিষ্কার',
    'Overcast': 'মেঘলা আকাশ',
    'Foggy': 'কুয়াশাচ্ছন্ন',
    'Light Rain': 'হালকা বৃষ্টি',
    'Moderate Rain': 'মাঝারি বৃষ্টি',
    'Heavy Rain': 'ভারী বৃষ্টি',
    'Dense Drizzle': 'ঘন গুড়ি গুড়ি বৃষ্টি',
    'Rain Showers': 'বৃষ্টির ঝাপটা',
    'Heavy Rain Showers': 'ভারী বৃষ্টির ঝাপটা',
    'Thunderstorm': 'বজ্রঝড়',
    'Thunderstorm with Hail': 'শিলাবৃষ্টিসহ বজ্রঝড়',
    'Severe Thunderstorm': 'তীব্র বজ্রঝড়',
    'Popular Districts:': 'জনপ্রিয় জেলাসমূহ:',
    'Clear sky. Proceed with normal scheduling.': 'পরিষ্কার আকাশ। স্বাভাবিক সময়সূচী অনুযায়ী কাজ চালিয়ে যান।',

    // Bangladesh Districts (Bilingual Mappings)
    'Dhaka, Bangladesh': 'ঢাকা, বাংলাদেশ',
    'Dhaka': 'ঢাকা',
    'Gazipur': 'গাজীপুর',
    'Narayanganj': 'নারায়ণগঞ্জ',
    'Tangail': 'টাঙ্গাইল',
    'Narsingdi': 'নরসিংদী',
    'Manikganj': 'মানিকগঞ্জ',
    'Munshiganj': 'মুন্সীগঞ্জ',
    'Faridpur': 'ফরিদপুর',
    'Gopalganj': 'গোপালগঞ্জ',
    'Madaripur': 'মাদারীপুর',
    'Rajbari': 'রাজবাড়ী',
    'Shariatpur': 'শরীয়তপুর',
    'Kishoreganj': 'কিশোরগঞ্জ',
    'Chattogram, Bangladesh': 'চট্টগ্রাম, বাংলাদেশ',
    'Chattogram': 'চট্টগ্রাম',
    'Chittagong': 'চট্টগ্রাম',
    'Cox\'s Bazar, Bangladesh': 'কক্সবাজার, বাংলাদেশ',
    'Cox\'s Bazar': 'কক্সবাজার',
    'Cumilla, Bangladesh': 'কুমিল্লা, বাংলাদেশ',
    'Cumilla': 'কুমিল্লা',
    'Comilla': 'কুমিল্লা',
    'Feni': 'ফেনী',
    'Brahmanbaria': 'ব্রাহ্মণবাড়িয়া',
    'Noakhali': 'নোয়াখালী',
    'Chandpur': 'চাঁদপুর',
    'Lakshmipur': 'লক্ষ্মীপুর',
    'Rangamati': 'রাঙ্গামাটি',
    'Bandarban': 'বান্দরবান',
    'Khagrachhari': 'খাগড়াছড়ি',
    'Rajshahi, Bangladesh': 'রাজশাহী, বাংলাদেশ',
    'Rajshahi': 'রাজশাহী',
    'Bogura, Bangladesh': 'বগুড়া, বাংলাদেশ',
    'Bogura': 'বগুড়া',
    'Bogra': 'বগুড়া',
    'Pabna': 'পাবনা',
    'Sirajganj': 'সিরাজগঞ্জ',
    'Naogaon': 'নওগাঁ',
    'Natore': 'নাটোর',
    'Chapainawabganj': 'চাঁপাইনবাবগঞ্জ',
    'Joypurhat': 'জয়পুরহাট',
    'Khulna, Bangladesh': 'খুলনা, বাংলাদেশ',
    'Khulna': 'খুলনা',
    'Jashore, Bangladesh': 'যশোর, বাংলাদেশ',
    'Jashore': 'যশোর',
    'Jessore': 'যশোর',
    'Satkhira': 'সাতক্ষীরা',
    'Bagerhat': 'বাগেরহাট',
    'Kushtia': 'কুষ্টিয়া',
    'Chuadanga': 'চুয়াডাঙ্গা',
    'Meherpur': 'মেহেরপুর',
    'Jhenaidah': 'ঝিনাইদহ',
    'Magura': 'মাগুরা',
    'Narail': 'নড়াইল',
    'Barishal, Bangladesh': 'বরিশাল, বাংলাদেশ',
    'Barishal': 'বরিশাল',
    'Barisal': 'বরিশাল',
    'Patuakhali': 'পটুয়াখালী',
    'Bhola': 'ভোলা',
    'Pirojpur, Bangladesh': 'পিরোজপুর, বাংলাদেশ',
    'Pirojpur': 'পিরোজপুর',
    'Barguna': 'বরগুনা',
    'Jhalokathi': 'ঝালকাঠি',
    'Sylhet, Bangladesh': 'সিলেট, বাংলাদেশ',
    'Sylhet': 'সিলেট',
    'Moulvibazar': 'মৌলভীবাজার',
    'Habiganj': 'হবিগঞ্জ',
    'Sunamganj': 'সুনামগঞ্জ',
    'Rangpur, Bangladesh': 'রংপুর, বাংলাদেশ',
    'Rangpur': 'রংপুর',
    'Dinajpur': 'দিনাজপুর',
    'Gaibandha': 'গাইবান্ধা',
    'Kurigram': 'কুড়িগ্রাম',
    'Lalmonirhat': 'লালমনিরহাট',
    'Nilphamari': 'নীলফামারী',
    'Panchagarh': 'পঞ্চগড়',
    'Thakurgaon': 'ঠাকুরগাঁও',
    'Mymensingh, Bangladesh': 'ময়মনসিংহ, বাংলাদেশ',
    'Mymensingh': 'ময়মনসিংহ',
    'Jamalpur': 'জামালপুর',
    'Netrokona': 'নেত্রকোণা',
    'Sherpur': 'শেরপুর'
  };
  // Helper to translate arbitrary text values
  window.translateText = function(text) {
    if (!text || typeof text !== 'string') return text;
    const currentLang = localStorage.getItem('language') || 'en';
    if (currentLang === 'en') return text;

    const trimmed = text.trim();
    if (translationDictionary[trimmed]) {
      return translationDictionary[trimmed];
    }
    
    // Check for exact substring replacements
    for (let key in translationDictionary) {
      if (trimmed.includes(key)) {
        return trimmed.replace(new RegExp(key, 'g'), translationDictionary[key]);
      }
    }
    return text;
  };
  
  // Translate all DOM elements marked with data-i18n attributes
  window.applyTranslations = function() {
    const currentLang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = currentLang;

    // Translate standard text-content elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[currentLang] && translations[currentLang][key]) {
        const textValue = translations[currentLang][key];
        const icon = el.querySelector('i');
        if (icon) {
          let textSpan = el.querySelector('.i18n-text');
          if (textSpan) {
            textSpan.textContent = textValue;
          } else {
            let textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
            if (textNode) {
              textNode.textContent = ' ' + textValue.trim();
            } else {
              el.innerHTML = icon.outerHTML + ' <span class="i18n-text">' + textValue + '</span>';
            }
          }
        } else {
          el.textContent = textValue;
        }
      }
    });

    // Translate placeholder attributes
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[currentLang] && translations[currentLang][key]) {
        el.setAttribute('placeholder', translations[currentLang][key]);
      }
    });

    // Translate select option elements
    const options = document.querySelectorAll('option');
    options.forEach(opt => {
      const key = opt.getAttribute('data-i18n');
      if (key && translations[currentLang] && translations[currentLang][key]) {
        opt.textContent = translations[currentLang][key];
      } else if (!key && currentLang === 'bn' && opt.value && translationDictionary[opt.value]) {
        opt.textContent = translationDictionary[opt.value];
      } else if (!key && currentLang === 'en' && opt.value && translationDictionary[opt.value]) {
        opt.textContent = opt.value;
      }
    });

    // Update the language toggle label text (showing the OTHER language)
    const toggleLabels = document.querySelectorAll('#lang-toggle-label');
    toggleLabels.forEach(label => {
      label.textContent = currentLang === 'en' ? 'বাংলা' : 'English';
    });
  };

  // Toggle between English and Bangla
  window.toggleLanguage = function() {
    const currentLang = localStorage.getItem('language') === 'bn' ? 'en' : 'bn';
    localStorage.setItem('language', currentLang);
    window.applyTranslations();

    // Fire custom event so main dynamic modules can refresh their content
    document.dispatchEvent(new CustomEvent('languagechanged', { detail: currentLang }));
  };

  // Auto-init on script load
  document.addEventListener('DOMContentLoaded', () => {
    window.applyTranslations();
  });
})();
