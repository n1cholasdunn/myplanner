import Button from "./components/Button";
import DayView from "./components/DayView";
import WeekView from "./components/WeekView";
import { Category, Priority } from "./types/tasks";
import { useTasks } from "./hooks/tasks";

function App() {
  const { createTask, getTask, getTasks, updateTask, deleteTask } = useTasks();
  const task = {
    title: "the title",
    notes: "the notes",
    dueDate: new Date("2024-06-18"),
    completed: false,
    category: "DAILY" as Category,
    priority: "HIGH" as Priority,
  };
  return (
    <>
      <h1 className=" text-red-600">Planner for my adhd</h1>
      <DayView />
      <Button text="Add a task" onClick={() => createTask(task)} />
      <Button text="Delete a task" onClick={() => deleteTask(1)} />
      <Button text="get a task" onClick={() => getTask(2)} />
      <Button text="get all tasks" onClick={() => getTasks()} />
      <Button
        text="Complete a task"
        onClick={() => updateTask(3, { ...task, completed: true })}
      />
      <WeekView />
    </>
  );
}

export default App;
