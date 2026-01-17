import React from 'react';

export default function Menu({ onSelectMode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Kochane BSI <span className="text-blue-600">Quiz</span>
          </h1>
          <p className="text-gray-500 text-lg">Wybierz tryb nauki</p>
        </div>

        <div className="grid gap-4 mt-8">
          <button 
            onClick={() => onSelectMode('quiz')}
            className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-500 text-left"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Egzamin (Quiz)</h3>
            <p className="text-gray-500 mt-1">Losowe pytania, sprawdzanie wiedzy, wynik końcowy.</p>
          </button>

          <button 
            onClick={() => onSelectMode('flashcard')}
            className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-500 text-left"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">Fiszki (Nauka)</h3>
            <p className="text-gray-500 mt-1">Przeglądaj pytania i ucz się z natychmiastową odpowiedzią.</p>
          </button>

          <button 
            onClick={() => onSelectMode('smart-learning')}
            className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-500 text-left"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-16 h-16 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Inteligentna Nauka</h3>
            <p className="text-gray-500 mt-1">Ucz się partiami po 20 pytań. Błędne odpowiedzi wracają do puli.</p>
          </button>
        </div>
      </div>
    </div>
  );
}
