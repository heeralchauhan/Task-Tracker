import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import _ from "lodash";

const AddTask = ({ addTask, editTask, fetchTask }) => {
  const { id } = useParams();
  const isAddMode = !id;

  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  let history = useHistory();

  let demo = useRef(id);

  useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      fetchTask(id).then((task) => {
        demo.current = id;
        setText(task.text);
        setDay(task.day);
        setReminder(task.reminder);
      });
    }
  }, []);
  if (!isAddMode && Number(demo.current) != id) {
    fetchTask(id).then((task) => {
      demo.current = id;
      setText(task.text);
      setDay(task.day);
      setReminder(task.reminder);
    });
  }

  return (
    <form
      className="add-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (text == "") {
          alert("Please enter some task");
          return;
        }
        if (isAddMode) {
          addTask({ text, day, reminder });
        } else {
          (async () => {
            const updatedTask = { ...{ text, day, reminder } };
            const res = await fetch(`http://localhost:5000/tasks/${id}`, {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(updatedTask),
            });
            const data = await res.json();
            editTask(data);
            history.push("/");
          })();
        }
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
  addTask: PropTypes.func,
};

export default AddTask;
