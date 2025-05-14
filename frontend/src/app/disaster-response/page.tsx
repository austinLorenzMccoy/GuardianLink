// src/app/disaster-response/page.tsx
'use client';

import { useState } from 'react';
import { useMetaMask } from '@/lib/metamask/MetaMaskProvider';
import DisasterMap from '@/components/disaster/DisasterMap';  // Changed from import { DisasterMap }
import DisasterList from '@/components/disaster/DisasterList';
import DisasterDetails from '@/components/disaster/DisasterDetails';
import AidStreamList from '@/components/disaster/AidStreamList';
import { MOCK_DISASTERS, MOCK_AID_STREAMS } from '@/components/disaster/mockData';
import { Disaster } from '@/types/disaster';

export default function DisasterResponsePage() {
  const { account, isConnecting } = useMetaMask();
  const [selectedDisasterId, setSelectedDisasterId] = useState<string>(MOCK_DISASTERS[0].id);
  
  const selectedDisaster = MOCK_DISASTERS.find(d => d.id === selectedDisasterId) || MOCK_DISASTERS[0];
  const filteredAidStreams = MOCK_AID_STREAMS.filter(stream => stream.disasterId === selectedDisasterId);
  
  const handleSelectDisaster = (disaster: Disaster) => {
    setSelectedDisasterId(disaster.id);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Disaster Response Dashboard
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DisasterMap 
            onSelectDisaster={setSelectedDisasterId} 
            selectedDisasterId={selectedDisasterId}
          />
          
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Aid Streams</h2>
            <AidStreamList 
              aidStreams={filteredAidStreams} 
              disasterId={selectedDisasterId} 
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Active Disasters</h2>
          <DisasterList 
            disasters={MOCK_DISASTERS} 
            selectedDisasterId={selectedDisasterId}
            onSelectDisaster={handleSelectDisaster}
          />
          
          <div className="mt-6">
            <DisasterDetails 
              disaster={selectedDisaster} 
              connected={!!account && !isConnecting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}