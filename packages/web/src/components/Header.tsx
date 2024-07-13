import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import ViewMenu from "../components/ViewMenu";
import Avatar from "../components/Avatar";
import { Category, Priority } from "../types/tasks";
import { useDates } from "../hooks/useDates";
import { useTasks } from "../hooks/useTasks";

const Header = () => {
  const { selectedDate, goToToday, handleDateSelect } = useDates();

  const { addTask } = useTasks();

  const task = {
    title: "the title",
    notes: "the notes",
    dueDate: "2024-07-10",
    completed: false,
    category: "DAILY" as Category,
    priority: "HIGH" as Priority,
  };

  return (
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
  );
};

export default Header;
