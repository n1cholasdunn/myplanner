import TaskBox from "./TaskBox";
import { Task as TaskType } from "../types/tasks";
import { Dayjs } from "dayjs";
import { useCategorizeTasks } from "../hooks/categorizeTasks";

interface ThreeDayTaskListProps {
  tasks: TaskType[] | undefined;
  selectedDate: Dayjs;
}

const ThreeDayTaskList: React.FC<ThreeDayTaskListProps> = ({
  tasks,
  selectedDate,
}) => {
  //TODO: make this a hook
  /*
  const categorizeTasksByDay = (
    tasks: TaskType[] | undefined,
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

  */
  const { categorizeTasksByDay } = useCategorizeTasks();
  const { firstDayTasks, secondDayTasks, thirdDayTasks } = categorizeTasksByDay(
    tasks,
    selectedDate,
  );

  return (
    <div className="flex w-full flex-auto flex-col">
      <p className="self-center">Date</p>
      <div className="grid flex-auto grid-cols-1 grid-rows-1">
        <div
          className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
          style={{ gridTemplateRows: "repeat(auto-fill, minmax(3.5rem, 1fr))" }}
        >
          {firstDayTasks &&
            firstDayTasks.map((task, index) => (
              <TaskBox key={index} {...task} />
            ))}
        </div>
      </div>
      <p className="self-center">Date</p>
      <div className="grid flex-auto grid-cols-1 grid-rows-1">
        <div
          className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
          style={{ gridTemplateRows: "repeat(auto-fill, minmax(3.5rem, 1fr))" }}
        >
          {secondDayTasks &&
            secondDayTasks.map((task, index) => (
              <TaskBox key={index} {...task} />
            ))}
        </div>
      </div>
      <p className="self-center">Date</p>
      <div className="grid flex-auto grid-cols-1 grid-rows-1">
        <div
          className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
          style={{ gridTemplateRows: "repeat(auto-fill, minmax(3.5rem, 1fr))" }}
        >
          {thirdDayTasks &&
            thirdDayTasks.map((task, index) => (
              <TaskBox key={index} {...task} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeDayTaskList;
