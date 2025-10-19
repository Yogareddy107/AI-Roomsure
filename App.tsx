import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header.tsx';
import FilterSidebar from './components/FilterSidebar.tsx';
import PropertyList from './components/PropertyList.tsx';
import MapView from './components/MapView.tsx';
import Pagination from './components/Pagination.tsx';
import PropertyModal from './components/PropertyModal.tsx';
import AboutModal from './components/AboutModal.tsx';
import ListPropertyModal from './components/ListPropertyModal.tsx';
import ComparisonToolbar from './components/ComparisonToolbar.tsx';
import ComparisonModal from './components/ComparisonModal.tsx';
import ScrollToTopButton from './components/ScrollToTopButton.tsx';
import Notification from './components/Notification.tsx';
import { fetchProperties, getAboutDescription } from './services/backendService.ts';
import { parseSearchQueryToFilters } from './services/geminiService.ts';
import type { Property, Filters } from './types.ts';
import Icon from './components/Icon.tsx';

const ITEMS_PER_PAGE = 9;

const DEFAULT_FILTERS: Filters = {
  searchQuery: '',
  price: { min: 0, max: 50000 },
  types: [],
  amenities: [],
  rating: 0,
  showFavoritesOnly: false,
};

function App() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [centerOnProperty, setCenterOnProperty] = useState<Property | null>(null);
  const [isGeminiLoading, setIsGeminiLoading] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [isListPropertyModalOpen, setIsListPropertyModalOpen] = useState<boolean>(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [notification, setNotification] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [aboutDescription, setAboutDescription] = useState('');

  // Initial data fetch and favorite hydration from localStorage
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [properties, description] = await Promise.all([
            fetchProperties(),
            getAboutDescription()
        ]);
        const favoriteIds = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
        const propertiesWithFavorites = properties.map(p => ({
          ...p,
          isFavorite: favoriteIds.includes(p.id),
        }));
        setAllProperties(propertiesWithFavorites);
        setAboutDescription(description);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
        setNotification('Error: Could not load property data.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Update localStorage when favorites change
  useEffect(() => {
    const favoriteIds = allProperties.filter(p => p.isFavorite).map(p => p.id);
    localStorage.setItem('favoriteProperties', JSON.stringify(favoriteIds));
  }, [allProperties]);

  const filteredProperties = useMemo(() => {
    return allProperties.filter(property => {
      const { price, types, amenities, rating, showFavoritesOnly, searchQuery } = filters;
      if (searchQuery && !property.name.toLowerCase().includes(searchQuery.toLowerCase()) && !property.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (property.price < price.min || property.price > price.max) {
        return false;
      }
      if (types.length > 0 && !types.includes(property.type)) {
        return false;
      }
      if (amenities.length > 0 && !amenities.every(amenity => property.amenities.includes(amenity))) {
        return false;
      }
      if (rating > 0 && property.rating < rating) {
        return false;
      }
      if (showFavoritesOnly && !property.isFavorite) {
        return false;
      }
      return true;
    });
  }, [allProperties, filters]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handleFiltersChange = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      handleFiltersChange({ searchQuery: '' });
      return;
    }
    setIsGeminiLoading(true);
    try {
      const geminiFilters = await parseSearchQueryToFilters(query);
      // Merge with existing filters but reset conflicting ones, keep searchQuery for display
      setFilters(prev => ({
        ...DEFAULT_FILTERS,
        searchQuery: query,
        ...geminiFilters,
        showFavoritesOnly: prev.showFavoritesOnly // preserve favorites toggle
      }));
      setNotification('AI filters applied!');
    } catch (error) {
      console.error("Gemini search failed:", error);
      setNotification('AI search failed. Using basic search.');
      handleFiltersChange({ searchQuery: query });
    } finally {
      setIsGeminiLoading(false);
    }
  }, [handleFiltersChange]);

  const handleClearSearch = useCallback(() => {
    setFilters(prev => ({ ...prev, searchQuery: '' }));
    handleResetFilters();
  }, [handleResetFilters]);

  const handleToggleFavorite = useCallback((propertyId: number) => {
    setAllProperties(prev =>
      prev.map(p =>
        p.id === propertyId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  }, []);
  
  const handleSelectProperty = useCallback((property: Property) => {
    setSelectedProperty(property);
    if (view === 'map') {
        setCenterOnProperty(property);
    }
  }, [view]);

  const handleToggleCompare = useCallback((property: Property) => {
    setCompareList(prev => {
      const isInCompare = prev.some(p => p.id === property.id);
      if (isInCompare) {
        setNotification(`Removed ${property.name} from comparison.`);
        return prev.filter(p => p.id !== property.id);
      } else if (prev.length < 3) {
        setNotification(`Added ${property.name} to comparison.`);
        return [...prev, property];
      } else {
        setNotification('Comparison list is full (max 3).');
        return prev;
      }
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Icon name="spinner" className="w-16 h-16 text-oyo-red animate-spin" />
        <p className="ml-4 text-xl text-gray-700 font-semibold">Loading Properties...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <Header
        onSearch={handleSearch}
        onToggleView={setView}
        currentView={view}
        isGeminiLoading={isGeminiLoading}
        onAboutClick={() => setIsAboutModalOpen(true)}
        onClearSearch={handleClearSearch}
        onOpenListPropertyModal={() => setIsListPropertyModalOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onResetFilters={handleResetFilters}
          />
          <div className="flex-1">
            {view === 'list' ? (
              <>
                <PropertyList
                  properties={paginatedProperties}
                  onSelectProperty={handleSelectProperty}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleCompare={handleToggleCompare}
                  compareList={compareList}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <MapView 
                properties={filteredProperties} 
                onSelectProperty={handleSelectProperty}
                centerOnProperty={centerOnProperty}
              />
            )}
          </div>
        </div>
      </main>

      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onToggleFavorite={handleToggleFavorite}
      />

      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
        description={aboutDescription}
      />

      <ListPropertyModal
        isOpen={isListPropertyModalOpen}
        onClose={() => setIsListPropertyModalOpen(false)}
      />

      <ComparisonToolbar
        compareList={compareList}
        onRemoveFromCompare={(id) => handleToggleCompare(compareList.find(p => p.id === id)!)}
        onClearCompare={() => setCompareList([])}
        onOpenCompareModal={() => setIsComparisonModalOpen(true)}
      />

      <ComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        properties={compareList}
      />

      <ScrollToTopButton />

      {notification && (
        <Notification 
          message={notification} 
          onClose={() => setNotification('')} 
        />
      )}
    </div>
  );
}

export default App;