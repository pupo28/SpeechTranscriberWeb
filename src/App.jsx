import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  const speechLetters = 'Speech'.split('');
  const transcriberLetters = 'Transcriber'.split('');
  
  return (
    <div className="app-container">
      <div className="navbar">
        <Navbar />
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
            <Home />
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
