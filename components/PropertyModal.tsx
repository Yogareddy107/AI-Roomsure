import React, { useState, useEffect } from 'react';
// Fix: Add .ts extension for explicit module resolution.
import type { Property } from '../types.ts';
import Icon from './Icon.tsx';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onToggleFavorite: (propertyId: number) => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onToggleFavorite }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Reset image index when a new property is selected
    setCurrentImageIndex(0);
  }, [property]);

  if (!property) {
    return null;
  }
  
  const handleBookNow = () => {
    setIsBooking(true);
    setTimeout(() => {
        alert(`Booking confirmed for ${property.name}!`);
        setIsBooking(false);
        onClose();
    }, 1500);
  };

  const hasImages = property.imageUrls && property.imageUrls.length > 0;
  const hasMultipleImages = hasImages && property.imageUrls.length > 1;

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? property.imageUrls.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === property.imageUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="relative">
           <div className="w-full h-72 bg-gray-200 rounded-t-lg">
             <img 
              src={hasImages ? property.imageUrls[currentImageIndex] : 'https://placehold.co/600x400/EEE/31343C?text=No+Image'} 
              alt={property.name} 
              className="w-full h-full object-cover rounded-t-lg" 
            />
           </div>
           {hasMultipleImages && (
            <>
              <button 
                onClick={handlePrevImage} 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity z-10"
                aria-label="Previous image"
              >
                <Icon name="chevron-left" className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNextImage} 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity z-10"
                aria-label="Next image"
              >
                <Icon name="chevron-right" className="w-6 h-6" />
              </button>
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {property.imageUrls.map((_, index) => (
                  <button 
                    key={index} 
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-60 hover:bg-opacity-80'}`}
                    aria-label={`Go to image ${index + 1}`}
                  ></button>
                ))}
              </div>
            </>
          )}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-600 hover:text-gray-900 transition-opacity z-20"
            aria-label="Close property details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-oyo-red">{property.type}</p>
              <h2 id="property-modal-title" className="text-3xl font-bold text-gray-900 mt-1">{property.name}</h2>
              <p className="text-gray-600 mt-2 flex items-center">
                <Icon name="location-marker" className="w-5 h-5 mr-2 text-gray-500"/>
                {property.address}
              </p>
            </div>
            <div className="text-right">
                <p className="text-3xl font-extrabold text-gray-900">₹{property.price.toLocaleString()}</p>
                <p className="text-gray-500">per month</p>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-6">
            <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg font-bold text-lg ${property.rating >= 4.0 ? 'bg-green-700 text-white' : 'bg-yellow-400 text-gray-900'}`}>
              <span>{property.rating.toFixed(1)}</span>
              <Icon name="star" className="w-5 h-5" />
            </div>
            <button 
              onClick={() => onToggleFavorite(property.id)} 
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
              aria-pressed={property.isFavorite}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill={property.isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{property.isFavorite ? 'Favorite' : 'Add to Favorites'}</span>
            </button>
          </div>

          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">About this property</h3>
            <p className={`leading-relaxed ${property.description ? 'text-gray-600' : 'text-gray-400 italic'}`}>{property.description || 'No description available.'}</p>
          </div>

          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map(amenity => (
                <div key={amenity} className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

           <div className="mt-8 pt-6 border-t flex justify-end">
                <button
                    onClick={handleBookNow}
                    disabled={isBooking}
                    aria-busy={isBooking}
                    className="w-full sm:w-auto bg-red-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-800 transition-colors disabled:bg-gray-400 flex items-center justify-center"
                >
                {isBooking ? (
                    <>
                        <Icon name="spinner" className="w-5 h-5 mr-2 animate-spin" />
                        Booking...
                    </>
                ) : (
                    'Book Now'
                )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;