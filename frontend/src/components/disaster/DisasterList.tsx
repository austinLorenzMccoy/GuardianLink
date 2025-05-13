'use client';

import { Disaster } from '@/types/disaster';

interface DisasterListProps {
  disasters: Disaster[];
  selectedDisasterId: string;
  onSelectDisaster: (disaster: Disaster) => void;
}

const DisasterList: React.FC<DisasterListProps> = ({ 
  disasters, 
  selectedDisasterId, 
  onSelectDisaster 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {disasters.map(disaster => (
        <div 
          key={disaster.id}
          onClick={() => onSelectDisaster(disaster)}
          className={`p-4 cursor-pointer border-b ${
            selectedDisasterId === disaster.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
          }`}
        >
          <h3 className="font-bold">{disaster.name}</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Type: {disaster.type}</span>
            <span 
              className={`${
                disaster.severity === 'High' || disaster.severity === 'Critical' 
                  ? 'text-red-600' 
                  : 'text-orange-600'
              }`}
            >
              {disaster.severity}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Affected: {disaster.affected.toLocaleString()} people
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisasterList;