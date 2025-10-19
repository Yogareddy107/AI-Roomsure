import React, { useState } from 'react';
// Fix: Add .ts extension for explicit module resolution.
import type { Property } from '../types.ts';
import Icon from './Icon.tsx';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  onToggleFavorite: (propertyId: number) => void;
  onToggleCompare: (property: Property) => void;
  isInCompare: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelectProperty, onToggleFavorite, onToggleCompare, isInCompare }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasImages = property.imageUrls && property.imageUrls.length > 0;
  const hasMultipleImages = hasImages && property.imageUrls.length > 1;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === 0 ? property.imageUrls.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === property.imageUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 group">
      <div className="relative">
        <div 
          className="w-full h-48 bg-gray-200 cursor-pointer"
          onClick={() => onSelectProperty(property)}
        >
          <img
            src={hasImages ? property.imageUrls[currentImageIndex] : 'https://placehold.co/600x400/EEE/31343C?text=No+Image'}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        </div>
         {hasMultipleImages && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-1.5 hover:bg-opacity-60 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <Icon name="chevron-left" className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-1.5 hover:bg-opacity-60 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <Icon name="chevron-right" className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
              {property.imageUrls.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/60'}`} 
                />
              ))}
            </div>
          </>
        )}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button
            onClick={() => onToggleFavorite(property.id)}
            className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors ${property.isFavorite ? 'text-red-500' : 'text-gray-600'}`}
            aria-label={property.isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={property.isFavorite}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={property.isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
           <button
            onClick={() => onToggleCompare(property)}
            className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors ${isInCompare ? 'text-blue-500' : 'text-gray-600'}`}
            aria-label={isInCompare ? "Remove from comparison" : "Add to comparison"}
            aria-pressed={isInCompare}
          >
            <Icon name="compare" className="w-5 h-5"/>
          </button>
        </div>
        <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded-md ${property.rating >= 4.0 ? 'bg-green-600' : 'bg-yellow-500'}`}>
          <span className="flex items-center">
            {property.rating.toFixed(1)} <Icon name="star" className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
      <div className="p-4 cursor-pointer" onClick={() => onSelectProperty(property)}>
        <p className="text-sm text-gray-500">{property.type}</p>
        <h3 className="text-lg font-bold text-gray-800 truncate">{property.name}</h3>
        <p className="text-sm text-gray-600 truncate mt-1">{property.address}</p>
        <p className={`text-sm mt-2 truncate ${property.description ? 'text-gray-600' : 'text-gray-400 italic'}`}>
          {property.description || 'No description available.'}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-extrabold text-gray-900">
            ₹{property.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ month</span>
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProperty(property);
            }}
            className="text-sm font-semibold text-oyo-red hover:underline"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;