export type Category = "CAREER" | "FITNESS" | "RELATIONSHIP" | "DAILY";

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface Task extends TaskInput {
  id: number;
}

export interface TaskInput {
  title: string;
  notes: string;
  dueDate: Date;
  completed: boolean;
  category: Category;
  priority: Priority;
}
