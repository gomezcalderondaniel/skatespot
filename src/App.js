import React, { useState, useEffect } from 'react';
import SkateMap from './components/SkateMap';
import SpotForm from './components/SpotForm';
import SpotProfile from './components/SpotProfile';
import { Plus } from 'lucide-react';

function App() {
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pendingLocation, setPendingLocation] = useState(null);

  // Load spots from LocalStorage on mount
  useEffect(() => {
    const savedSpots = localStorage.getItem('skatespots');
    if (savedSpots) {
      setSpots(JSON.parse(savedSpots));
    }
  }, []);

  // Sync with LocalStorage
  const saveSpotsToStorage = (updatedSpots) => {
    setSpots(updatedSpots);
    localStorage.setItem('skatespots', JSON.stringify(updatedSpots));
  };

  const handleNewSpotLocation = (latLng) => {
    setPendingLocation(latLng);
    setIsFormOpen(true);
  };

  const handleSaveSpot = (newSpot) => {
    const updatedSpots = [...spots, newSpot];
    saveSpotsToStorage(updatedSpots);
    setIsFormOpen(false);
    setPendingLocation(null);
  };

  const handleDeleteSpot = (id) => {
    const updatedSpots = spots.filter(s => s.id !== id);
    saveSpotsToStorage(updatedSpots);
    setSelectedSpot(null);
  };

  return (
    <div className="relative w-screen h-screen">
      <SkateMap 
        spots={spots} 
        onSelectSpot={(spot) => setSelectedSpot(spot)} 
        onNewSpotLocation={handleNewSpotLocation}
      />

      {/* Floating Action Button for Instruction */}
      {!isFormOpen && !selectedSpot && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000]">
          <div className="bg-white text-black px-6 py-3 rounded-full font-black uppercase text-sm flex items-center gap-2 shadow-2xl animate-bounce">
            <Plus size={18} />
            Tap map to drop pin
          </div>
        </div>
      )}

      {isFormOpen && (
        <SpotForm 
          latLng={pendingLocation} 
          onSave={handleSaveSpot}
          onCancel={() => {
            setIsFormOpen(false);
            setPendingLocation(null);
          }}
        />
      )}

      {selectedSpot && (
        <SpotProfile 
          spot={selectedSpot} 
          onClose={() => setSelectedSpot(null)}
          onDelete={handleDeleteSpot}
        />
      )}
    </div>
  );
}

export default App;
