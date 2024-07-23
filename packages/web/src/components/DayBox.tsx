/// <reference types="vite-plugin-svgr/client" />
//import DeleteIcon from "shared/assets/001-delete.svg?react";
//import EditIcon from "shared/assets/004-editing.svg?react";
//import CompleteIcon from "shared/assets/006-confirm.svg?react";
import { Day, Events } from "../types/calendar";
//import { useTasks } from "../hooks/useTasks";
//import { Category, Priority } from "../types/tasks";

type DayBoxProps = {
  day: Day;
  events?: Events;
};

const DayBox = ({ day, events }: DayBoxProps) => {
  /*const { createTask, getTaskQuery, updateTask, removeTask } = useTasks();

  const task = {
    id: 2,
    user_id: 1,
    title: "the title",
    notes: "the notes",
    dueDate: new Date("2024-06-18"),
    completed: false,
    category: "DAILY" as Category,
    priority: "HIGH" as Priority,
  };
  */
  //TODO: make svg icons hoverable
  return (
    <div className="flex-col space-y-3">
      <div className="flex justify-between">
        {/*  <CompleteIcon onClick={() => completeTask(1, task)} /> */}
        <p className="text-4xl text-red-600">{day}</p>
        {/*  <EditIcon onClick={() => updateTask({ id: 2, data: { ...task } })} />*/}
      </div>
      {events && events[day] && (
        <div>
          <ul>
            {(events[day] || []).map((event: string, index: number) => (
              <li key={index} className="mt-2">
                - {event}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-end">
        {/*       <DeleteIcon onClick={() => removeTask(1)} /> */}
      </div>
    </div>
  );
};

export default DayBox;
