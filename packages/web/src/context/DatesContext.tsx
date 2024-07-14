import React, { createContext, useContext, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

type UseDatesReturn = {
  selectedDate: Dayjs;
  currentMonth: Dayjs;
  handleDateSelect: (date: Dayjs) => void;
  goToToday: () => void;
  setCurrentMonth: (date: Dayjs) => void;
};

const DatesContext = createContext<UseDatesReturn | undefined>(undefined);

const useDatesProvider = (): UseDatesReturn => {
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

export const DatesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dates = useDatesProvider();
  return (
    <DatesContext.Provider value={dates}>{children}</DatesContext.Provider>
  );
};

export const useDatesContext = (): UseDatesReturn => {
  const context = useContext(DatesContext);
  if (!context) {
    throw new Error("useDatesContext must be used within a DatesProvider");
  }
  return context;
};
