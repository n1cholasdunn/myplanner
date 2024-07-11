import TaskBox from "./TaskBox";
import { Task as TaskType } from "../types/tasks";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

interface TaskListProps {
  tasks: TaskType[] | undefined;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="flex w-full flex-auto">
      <div className="grid flex-auto">
        <div className=" grid gap-2 divide-y divide-gray-100">
          {tasks && (
            <DndContext>
              <SortableContext items={tasks}>
                {tasks.map((task, index) => (
                  <TaskBox key={index} {...task} />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
