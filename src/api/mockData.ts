// Mock API Data for Lendi Campus

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent' | 'event';
  date: string;
  read: boolean;
}

export interface SubjectResult {
  name: string;
  code: string;
  grade: string;
  credits: number;
}

export interface SemesterResult {
  id: string;
  semester: string;
  year: string;
  sgpa: number;
  subjects: SubjectResult[];
}

export interface Result {
  id: string;
  subject: string;
  code: string;
  grade: string;
  credits: number;
  semester: string;
  year: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  date: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  image?: string;
}

export interface Faculty {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  avatar?: string;
}

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Semester Exams Schedule Released',
    message:
      'The examination schedule for the upcoming semester has been published. Please check the Exam Cell section.',
    type: 'urgent',
    date: '2024-01-15',
    read: false,
  },
  {
    id: '2',
    title: 'Library Hours Extended',
    message: 'Library will remain open until 10 PM during exam week.',
    type: 'info',
    date: '2024-01-14',
    read: false,
  },
  {
    id: '3',
    title: 'Fee Payment Deadline',
    message:
      'Last date for fee payment is January 31st. Late fee will be applicable after the deadline.',
    type: 'warning',
    date: '2024-01-13',
    read: true,
  },
  {
    id: '4',
    title: 'Placement Drive Announcement',
    message:
      'TCS is conducting a placement drive on January 25th. Eligible students must register.',
    type: 'success',
    date: '2024-01-12',
    read: true,
  },
];

// Mock Results (individual subjects)
export const mockResults: Result[] = [
  {
    id: '1',
    subject: 'Data Structures',
    code: 'CS301',
    grade: 'A',
    credits: 4,
    semester: '3',
    year: '2023-24',
  },
  {
    id: '2',
    subject: 'Database Management',
    code: 'CS302',
    grade: 'A+',
    credits: 4,
    semester: '3',
    year: '2023-24',
  },
  {
    id: '3',
    subject: 'Operating Systems',
    code: 'CS303',
    grade: 'B+',
    credits: 3,
    semester: '3',
    year: '2023-24',
  },
  {
    id: '4',
    subject: 'Computer Networks',
    code: 'CS304',
    grade: 'A',
    credits: 3,
    semester: '3',
    year: '2023-24',
  },
  {
    id: '5',
    subject: 'Software Engineering',
    code: 'CS305',
    grade: 'A',
    credits: 3,
    semester: '3',
    year: '2023-24',
  },
];

// Mock Semester Results (with SGPA)
export const mockSemesterResults: SemesterResult[] = [
  {
    id: '1',
    semester: '5th Semester',
    year: '2023-24',
    sgpa: 8.5,
    subjects: [
      { name: 'Data Structures', code: 'CS301', grade: 'A', credits: 4 },
      { name: 'Database Management', code: 'CS302', grade: 'A+', credits: 4 },
      { name: 'Operating Systems', code: 'CS303', grade: 'B+', credits: 3 },
      { name: 'Computer Networks', code: 'CS304', grade: 'A', credits: 3 },
    ],
  },
];

// Mock Complaints
export const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Wi-Fi connectivity issues in Block B',
    description:
      'The Wi-Fi connection in Block B classrooms has been very slow for the past week.',
    category: 'Infrastructure',
    status: 'in-progress',
    date: '2024-01-10',
  },
  {
    id: '2',
    title: 'Water cooler not working',
    description:
      'The water cooler near the library entrance is not cooling water properly.',
    category: 'Facilities',
    status: 'resolved',
    date: '2024-01-08',
  },
];

// Mock Canteen Menu
export const mockMenu: MenuItem[] = [
  {
    id: '1',
    name: 'Masala Dosa',
    description: 'Crispy dosa with potato filling',
    price: 50,
    category: 'Breakfast',
    available: true,
  },
  {
    id: '2',
    name: 'Idli Sambar',
    description: 'Steamed idli with sambar and chutney',
    price: 40,
    category: 'Breakfast',
    available: true,
  },
  {
    id: '3',
    name: 'Veg Biryani',
    description: 'Aromatic rice with vegetables',
    price: 80,
    category: 'Lunch',
    available: true,
  },
  {
    id: '4',
    name: 'Chicken Biryani',
    description: 'Hyderabadi style chicken biryani',
    price: 120,
    category: 'Lunch',
    available: true,
  },
  {
    id: '5',
    name: 'Paneer Butter Masala',
    description: 'Creamy paneer curry',
    price: 100,
    category: 'Lunch',
    available: false,
  },
  {
    id: '6',
    name: 'Coffee',
    description: 'Hot filter coffee',
    price: 20,
    category: 'Beverages',
    available: true,
  },
  {
    id: '7',
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime drink',
    price: 25,
    category: 'Beverages',
    available: true,
  },
  {
    id: '8',
    name: 'Samosa',
    description: 'Crispy fried snack with potato filling',
    price: 15,
    category: 'Snacks',
    available: true,
  },
];

