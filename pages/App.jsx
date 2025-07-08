// App.jsx
import React, { useState } from 'react';
import SearchScreen from '../components/SearchScreen.jsx';
import ResultsScreen from '../components/ResultsScreen.jsx';


export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setShowResults(true);
  };

  return (
    <div>
      {showResults ? (
        <ResultsScreen onBack={() => setShowResults(false)} />
      ) : (
        <SearchScreen onSearch={handleSearch} />
      )}
    </div>
  );
}
