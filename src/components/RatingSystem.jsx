import React from 'react';

const CATEGORIES = [
  { id: 'smoothness', label: 'Surface Smoothness' },
  { id: 'bustRisk', label: 'Bust Risk (Security)' },
  { id: 'variety', label: 'Obstacle Variety' },
  { id: 'lighting', label: 'Lighting (Night)' },
  { id: 'crowd', label: 'Crowd Level' }
];

const RatingSystem = ({ ratings, onChange, readOnly = false }) => {
  return (
    <div className="space-y-6">
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className="flex flex-col">
          <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest text-gray-400">
            <span>{cat.label}</span>
            <span className={`text-sm ${ratings[cat.id] < 0 ? 'text-red-500' : 'text-green-400'}`}>
              {ratings[cat.id] > 0 ? `+${ratings[cat.id]}` : ratings[cat.id]}
            </span>
          </div>
          
          {readOnly ? (
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative">
              <div 
                className="absolute h-full bg-white" 
                style={{ 
                  left: '50%', 
                  width: `${Math.abs(ratings[cat.id] * 5)}%`,
                  transform: ratings[cat.id] < 0 ? 'translateX(-100%)' : 'none',
                  backgroundColor: ratings[cat.id] < 0 ? '#ef4444' : '#4ade80'
                }}
              />
              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-black z-10" />
            </div>
          ) : (
            <>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={ratings[cat.id] || 0}
                onChange={(e) => onChange(cat.id, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[9px] text-gray-500 mt-2 font-mono uppercase tracking-tighter">
                <span>Gnarly (-10)</span>
                <span>Neutral (0)</span>
                <span>Perfect (10)</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RatingSystem;
