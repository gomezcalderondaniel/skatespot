import React from 'react';
import { X, MapPin, Calendar, Trash2 } from 'lucide-react';
import RatingSystem from './RatingSystem';

const SpotProfile = ({ spot, onClose, onDelete }) => {
  if (!spot) return null;

  return (
    <div className="fixed inset-0 bg-skate-black z-[2000] flex flex-col animate-in fade-in slide-in-from-right duration-300">
      <header className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur">
        <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
          <X size={24} />
        </button>
        <span className="font-black text-xl tracking-tighter uppercase italic">Spot Detail</span>
        <button 
          onClick={() => {
            if(window.confirm('Delete this spot?')) onDelete(spot.id);
          }} 
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"
        >
          <Trash2 size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Hero Image */}
        <div className="w-full h-64 bg-gray-900 relative">
          {spot.image ? (
            <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-700 font-black italic text-4xl">
              NO MEDIA
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-skate-black to-transparent">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{spot.name}</h2>
          </div>
        </div>

        <div className="p-6 max-w-md mx-auto space-y-8">
          <div className="flex items-center gap-6 text-gray-400 text-xs font-mono uppercase">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-green-400" />
              {spot.lat.toFixed(4)}, {spot.lng.toFixed(4)}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(spot.createdAt).toLocaleDateString()}
            </div>
          </div>

          {spot.description && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 italic text-gray-300">
              "{spot.description}"
            </div>
          )}

          <div>
            <h3 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-gray-500">Spot Ratings</h3>
            <RatingSystem ratings={spot.ratings} readOnly />
          </div>
          
          <div className="pb-12 h-20" /> {/* Spacer */}
        </div>
      </div>
    </div>
  );
};

export default SpotProfile;
