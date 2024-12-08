import React, { useState, useEffect, useRef } from 'react';

export function CountriesSelect({ onLanguageChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState({ name: 'Italia', flagUrl: 'https://flagcdn.com/w320/it.png', abbreviation: 'IT' });
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setDropdownOpen(false);
    onLanguageChange(state);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const states = [
    { name: 'Italia', flagUrl: 'https://flagcdn.com/w320/it.png', abbreviation: 'IT' },
    { name: 'Francia', flagUrl: 'https://flagcdn.com/w320/fr.png', abbreviation: 'FR' },
    { name: 'Germania', flagUrl: 'https://flagcdn.com/w320/de.png', abbreviation: 'DE' },
    { name: 'Spagna', flagUrl: 'https://flagcdn.com/w320/es.png', abbreviation: 'ES' },
    { name: 'Regno Unito', flagUrl: 'https://flagcdn.com/w320/gb.png', abbreviation: 'GB' },
  ];

  // Calcola la larghezza massima necessaria per il dropdown
  const maxWidth = Math.max(...states.map(state => state.name.length)) * 8 + 50; // Aggiungi padding extra

  return (
    <div className="relative max-w-sm mx-auto" ref={dropdownRef}>
      <button
        onClick={handleDropdownToggle}
        className="flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white-100 border rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-green-100"
        type="button"
        style={{ width: '100%' }} // Assicura che il bottone sia sempre largo abbastanza
      >
        <img
          src={selectedState.flagUrl}
          alt={`${selectedState.name} flag`}
          className="w-6 h-4 mr-2"
        />
        {selectedState.abbreviation}
        <svg className="w-4 h-4 ml-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdownOpen && (
        <div 
          className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
          style={{ width: `${maxWidth}px` }} // Imposta la larghezza del dropdown
        >
          <ul className="py-2 text-sm text-gray-700">
            {states.map((state) => (
              <li key={state.name}>
                <button
                  type="button"
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => handleStateSelect(state)}
                >
                  <img
                    src={state.flagUrl}
                    alt={`${state.name} flag`}
                    className="w-6 h-4 mr-2"
                  />
                  {state.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
