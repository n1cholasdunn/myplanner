type TaskBoxProps = {
  title: string;
  notes: string;
  category: string;
  priority: string;
  completed: boolean;
};

const TaskBox: React.FC<TaskBoxProps> = ({
  title,
  notes,
  category,
  priority,
  completed,
}) => {
  const getBackgroundColor = () => {
    switch (category) {
      case "CAREER":
        return "bg-blue-50 hover:bg-blue-100";
      case "FITNESS":
        return "bg-pink-50 hover:bg-pink-100";
      case "RELATIONSHIP":
        return "bg-indigo-50 hover:bg-indigo-100";
      case "DAILY":
        return "bg-green-50 hover:bg-green-100";
      default:
        return "bg-gray-50 hover:bg-gray-100";
    }
  };
  const getCategoryColor = () => {
    switch (category) {
      case "CAREER":
        return "blue";
      case "FITNESS":
        return "pink";
      case "RELATIONSHIP":
        return "indigo";
      case "DAILY":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <li
      className={`relative mt-px flex ${getBackgroundColor()}`}
      style={{ gridRow: "auto / span 1" }}
    >
      <div className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5">
        <p className={`text-${getCategoryColor()}-700 order-1 font-semibold`}>
          {title}
        </p>
        <p
          className={`text-${getCategoryColor()}-500 group-hover:text-${getCategoryColor()}-700 order-1`}
        >
          {notes}
        </p>
      </div>
    </li>
  );
};

export default TaskBox;
