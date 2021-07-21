import { useState,  useCallback, FormEvent } from 'react'
import {v4 as uuid} from "uuid"

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import '../styles/tasklist.scss'

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateNewTask = useCallback((event: FormEvent) => {
    event.preventDefault()

    if (newTaskTitle.trim() === '') return;

    const newTask = {
      id: uuid(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks((state) => [...state, newTask])
    setNewTaskTitle('')
  }, [newTaskTitle])

  const handleToggleTaskCompletion = useCallback((id: string) => {
    setTasks((state) =>  {
      return state.map((task) => task.id === id ? {...task, isComplete: !task.isComplete} : task)
    })
  }, [])

  const handleRemoveTask = useCallback((id: string) => {
    setTasks((state) =>  {
      return state.filter((task) => task.id !== id)
    })
  }, [])

  return (
    <section className="task-list container">
      <header>
        <h2>My tasks</h2>

        <div className="input-group">
          <form onSubmit={handleCreateNewTask}>
            <input 
              type="text" 
              placeholder="Add new todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button">
              <FiCheckSquare size={16} color="#fff"/>
            </button>
          </form>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}