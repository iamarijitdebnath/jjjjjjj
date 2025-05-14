"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, MapPin, Briefcase, FilterX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobCategories, employmentTypes } from "@/lib/jobs";

const searchFormSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  employmentType: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export function JobSearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: searchParams.get("query") || "",
      location: searchParams.get("location") || "",
      category: searchParams.get("category") || "all",
      employmentType: searchParams.get("employmentType") || "all",
    },
  });

  function onSubmit(values: SearchFormValues) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (values.query) {
      current.set("query", values.query);
    } else {
      current.delete("query");
    }
    if (values.location) {
      current.set("location", values.location);
    } else {
      current.delete("location");
    }
    if (values.category && values.category !== "all") {
      current.set("category", values.category);
    } else {
      current.delete("category");
    }
     if (values.employmentType && values.employmentType !== "all") {
      current.set("employmentType", values.employmentType);
    } else {
      current.delete("employmentType");
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    
    // If current page is not /jobs, navigate to /jobs with query params
    // Otherwise, just update query params on the current /jobs page
    if (pathname !== "/jobs") {
      router.push(`/jobs${query}`);
    } else {
      router.push(`${pathname}${query}`);
    }

  }

  const clearFilters = () => {
    form.reset({ query: "", location: "", category: "all", employmentType: "all" });
    router.push(pathname); // Navigate to the page without query params
  }

  const hasActiveFilters = 
    searchParams.get("query") || 
    searchParams.get("location") || 
    (searchParams.get("category") && searchParams.get("category") !== "all") ||
    (searchParams.get("employmentType") && searchParams.get("employmentType") !== "all");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 md:p-6 bg-card rounded-xl shadow-lg border space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-grow">
              {pathname === "/jobs" && <FormLabel>Keywords</FormLabel>}
              <FormControl>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Job title, company, or skill" {...field} className="pl-10" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex-grow">
              {pathname === "/jobs" && <FormLabel>Location</FormLabel>}
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="City, state, or remote" {...field} className="pl-10" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {pathname === "/jobs" && (
          <>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="md:min-w-[180px]">
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {jobCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem className="md:min-w-[180px]">
                  <FormLabel>Employment Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {employmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
        {pathname === "/jobs" && hasActiveFilters && (
           <Button type="button" variant="outline" onClick={clearFilters} className="w-full md:w-auto">
            <FilterX className="mr-2 h-4 w-4" /> Clear
          </Button>
        )}
      </form>
    </Form>
  );
}
