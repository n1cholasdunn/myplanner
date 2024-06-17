import Button from "./components/Button";
import DayView from "./components/DayView";
import WeekView from "./components/WeekView";
import { Category, Priority } from "./types/tasks";
import { useTasks } from "./hooks/tasks";

function App() {
  const { createTask } = useTasks();
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
      <WeekView />
    </>
  );
}

export default App;
