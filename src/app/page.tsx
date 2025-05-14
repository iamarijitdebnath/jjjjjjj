import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Briefcase, ArrowRight, Users, Building } from 'lucide-react';
import Image from 'next/image';
import { JobSearchForm } from '@/components/job/JobSearchForm';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center space-y-12">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl shadow-lg">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Find Your Dream Job with JobLink
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                  Discover thousands of job opportunities. Search, apply, and get hired.
                  Or post your job openings and find the perfect candidates.
                </p>
              </div>
              <div className="w-full max-w-2xl mx-auto">
                 <JobSearchForm />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                 <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                    <Link href="/jobs">
                      <Briefcase className="mr-2 h-5 w-5" /> Browse All Jobs
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                    <Link href="/post-job">
                      <Building className="mr-2 h-5 w-5" /> Post a Job
                    </Link>
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-5xl space-y-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why JobLink?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <Search className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
            <p className="text-muted-foreground">
              Easily find relevant jobs with our powerful search and filtering options.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <Users className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">For Job Seekers & Employers</h3>
            <p className="text-muted-foreground">
              Whether you're looking for a job or hiring, JobLink connects talent with opportunity.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <Briefcase className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
            <p className="text-muted-foreground">
              Get insights on how well your resume matches job descriptions with our AI tool.
            </p>
          </div>
        </div>
      </section>

       <section className="w-full max-w-5xl space-y-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Companies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 bg-card rounded-lg shadow-md flex justify-center items-center h-32" data-ai-hint="company logo">
               <Image src={`https://picsum.photos/seed/${i+10}/150/60`} alt={`Company Logo ${i+1}`} width={150} height={60} className="object-contain" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
