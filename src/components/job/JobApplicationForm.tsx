"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { applyJobAction, predictJobMatchAction } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Job } from "@/lib/types";
import type { JobMatchPredictionOutput } from "@/ai/flows/job-match-prediction";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";


const applicationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  resume: z.string().min(50, { message: "Resume text must be at least 50 characters for an effective match." }),
  coverLetter: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const initialApplyState = {
  message: "",
  errors: undefined,
  isSuccess: false,
};

interface JobApplicationFormProps {
  job: Job;
}

export function JobApplicationForm({ job }: JobApplicationFormProps) {
  const [applyState, applyFormAction] = useFormState(applyJobAction, initialApplyState);
  const { toast } = useToast();
  
  const [matchResult, setMatchResult] = useState<JobMatchPredictionOutput | null>(null);
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      resume: "",
      coverLetter: "",
    },
  });

  useEffect(() => {
    if (applyState.message) {
      toast({
        title: applyState.isSuccess ? "Application Submitted!" : "Application Error",
        description: applyState.message,
        variant: applyState.isSuccess ? "default" : "destructive",
      });
      if (applyState.isSuccess) {
        form.reset();
        setMatchResult(null); 
      }
    }
  }, [applyState, toast, form]);

  const handleCheckMatch = async () => {
    const resumeText = form.getValues('resume');
    if (!resumeText || resumeText.length < 50) {
      form.setError("resume", { type: "manual", message: "Resume text must be at least 50 characters for an effective match." });
      return;
    }
    form.clearErrors("resume");

    setIsCheckingMatch(true);
    setMatchResult(null);
    setMatchError(null);
    try {
      const result = await predictJobMatchAction(job.description, resumeText);
      if (result.data) {
        setMatchResult(result.data);
      } else if (result.error) {
        setMatchError(result.error);
        toast({ title: "Match Prediction Error", description: result.error, variant: "destructive" });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setMatchError(errorMessage);
      toast({ title: "Match Prediction Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsCheckingMatch(false);
    }
  };
  
  const onSubmit = (values: ApplicationFormValues) => {
    const formData = new FormData();
    formData.append('jobId', job.id);
    formData.append('jobTitle', job.title);
    formData.append('jobDescription', job.description); // Pass for potential future use in action
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('resume', values.resume);
    if (values.coverLetter) {
      formData.append('coverLetter', values.coverLetter);
    }
    applyFormAction(formData);
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl">Apply for {job.title}</CardTitle>
        <CardDescription>Submit your application below. You can also check how well your resume matches this job.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage>{applyState.errors?.name?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., jane.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage>{applyState.errors?.email?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Resume (paste text)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your full resume text here. Minimum 50 characters."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Pasting your resume text allows for AI-powered match prediction.
                  </FormDescription>
                  <FormMessage>{form.formState.errors.resume?.message || applyState.errors?.resume?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you're a great fit for this role."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{applyState.errors?.coverLetter?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            
            <div className="space-y-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCheckMatch}
                disabled={isCheckingMatch || !form.getValues('resume') || form.getValues('resume').length < 50}
                className="w-full md:w-auto"
              >
                {isCheckingMatch ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Check Match Score
              </Button>

              {isCheckingMatch && <Progress value={50} className="w-full h-2 mt-2 animate-pulse" />}

              {matchResult && !isCheckingMatch && (
                <Card className="mt-4 bg-secondary/50">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <CardTitle>Match Prediction Result</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                     <div className="text-center">
                        <p className="text-sm text-muted-foreground">Match Score</p>
                        <p className="text-4xl font-bold text-primary">{(matchResult.matchScore * 100).toFixed(0)}%</p>
                        <Progress value={matchResult.matchScore * 100} className="w-full h-3 mt-2" />
                     </div>
                    <div>
                        <h4 className="font-semibold mt-3">Key Reasons:</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{matchResult.reasons}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {matchError && !isCheckingMatch && (
                <Card className="mt-4 border-destructive bg-destructive/10">
                  <CardHeader>
                     <div className="flex items-center space-x-2">
                       <AlertCircle className="h-6 w-6 text-destructive" />
                       <CardTitle className="text-destructive">Match Prediction Error</CardTitle>
                     </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-destructive">{matchError}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <Button type="submit" className="w-full text-lg py-6 mt-6" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
              Submit Application
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
