import PropTypes from "prop-types";
import { useState } from "react";

const AddTask = ({ addTask }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  return (
    <form
      className="add-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (text == "") {
          alert("Please enter some task");
          return;
        }
        addTask({ text, day, reminder });
        setText("");
        setDay("");
        setReminder(false);
      }}
    >
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          value={day}
          placeholder="Add Day and Time"
          onChange={(e) => setDay(e.target.value)}
        ></input>
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          value={reminder}
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        ></input>
      </div>
      <input type="submit" className="btn btn-block"></input>
    </form>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTask;
