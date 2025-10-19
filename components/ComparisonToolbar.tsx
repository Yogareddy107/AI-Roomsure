import React from 'react';
// Fix: Add .ts extension for explicit module resolution.
import type { Property } from '../types.ts';
import Icon from './Icon.tsx';

interface ComparisonToolbarProps {
  compareList: Property[];
  onRemoveFromCompare: (propertyId: number) => void;
  onClearCompare: () => void;
  onOpenCompareModal: () => void;
}

const ComparisonToolbar: React.FC<ComparisonToolbarProps> = ({ compareList, onRemoveFromCompare, onClearCompare, onOpenCompareModal }) => {
  const canCompare = compareList.length >= 2;

  if (compareList.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-oyo-red shadow-2xl z-40 animate-slide-in-up">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-gray-800 hidden md:block">Compare Properties ({compareList.length}/3)</h3>
            <div className="flex gap-3">
              {compareList.map(p => (
                <div key={p.id} className="relative group">
                  <img src={p.imageUrls[0]} alt={p.name} className="w-16 h-12 object-cover rounded" />
                  <button
                    onClick={() => onRemoveFromCompare(p.id)}
                    className="absolute -top-1.5 -right-1.5 bg-gray-700 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${p.name} from comparison`}
                  >
                    <Icon name="x" className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                <div key={`placeholder-${i}`} className="w-16 h-12 rounded bg-gray-200 border-2 border-dashed flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Add</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCompareModal}
              disabled={!canCompare}
              className="px-5 py-2 bg-oyo-red text-white font-bold rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Compare
            </button>
            <button
              onClick={onClearCompare}
              className="px-3 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        {!canCompare && <p className="text-xs text-center text-gray-500 mt-1 md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-1">Add at least {2 - compareList.length} more properties to compare.</p>}
      </div>
    </div>
  );
};

export default ComparisonToolbar;