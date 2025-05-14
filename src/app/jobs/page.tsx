import { JobCard } from '@/components/job/JobCard';
import { JobSearchForm } from '@/components/job/JobSearchForm';
import { getJobs } from '@/lib/jobs';
import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'Browse Jobs',
  description: 'Find your next career opportunity on JobLink. Search and filter thousands of job listings.',
};

interface JobsPageProps {
  searchParams: {
    query?: string;
    location?: string;
    category?: string;
    employmentType?: string;
  };
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const jobs = await getJobs(searchParams);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Find Your Next Job</h1>
        <p className="text-muted-foreground text-lg">
          Explore thousands of openings and find the perfect fit for your skills and aspirations.
        </p>
      </div>
      
      <JobSearchForm />

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <Alert variant="default" className="max-w-md mx-auto">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>No Jobs Found</AlertTitle>
          <AlertDescription>
            No jobs match your current filters. Try broadening your search or check back later!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
