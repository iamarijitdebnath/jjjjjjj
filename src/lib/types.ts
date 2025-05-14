export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  category: string;
  postedDate: string; // ISO string for date
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
}

export interface JobApplicationData {
  jobId: string;
  name: string;
  email: string;
  resume: string; // Resume as text
  coverLetter: string;
}

export interface NewJobData {
  title: string;
  company: string;
  location: string;
  description: string;
  category: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
}
