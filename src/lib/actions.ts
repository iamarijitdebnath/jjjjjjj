'use server';

import { z } from 'zod';
import { jobsDB, addJob as dbAddJob } from '@/lib/jobs';
import type { NewJobData, JobApplicationData, Job } from '@/lib/types';
import { jobMatchPrediction } from '@/ai/flows/job-match-prediction'; // Ensure this path is correct
import { revalidatePath } from 'next/cache';

const NewJobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
});

export async function postJobAction(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = NewJobSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        message: 'Validation failed. Please check your input.',
        errors: validatedFields.error.flatten().fieldErrors,
        isSuccess: false,
      };
    }
    
    const jobData: Omit<Job, 'id' | 'postedDate'> = {
      title: validatedFields.data.title,
      company: validatedFields.data.company,
      location: validatedFields.data.location,
      description: validatedFields.data.description,
      category: validatedFields.data.category,
      employmentType: validatedFields.data.employmentType,
    };

    const newJob = await dbAddJob(jobData);
    revalidatePath('/jobs'); // Revalidate job listing page
    revalidatePath(`/jobs/${newJob.id}`); // Revalidate the new job's page if it exists

    return { message: `Job "${newJob.title}" posted successfully!`, isSuccess: true, jobId: newJob.id };
  } catch (error) {
    console.error('Error posting job:', error);
    return { message: 'An unexpected error occurred. Please try again.', isSuccess: false };
  }
}


const JobApplicationSchema = z.object({
  jobId: z.string(),
  jobTitle: z.string(), // For confirmation message
  jobDescription: z.string(), // Needed for AI match
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  resume: z.string().min(50, 'Resume text must be at least 50 characters'),
  coverLetter: z.string().optional(),
});

export async function applyJobAction(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = JobApplicationSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        message: 'Validation failed. Please check your input.',
        errors: validatedFields.error.flatten().fieldErrors,
        isSuccess: false,
        matchResult: null,
      };
    }

    const { jobId, jobTitle, jobDescription, name, email, resume, coverLetter } = validatedFields.data;

    // This is a pass-through service, so we don't store the application.
    // We can simulate sending it or log it.
    console.log('Job Application Received:');
    console.log({ jobId, name, email, resumeLength: resume.length, coverLetterLength: coverLetter?.length });

    // Optionally, run AI match prediction as part of the application process if desired,
    // though the UI allows checking it separately.
    // For this action, let's assume the primary goal is submission confirmation.
    // If AI check is mandatory before submission, it could be integrated here.

    return { 
      message: `Successfully applied for "${jobTitle}"! You will hear back if selected.`,
      isSuccess: true,
      matchResult: null // No AI call in this action, it's UI-driven
    };
  } catch (error) {
    console.error('Error applying for job:', error);
    return { 
      message: 'An unexpected error occurred while applying. Please try again.',
      isSuccess: false,
      matchResult: null,
    };
  }
}

// This action is called from the client-side explicitly for match prediction
export async function predictJobMatchAction(jobDescription: string, resumeText: string) {
  if (!jobDescription || !resumeText) {
    return { error: 'Job description and resume text are required.' };
  }
  try {
    const result = await jobMatchPrediction({ jobDescription, resume: resumeText });
    return { data: result };
  } catch (error) {
    console.error('Error predicting job match:', error);
    return { error: 'Failed to predict job match. Please try again.' };
  }
}
