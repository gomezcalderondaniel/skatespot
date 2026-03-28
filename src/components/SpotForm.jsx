import React, { useState, useRef } from 'react';
import { Camera, X, Check } from 'lucide-react';
import RatingSystem from './RatingSystem';

const SpotForm = ({ latLng, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [ratings, setRatings] = useState({
    smoothness: 0, 
    bustRisk: 0, 
    variety: 0, 
    lighting: 0, 
    crowd: 0
  });
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return alert('Please name this spot');
    
    onSave({
      id: Date.now(),
      name,
      description,
      image,
      lat: latLng.lat,
      lng: latLng.lng,
      ratings,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 bg-skate-black z-[2000] flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
      <header className="p-4 border-b border-gray-800 flex justify-between items-center">
        <button onClick={onCancel} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <X size={24} />
        </button>
        <span className="font-black text-xl tracking-tighter uppercase italic">Pin New Spot</span>
        <button 
          onClick={handleSubmit} 
          className="bg-white text-black p-2 rounded-full hover:bg-green-400 transition-colors"
        >
          <Check size={24} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-8">
          {/* Main Info */}
          <div className="space-y-4">
            <input 
              autoFocus
              placeholder="SPOT NAME (e.g. HUBBA HIDEAWAY)"
              className="w-full bg-transparent border-b-2 border-white text-2xl font-black py-2 outline-none uppercase placeholder:text-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea 
              placeholder="Description, notes, or tips..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm outline-none h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Media Upload */}
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-[0.2em] text-gray-500">Spot Media</h3>
            <div 
              onClick={() => fileInputRef.current.click()}
              className="group relative w-full h-48 border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-white transition-all overflow-hidden"
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="text-white" />
                  </div>
                </>
              ) : (
                <>
                  <Camera size={32} className="text-gray-700 group-hover:text-white transition-colors" />
                  <span className="text-xs mt-2 text-gray-600 group-hover:text-gray-300">CLICK TO UPLOAD</span>
                </>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Ratings */}
          <div className="pb-12">
            <h3 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-gray-500">Technical Specs</h3>
            <RatingSystem 
              ratings={ratings} 
              onChange={(id, val) => setRatings({...ratings, [id]: val})} 
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-900/50 backdrop-blur-md border-t border-gray-800">
        <button 
          onClick={handleSubmit}
          className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-lg tracking-widest hover:bg-green-400 transition-colors"
        >
          SAVE SPOT
        </button>
      </div>
    </div>
  );
};

export default SpotForm;
