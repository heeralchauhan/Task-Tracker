import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Task = ({ task, deleteTask, editTask, editClicked, toggleReminder }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => toggleReminder(task.id)}
    >
      <h3>
        {task.text}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => deleteTask(task.id)}
        />
      </h3>
      <h3 style={{ float: "right", marginTop: "2px" }}>
        {" "}
        <Link to={{ pathname: `/edit/${task.id}` }}>
          <FaEdit
            style={{ cursor: "pointer", color: "gray" }}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              editClicked(task);
            }}
          />
        </Link>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

Task.propTypes = {};

export default Task;
