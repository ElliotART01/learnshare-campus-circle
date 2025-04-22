
export const translations = {
  en: {
    // Authentication
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    submit: "Submit",
    
    // Navigation
    home: "Home",
    about: "About",
    profile: "Profile",
    aiAssistant: "AI Assistant",
    
    // Theme
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    
    // Main content
    campusCircle: "Campus Circle",
    connectingStudents: "Connecting Students",
    platformDescription: "A platform for students to exchange educational materials",
    
    // Errors
    invalidCredentials: "Invalid credentials. Please try again.",
    passwordMismatch: "Passwords do not match.",
    required: "This field is required.",
    
    // Success messages
    loginSuccess: "Logged in successfully.",
    signupSuccess: "Signed up successfully.",
    profileUpdated: "Profile updated successfully.",
    
    // AI Features
    aiFeatures: "AI Assistant Features",
    aiFeaturesDescription: "Get instant support, personalized recommendations, and more using our AI-powered features",
    studentSupport: "Student Support",
    recommendations: "Recommendations",
    contentGeneration: "Content Generation",
    smartSearch: "Smart Search",
    
    studentSupportTitle: "Student Support Assistant",
    recommendationsTitle: "Personalized Recommendations",
    contentGenerationTitle: "Educational Content Generator",
    smartSearchTitle: "Smart Resource Search",
    
    askMeAnything: "Ask me anything about university courses, policies, or resources",
    askAboutUniversity: "Ask about university majors, policies, or resources...",
    askForRecommendations: "What resources or connections are you looking for?",
    askForContent: "What topic would you like me to explain or summarize?",
    searchForResources: "Search for educational resources...",
    
    // Exchange platform
    postRequest: "Post Request",
    postOffer: "Post Offer",
    browseRequests: "Browse Requests",
    browseOffers: "Browse Offers"
  },
  ar: {
    // Authentication
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    logout: "تسجيل الخروج",
    name: "الاسم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    submit: "إرسال",
    
    // Navigation
    home: "الرئيسية",
    about: "حول",
    profile: "الملف الشخصي",
    aiAssistant: "المساعد الذكي",
    
    // Theme
    darkMode: "الوضع المظلم",
    lightMode: "الوضع المضيء",
    
    // Main content
    campusCircle: "دائرة الحرم الجامعي",
    connectingStudents: "ربط الطلاب",
    platformDescription: "منصة لتبادل المواد التعليمية بين الطلاب",
    
    // Errors
    invalidCredentials: "بيانات الاعتماد غير صالحة. يرجى المحاولة مرة أخرى.",
    passwordMismatch: "كلمات المرور غير متطابقة.",
    required: "هذا الحقل مطلوب.",
    
    // Success messages
    loginSuccess: "تم تسجيل الدخول بنجاح.",
    signupSuccess: "تم التسجيل بنجاح.",
    profileUpdated: "تم تحديث الملف الشخصي بنجاح.",
    
    // AI Features
    aiFeatures: "ميزات المساعد الذكي",
    aiFeaturesDescription: "احصل على دعم فوري، وتوصيات مخصصة، والمزيد باستخدام ميزاتنا المدعومة بالذكاء الاصطناعي",
    studentSupport: "دعم الطلاب",
    recommendations: "التوصيات",
    contentGeneration: "إنشاء المحتوى",
    smartSearch: "البحث الذكي",
    
    studentSupportTitle: "مساعد دعم الطلاب",
    recommendationsTitle: "توصيات مخصصة",
    contentGenerationTitle: "منشئ المحتوى التعليمي",
    smartSearchTitle: "بحث ذكي عن الموارد",
    
    askMeAnything: "اسألني أي شيء عن المقررات الجامعية أو السياسات أو الموارد",
    askAboutUniversity: "اسأل عن تخصصات الجامعة أو السياسات أو الموارد...",
    askForRecommendations: "ما هي الموارد أو الاتصالات التي تبحث عنها؟",
    askForContent: "ما هو الموضوع الذي ترغب في شرحه أو تلخيصه؟",
    searchForResources: "ابحث عن الموارد التعليمية...",
    
    // Exchange platform
    postRequest: "نشر طلب",
    postOffer: "نشر عرض",
    browseRequests: "تصفح الطلبات",
    browseOffers: "تصفح العروض"
  }
};

export const t = (language: string, key: string): string => {
  if (language === "ar" && translations.ar[key as keyof typeof translations.ar]) {
    return translations.ar[key as keyof typeof translations.ar];
  }
  
  return translations.en[key as keyof typeof translations.en] || key;
};
