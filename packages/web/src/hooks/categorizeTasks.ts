import dayjs, { Dayjs } from "dayjs";
import { CategorizedTasks, Task } from "../types/tasks";

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
    let firstDayTasks: Task[] = [];
    let secondDayTasks: Task[] = [];
    let thirdDayTasks: Task[] = [];

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
    firstDayTasks = firstDayTasks.sort((a, b) => a.order - b.order);
    secondDayTasks = secondDayTasks.sort((a, b) => a.order - b.order);
    thirdDayTasks = thirdDayTasks.sort((a, b) => a.order - b.order);

    return { firstDayTasks, secondDayTasks, thirdDayTasks };
  };
  return { categorizeTasksByDay };
};
