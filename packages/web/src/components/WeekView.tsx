import React from "react";
import { Day, Events } from "../types/calendar";
import AddTaskButton from "./AddTaskButton";

// Define the days of the week as a type

const WeekView: React.FC = () => {
  const days: Day[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const events: Events = {
    Monday: ["Meeting at 10 AM", "Lunch with John"],
    Wednesday: ["Yoga Class", "Project Deadline"],
    Friday: ["Date Night"],
  };

  return (
    <div className="flex flex-col">
      <AddTaskButton />
      <div className="grid grid-cols-3 gap-4 p-4 lg:grid-cols-7">
        {days.map((day: Day) => (
          <div key={day} className="bg-gray-200 p-4">
            <h3 className="text-center font-bold">{day}</h3>
            <ul>
              {(events[day] || []).map((event: string, index: number) => (
                <li key={index} className="mt-2">
                  - {event}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
