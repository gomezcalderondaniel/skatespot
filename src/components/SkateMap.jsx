import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom skater marker
const skateIcon = L.icon({
  // You can replace this URL with any image link you find online
  iconUrl: 'https://img.icons8.com/?size=100&id=9845&format=png&color=90EE90', 
  iconSize: [48, 48], // The size of the icon in pixels
  iconAnchor: [24, 48], // This ensures the bottom center of the image points to the coordinate
  popupAnchor: [0, -45], // This offsets the popup so it doesn't cover the icon
});

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      // Prevent clicking the popup itself or markers
      if (e.originalEvent.target.closest('.leaflet-marker-icon')) return;
      onMapClick(e.latlng);
    },
  });
  return null;
};

const SkateMap = ({ spots, onSelectSpot, onNewSpotLocation }) => {
  const defaultCenter = [40.7128, -74.0060]; // NYC

  // Center on user's location if available
  const LocationMarker = () => {
    const map = useMapEvents({
      load: () => {
        map.locate();
      },
      locationfound: (e) => {
        map.flyTo(e.latlng, 13);
      },
    });
    return null;
  };

  return (
    <div className="h-full w-full bg-skate-gray">
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {spots.map((spot) => (
          <Marker 
            key={spot.id} 
            position={[spot.lat, spot.lng]}
            icon={skateIcon}
          >
            <Popup className="custom-popup">
              <div className="flex flex-col gap-2 min-w-[150px]">
                <h3 className="font-black uppercase tracking-tight text-white mb-0">{spot.name}</h3>
                <div className="flex gap-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${spot.ratings.bustRisk < 0 ? 'bg-red-500' : 'bg-green-500'}`}>
                    BUST: {spot.ratings.bustRisk}
                  </span>
                  <span className="text-[10px] bg-gray-700 px-1.5 py-0.5 rounded text-white">
                    LVL: {spot.ratings.variety}
                  </span>
                </div>
                <button 
                  onClick={() => onSelectSpot(spot)}
                  className="w-full mt-2 bg-white text-black font-bold py-1.5 rounded text-xs uppercase"
                >
                  View Spot
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapClickHandler onMapClick={onNewSpotLocation} />
      </MapContainer>
      
      {/* UI Overlay Controls */}
      <div className="absolute top-6 left-6 z-[1000] pointer-events-none">
        <h1 className="text-3xl font-black italic tracking-tighter text-white drop-shadow-lg">
          SKATE<span className="text-green-400">SPOT</span>
        </h1>
        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">Tap map to mark new spot</p>
      </div>

      <div className="absolute bottom-10 right-6 z-[1000] flex flex-col gap-2">
        <div className="bg-black/50 backdrop-blur-md p-3 rounded-2xl border border-gray-800 text-[10px] font-mono text-white/50 uppercase">
          Total Spots: {spots.length}
        </div>
      </div>
    </div>
  );
};

export default SkateMap;
