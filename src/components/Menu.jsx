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

          <button 
            onClick={() => onSelectMode('big-d')}
            className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-pink-500 text-left"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-16 h-16 text-pink-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">Big d (2000+)</h3>
            <p className="text-gray-500 mt-1">Tryb sekwencyjny od pytania 2000.</p>
          </button>

          <button 
            onClick={() => onSelectMode('sieci-pajaka')}
            className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-500 text-left"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">Sieci pająka (1000+)</h3>
            <p className="text-gray-500 mt-1">Tryb sekwencyjny od pytania 1000.</p>
          </button>

          <div className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-500 text-left">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <svg className="w-16 h-16 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
             </div>
             <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Nauka od pytania ID</h3>
             <p className="text-gray-500 mt-1 mb-4">Inteligentna nauka od konkretnego pytania do końca.</p>
             <div className="flex gap-2 relative z-10">
                <input 
                  type="number" 
                  defaultValue="434"
                  id="startIdInput"
                  className="border rounded px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="ID"
                  onClick={(e) => e.stopPropagation()}
                />
                <button 
                  onClick={(e) => {
                      e.stopPropagation();
                      const val = document.getElementById('startIdInput').value;
                      onSelectMode('sequential', { startId: parseInt(val) || 434 });
                  }}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Start
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