// Mock Faculty
export const mockFaculty: Faculty[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Dr. Ramesh Kumar',
    department: 'Computer Science',
    email: 'ramesh.k@lendi.edu',
    phone: '+91 9876543210',
    office: 'Block A, Room 201',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Prof. Sunita Sharma',
    department: 'Electronics',
    email: 'sunita.s@lendi.edu',
    phone: '+91 9876543211',
    office: 'Block B, Room 105',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Dr. Anil Prasad',
    department: 'Mechanical',
    email: 'anil.p@lendi.edu',
    phone: '+91 9876543212',
    office: 'Block C, Room 302',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'Prof. Lakshmi Devi',
    department: 'Civil',
    email: 'lakshmi.d@lendi.edu',
    phone: '+91 9876543213',
    office: 'Block D, Room 108',
  },
];

// Campus Guidelines
export const campusGuidelines = [
  {
    id: '1',
    category: 'Dress Code',
    rules: [
      'Formal attire on weekdays',
      'ID cards must be visible',
      'No slippers allowed in labs',
    ],
  },
  {
    id: '2',
    category: 'Library',
    rules: [
      'Maintain silence',
      'No food or drinks',
      'Return books within 14 days',
      'Maximum 3 books at a time',
    ],
  },
  {
    id: '3',
    category: 'Hostel',
    rules: [
      'In-time by 9 PM',
      'No visitors after 6 PM',
      'Keep rooms clean',
      'Report maintenance issues',
    ],
  },
  {
    id: '4',
    category: 'Labs',
    rules: [
      'Follow safety protocols',
      'Handle equipment carefully',
      'Save work regularly',
      'Log out after use',
    ],
  },
];

// Hostel Info
export const hostelInfo = {
  blocks: [
    {
      name: 'Boys Hostel A',
      capacity: 200,
      warden: 'Mr. Suresh Reddy',
      contact: '+91 9876543220',
    },
    {
      name: 'Boys Hostel B',
      capacity: 150,
      warden: 'Mr. Venkat Rao',
      contact: '+91 9876543221',
    },
    {
      name: 'Girls Hostel',
      capacity: 180,
      warden: 'Mrs. Padma Lakshmi',
      contact: '+91 9876543222',
    },
  ],
  facilities: [
    '24/7 Security',
    'Wi-Fi',
    'Mess',
    'Laundry',
    'Common Room',
    'Study Hall',
    'Sports Area',
  ],
  timings: {
    inTime: '9:00 PM',
    outTime: '6:00 AM',
    messBreakfast: '7:30 AM - 9:00 AM',
    messLunch: '12:30 PM - 2:00 PM',
    messDinner: '7:30 PM - 9:00 PM',
  },
};

// Website Handlers
export const websiteHandlers = [
  {
    id: '1',
    name: 'IT Support',
    email: 'itsupport@lendi.edu',
    phone: '+91 9876543230',
    responsibility: 'Technical Issues',
  },
  {
    id: '2',
    name: 'Admin Office',
    email: 'admin@lendi.edu',
    phone: '+91 9876543231',
    responsibility: 'General Queries',
  },
  {
    id: '3',
    name: 'Registrar',
    email: 'registrar@lendi.edu',
    phone: '+91 9876543232',
    responsibility: 'Academic Records',
  },
  {
    id: '4',
    name: 'Accounts',
    email: 'accounts@lendi.edu',
    phone: '+91 9876543233',
    responsibility: 'Fee Related',
  },
];

// Mock Students for Faculty View
export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  semester: string;
  cgpa: number;
  email: string;
  phone: string;
  avatar?: string;
}

export const mockStudents: Student[] = [
  {
    id: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Ravi Kumar',
    rollNumber: 'LENDI2024001',
    department: 'Computer Science',
    semester: '6th',
    cgpa: 9.2,
    email: 'ravi.k@lendi.edu',
    phone: '+91 9876543100',
  },
  {
    id: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Priya Sharma',
    rollNumber: 'LENDI2024002',
    department: 'Computer Science',
    semester: '6th',
    cgpa: 9.5,
    email: 'priya.s@lendi.edu',
    phone: '+91 9876543101',
  },
  {
    id: 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Anil Reddy',
    rollNumber: 'LENDI2024003',
    department: 'Computer Science',
    semester: '6th',
    cgpa: 8.8,
    email: 'anil.r@lendi.edu',
    phone: '+91 9876543102',
  },
  {
    id: 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Sneha Patel',
    rollNumber: 'LENDI2024004',
    department: 'Electronics',
    semester: '6th',
    cgpa: 9.0,
    email: 'sneha.p@lendi.edu',
    phone: '+91 9876543103',
  },
  {
    id: 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Vikram Singh',
    rollNumber: 'LENDI2024005',
    department: 'Mechanical',
    semester: '6th',
    cgpa: 8.5,
    email: 'vikram.s@lendi.edu',
    phone: '+91 9876543104',
  },
  {
    id: 'aaaaaaa6-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Deepa Nair',
    rollNumber: 'LENDI2024006',
    department: 'Computer Science',
    semester: '6th',
    cgpa: 9.3,
    email: 'deepa.n@lendi.edu',
    phone: '+91 9876543105',
  },
];
