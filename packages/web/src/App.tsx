import DayView from "./components/DayView";
import WeekView from "./components/WeekView";

function App() {
  return (
    <>
      <h1 className=" text-red-600">Planner for my adhd</h1>
      <DayView />
      <WeekView />
    </>
  );
}

export default App;
