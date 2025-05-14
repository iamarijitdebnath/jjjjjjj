import Link from 'next/link';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, CalendarDays, ArrowRight, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const postedDate = new Date(job.postedDate);
  const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl hover:text-primary transition-colors">
            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
          </CardTitle>
          <Badge variant="outline">{job.employmentType}</Badge>
        </div>
        <CardDescription className="text-lg flex items-center pt-1">
          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
          {job.company}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4 mr-2" />
          <span>{job.category}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {job.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground flex items-center">
          <CalendarDays className="h-3 w-3 mr-1.5" />
          Posted {timeAgo}
        </div>
        <Button asChild variant="default" size="sm">
          <Link href={`/jobs/${job.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
