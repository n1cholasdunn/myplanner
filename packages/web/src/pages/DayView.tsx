import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { useRef } from "react";
import MiniCalendar from "../components/MiniCalendar";
import ViewMenu from "../components/ViewMenu";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import dayjs from "dayjs";
import { getWeekDays } from "../utils/calendar";
import { Category, Priority } from "../types/tasks";
import { classNames } from "../utils/classNames";
import Avatar from "../components/Avatar";
import { useDates } from "../hooks/useDates";

const DayView: React.FC = () => {
  //const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  // const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const {
    selectedDate,
    currentMonth,
    goToToday,
    handleDateSelect,
    setCurrentMonth,
  } = useDates();
  const container = useRef<HTMLDivElement | null>(null);
  const containerNav = useRef<HTMLDivElement | null>(null);

  const { tasks, addTask } = useTasks();

  const filteredTasks = tasks?.filter((task) =>
    dayjs(task.dueDate).isSame(selectedDate, "day"),
  );

  const task = {
    title: "the title",
    notes: "the notes",
    dueDate: "2024-07-10",
    completed: false,
    category: "DAILY" as Category,
    priority: "HIGH" as Priority,
  };

  /*
  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    if (!date.isSame(currentMonth, "month")) {
      setCurrentMonth(date);
    }
  };

  const goToToday = () => {
    const today = dayjs();
    setSelectedDate(today);
    setCurrentMonth(today);
  };
  */
  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
        <div>
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time
              dateTime={selectedDate.format("YYYY-MM-DD")}
              className="sm:hidden"
            >
              {selectedDate.format("MMM D, YYYY")}
            </time>
            <time
              dateTime={selectedDate.format("YYYY-MM-DD")}
              className="hidden sm:inline"
            >
              {selectedDate.format("MMMM D, YYYY")}
            </time>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {selectedDate.format("dddd")}
          </p>
        </div>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              onClick={() => handleDateSelect(selectedDate.subtract(1, "day"))}
            >
              <span className="sr-only">Previous day</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              onClick={goToToday}
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              onClick={() => handleDateSelect(selectedDate.add(1, "day"))}
            >
              <span className="sr-only">Next day</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <ViewMenu />
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => addTask(task)}
            >
              Add Task
            </button>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <Avatar />
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div data-active className="py-1">
                <MenuItem>
                  {/*TODO: add create task onclick*/}
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[active]:bg-gray-100 data-[active]:text-gray-900"
                  >
                    Create Task
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[active]:bg-gray-100 data-[active]:text-gray-900"
                    onClick={goToToday}
                  >
                    Go to today
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>
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
          <TaskList tasks={filteredTasks} />
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
