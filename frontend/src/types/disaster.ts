export interface Disaster {
    id: string;
    name: string;
    type: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    location: {
      lat: number;
      lng: number;
    };
    affected: number;
    status: 'Active' | 'Recovery' | 'Resolved';
    aidNeeded: string[];
  }
  
  export interface AidStream {
    id: string;
    disasterId: string;
    name: string;
    organization: string;
    tokenAmount: string;
    rate: string;
    duration: string;
    status: 'Active' | 'Paused' | 'Completed';
    delivered: string; // percentage as string, e.g., "40%"
  }