import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-10rem)] items-center justify-center text-center p-4">
      <SearchX className="h-24 w-24 text-primary mb-6" />
      <h1 className="text-5xl font-bold mb-3">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-lg">
        Oops! The page you're looking for doesn't seem to exist. It might have been moved, deleted, or perhaps you mistyped the URL.
      </p>
      <div className="flex space-x-4">
        <Button asChild size="lg">
          <Link href="/">Go back to Homepage</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    </div>
  );
}
