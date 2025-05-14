// src/components/disaster/DisasterMap.tsx
'use client';

import { useState, useEffect } from 'react';
import { Disaster } from '@/types/disaster';
import { MOCK_DISASTERS, MOCK_AID_STREAMS } from './mockData';

interface DisasterMapProps {
  onSelectDisaster?: (disasterId: string) => void;
  selectedDisasterId?: string;
}

export const DisasterMap: React.FC<DisasterMapProps> = ({ 
  onSelectDisaster, 
  selectedDisasterId 
}) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    // In a real implementation, you would load a map library like Google Maps or Mapbox
    // For the MVP, we'll just simulate a map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden bg-gray-800">
      {!mapLoaded ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="w-full h-full relative">
          {/* This would be replaced with an actual map component in a real implementation */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-50"></div>
          
          {/* Disaster markers */}
          {MOCK_DISASTERS.map(disaster => (
            <button
              key={disaster.id}
              className={`absolute w-6 h-6 rounded-full ${
                selectedDisasterId === disaster.id 
                  ? 'bg-red-500 animate-pulse' 
                  : disaster.severity === 'Critical' 
                    ? 'bg-red-500' 
                    : disaster.severity === 'High' 
                      ? 'bg-orange-500' 
                      : 'bg-yellow-500'
              } transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform`}
              style={{
                left: `${((disaster.location.lng + 180) / 360) * 100}%`,
                top: `${((90 - disaster.location.lat) / 180) * 100}%`,
              }}
              onClick={() => onSelectDisaster && onSelectDisaster(disaster.id)}
              title={disaster.name}
            >
              <span className="sr-only">{disaster.name}</span>
            </button>
          ))}
          
          {/* Map overlay with disaster information */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
            <h3 className="text-lg font-semibold">Active Disasters: {MOCK_DISASTERS.filter(d => d.status === 'Active').length}</h3>
            <p className="text-sm">
              Total Aid Streaming: {MOCK_AID_STREAMS.reduce((sum, stream) => sum + parseFloat(stream.tokenAmount.split(' ')[0]), 0)} ETH
            </p>
          </div>
          
          {/* Map attribution */}
          <div className="absolute top-2 right-2 text-xs text-white/70">
            GuardianLink Disaster Mapping | MVP Demo
          </div>
        </div>
      )}
    </div>
  );
};

export default DisasterMap;