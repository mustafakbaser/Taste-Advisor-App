import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface LanguageSelectorProps {
  currentLang: 'tr' | 'en';
  onLanguageChange: (lang: 'tr' | 'en') => void;
}

export default function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
  return (
    <motion.div 
      className="absolute top-4 right-4 flex items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Globe className="h-4 w-4 text-gray-500" />
      <div className="bg-white rounded-full p-1 shadow-md flex">
        <button
          onClick={() => onLanguageChange('tr')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            currentLang === 'tr'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          TR
        </button>
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            currentLang === 'en'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          EN
        </button>
      </div>
    </motion.div>
  );
}