import React, {useState, useEffect } from 'react'
import uuid from 'uuid/v4'

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';
const storeTasks = (taskMap) =>{
  localStorage.setItem( 
    TASKS_STORAGE_KEY,
    JSON.stringify(taskMap)
  )
}
 const readStoredTasks = () => {
    return (JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)))
 }
const Task = () => {
  const  storedTasks = readStoredTasks();
 
  const [taskText, setTaskText] = useState('')
  const [tasks,setTasks] = useState(storedTasks.tasks)
  const [completedTasks, setCompletedTasks] = useState(storedTasks.completedTasks)

  useEffect(() =>{
    storeTasks({tasks, completedTasks})
  })
  const updateTaskText = (e) => {
    setTaskText(e.target.value);

  }
  const addTask = () => {
    setTasks([...tasks, {id: uuid(),taskText}])
    setTaskText('')
  }

  const completeTask = completedTask => () => {
    setCompletedTasks([...completedTasks,completedTask])
    setTasks(tasks.filter(task => task.id !== completedTask.id))
  }
  const deleteTask = task => () => {
    setCompletedTasks(completedTasks.filter(t =>  t.id !== task.id ));

  }
  console.log('tasks',tasks)
  console.log('completedTasks',completedTasks)
  return (
    <div>
      <h3>Tasks</h3>
      <div className='form'>
        <input value = {taskText} onChange = {updateTaskText} />
        <button onClick = {addTask}>Add Task</button>
      </div>
      <div className = "task-list">
        {tasks.map(task => {
          const {id, taskText}  = task
          return <div key = {id} onClick = {completeTask(task)}>{taskText}</div>
        })}
      </div>
      <hr/> 
      {completedTasks.length > 0 &&  <h3>Completed Task</h3> }
      <div className ="completed-list">
        {
          completedTasks.map(task => {
            const { id, taskText} = task;
            return (
              
              <div key = {id}>{taskText} &nbsp;<span onClick = {deleteTask(task)} className="delete-task">X</span></div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Task