import './App.css'
import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'
import { GoClockFill } from "react-icons/go";
import { v4 as uuidv4 } from 'uuid';
// import { PiCircleThin } from "react-icons/pi";
// import { PiCheckCircleThin } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [Task, setTask] = useState("")
  const [Tasks, setTasks] = useState([]);
  console.log(Tasks)
  const [Finished, setFinished] = useState(true);
  useEffect(() => {
    let todoString = localStorage.getItem("Tasks")
    if (todoString) {
      let Tasks = JSON.parse(localStorage.getItem("Tasks"))
      setTasks(Tasks);
    }
  }, [])

  const SavetoLS = () => {
    localStorage.setItem("Tasks", JSON.stringify(Tasks))
  }

  const handleDelete = (e) => {
    let id = e.target.id;
    console.log(id)
    let index = Tasks.find((item) => {
      return item.id === id
    })
    let NewTasks = [...Tasks];
    NewTasks.splice(index, 1)
    setTasks(NewTasks)
    SavetoLS();
  }

  const handleChange = (e) => {
    setTask(e.target.value)
  }

  const handleClick = () => {
    setTasks([...Tasks, { id: uuidv4(), Task, isCompleted: false }]);
    setTask("")
    SavetoLS();
  }
  const handleImage = (e) => {
    let id = e.target.id;
    console.log(id)
    let index = Tasks.findIndex((item) => {
      return item.id === id;
    })
    let NewTasks = [...Tasks];
    NewTasks[index].isCompleted = !NewTasks[index].isCompleted;
    setTasks(NewTasks)
    SavetoLS();
  }
  const handleEditTask = (e) => {
    let id = e.target.id;
    let task = Tasks.filter(item => {
      return item.id === id;
    })
    setTask(task[0].Task);
    let index = Tasks.find((item) => {
      return item.id === id
    })
    let NewTasks = [...Tasks];
    NewTasks.splice(index, 1)
    setTasks(NewTasks)
    SavetoLS();
  }
  const handleFinished = () => {
    setFinished(!Finished);
  }

  return (
    <>
      <div className="App md:mx-auto md:my-20 md:w-2/4 md:h-3/4 border md:rounded-2xl bg-gray-900 overflow-y-auto  " onKeyDown={(e) => {
        if (Task.length > 3) {
          if (e.key === "Enter") {
            handleClick();
          }
        }
      }}>
        <Navbar />
        <div className="w-2/3 h-16 w-4/5  border-0 bg-zinc-800 md:mx-16  mx-10 rounded-lg flex items-center justify-between hover:border border-blue-500">
          <input type="text" value={Task} onChange={handleChange} className="w-3/5 h-10 border-0  bg-zinc-800  text-slate-300 px-4 text-xl outline-none border-none" />
          <div className="around flex gap-2 mr-4 items-center md:flex-row">
            <div className="logo border-none rounded-lg w-12 h-12 bg-zinc-900 flex justify-center items-center">
              <GoClockFill size={24} color='white' onClick={handleFinished} />
            </div>
            <div className="add border-none rounded-lg w-20 h-12 flex items-center justify-center bg-zinc-900 font-bold text-white text-lg">
              <button onClick={handleClick} disabled={Task.length <= 3} >Add</button>
            </div>
          </div>
        </div>
        <div className='my-16'>
          {Tasks.map((item) => {
            return (Finished || !item.isCompleted) && <div key={item.id} className="w-4/5 h-14 border-0 md:mx-16 mx-10">
              <div className="task flex justify-between ">
                <div className="logo flex gap-4 text-xl text-slate-300 items-center">
                  <input type="checkbox" onClick={handleImage} className="w-8 h-8 rounded-full" id={item.id} checked={item.isCompleted} />
                  <p className={`${item.isCompleted ? "line-through" : ""} whitespace-nowrap overflow-hidden text-ellipsis w-40`} onClick={handleEditTask} id={item.id} >{item.Task}</p>
                </div>
                <div className="dD flex gap-2 w-1/2 justify-end">
                  <p className='text-xl text-slate-300'></p>
                  <MdDeleteForever size={28} color='red' onClick={handleDelete} id={item.id} />
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
