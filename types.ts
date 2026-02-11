
export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
}

// Added interfaces for detailed department information
export interface FAQ {
  question: string;
  answer: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption: string;
}

export interface DepartmentEvent {
  title: string;
  date: string;
  time: string;
  description: string;
}

export interface DetailedDepartment extends Department {
  longDescription: string;
  subServices: string[];
  headOfDepartment?: string;
  faqs?: FAQ[];
  galleryImages: GalleryImage[];
  events?: DepartmentEvent[];
}

export interface HospitalService {
  id: string;
  title: string;
  description: string;
  available: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Resource {
  id: string;
  title: string;
  category: 'Legislative Acts' | 'Hospital Forms' | 'Finance & Tenders' | 'Patient Guides';
  description: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX';
  fileSize: string;
  downloadUrl: string;
}

export interface FeedbackEntry {
  id: string;
  name: string;
  category: string;
  rating: number;
  comments: string;
  date: string;
  status: 'new' | 'read' | 'resolved';
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'staff';
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}
