import { useState } from 'react';
import Menu from './components/Menu';
import Quiz from './components/Quiz';
import Flashcard from './components/Flashcard';

function App() {
  const [mode, setMode] = useState('menu'); // 'menu', 'quiz', 'flashcard'

  return (
    <div className="bg-gray-50 min-h-screen font-sans selection:bg-blue-100">
      {mode === 'menu' && (
        <Menu onSelectMode={(m) => setMode(m)} />
      )}
      
      {mode === 'quiz' && (
        <Quiz onBack={() => setMode('menu')} />
      )}

      {mode === 'flashcard' && (
        <Flashcard onBack={() => setMode('menu')} />
      )}
    </div>
  );
}

export default App;
