'use client';

import { AidStream } from '@/types/disaster';

interface AidStreamListProps {
  aidStreams: AidStream[];
  disasterId: string;
}

const AidStreamList: React.FC<AidStreamListProps> = ({ aidStreams }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {aidStreams.length > 0 ? (
        aidStreams.map(stream => (
          <div key={stream.id} className="p-4 border-b">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold">{stream.name}</h4>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                {stream.status}
              </span>
            </div>
            
            <div className="mb-2 text-sm">
              <span className="text-gray-600">Organization:</span> {stream.organization}
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-sm mb-3">
              <div><span className="text-gray-600">Total:</span> {stream.tokenAmount}</div>
              <div><span className="text-gray-600">Rate:</span> {stream.rate}</div>
              <div><span className="text-gray-600">Duration:</span> {stream.duration}</div>
            </div>
            
            <div className="mb-1 flex justify-between text-sm">
              <span>Progress:</span>
              <span>{stream.delivered}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: stream.delivered }}
              ></div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-600">
          No active aid streams for this disaster. Create one to help!
        </div>
      )}
    </div>
  );
};

export default AidStreamList;