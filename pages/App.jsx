import React, { useState } from 'react';
import SearchScreen from './SearchScreen';
import ResultsScreen from './ResultsScreen';
import '@/styles/globals.css';
import '@/styles/style.css';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setShowResults(true);
  };

  return (
    <ErrorBoundary>
      <div className="container">
      {showResults ? (
        <ResultsScreen onBack={() => setShowResults(false)} />
      ) : (
        <SearchScreen onSearch={handleSearch} />
      )}
    </div>
    </ErrorBoundary>
  );
}