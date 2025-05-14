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
import { postJobAction } from "@/lib/actions";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jobCategories, employmentTypes } from "@/lib/jobs";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().min(1, { message: "Category is required."}),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
});

type JobPostingFormValues = z.infer<typeof formSchema>;

const initialState = {
  message: "",
  errors: undefined,
  isSuccess: false,
  jobId: undefined,
};

export function JobPostingForm() {
  const [state, formAction] = useFormState(postJobAction, initialState);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      category: "",
      employmentType: "Full-time",
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.isSuccess ? "Success!" : "Error",
        description: state.message,
        variant: state.isSuccess ? "default" : "destructive",
      });
      if (state.isSuccess && state.jobId) {
        router.push(`/jobs/${state.jobId}`);
      }
    }
  }, [state, toast, router]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl">Post a New Job</CardTitle>
        <CardDescription>Fill in the details below to list a new job opening.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} onSubmit={form.handleSubmit(()=>formAction(new FormData(form.control.fieldsRef.current.form)))} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage>{state.errors?.title?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Tech Solutions Inc." {...field} />
                  </FormControl>
                  <FormMessage>{state.errors?.company?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., San Francisco, CA or Remote" {...field} />
                  </FormControl>
                  <FormMessage>{state.errors?.location?.[0]}</FormMessage>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a job category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage>{state.errors?.category?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage>{state.errors?.employmentType?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the job responsibilities, requirements, and benefits."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{state.errors?.description?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" /> }
              Post Job
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
