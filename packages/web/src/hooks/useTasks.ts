import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Task } from "../types/tasks";
import { TaskInput } from "../schema";
import { SERVER_URL } from "../constants";
import { useUser } from "./useUser";

const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`api/tasks`, {
    method: "GET",
    //redirect: "follow",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
const fetchTask = async (id: number): Promise<Task> => {
  const response = await fetch(`api/tasks/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const createTask = async (task: TaskInput): Promise<Task> => {
  const response = await fetch(`${SERVER_URL}/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("response create", response.json());
  return data;
};

const updateTask = async (id: number, task: Task): Promise<Task> => {
  const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const useTasks = () => {
  const queryClient = useQueryClient();

  const { user } = useUser();

  const {
    data: tasks,
    error: tasksError,
    isLoading: tasksLoading,
  } = useQuery<Task[], Error>({
    enabled: !!user,
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const addTaskMutation = useMutation<Task, Error, TaskInput>({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskMutation = useMutation<
    Task,
    Error,
    { id: number; data: Task }
  >({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const removeTaskMutation = useMutation<void, Error, number>({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const getTaskQuery = (id: number) =>
    useQuery<Task, Error>({
      queryKey: ["task", id],
      queryFn: () => fetchTask(id),
      enabled: !!id,
    });

  return {
    tasks,
    tasksError,
    tasksLoading,
    getTaskQuery,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    removeTask: removeTaskMutation.mutate,
  };
};
