import { z } from "zod";

export const formSchema = z.object({
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  jobDescription: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
  techStack: z.string().min(1, {
    message: "Please select at least one technology.",
  }),
  resume: z.any().optional(),
});
