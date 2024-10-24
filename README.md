# Recipe Suggestion App

A beautiful, modern web application that suggests recipes based on available ingredients. Built with React, TypeScript, and Google's Gemini AI, featuring a responsive design and bilingual support (English/Turkish). It has been developed with inspiration from StackBlitz and Bolt. 

## ✨ Features

- 🤖 AI-powered recipe suggestions using Google's Gemini API
- 🌐 Bilingual support (English/Turkish)
- 💾 Local search history with persistence
- 🎨 Beautiful UI with animations using Framer Motion
- 📱 Fully responsive design
- 🌙 Modern gradient UI elements
- ⚡ Built with Vite for optimal performance

## 🚀 Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **AI Integration**: Google Generative AI (Gemini)
- **Build Tool**: Vite
- **Development Tools**: ESLint, PostCSS, Autoprefixer

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/mustafakbaser/Taste-Advisor-App.git
cd Taste-Advisor-App
```

2. Install dependencies:
```bash
npm install
```

3. Update `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   └── LanguageSelector.tsx
├── utils/               # Utility functions and constants
│   └── translations.ts
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Explained

### AI Recipe Generation
The app uses Google's Gemini AI to generate recipe suggestions based on user-provided ingredients. The AI provides three recipes with detailed instructions.

### Bilingual Support
- Seamless language switching between English and Turkish
- Persistent language preference
- Full translations for all UI elements

### Search History
- Stores recent searches locally
- Displays timestamp and language for each search
- Quick access to previous recipes
- Limited to last 5 searches for optimal performance

### Animations
- Smooth transitions using Framer Motion
- Responsive hover and click effects
- Loading states with animations

## 🎨 UI/UX Features

- Gradient backgrounds and accents
- Responsive card layouts
- Modern glassmorphism effects
- Intuitive language switcher
- Loading states and error handling
- Mobile-first design approach

## 📱 Responsive Design

The app is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🔒 Environment Variables

Required environment variables:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering recipe suggestions
- Lucide React for beautiful icons
- Framer Motion for smooth animations
- Tailwind CSS for styling
- Vite for blazing fast development