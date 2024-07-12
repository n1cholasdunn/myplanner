import TaskBox from "./TaskBox";
import { Task as TaskType } from "../types/tasks";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

interface TaskListProps {
  tasks: TaskType[] | undefined;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="flex  w-full flex-auto flex-col  gap-2">
      {tasks && (
        <DndContext>
          <SortableContext items={tasks}>
            {tasks.map((task, index) => (
              <div className="flex-none">
                <TaskBox key={index} {...task} />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default TaskList;
