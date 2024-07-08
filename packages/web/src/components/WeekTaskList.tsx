import React from "react";
import TaskBox from "./TaskBox";
import { Task as TaskType } from "../types/tasks";
import dayjs, { Dayjs } from "dayjs";
import { Task } from "../types/tasks";

type WeekTaskListProps = {
  tasks: TaskType[] | undefined;
  selectedDate: Dayjs;
};

const WeekTaskList: React.FC<WeekTaskListProps> = ({ tasks, selectedDate }) => {
  const categorizeTasksByDay = (
    tasks: TaskType[] | undefined,
    selectedDate: Dayjs,
  ) => {
    const weekTasks: Task[][] = Array.from({ length: 7 }, () => []);

    tasks?.forEach((task) => {
      const taskDate = dayjs(task.dueDate);
      for (let i = 0; i < 7; i++) {
        if (
          taskDate.isSame(selectedDate.startOf("week").add(i, "day"), "day")
        ) {
          weekTasks[i].push(task);
        }
      }
    });

    return weekTasks;
  };

  const weekTasks = categorizeTasksByDay(tasks, selectedDate);

  return (
    <div className="flex w-full flex-auto flex-col">
      {weekTasks.map((dayTasks, index) => (
        <div key={index}>
          <p className="self-center">
            {selectedDate
              .startOf("week")
              .add(index, "day")
              .format("dddd, MMMM D, YYYY")}
          </p>
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            <div
              className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
              style={{
                gridTemplateRows: "repeat(auto-fill, minmax(3.5rem, 1fr))",
              }}
            >
              {dayTasks.map((task, taskIndex) => (
                <TaskBox key={taskIndex} {...task} />
              ))}
            </div>
          </div>
        </div>
      ))}{" "}
    </div>
  );
};

export default WeekTaskList;
