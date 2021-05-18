import PropTypes from "prop-types";
import Task from "./Task";

const Tasks = ({
  tasks,
  deleteTask,
  editTask,
  editClicked,
  toggleReminder,
}) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
          editClicked={editClicked}
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
