/// <reference types="vite-plugin-svgr/client" />
import DeleteIcon from "shared/assets/001-delete.svg?react";
import EditIcon from "shared/assets/004-editing.svg?react";
import CompleteIcon from "shared/assets/006-confirm.svg?react";
import { Day, Events } from "../types/calendar";

type DayBoxProps = {
  day: Day;
  events?: Events;
};

const DayBox = ({ day, events }: DayBoxProps) => {
  return (
    <div className="flex-col space-y-3">
      <div className="flex justify-between">
        <CompleteIcon />
        <p className="text-4xl text-red-600">{day}</p>
        <EditIcon />
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
        <DeleteIcon />
      </div>
    </div>
  );
};

export default DayBox;
