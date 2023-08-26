import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])

  const fetchTasks = async () => {
    const res = await fetch ("http://localhost:5000/tasks");
    const data = await res.json();

    return data;

  }

  const fetchTask = async (id) => {
    const res = await fetch (`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;

  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })

    setTasks(tasks.filter((task) => (task.id !== id)))
  }

  const toggleReminder = async (id) => {
    const ttToggle = await fetchTask(id);
    const uTask = {...ttToggle, reminder: !ttToggle.reminder}
    
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(uTask),
    })

    const data = await res.json()
    setTasks(tasks.map((task) => (task.id === id ? {...task, reminder: data.reminder} : task)))
  }

  const addTask = async (task) => {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task)
    })

    const data = await response.json()

    setTasks([...tasks, data])
    
    // const id = Math.floor((Math.random * 1000000) + 1);
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask])
  }
  // setTasks(tasks.map((task) => {
  //   return (task.id === id ? {...task, reminder:!task.reminder} : task)
  // })) this would be completely valid as well.

  
  return (
    <Router>
    <div className="container">
      <Header onAdd = {() => (setShowAdd(!showAdd))} showAdd={showAdd}/>
      <Routes>
      <Route path="/" element={ 
        <>
        {showAdd && <AddTask onAdd = {addTask}/>}
        <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>
        </>
      } />
      
      <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;

