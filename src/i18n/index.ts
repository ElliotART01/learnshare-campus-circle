
const resources = {
  en: {
    signup: {
      title: "Create an account",
      description: "Sign up to start sharing and requesting educational materials",
      name: "Full Name",
      namePlaceholder: "John Doe",
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      major: "Major",
      majorPlaceholder: "Select your major",
      age: "Age (optional)",
      agePlaceholder: "E.g. 21",
      gender: "Gender",
      genderPlaceholder: "Select your gender",
      password: "Password",
      confirmPassword: "Confirm Password",
      submit: "Sign up",
      alreadyHaveAccount: "Already have an account?",
      login: "Login",
      genderList: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
        { value: "Prefer not to say", label: "Prefer not to say" }
      ],
      majors: [
        "Engineering",
        "Computer Science",
        "Business Administration",
        "Medicine",
        "Pharmacy",
        "Dentistry",
        "Nursing",
        "Law",
        "Education",
        "Science",
        "Humanities",
        "Applied Medical Sciences",
        "Sharia",
        "Languages & Translation",
        "Arts & Literature",
        "Other"
      ]
    },
    language: "عربي",
    darkMode: "Dark",
    lightMode: "Light"
  },
  ar: {
    signup: {
      title: "إنشاء حساب",
      description: "سجّل الآن لبدء مشاركة وطلب المواد التعليمية",
      name: "الاسم الكامل",
      namePlaceholder: "أحمد محمد",
      email: "البريد الإلكتروني",
      emailPlaceholder: "you@example.com",
      major: "التخصص",
      majorPlaceholder: "اختر تخصصك",
      age: "العمر (اختياري)",
      agePlaceholder: "مثال: ٢١",
      gender: "الجنس",
      genderPlaceholder: "اختر جنسك",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      submit: "تسجيل",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
      login: "تسجيل الدخول",
      genderList: [
        { value: "Male", label: "ذكر" },
        { value: "Female", label: "أنثى" },
        { value: "Other", label: "آخر" },
        { value: "Prefer not to say", label: "أفضل عدم القول" }
      ],
      majors: [
        "الهندسة",
        "علوم الحاسب",
        "إدارة الأعمال",
        "الطب",
        "الصيدلة",
        "طب الأسنان",
        "التمريض",
        "القانون",
        "التربية",
        "العلوم",
        "العلوم الإنسانية",
        "العلوم الطبية التطبيقية",
        "الشريعة",
        "اللغات والترجمة",
        "الآداب",
        "أخرى"
      ]
    },
    language: "English",
    darkMode: "الوضع الليلي",
    lightMode: "الوضع الفاتح"
  }
};

type Resources = typeof resources;
export function t(lang: "en" | "ar", key: string): any {
  const keys = key.split(".");
  let result: any = resources[lang];
  for (const k of keys) {
    result = result?.[k];
    if (!result) return key;
  }
  return result;
}
