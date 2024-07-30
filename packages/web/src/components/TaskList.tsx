import TaskBox from "./TaskBox";
import { Task as TaskType } from "../types/tasks";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useTasks } from "../hooks/useTasks";
interface TaskListProps {
  tasks: TaskType[] | undefined;
  setFilteredTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setFilteredTasks }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { updateTaskOrder } = useTasks();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && tasks) {
      const oldIndex = tasks.findIndex((item) => item.id === active.id);
      const newIndex = tasks.findIndex((item) => item.id === over.id);
      const updatedTasks = arrayMove(tasks, oldIndex, newIndex).map(
        (task, index) => ({
          ...task,
          order: index + 1,
        }),
      );

      setFilteredTasks(updatedTasks);

      updateTaskOrder(updatedTasks);
    }
  };
  return (
    <div className="flex  w-full flex-auto flex-col  gap-2">
      {tasks && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <div key={task.order} className="flex-none">
                <TaskBox {...task} />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default TaskList;
