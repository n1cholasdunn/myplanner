import AddIcon from "shared/assets/008-add.svg?react";
import { useTasks } from "../hooks/useTasks";

const AddTaskButton = () => {
  const { createTask } = useTasks();
  //TODO: make this hoverable
  return (
    <div>
      <AddIcon
        onClick={() =>
          createTask({
            title: "the title",
            notes: "the notes",
            dueDate: new Date("2024-06-18"),
            completed: false,
            category: "DAILY",
            priority: "HIGH",
          })
        }
      />
    </div>
  );
};

export default AddTaskButton;
