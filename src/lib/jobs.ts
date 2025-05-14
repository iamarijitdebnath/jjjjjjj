import type { Job } from '@/lib/types';

// Using a Map for easier addition/retrieval by ID
export const jobsDB = new Map<string, Job>();

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer, Frontend',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    description: 'Join our innovative frontend team to build next-generation web applications using React and TypeScript. We are looking for a passionate developer with a keen eye for UI/UX design and performance.',
    category: 'Engineering',
    postedDate: new Date('2024-05-01T10:00:00Z').toISOString(),
    employmentType: 'Full-time',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Innovate Corp.',
    location: 'New York, NY',
    description: 'Drive product strategy and execution for our flagship SaaS product. Collaborate with engineering, design, and marketing teams to deliver impactful features that delight users.',
    category: 'Product',
    postedDate: new Date('2024-05-05T14:30:00Z').toISOString(),
    employmentType: 'Full-time',
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Creative Designs Co.',
    location: 'Remote',
    description: 'We are seeking a talented UX Designer to create intuitive and engaging user experiences for our diverse range of clients. Portfolio demonstrating strong UX principles required.',
    category: 'Design',
    postedDate: new Date('2024-05-10T09:00:00Z').toISOString(),
    employmentType: 'Contract',
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    company: 'Growth Hackers Ltd.',
    location: 'Austin, TX',
    description: 'Develop and implement marketing campaigns across various channels. Analyze market trends and customer behavior to optimize strategies and achieve growth targets.',
    category: 'Marketing',
    postedDate: new Date('2024-05-12T11:00:00Z').toISOString(),
    employmentType: 'Part-time',
  },
  {
    id: '5',
    title: 'Data Scientist Intern',
    company: 'AI Forward',
    location: 'Boston, MA',
    description: 'Exciting internship opportunity for aspiring data scientists. Work on real-world projects, analyze large datasets, and develop machine learning models under the guidance of experienced mentors.',
    category: 'Data Science',
    postedDate: new Date('2024-05-15T16:00:00Z').toISOString(),
    employmentType: 'Internship',
  },
];

initialJobs.forEach(job => jobsDB.set(job.id, job));

export const getJobs = async (filters?: { query?: string; location?: string; category?: string; employmentType?: string }): Promise<Job[]> => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filteredJobs = Array.from(jobsDB.values());

  if (filters) {
    if (filters.query) {
      const queryLower = filters.query.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(queryLower) ||
        job.company.toLowerCase().includes(queryLower) ||
        job.description.toLowerCase().includes(queryLower)
      );
    }
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(locationLower)
      );
    }
    if (filters.category && filters.category !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.category === filters.category);
    }
    if (filters.employmentType && filters.employmentType !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.employmentType === filters.employmentType);
    }
  }
  
  return filteredJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
};

export const getJobById = async (id: string): Promise<Job | undefined> => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 50));
  return jobsDB.get(id);
};

export const addJob = async (jobData: Omit<Job, 'id' | 'postedDate'>): Promise<Job> => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  const newId = (jobsDB.size + 1).toString();
  const newJob: Job = {
    ...jobData,
    id: newId,
    postedDate: new Date().toISOString(),
  };
  jobsDB.set(newId, newJob);
  return newJob;
};

export const jobCategories = [
  'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Customer Support', 'Data Science', 'Operations', 'HR', 'Finance', 'Other'
];

export const employmentTypes: Job['employmentType'][] = [
  'Full-time', 'Part-time', 'Contract', 'Internship'
];
