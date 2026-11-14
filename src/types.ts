export interface EventItem {
  id: string;
  title: string;
  date: string;
  category: 'Academic' | 'Robotics & AI' | 'Sports' | 'Cultural' | 'Exhibition' | 'Celebration' | 'Annual Day' | 'Competition';
  description: string; // The matter / event writeup / details
  image: string; // Cover photo
  galleryImages?: string[]; // Multiple photos uploaded by staff
  location: string;
  staffInCharge?: string; // Staff member who organized / uploaded the event
  highlights?: string[]; // Key highlights or prize winners
  publishedAt?: string;
  isPublished?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Announcement' | 'Achievement' | 'Notice' | 'Exam';
  summary: string;
  urgent?: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experience: string;
  subject: string;
  photo: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Parent' | 'Student' | 'Teacher' | 'Alumni';
  subtext: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  url: string;
  thumb?: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Fees' | 'Transport' | 'Labs' | 'Sports' | 'Curriculum';
}

export interface BusRoute {
  routeNo: string;
  name: string;
  driver: string;
  contact: string;
  stops: string[];
  currentLocation: string;
  etaMinutes: number;
  status: 'On Time' | 'Approaching' | 'Delayed';
}
