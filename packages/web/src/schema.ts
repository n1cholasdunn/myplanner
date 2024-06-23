import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  notes: z.string().optional(),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  completed: z.boolean(),
  category: z.enum(["CAREER", "FITNESS", "RELATIONSHIP", "DAILY"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type TaskInput = z.infer<typeof taskSchema>;
