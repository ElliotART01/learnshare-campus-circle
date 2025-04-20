
export interface Student {
  email: string;
  name: string;
  phone?: string;
}

export interface Request {
  id: string;
  studentEmail: string;
  studentName: string;
  title: string;
  description: string;
  status: 'Open' | 'Fulfilled';
  timestamp: string;
  imageUrl?: string;
  claimedBy?: string;
  claimNotes?: string;
}

export interface Offer {
  id: string;
  studentEmail: string;
  studentName: string;
  title: string;
  description: string;
  condition: 'Like New' | 'Good' | 'Used';
  status: 'Available' | 'Claimed';
  timestamp: string;
  imageUrl?: string;
  claimedBy?: string;
  claimNotes?: string;
}

export interface User {
  email: string;
  name: string;
  phone?: string;
}

// Local Storage Keys
export const STORAGE_KEYS = {
  REQUESTS: 'campus_circle_requests',
  OFFERS: 'campus_circle_offers'
};

// Local Storage Utility Functions
export const storageUtils = {
  // Requests
  saveRequests: (requests: Request[]): void => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  },
  
  getRequests: (): Request[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return data ? JSON.parse(data) : [];
  },
  
  // Offers
  saveOffers: (offers: Offer[]): void => {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  },
  
  getOffers: (): Offer[] => {
    const data = localStorage.getItem(STORAGE_KEYS.OFFERS);
    return data ? JSON.parse(data) : [];
  }
};
