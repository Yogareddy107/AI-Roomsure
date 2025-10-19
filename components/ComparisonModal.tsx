import React, { useMemo } from 'react';
// Fix: Add .ts extension for explicit module resolution.
import type { Property } from '../types.ts';
// Fix: Add .ts extension for explicit module resolution.
import { AVAILABLE_AMENITIES } from '../constants.ts';
import Icon from './Icon.tsx';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, properties }) => {
  if (!isOpen) {
    return null;
  }

  const allAmenities = AVAILABLE_AMENITIES;

  const { lowestPrice, highestRating } = useMemo(() => {
    if (properties.length === 0) {
      return { lowestPrice: Infinity, highestRating: 0 };
    }
    const lowestPrice = Math.min(...properties.map(p => p.price));
    const highestRating = Math.max(...properties.map(p => p.rating));
    return { lowestPrice, highestRating };
  }, [properties]);


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-6xl m-4 max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 id="comparison-modal-title" className="text-2xl font-bold text-gray-800">Compare Properties</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close comparison">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b">
                <th className="w-1/4 p-4 text-left font-semibold text-gray-600 sticky top-0 bg-white">Feature</th>
                {properties.map(p => (
                  <th key={p.id} className="w-1/4 p-4 sticky top-0 bg-white">
                    <img src={p.imageUrls[0]} alt={p.name} className="w-full h-32 object-cover rounded-md" />
                  </th>
                ))}
                {Array.from({ length: 3 - properties.length }).map((_, i) => <th key={`empty-${i}`} className="w-1/4 p-4 sticky top-0 bg-white"></th>)}
              </tr>
            </thead>
            <tbody>
              {/* Name */}
              <tr className="border-b bg-gray-50">
                <td className="p-4 font-semibold">Name</td>
                {properties.map(p => <td key={p.id} className="p-4 text-center font-bold text-oyo-red">{p.name}</td>)}
                {Array.from({ length: 3 - properties.length }).map((_, i) => <td key={`empty-${i}`}></td>)}
              </tr>
              {/* Price */}
              <tr className="border-b">
                <td className="p-4 font-semibold">Price</td>
                {properties.map(p => (
                  <td key={p.id} className={`p-4 text-center text-lg font-bold ${p.price === lowestPrice ? 'text-green-600' : ''}`}>
                     ₹{p.price.toLocaleString()}
                     {p.price === lowestPrice && <span className="block text-xs font-normal text-green-600">Best Price</span>}
                  </td>
                ))}
                 {Array.from({ length: 3 - properties.length }).map((_, i) => <td key={`empty-${i}`}></td>)}
              </tr>
              {/* Rating */}
              <tr className="border-b bg-gray-50">
                <td className="p-4 font-semibold">Rating</td>
                {properties.map(p => (
                  <td key={p.id} className={`p-4 text-center ${p.rating === highestRating ? 'text-green-600' : ''}`}>
                    <div className="flex items-center justify-center space-x-1">
                      <span className="font-bold">{p.rating.toFixed(1)}</span>
                      <Icon name="star" className={`w-5 h-5 ${p.rating === highestRating ? 'text-green-500' : 'text-yellow-400'}`} />
                    </div>
                    {p.rating === highestRating && <span className="block text-xs font-normal">Highest Rated</span>}
                  </td>
                ))}
                 {Array.from({ length: 3 - properties.length }).map((_, i) => <td key={`empty-${i}`}></td>)}
              </tr>
              {/* Address */}
               <tr className="border-b">
                <td className="p-4 font-semibold">Address</td>
                {properties.map(p => <td key={p.id} className="p-4 text-center text-sm">{p.address}</td>)}
                 {Array.from({ length: 3 - properties.length }).map((_, i) => <td key={`empty-${i}`}></td>)}
              </tr>
              {/* Property ID */}
              <tr className="border-b bg-gray-50">
                <td className="p-4 font-semibold">Property ID</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 text-center text-xs text-gray-500 font-mono">
                    #{p.id}
                  </td>
                ))}
                {Array.from({ length: 3 - properties.length }).map((_, i) => <td key={`empty-${i}`}></td>)}
              </tr>
              {/* Amenities */}
              {allAmenities.map((amenity, index) => (
                <tr key={amenity} className={`border-b ${index % 2 === 0 ? '' : 'bg-gray-50'}`}>
                  <td className="p-4 font-semibold">{amenity}</td>
                  {properties.map(p => (
                    <td key={p.id} className="p-4 text-center">
                      {p.amenities.includes(amenity) ? 
                        <span className="text-green-500 text-2xl">&#10003;</span> : 
                        <span className="text-red-400 text-2xl">&#10007;</span>
                      }
                    </td>
                  ))}
                  {Array.from({ length: 3 - properties.length }).map((_, i) => <td key={`empty-${i}`}></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;