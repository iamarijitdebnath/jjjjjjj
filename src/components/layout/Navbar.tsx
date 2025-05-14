import Link from 'next/link';
import { Briefcase, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/layout/ModeToggle'; // Will create this next

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex justify-center w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">JobLink</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/jobs" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Browse Jobs
          </Link>
          <Link href="/post-job" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Post a Job
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          {/* Potential User Auth button later */}
          {/* <Button>Login</Button> */}
        </div>
      </div>
    </header>
  );
}
