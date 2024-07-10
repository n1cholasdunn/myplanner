import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

type UseDatesReturn = {
  selectedDate: Dayjs;
  currentMonth: Dayjs;
  handleDateSelect: (date: Dayjs) => void;
  goToToday: () => void;
  setCurrentMonth: (date: Dayjs) => void;
};
export const useDates = (): UseDatesReturn => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

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

  return {
    selectedDate,
    currentMonth,
    handleDateSelect,
    goToToday,
    setCurrentMonth,
  };
};
