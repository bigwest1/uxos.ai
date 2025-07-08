// Entry component connecting SearchScreen and ResultsScreen
import React, { useState } from 'react';
import SearchScreen from './SearchScreen';
import ResultsScreen from './ResultsScreen';
import './styles.css';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
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
