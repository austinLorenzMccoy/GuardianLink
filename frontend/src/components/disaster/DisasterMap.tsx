import { Disaster, AidStream } from '@/types/disaster';

// Mock data for disasters
export const MOCK_DISASTERS: Disaster[] = [
  {
    id: 'disaster-1',
    name: 'Flooding in Lagos',
    type: 'Flood',
    severity: 'High',
    location: { lat: 6.5244, lng: 3.3792 },
    affected: 15000,
    status: 'Active',
    aidNeeded: ['Food', 'Water', 'Medical Supplies'],
  },
  {
    id: 'disaster-2',
    name: 'Drought in Northern Kenya',
    type: 'Drought',
    severity: 'Critical',
    location: { lat: 3.1157, lng: 37.6066 },
    affected: 25000,
    status: 'Active',
    aidNeeded: ['Water', 'Food', 'Agricultural Support'],
  },
  {
    id: 'disaster-3',
    name: 'Earthquake in Central Ethiopia',
    type: 'Earthquake',
    severity: 'Medium',
    location: { lat: 9.145, lng: 40.4897 },
    affected: 8000,
    status: 'Recovery',
    aidNeeded: ['Shelter', 'Medical Supplies'],
  },
];

// Mock data for aid streams
export const MOCK_AID_STREAMS: AidStream[] = [
  {
    id: 'stream-1',
    disasterId: 'disaster-1',
    name: 'Emergency Food Distribution',
    organization: 'Global Relief',
    tokenAmount: '2.5 ETH',
    rate: '0.1 ETH/day',
    duration: '25 days',
    status: 'Active',
    delivered: '40%',
  },
  {
    id: 'stream-2',
    disasterId: 'disaster-1',
    name: 'Medical Supplies',
    organization: 'Doctors Without Borders',
    tokenAmount: '5 ETH',
    rate: '0.2 ETH/day',
    duration: '25 days',
    status: 'Active',
    delivered: '15%',
  },
  {
    id: 'stream-3',
    disasterId: 'disaster-2',
    name: 'Water Distribution',
    organization: 'Water Aid',
    tokenAmount: '3 ETH',
    rate: '0.15 ETH/day',
    duration: '20 days',
    status: 'Active',
    delivered: '25%',
  },
];