import PropTypes from "prop-types";
import Task from "./Task";

const Tasks = ({ tasks, deleteTask, toggleReminder }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleReminder={toggleReminder}
        />
      ))}
    </>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default Tasks;
