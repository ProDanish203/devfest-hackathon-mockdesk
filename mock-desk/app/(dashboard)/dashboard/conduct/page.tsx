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
import { TextEditor } from "@/components/forms";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { formSchema } from "@/validations/interview.validations";
import { useInterviewSession } from "@/store/useInterviewSession";
import { useEffect, useState } from "react";

export default function ConductInterviewPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isClientReady, setIsClientReady] = useState(false);

  // Use the hook safely
  const store = useInterviewSession();
  const setValues = store?.setValues;

  console.log(store);
  useEffect(() => {
    setIsClientReady(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
      jobDescription: "",
      techStack: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || !setValues) return;
    setValues({
      information: {
        clerkId: user.id,
        jobDescription: values.jobDescription,
        position: values.position,
        resume: values.resume,
        techStack: values.techStack,
      },
      questions: [],
      answers: [],
    });
    router.push("/dashboard/interview");
  }

  if (!isClientReady) {
    return null;
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Conduct Interview</h1>
        <p className="text-muted-foreground">
          Fill in the details to create a new interview session
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Senior Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <TextEditor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech Stack</FormLabel>
                <FormControl>
                  <Input
                    placeholder="React, Nodejs, TailwindCss, Vue, Angular"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Select the required technologies for this position
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resume"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Upload the candidate&apos;s resume (PDF only)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Interview Session
          </Button>
        </form>
      </Form>
    </div>
  );
}
