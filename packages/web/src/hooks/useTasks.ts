import { Task } from "../types/tasks";
import { TaskInput } from "../schema";
type UseTasksReturn = {
  createTask: (task: TaskInput) => Promise<Task>;
  getTasks: () => Promise<Task[]>;
  getTask: (id: number) => Promise<Task>;
  updateTask: (id: number, task: TaskInput) => Promise<Task>;
  completeTask: (id: number, task: TaskInput) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
};

export const useTasks = (): UseTasksReturn => {
  const createTask = async (task: TaskInput): Promise<Task> => {
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Task created:", data);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };

  const getTasks = async (): Promise<Task[]> => {
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Tasks retrieved:", data);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };

  const getTask = async (id: number): Promise<Task> => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Task retrieved:", data);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };

  const updateTask = async (id: number, task: TaskInput): Promise<Task> => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Task updated:", data);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };
  const completeTask = async (id: number, task: TaskInput): Promise<Task> => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Task completed:", data);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Task deleted");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };
  return {
    createTask,
    getTasks,
    getTask,
    updateTask,
    completeTask,
    deleteTask,
  };
};
