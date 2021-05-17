import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Task from "./components/Task";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";

function App() {
  const [isAddClicked, setisAddClicked] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("useEffect called");
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    // return () => {
    //   cleanup
    // };
    getTasks();
  }, []);

  //fetch all tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    console.log(data);
    return data;
  };

  //fetch single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    // console.log(data);
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

  //toggle reminder
  const toggleReminder = async (id) => {
    const myTask = await fetchTask(id);
    console.log("myTask", myTask);
    const updatedTask = { ...myTask, reminder: !myTask.reminder };
    console.log("updatedTask", updatedTask);
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();
    console.log("data", data);

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
    <div className="container">
      <Header
        title="Task Tracker"
        addClick={() => setisAddClicked(!isAddClicked)}
        isAddClicked={isAddClicked}
      />
      {isAddClicked && <AddTask addTask={addTask} />}

      {tasks.length ? (
        <Tasks
          tasks={tasks}
          deleteTask={deleteTask}
          toggleReminder={toggleReminder}
        />
      ) : (
        <h3>No Tasks available</h3>
      )}
    </div>
  );
}

export default App;
