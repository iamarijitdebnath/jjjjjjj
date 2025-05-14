import { getJobById } from '@/lib/jobs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JobApplicationForm } from '@/components/job/JobApplicationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, CalendarDays, Building, Info, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface JobDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const job = await getJobById(params.id);
  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }
  return {
    title: `${job.title} at ${job.company}`,
    description: `Apply for ${job.title} at ${job.company}. ${job.description.substring(0, 150)}...`,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const job = await getJobById(params.id);

  if (!job) {
    notFound();
  }

  const postedDateFormatted = format(new Date(job.postedDate), 'MMMM d, yyyy');

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <CardTitle className="text-3xl md:text-4xl font-bold">{job.title}</CardTitle>
                <Badge variant="secondary" className="text-md px-3 py-1">{job.employmentType}</Badge>
              </div>
              <CardDescription className="text-xl text-muted-foreground pt-1 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                {job.company}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" />
                  <span>{job.category}</span>
                </div>
                <div className="flex items-center col-span-1 sm:col-span-2">
                  <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                  <span>Posted on: {postedDateFormatted}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Job Description
                </h3>
                <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
                  {job.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <JobApplicationForm job={job} />
        </div>
      </div>
    </div>
  );
}
