import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, MapPin, CalendarDays, Building, Info, FileText, Sparkles, Send } from 'lucide-react';

export default function LoadingJobDetail() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="h-6 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-5 w-5 mr-2 rounded-full" />
                    <Skeleton className="h-5 w-1/2" />
                  </div>
                ))}
              </div>
              
              <div>
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full mt-1" />
                <Skeleton className="h-4 w-full mt-1" />
                <Skeleton className="h-4 w-3/4 mt-1" />
                <Skeleton className="h-4 w-full mt-3" />
                <Skeleton className="h-4 w-full mt-1" />
                <Skeleton className="h-4 w-5/6 mt-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="w-full shadow-xl">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full mt-1" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-32 w-full" /> {/* Resume textarea */}
              <Skeleton className="h-24 w-full" /> {/* Cover letter textarea */}
              
              <div className="space-y-4 pt-4 border-t">
                <Skeleton className="h-10 w-full md:w-1/2" /> {/* Check match button */}
              </div>
              <Skeleton className="h-12 w-full text-lg py-6 mt-6" /> {/* Submit button */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
