import { useState } from 'react';
import Menu from './components/Menu';
import Quiz from './components/Quiz';
import Flashcard from './components/Flashcard';

function App() {
  const [mode, setMode] = useState('menu'); // 'menu', 'quiz', 'flashcard', 'smart-learning', 'sequential'
  const [quizParams, setQuizParams] = useState({});

  const handleSelectMode = (selectedMode, params = {}) => {
    setMode(selectedMode);
    setQuizParams(params);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans selection:bg-blue-100">
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
        />
      )}
    </div>
  );
}

export default App;
