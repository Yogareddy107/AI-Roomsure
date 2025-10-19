export interface Property {
  id: number;
  name: string;
  type: "PG" | "Room" | "Apartment";
  address: string;
  price: number;
  rating: number;
  amenities: string[];
  imageUrls: string[];
  lat: number;
  lng: number;
  isFavorite: boolean;
  description: string;
}

export interface Filters {
  searchQuery: string;
  price: {
    min: number;
    max: number;
  };
  types: string[];
  amenities: string[];
  rating: number;
  showFavoritesOnly: boolean;
}