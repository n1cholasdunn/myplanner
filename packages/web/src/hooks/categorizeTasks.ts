import dayjs, { Dayjs } from "dayjs";
import { Task } from "../types/tasks";

type CategorizedTasks = {
  firstDayTasks: Task[];
  secondDayTasks: Task[];
  thirdDayTasks: Task[];
};

type UseCategorizeTasksReturn = {
  categorizeTasksByDay: (
    tasks: Task[] | undefined,
    selectedDate: Dayjs,
  ) => CategorizedTasks;
};

export const useCategorizeTasks = (): UseCategorizeTasksReturn => {
  const categorizeTasksByDay = (
    tasks: Task[] | undefined,
    selectedDate: Dayjs,
  ) => {
    const firstDayTasks: Task[] = [];
    const secondDayTasks: Task[] = [];
    const thirdDayTasks: Task[] = [];

    tasks?.forEach((task) => {
      const taskDate = dayjs(task.dueDate);
      const startDate = selectedDate.startOf("day");

      if (taskDate.isSame(startDate, "day")) {
        firstDayTasks.push(task);
      } else if (taskDate.isSame(startDate.add(1, "day"), "day")) {
        secondDayTasks.push(task);
      } else if (taskDate.isSame(startDate.add(2, "day"), "day")) {
        thirdDayTasks.push(task);
      }
    });

    return { firstDayTasks, secondDayTasks, thirdDayTasks };
  };
  return { categorizeTasksByDay };
};
