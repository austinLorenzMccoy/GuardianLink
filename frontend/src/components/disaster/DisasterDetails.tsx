'use client';

import { Disaster } from '@/types/disaster';
import { useState } from 'react';

interface DisasterDetailsProps {
  disaster: Disaster;
  connected: boolean;
}

const DisasterDetails: React.FC<DisasterDetailsProps> = ({ disaster, connected }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Selected Disaster: {disaster.name}</h2>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-gray-600">Type:</span> {disaster.type}
          </div>
          <div>
            <span className="text-gray-600">Severity:</span> {disaster.severity}
          </div>
          <div>
            <span className="text-gray-600">Status:</span> {disaster.status}
          </div>
          <div>
            <span className="text-gray-600">Affected People:</span> {disaster.affected.toLocaleString()}
          </div>
        </div>
        
        <div className="mb-4">
          <span className="text-gray-600">Aid Needed:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {disaster.aidNeeded.map(aid => (
              <span key={aid} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {aid}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          {connected ? (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Aid Stream
            </button>
          ) : (
            <button disabled className="px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed">
              Connect Wallet to Create Aid Stream
            </button>
          )}
        </div>
      </div>
      
      {/* Modal for creating aid stream - would be implemented in a real app */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Create Aid Stream</h3>
            <p className="mb-4">This modal would contain a form to create a new ERC-7715 aid stream.</p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisasterDetails;