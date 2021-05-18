import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Task from "./components/Task";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [isAddClicked, setisAddClicked] = useState(false);
  const [isEditClicked, setisEditClicked] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({});
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  //fetch all tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  //fetch single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  //delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((value, index) => value.id != id));
    alert("Task deleted");
  };

  //edit task
  const editTask = async (updatedTask) => {
    setisEditClicked(true);
    setisAddClicked(false);
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? { ...updatedTask } : task
      )
    );
  };

  const editClicked = (task) => {
    console.log("editClicked called", task);
    setisEditClicked(true);

    // setCurrentTask(task);
  };

  //toggle reminder
  const toggleReminder = async (id) => {
    const myTask = await fetchTask(id);
    const updatedTask = { ...myTask, reminder: !myTask.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 1000 + 1);
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
    alert("New task added");
  };
  return (
    <Router>
      <div className="container">
        <Route
          path="/"
          render={() => (
            <Header
              title="Task Tracker"
              addClick={() => {
                console.log("addClick");
                console.log("before isAddClicked", isAddClicked);

                setisAddClicked(!isAddClicked);
                setisEditClicked(false);
                console.log("after isAddClicked", isAddClicked);
              }}
              closeClick={() => {
                setisAddClicked(false);
              }}
              isAddClicked={isAddClicked}
            />
          )}
        />
        <Route
          path="/add"
          exact
          render={() => (
            <>
              {isAddClicked && (
                <AddTask addTask={addTask} fetchTask={fetchTask} />
              )}
            </>
          )}
        />
        <Route
          path="/edit/:id"
          exact
          render={() => (
            <>
              {isEditClicked && (
                <AddTask
                  editTask={editTask}
                  fetchTask={fetchTask}
                  // currentTask={currentTask}
                />
              )}
            </>
          )}
        />
        <>
          {tasks.length ? (
            <Tasks
              tasks={tasks}
              deleteTask={deleteTask}
              editTask={editTask}
              editClicked={editClicked}
              toggleReminder={toggleReminder}
            />
          ) : (
            <h3>No Tasks available</h3>
          )}
        </>
      </div>
    </Router>
  );
}

export default App;
