import { useState } from 'react';
import Menu from './components/Menu';
import Quiz from './components/Quiz';
import Flashcard from './components/Flashcard';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [mode, setMode] = useState('menu'); // 'menu', 'quiz', 'flashcard', 'smart-learning', 'sequential'
  const [theme, setTheme] = useState('default'); // 'default', 'bw'
  const [quizParams, setQuizParams] = useState({});

  const handleSelectMode = (selectedMode, params = {}) => {
    setMode(selectedMode);
    setQuizParams(params);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'default' ? 'bw' : 'default');
    if (theme === 'default') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-100 ${
      theme === 'bw' ? 'theme-bw bg-gray-900' : 'bg-gray-50'
    }`}>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      {mode === 'menu' && (
        <Menu onSelectMode={handleSelectMode} />
      )}
      
      {mode === 'quiz' && (
        <Quiz onBack={() => setMode('menu')} />
      )}

      {mode === 'flashcard' && (
        <Flashcard onBack={() => setMode('menu')} />
      )}

      {mode === 'smart-learning' && (
        <Quiz onBack={() => setMode('menu')} isSmartLearning={true} />
      )}

      {mode === 'sequential' && (
        <Quiz 
          onBack={() => setMode('menu')} 
          isSmartLearning={true} 
          startId={quizParams.startId} 
          endId={999}
        />
      )}

      {mode === 'big-d' && (
        <Quiz 
          onBack={() => setMode('menu')} 
          isSmartLearning={true} 
          startId={2000} 
        />
      )}

      {mode === 'sieci-pajaka' && (
        <Quiz 
          onBack={() => setMode('menu')} 
          isSmartLearning={true} 
          startId={1000} 
          endId={1999}
        />
      )}
    </div>
  );
}

export default App;
