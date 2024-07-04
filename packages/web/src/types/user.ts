import { Task } from "./tasks";

export type User = {
  name: string;
  id: string;
  email: string;
  picture: string;
  source: string;
  role: string;
  tasks: Task[];
};
