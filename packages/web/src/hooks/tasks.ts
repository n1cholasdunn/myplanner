import { TaskInput } from "../types/tasks";

export const useTasks = () => {
  const createTask = async (task: TaskInput) => {
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers your API requires, e.g., authorization
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

  return {
    createTask,
  };
};
