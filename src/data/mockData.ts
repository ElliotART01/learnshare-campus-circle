
import { Request, Offer, Student } from '../types';

export const mockStudents: Student[] = [
  {
    email: 'john.doe@university.edu',
    name: 'John Doe',
    phone: '555-123-4567'
  },
  {
    email: 'jane.smith@university.edu',
    name: 'Jane Smith',
    phone: '555-987-6543'
  },
  {
    email: 'alex.johnson@university.edu',
    name: 'Alex Johnson'
  }
];

export const mockRequests: Request[] = [
  {
    id: 'req1',
    studentEmail: 'john.doe@university.edu',
    studentName: 'John Doe',
    title: 'Calculus II Textbook (Stewart, 8th Edition)',
    description: 'I need this book for my upcoming Calculus II class. Would really appreciate if someone has a copy they no longer need!',
    status: 'Open',
    timestamp: '2024-04-15T09:30:00Z'
  },
  {
    id: 'req2',
    studentEmail: 'jane.smith@university.edu',
    studentName: 'Jane Smith',
    title: 'Chemistry Lab Manual for CHEM 101',
    description: 'Looking for the lab manual for Professor Wilson\'s CHEM 101 class. Mine got damaged.',
    status: 'Open',
    timestamp: '2024-04-16T14:45:00Z'
  },
  {
    id: 'req3',
    studentEmail: 'alex.johnson@university.edu',
    studentName: 'Alex Johnson',
    title: 'Psychology 202 Course Reader',
    description: 'Need the course reader for Dr. Martinez\'s Psychology 202 class. Would be great if someone from last semester has one!',
    status: 'Fulfilled',
    timestamp: '2024-04-14T11:20:00Z'
  },
  {
    id: 'req4',
    studentEmail: 'john.doe@university.edu',
    studentName: 'John Doe',
    title: 'TI-84 Plus Calculator',
    description: 'Need a calculator for the semester. Will return it in excellent condition at the end of the term.',
    status: 'Open',
    timestamp: '2024-04-17T10:00:00Z'
  }
];

export const mockOffers: Offer[] = [
  {
    id: 'off1',
    studentEmail: 'alex.johnson@university.edu',
    studentName: 'Alex Johnson',
    title: 'Introduction to Python Programming',
    description: 'Slightly used Python textbook. Great condition, no highlights or notes.',
    condition: 'Like New',
    status: 'Available',
    timestamp: '2024-04-15T08:15:00Z'
  },
  {
    id: 'off2',
    studentEmail: 'jane.smith@university.edu',
    studentName: 'Jane Smith',
    title: 'Biology 101 Lab Coat',
    description: 'Used for one semester only. Washed and ready to use.',
    condition: 'Good',
    status: 'Available',
    timestamp: '2024-04-16T16:30:00Z'
  },
  {
    id: 'off3',
    studentEmail: 'john.doe@university.edu',
    studentName: 'John Doe',
    title: 'Organic Chemistry Molecular Model Kit',
    description: 'Complete kit, missing a few hydrogen atoms but otherwise great.',
    condition: 'Used',
    status: 'Claimed',
    timestamp: '2024-04-14T13:45:00Z'
  },
  {
    id: 'off4',
    studentEmail: 'alex.johnson@university.edu',
    studentName: 'Alex Johnson',
    title: 'Economics 201 Textbook',
    description: 'Used but in good condition. Some highlighting on key concepts.',
    condition: 'Good',
    status: 'Available',
    timestamp: '2024-04-17T09:20:00Z'
  }
];
