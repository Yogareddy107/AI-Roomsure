import React from 'react';
// Fix: Add .ts extension for explicit module resolution.
import type { Filters } from '../types.ts';
// Fix: Add .ts extension for explicit module resolution.
import { AVAILABLE_AMENITIES, PROPERTY_TYPES } from '../constants.ts';
import Icon from './Icon.tsx';

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (newFilters: Partial<Filters>) => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange, onResetFilters }) => {

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(parseInt(e.target.value, 10), filters.price.max - 1000);
    onFiltersChange({
      price: {
        ...filters.price,
        min: newMin,
      },
    });
  };
  
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(parseInt(e.target.value, 10), filters.price.min + 1000);
    onFiltersChange({
      price: {
        ...filters.price,
        max: newMax,
      },
    });
  };

  const handleTypeChange = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFiltersChange({ types: newTypes });
  };

  const handleAmenityChange = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onFiltersChange({ amenities: newAmenities });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ rating: filters.rating === rating ? 0 : rating });
  };
  
  const handleShowFavoritesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ showFavoritesOnly: e.target.checked });
  };

  const priceMax = 50000;

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5">
      <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button onClick={onResetFilters} className="text-sm font-semibold text-oyo-red hover:underline">
            Reset
          </button>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <span>₹{filters.price.min.toLocaleString()}</span>
            <span>₹{filters.price.max.toLocaleString()}</span>
          </div>
          <div className="relative h-5 flex items-center">
            <div className="absolute h-1 w-full bg-gray-200 rounded-full">
                <div 
                    className="absolute h-1 bg-oyo-red rounded-full"
                    style={{ 
                        left: `${(filters.price.min / priceMax) * 100}%`, 
                        right: `${100 - (filters.price.max / priceMax) * 100}%` 
                    }}
                ></div>
            </div>
            <input
              type="range"
              min="0"
              max={priceMax}
              step="1000"
              value={filters.price.min}
              onChange={handleMinPriceChange}
              className="absolute w-full h-1 bg-transparent appearance-none pointer-events-auto z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-oyo-red [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto"
            />
            <input
              type="range"
              min="0"
              max={priceMax}
              step="1000"
              value={filters.price.max}
              onChange={handleMaxPriceChange}
              className="absolute w-full h-1 bg-transparent appearance-none pointer-events-auto z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-oyo-red [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto"
            />
          </div>
        </div>

        {/* Property Type Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Property Type</h3>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map(type => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${
                  filters.types.includes(type)
                    ? 'bg-oyo-red text-white border-oyo-red'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Rating Filter */}
        <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Rating</h3>
            <div className="flex items-center space-x-2">
                {[4, 3, 2, 1].map(star => (
                    <button
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        className={`flex items-center px-3 py-1 border rounded-full text-sm transition-colors ${
                            filters.rating === star ? 'bg-red-700 border-red-700 text-white' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100'
                        }`}
                        aria-label={`Show ${star} stars and up`}
                    >
                        {star} <Icon name="star" className="w-4 h-4 ml-1" />
                    </button>
                ))}
            </div>
        </div>

        {/* Amenities Filter */}
        <div className="mb-6 border-t pt-6">
          <h3 className="font-semibold text-gray-700 mb-3">Amenities</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {AVAILABLE_AMENITIES.map(amenity => (
              <label key={amenity} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="h-4 w-4 text-oyo-red border-gray-300 rounded focus:ring-oyo-red"
                />
                <span className="ml-2 text-gray-600">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Favorites Filter */}
        <div className="border-t pt-6">
            <label className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-gray-700">Show Favorites Only</span>
                <div className="relative">
                    <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={filters.showFavoritesOnly}
                        onChange={handleShowFavoritesChange}
                    />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${filters.showFavoritesOnly ? 'bg-oyo-red' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${filters.showFavoritesOnly ? 'translate-x-4' : ''}`}></div>
                </div>
            </label>
        </div>

      </div>
    </aside>
  );
};

export default FilterSidebar;