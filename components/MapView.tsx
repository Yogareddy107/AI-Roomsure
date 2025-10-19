import React, { useEffect, useRef } from 'react';
// Fix: Add .ts extension for explicit module resolution.
import type { Property } from '../types.ts';

// Since Leaflet and its plugins are loaded from a CDN, we declare the global variable `L` for TypeScript.
declare const L: any;

// Define custom icons for default and highlighted states for better visual feedback.
const defaultIcon = L.icon({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowSize:  [41, 41]
});

const highlightIcon = L.icon({
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowSize:  [41, 41]
});

interface MapViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  centerOnProperty: Property | null;
}

const MapView: React.FC<MapViewProps> = ({ properties, onSelectProperty, centerOnProperty }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any | null>(null);
  const clusterGroupRef = useRef<any | null>(null);
  const markerInstancesRef = useRef<Map<number, any>>(new Map());
  const highlightedMarkerRef = useRef<any | null>(null);

  // Initialize map effect
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current).setView([12.9716, 77.5946], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      mapRef.current = map;
    }
  }, []);

  // Update markers and clusters effect
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (clusterGroupRef.current) {
      map.removeLayer(clusterGroupRef.current);
    }
    markerInstancesRef.current.clear();
    highlightedMarkerRef.current = null;

    if (properties.length === 0) return;

    const markerClusterGroup = L.markerClusterGroup({
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: true,
    });

    properties.forEach(property => {
      if (property.lat && property.lng) {
        const popupNode = document.createElement('div');
        popupNode.className = "text-center";
        const nameEl = document.createElement('b');
        nameEl.className = 'text-sm';
        nameEl.innerText = property.name;
        popupNode.appendChild(nameEl);
        popupNode.appendChild(document.createElement('br'));
        const priceEl = document.createElement('span');
        priceEl.className = 'text-xs text-gray-600';
        priceEl.innerText = `₹${property.price.toLocaleString()}/month`;
        popupNode.appendChild(priceEl);
        const buttonEl = document.createElement('button');
        buttonEl.innerText = 'View Details';
        buttonEl.className = 'mt-2 w-full px-2 py-1 bg-oyo-red text-white text-xs rounded hover:bg-red-700 transition-colors';
        buttonEl.onclick = () => onSelectProperty(property);
        popupNode.appendChild(buttonEl);

        const marker = L.marker([property.lat, property.lng], { icon: defaultIcon });
        marker.bindPopup(popupNode);
        
        marker.on('popupopen', () => {
          if (highlightedMarkerRef.current && highlightedMarkerRef.current !== marker) {
            highlightedMarkerRef.current.setIcon(defaultIcon);
          }
          marker.setIcon(highlightIcon);
          highlightedMarkerRef.current = marker;
        });

        marker.on('popupclose', () => {
          marker.setIcon(defaultIcon);
          if (highlightedMarkerRef.current === marker) {
            highlightedMarkerRef.current = null;
          }
        });
        
        markerClusterGroup.addLayer(marker);
        markerInstancesRef.current.set(property.id, marker);
      }
    });

    map.addLayer(markerClusterGroup);
    clusterGroupRef.current = markerClusterGroup;

    if (!centerOnProperty && properties.length > 0) {
      map.fitBounds(markerClusterGroup.getBounds().pad(0.2));
    }
  }, [properties, onSelectProperty]); 

  // Center on a specific property effect
  useEffect(() => {
    const clusterGroup = clusterGroupRef.current;
    if (centerOnProperty && clusterGroup) {
      const markerToHighlight = markerInstancesRef.current.get(centerOnProperty.id);
      if (markerToHighlight) {
        clusterGroup.zoomToShowLayer(markerToHighlight, () => {
          markerToHighlight.openPopup();
        });
      }
    }
  }, [centerOnProperty]);

  return (
    <div className="h-[75vh] w-full rounded-lg shadow-md z-10" ref={mapContainerRef} />
  );
};

export default MapView;