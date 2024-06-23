export type Category = "CAREER" | "FITNESS" | "RELATIONSHIP" | "DAILY";

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface TaskInput {
  title: string;
  notes: string;
  dueDate: string;
  completed: boolean;
  category: Category;
  priority: Priority;
}

export interface Task extends TaskInput {
  id: number;
}
