import React, { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Quiz({ onBack, isSmartLearning = false, startId = 0 }) {
  const [questions, setQuestions] = useState([]);
  const [globalQuestions, setGlobalQuestions] = useState([]); // Remaining questions for smart learning
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Changed from single index to array of indices
  const [selectedIndices, setSelectedIndices] = useState([]); 
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  const BATCH_SIZE = 20;

  useEffect(() => {
    // 1. Filter by startId if provided
    let filteredData = questionsData;
    if (startId > 0) {
      filteredData = questionsData.filter(q => q.id >= startId);
    }

    // 2. Shuffle questions and answers
    const shuffledQuestions = shuffleArray(filteredData).map(q => ({
      ...q,
      answers: shuffleArray(q.answers)
    }));
    
    if (isSmartLearning) {
        // Load first batch
        const firstBatch = shuffledQuestions.slice(0, BATCH_SIZE);
        const remaining = shuffledQuestions.slice(BATCH_SIZE);
        setQuestions(firstBatch);
        setGlobalQuestions(remaining);
    } else {
        setQuestions(shuffledQuestions);
    }
  }, [isSmartLearning, startId]);

  const handleAnswerToggle = (index) => {
    if (isConfirmed) return;
    
    setSelectedIndices(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedIndices.length === 0) return;
    
    setIsConfirmed(true);
    const currentQ = questions[currentIndex];
    const answers = currentQ.answers;

    // Check correctness:
    // 1. All selected items must be correct
    // 2. All correct items must be selected
    
    // Get indices of all correct answers
    const correctIndices = answers
        .map((a, i) => a.isCorrect ? i : -1)
        .filter(i => i !== -1);

    // Sort to compare arrays easily (or use Set)
    const sortedSelected = [...selectedIndices].sort();
    const sortedCorrect = [...correctIndices].sort();

    const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);

    if (isCorrect) {
      setScore(prev => prev + 1); // Note: Score in smart mode might need adjusting if we want only 'unique' correct answers, but simple increment is detailed enough for now
      setCorrectCount(prev => prev + 1);
    } else {
      // Re-queue
      const reQueuedQ = {
          ...currentQ,
          answers: shuffleArray(currentQ.answers),
          id: currentQ.id + "_retry_" + Date.now()
      };
      setQuestions(prev => [...prev, reQueuedQ]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedIndices([]);
      setIsConfirmed(false);
    } else {
      // End of current list?
      if (isSmartLearning && globalQuestions.length > 0) {
          // Load next batch
          const nextBatch = globalQuestions.slice(0, BATCH_SIZE);
          const remaining = globalQuestions.slice(BATCH_SIZE);
          
          setQuestions(nextBatch);
          setGlobalQuestions(remaining);
          setCurrentIndex(0);
          setSelectedIndices([]);
          setIsConfirmed(false);
          // Optional: Show a transient message "Loading next batch..."
      } else {
          setQuizFinished(true);
      }
    }
  };

  if (questions.length === 0) return <div className="text-center p-10">Ładowanie pytań...</div>;

  if (quizFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-lg w-full p-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Koniec Nauki!</h2>
          <div className="text-5xl font-black text-blue-600">
            {correctCount} zaliczonych
          </div>
          <p className="text-gray-500">Wszystkie pytania zostały przerobione!</p>
          <div className="flex gap-4 justify-center pt-4">
            <button onClick={onBack} className="btn-secondary">Wróć do Menu</button>
            <button onClick={() => window.location.reload()} className="btn-primary">Spróbuj Ponownie</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2">
            ← Menu
          </button>
          
          <div className="flex gap-4">
             <span className="bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full text-sm">
                Poprawne: {correctCount}
             </span>
             <span className="bg-blue-100 text-blue-700 font-bold px-4 py-1 rounded-full text-sm">
                {isSmartLearning 
                    ? `Pozostało: ${globalQuestions.length + (questions.length - currentIndex)}` 
                    : `Pytanie ${currentIndex + 1} / ${questions.length}`
                }
             </span>
          </div>
        </div>

        <div className="card p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-relaxed">
            {currentQuestion.question}
          </h2>
          <p className="text-sm text-gray-400 mb-6 italic">
            Zaznacz wszystkie poprawne odpowiedzi
          </p>

          <div className="space-y-4">
            {currentQuestion.answers.map((ans, idx) => {
              const isSelected = selectedIndices.includes(idx);
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 relative ";
              
              if (isConfirmed) {
                  // Show the actual color of the answer
                  switch(ans.color) {
                      case 'green':
                          btnClass += "bg-green-100 border-green-500 text-green-800";
                          break;
                      case 'yellow':
                          btnClass += "bg-yellow-100 border-yellow-500 text-yellow-800";
                          break;
                      case 'blue':
                          btnClass += "bg-blue-100 border-blue-500 text-blue-800";
                          break;
                      default:
                          btnClass += "bg-gray-100 border-gray-400 text-gray-500";
                  }
                  
                  // Visual indicator for selection state
                  if (isSelected) {
                      btnClass += " ring-4 ring-offset-2 " + (ans.isCorrect ? "ring-green-400" : "ring-red-400");
                  }
                  
              } else {
                 // Selection mode
                 if (isSelected) {
                    btnClass += "bg-blue-50 border-blue-500 ring-2 ring-blue-200 text-blue-900";
                 } else {
                    btnClass += "bg-white border-gray-100 hover:border-blue-400 hover:shadow-md text-gray-700";
                 }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerToggle(idx)}
                  disabled={isConfirmed}
                  className={btnClass}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded md:rounded-md border-2 flex items-center justify-center text-xs transition-colors
                      ${isConfirmed ? 
                        (ans.isCorrect ? 'border-green-600 bg-green-600 text-white' : 'border-gray-400 bg-transparent text-gray-600') 
                        : (isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white')
                      }`}>
                      
                      {/* Icons logic */}
                      {isConfirmed ? (
                          isSelected ? (
                              ans.isCorrect ? 
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> 
                              : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                          ) : (
                              // Not selected
                              ans.isCorrect ? 
                              <span className="text-white text-[10px]">!</span> // Missed correct
                              : <span className="text-gray-400">{String.fromCharCode(65 + idx)}</span> // Normal wrong
                          )
                      ) : (
                          // Not confirmed
                          isSelected ? 
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          : <span className="text-gray-400">{String.fromCharCode(65 + idx)}</span>
                      )}
                    </div>
                    <span>{ans.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end min-h-[50px]">
            {!isConfirmed && (
               <button 
                onClick={handleConfirm} 
                disabled={selectedIndices.length === 0}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  Zatwierdź odpowiedź
               </button>
            )}

            {isConfirmed && (
              <button onClick={handleNext} className="btn-primary flex items-center gap-2 animate-fade-in-up">
                {currentIndex === questions.length - 1 ? 'Zakończ' : 'Następne Pytanie'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
