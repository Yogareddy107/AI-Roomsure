import React, { useState } from 'react';
import Icon from './Icon.tsx';

interface HeaderProps {
  onSearch: (query: string) => void;
  onToggleView: (view: 'list' | 'map') => void;
  currentView: 'list' | 'map';
  isGeminiLoading: boolean;
  onAboutClick: () => void;
  onClearSearch: () => void;
  onOpenListPropertyModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onToggleView, currentView, isGeminiLoading, onAboutClick, onClearSearch, onOpenListPropertyModal }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onClearSearch();
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c51e.png" alt="Logo" className="h-8" />
          <h1 className="text-2xl font-bold text-gray-800 hidden md:block">PropertyFinder</h1>
        </div>
        
        <form onSubmit={handleSearch} className="flex-grow max-w-xl mx-4">
          <label htmlFor="ai-search" className="sr-only">Search for properties using natural language</label>
          <div className="relative">
            <input
              type="text"
              id="ai-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., 'AC room under ₹15000 with WiFi'"
              className="w-full pl-4 pr-20 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-oyo-red"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 p-1 rounded-full"
                aria-label="Clear search"
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
            )}
            <button 
              type="submit" 
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-oyo-red text-white rounded-full p-2 hover:bg-red-700 disabled:bg-gray-400"
              disabled={isGeminiLoading}
              aria-label={isGeminiLoading ? "Performing AI search..." : "Search"}
              aria-busy={isGeminiLoading}
            >
              {isGeminiLoading ? (
                <Icon name="spinner" className="w-5 h-5 animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg border p-0.5 bg-gray-100">
            <button 
              onClick={() => onToggleView('list')} 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${currentView === 'list' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
              aria-label="Switch to List View"
            >
              <Icon name="list" className="w-5 h-5 md:hidden" />
              <span className="hidden md:inline">List</span>
            </button>
            <button 
              onClick={() => onToggleView('map')} 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${currentView === 'map' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
              aria-label="Switch to Map View"
            >
              <Icon name="map" className="w-5 h-5 md:hidden" />
              <span className="hidden md:inline">Map</span>
            </button>
          </div>
           <button onClick={onOpenListPropertyModal} className="hidden sm:block text-sm font-medium text-gray-600 hover:text-oyo-red transition-colors">
            List Property
          </button>
           <button onClick={onAboutClick} className="text-gray-600 hover:text-gray-800">
            About Us
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;