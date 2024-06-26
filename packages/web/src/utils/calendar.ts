import dayjs from "dayjs";

export const generateDays = (currentMonth: dayjs.Dayjs) => {
  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const daysInMonth = endOfMonth.date();
  const startDay = startOfMonth.day(); // day of the week (0-6) of the first day of the month
  const endDay = endOfMonth.day(); // day of the week (0-6) of the last day of the month

  const days = [];

  // Add days from the previous month
  for (let i = startDay - 1; i >= 0; i--) {
    const date = startOfMonth.subtract(i + 1, "day");
    days.push({
      date: date.format("YYYY-MM-DD"),
      isCurrentMonth: false,
      isToday: dayjs().isSame(date, "day"),
      isSelected: false,
    });
  }

  // Add days from the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = startOfMonth.date(i);
    days.push({
      date: date.format("YYYY-MM-DD"),
      isCurrentMonth: true,
      isToday: dayjs().isSame(date, "day"),
      isSelected: false,
    });
  }

  // Add days from the next month
  for (let i = 1; i < 7 - endDay; i++) {
    const date = endOfMonth.add(i, "day");
    days.push({
      date: date.format("YYYY-MM-DD"),
      isCurrentMonth: false,
      isToday: dayjs().isSame(date, "day"),
      isSelected: false,
    });
  }

  return days;
};

export const getWeekDays = (
  currentMonth: dayjs.Dayjs,
  selectedDate: dayjs.Dayjs,
) => {
  const startOfWeek = selectedDate.startOf("week");
  const endOfWeek = selectedDate.endOf("week");
  const days = [];
  let date = startOfWeek;

  while (date.isBefore(endOfWeek, "day") || date.isSame(endOfWeek, "day")) {
    days.push({
      date: date.format("YYYY-MM-DD"),
      isCurrentMonth: date.isSame(currentMonth, "month"),
      isToday: date.isSame(dayjs(), "day"),
      isSelected: false,
    });
    date = date.add(1, "day");
  }

  return days;
};
