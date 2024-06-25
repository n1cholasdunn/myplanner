import TaskBox from "./TaskBox";
import { Task as TaskType } from "../types/tasks";

interface TaskListProps {
  tasks: TaskType[] | undefined;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="flex w-full flex-auto">
      <div className="grid flex-auto grid-cols-1 grid-rows-1">
        <div
          className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
          style={{ gridTemplateRows: "repeat(auto-fill, minmax(3.5rem, 1fr))" }}
        >
          {tasks &&
            tasks.map((task, index) => <TaskBox key={index} {...task} />)}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
