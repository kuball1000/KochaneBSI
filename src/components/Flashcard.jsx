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

export default function Flashcard({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
     // For flashcards, maybe we don't shuffle QUESTIONS but we shuffle ANSWERS? 
     // Or do we shuffle both? Requirement says "random sort order", usually applies to Quiz.
     // For Flashcards, random order of questions is also good.
     const shuffledQuestions = shuffleArray(questionsData).map(q => ({
       ...q,
       answers: shuffleArray(q.answers) 
     }));
     setQuestions(shuffledQuestions);
  }, []);

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < questions.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150); // slight delay for animation if we had one
    } else {
        // restart loop
        setCurrentIndex(0);
        setIsFlipped(false);
    }
  };

  const handlePrev = (e) => {
      e.stopPropagation();
      if (currentIndex > 0) {
          setIsFlipped(false);
          setCurrentIndex(prev => prev - 1);
      }
  }

  if (questions.length === 0) return <div className="text-center p-10">Ładowanie...</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-2xl">
         <div className="flex justify-between items-center mb-6">
           <button onClick={onBack} className="text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2">
             ← Menu
           </button>
           <span className="bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full text-sm">
             Fiszka {currentIndex + 1} / {questions.length}
           </span>
         </div>

         {/* Card Container - Click to flip */}
         <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="group perspective-1000 cursor-pointer h-[400px]"
         >
            <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden card flex flex-col items-center justify-center p-8 bg-white">
                    <h3 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-4">Pytanie</h3>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
                        {currentQuestion.question}
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-400 font-medium animate-pulse cursor-pointer">
                            (Kliknij kartę aby odwrócić)
                        </span>
                        <button 
                            className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold underline decoration-2 decoration-blue-200 hover:decoration-blue-600 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFlipped(!isFlipped);
                            }}
                        >
                            Pokaż odpowiedź ↻
                        </button>
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden card rotate-y-180 bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center p-8 border-green-200">
                    <h3 className="text-green-600 uppercase tracking-widest text-xs font-bold mb-4">Poprawna Odpowiedź</h3>
                    <div className="space-y-4 w-full">
                         {currentQuestion.answers.filter(a => a.isCorrect).map((ans, idx) => (
                             <div key={idx} className="p-4 bg-green-100 rounded-xl text-green-800 font-bold shadow-sm">
                                 {ans.text}
                             </div>
                         ))}
                    </div>
                </div>
            </div>
         </div>

         <div className="flex justify-between mt-8">
             <button 
                onClick={handlePrev} 
                disabled={currentIndex === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed">
                Poprzednia
             </button>
             <button 
                onClick={handleNext}
                className="btn-primary">
                {currentIndex === questions.length - 1 ? 'Od początku' : 'Następna'}
             </button>
         </div>
       </div>
    </div>
  );
}
