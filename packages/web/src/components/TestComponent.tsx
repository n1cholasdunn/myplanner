import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { classNames } from "../utils/classNames";
import { generateDays } from "../utils/calendar";
import dayjs, { Dayjs } from "dayjs";

interface MiniCalendarProps {
  currentMonth: Dayjs;
  selectedDate: Dayjs;
  onDateSelect: (date: Dayjs) => void;
  onMonthChange: (month: Dayjs) => void;
}

const TestComponent: React.FC<MiniCalendarProps> = ({
  currentMonth,
  selectedDate,
  onDateSelect,
  onMonthChange,
}) => {
  const days = generateDays(currentMonth);

  const handlePrevMonth = () => {
    onMonthChange(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    onMonthChange(currentMonth.add(1, "month"));
  };

  const handleDateClick = (date: string) => {
    onDateSelect(dayjs(date));
  };

  return (
    <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
      <div className="flex items-center text-center text-gray-900">
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={handlePrevMonth}
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto text-sm font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </div>
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={handleNextMonth}
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {days.map((day, dayIdx) => (
          <button
            key={day.date}
            type="button"
            onClick={() => handleDateClick(day.date)}
            className={classNames(
              "py-1.5 hover:bg-gray-100 focus:z-10",
              day.isCurrentMonth ? "bg-white" : "bg-gray-50",
              day.isSelected && "text-white",
              !day.isSelected &&
                day.isCurrentMonth &&
                !day.isToday &&
                "text-gray-900",
              !day.isSelected &&
                !day.isCurrentMonth &&
                !day.isToday &&
                "text-gray-400",
              selectedDate.isSame(day.date, "day") &&
                "font-semibold text-red-600",
              dayIdx === 0 && "rounded-tl-lg",
              dayIdx === 6 && "rounded-tr-lg",
              dayIdx === days.length - 7 && "rounded-bl-lg",
              dayIdx === days.length - 1 && "rounded-br-lg",
            )}
          >
            <time
              dateTime={day.date}
              className={classNames(
                "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                selectedDate.isSame(day.date, "day") && "bg-red-600 text-white",
                day.isSelected && day.isToday && "bg-indigo-600",
                day.isSelected && !day.isToday && "bg-gray-900",
              )}
            >
              {day.date.split("-").pop()?.replace(/^0/, "") ?? ""}
            </time>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestComponent;
