import { JobPostingForm } from '@/components/job/JobPostingForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post a New Job',
  description: 'Create a new job listing on JobLink.',
};

export default function PostJobPage() {
  return (
    <div className="container mx-auto py-8">
      <JobPostingForm />
    </div>
  );
}
