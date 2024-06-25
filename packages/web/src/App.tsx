/// <reference types="vite-plugin-svgr/client" />
import Button from "./components/Button";
import DayView from "./pages/DayView";
import WeekView from "./components/WeekView";
import { Category, Priority } from "./types/tasks";
import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import { TaskInput } from "./schema";
import AppRouter from "./Router";

function App() {
  const { tasks, addTask, updateTask, removeTask } = useTasks();
  const task = {
    title: "the title",
    notes: "the notes",
    dueDate: "2024-06-18",
    completed: false,
    category: "DAILY" as Category,
    priority: "HIGH" as Priority,
  };
  const handleTaskSubmit = (data: TaskInput) => {
    addTask(data);
    console.log("New Task:", data);
  };

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
/*      <h1 className=" text-red-600">Planner for my adhd</h1>
      <DayView />
      <Button text="Add a task" onClick={() => addTask(task)} />
      <Button text="Delete a task" onClick={() => removeTask(1)} />
      <Button
        text="get a task"
        onClick={() => console.log(tasks?.find((task) => task.id === 1))}
      />
      <Button text="get all tasks" onClick={() => console.log(tasks)} />
      <Button
        text="Complete a task"
        onClick={() =>
          updateTask({ id: 3, data: { ...task, completed: true } })
        }
      />

      <TaskForm onSubmit={handleTaskSubmit} />
      <WeekView />
 */
