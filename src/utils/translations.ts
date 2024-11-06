interface Translations {
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  submitButton: string;
  loadingText: string;
  historyTitle: string;
  suggestedRecipes: string;
  errorMessage: string;
}

type TranslationKeys = Record<'en' | 'tr', Translations>;

export const translations: TranslationKeys = {
  en: {
    title: "What Should I Cook?",
    subtitle: "Enter your ingredients, and I'll suggest recipes for you!",
    inputPlaceholder: "E.g., tomatoes, cheese, eggs",
    submitButton: "Suggest Recipes",
    loadingText: "Preparing Recipes...",
    historyTitle: "Search History",
    suggestedRecipes: "Suggested Recipes",
    errorMessage: "Sorry, an error occurred. Please try again later.",
  },
  tr: {
    title: "Ne Yemek Yapsam?",
    subtitle: "Malzemelerinizi girin, size özel tarifler önereceğim!",
    inputPlaceholder: "Örn: domates, peynir, yumurta",
    submitButton: "Tarif Öner",
    loadingText: "Tarifler Hazırlanıyor...",
    historyTitle: "Geçmiş Aramalar",
    suggestedRecipes: "Önerilen Tarifler",
    errorMessage: "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
  },
};

export const getPrompt = (ingredients: string, lang: 'en' | 'tr'): string => {
  if (lang === 'tr') {
    return `Elimdeki malzemeler: ${ingredients}. Bu malzemelerle yapılabilecek 3 yemek tarifi öner ve her biri için kısa bir tarif yaz. Lütfen Türkçe yanıt ver.`;
  }
  return `My ingredients are: ${ingredients}. Please suggest 3 recipes that can be made with these ingredients and write a short recipe for each. Please respond in English.`;
};