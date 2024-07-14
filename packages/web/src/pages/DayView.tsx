import { useEffect, useRef, useState } from "react";
import MiniCalendar from "../components/MiniCalendar";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import dayjs from "dayjs";
import { getWeekDays } from "../utils/calendar";
import { classNames } from "../utils/classNames";
import { useDates } from "../hooks/useDates";
import Header from "../components/Header";
import { Task as TaskType } from "../types/tasks";

const DayView: React.FC = () => {
  const { selectedDate, currentMonth, handleDateSelect, setCurrentMonth } =
    useDates();
  const container = useRef<HTMLDivElement | null>(null);
  const containerNav = useRef<HTMLDivElement | null>(null);

  const { tasks } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (tasks) {
      setFilteredTasks(
        tasks.filter((task) => dayjs(task.dueDate).isSame(selectedDate, "day")),
      );
    }
  }, [tasks, selectedDate]);

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="isolate flex flex-auto overflow-hidden bg-white">
        <div ref={container} className="flex flex-auto flex-col overflow-auto">
          <div
            ref={containerNav}
            className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
          >
            {getWeekDays(currentMonth, selectedDate).map((day, idx) => (
              <button
                key={idx}
                type="button"
                className={classNames(
                  "flex flex-col items-center pb-1.5 pt-3 text-gray-900  hover:bg-gray-100",
                  selectedDate.isSame(day.date, "day") && " font-semibold",
                )}
                onClick={() => handleDateSelect(dayjs(day.date))}
              >
                <span>{dayjs(day.date).format("dd")[0]}</span>
                <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                  <time
                    dateTime={day.date}
                    className={classNames(
                      "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                      selectedDate.isSame(day.date, "day") &&
                        "bg-red-600 text-white",
                      day.isSelected && day.isToday && "bg-indigo-600",
                      day.isSelected && !day.isToday && "bg-gray-900",
                    )}
                  >
                    {day.date.split("-").pop()?.replace(/^0/, "")}
                  </time>
                </span>
              </button>
            ))}
          </div>
          <TaskList tasks={filteredTasks} setFilteredTasks={setFilteredTasks} />
        </div>
        <MiniCalendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onMonthChange={setCurrentMonth}
        />
      </div>
    </div>
  );
};

export default DayView;
