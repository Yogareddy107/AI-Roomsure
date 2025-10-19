import React from 'react';
import PropertyCard from './PropertyCard.tsx';
// Fix: Add .ts extension for explicit module resolution.
import type { Property } from '../types.ts';

interface PropertyListProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onToggleFavorite: (propertyId: number) => void;
  onToggleCompare: (property: Property) => void;
  compareList: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  onSelectProperty,
  onToggleFavorite,
  onToggleCompare,
  compareList,
}) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h2 className="text-2xl font-semibold mb-2">No Properties Found</h2>
        <p>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          onSelectProperty={onSelectProperty}
          onToggleFavorite={onToggleFavorite}
          onToggleCompare={onToggleCompare}
          isInCompare={compareList.some(p => p.id === property.id)}
        />
      ))}
    </div>
  );
};

export default PropertyList;
