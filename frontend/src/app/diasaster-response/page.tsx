'use client';

import { useState } from 'react';
import { useMetaMask } from '@/lib/metamask/MetaMaskProvider';
import { DisasterMap } from '@/components/disaster/DisasterMap';
import DisasterList from '@/components/disaster/DisasterList';
import DisasterDetails from '@/components/disaster/DisasterDetails';
import AidStreamList from '@/components/disaster/AidStreamList';
import { Disaster, AidStream } from '@/types/disaster';
import { MOCK_DISASTERS, MOCK_AID_STREAMS } from '@/lib/mock-data/disaster-data';

const DisasterResponsePage = () => {
  const { connected } = useMetaMask();
  const [selectedDisaster, setSelectedDisaster] = useState<Disaster>(MOCK_DISASTERS[0]);
  
  // Filter aid streams for the selected disaster
  const filteredAidStreams = MOCK_AID_STREAMS.filter(
    stream => stream.disasterId === selectedDisaster.id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Disaster Response Dashboard</h1>
      
      {!connected ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          Please connect your MetaMask wallet to access all features.
        </div>
      ) : (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
          Connected to MetaMask. You can now create and manage aid streams.
        </div>
      )}
      
      {/* Disaster Map */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Active Disasters</h2>
        <DisasterMap disasters={MOCK_DISASTERS} />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Disaster List */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Disaster List</h2>
          <DisasterList 
            disasters={MOCK_DISASTERS} 
            selectedDisasterId={selectedDisaster.id}
            onSelectDisaster={setSelectedDisaster}
          />
        </div>
        
        {/* Disaster Details and Aid Streams */}
        <div className="md:col-span-2">
          <DisasterDetails 
            disaster={selectedDisaster}
            connected={connected}
          />
          
          <h3 className="text-lg font-bold mb-2">Active Aid Streams</h3>
          <AidStreamList 
            aidStreams={filteredAidStreams}
            disasterId={selectedDisaster.id}
          />
        </div>
      </div>
    </div>
  );
};

export default DisasterResponsePage;