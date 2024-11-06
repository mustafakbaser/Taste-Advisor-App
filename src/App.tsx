import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Utensils, History, X, ChefHat, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './components/LanguageSelector';
import { translations, getPrompt } from './utils/translations';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

interface SearchHistory {
  ingredients: string;
  recipes: string;
  timestamp: number;
  language: 'en' | 'tr';
}

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    const savedLanguage = localStorage.getItem('language');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    if (savedLanguage) {
      setLanguage(savedLanguage as 'en' | 'tr');
    }
  }, []);

  const handleLanguageChange = (newLang: 'en' | 'tr') => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const saveToHistory = (ingredients: string, recipes: string) => {
    const newHistory = [
      { ingredients, recipes, timestamp: Date.now(), language },
      ...searchHistory,
    ].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;
    
    setLoading(true);
    setRecipes('');
    
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = getPrompt(ingredients, language);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setRecipes(text);
      saveToHistory(ingredients, text);
    } catch (error) {
      console.error('Error:', error);
      setRecipes(translations[language].errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (historyItem: SearchHistory) => {
    setIngredients(historyItem.ingredients);
    setRecipes(historyItem.recipes);
    setLanguage(historyItem.language);
    setShowHistory(false);
  };

  const removeFromHistory = (timestamp: number) => {
    const newHistory = searchHistory.filter(item => item.timestamp !== timestamp);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-6 flex flex-col justify-center sm:py-12">
      <LanguageSelector currentLang={language} onLanguageChange={handleLanguageChange} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-3 sm:max-w-xl sm:mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-75"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 backdrop-blur-lg bg-opacity-90">
          <div className="max-w-md mx-auto">
            <motion.div 
              className="flex items-center space-x-5"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ChefHat className="h-14 w-14 text-cyan-500" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-sm text-gray-500 mt-1">{t.subtitle}</p>
              </div>
            </motion.div>

            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="py-8 space-y-4">
                <div className="relative">
                  <input
                    id="ingredients"
                    name="ingredients"
                    type="text"
                    className="peer h-12 w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder={t.inputPlaceholder}
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <motion.button 
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg px-6 py-3 font-medium hover:from-cyan-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? t.loadingText : t.submitButton}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowHistory(!showHistory)}
                    className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <History className="h-6 w-6 text-gray-600" />
                  </motion.button>
                </div>
              </form>

              <AnimatePresence>
                {showHistory && searchHistory.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="py-4 overflow-hidden"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <h3 className="text-lg font-semibold text-gray-700">{t.historyTitle}</h3>
                    </div>
                    <motion.div className="space-y-2">
                      {searchHistory.map((item, index) => (
                        <motion.div 
                          key={item.timestamp}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                        >
                          <button
                            onClick={() => loadFromHistory(item)}
                            className="flex-1 text-left"
                          >
                            <p className="font-medium text-gray-800">{item.ingredients}</p>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDate(item.timestamp)}
                              </span>
                              <span className="uppercase text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
                                {item.language}
                              </span>
                            </div>
                          </button>
                          <motion.button
                            onClick={() => removeFromHistory(item.timestamp)}
                            className="ml-2 p-2 hover:bg-red-100 rounded-full group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="h-4 w-4 text-gray-500 group-hover:text-red-500" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {recipes && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="py-8 space-y-4"
                  >
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-cyan-500" />
                      {t.suggestedRecipes}
                    </h3>
                    <motion.div 
                      className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 shadow-sm border border-gray-100"
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{recipes}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;