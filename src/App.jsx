import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState({ name: '' });
  const speechLetters = 'Speech'.split('');
  const transcriberLetters = 'Transcriber'.split('');

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
  };

  return (
    <div className="app-container">
      <div className="navbar">
        <Navbar onLanguageChange={handleLanguageChange} />
      </div>
      <div className="content">
        <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20">
          <h1 className="font-semibold text-4xl sm:text-6xl md:text-7xl">
            {speechLetters.map((letter, index) => (
              <span 
                key={index} 
                className={`inline-block drop-${index + 1}`}
              >
                {letter}
              </span>
            ))}
            {transcriberLetters.map((letter, index) => (
              <span 
                key={index} 
                className={`inline-block text-green-400 drop-${index + 7}`}
              >
                {letter}
              </span>
            ))}
          </h1>
          <div className="home">
            <Home selectedLanguage={selectedLanguage} />
          </div>
        </main>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
