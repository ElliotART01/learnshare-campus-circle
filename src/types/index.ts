
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
}
