import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  memo,
} from 'react'


const student = {
  name: 'Priya Nair',
  email: 'priya@gmail.com',
  year: '3rd Year',
}

const initialTasks = [
  { id: 1, title: 'Finish DBMS assignment', completed: false },
  { id: 2, title: 'Revise React hooks', completed: false },
  { id: 3, title: 'Submit lab report', completed: true },
]

const StudentContext = createContext(null)

function StudentProvider({ children }) {
  return (
    <StudentContext.Provider value={student}>{children}</StudentContext.Provider>
  )
}

function useUser() {
  const context = useContext(StudentContext)

  if (!context) {
    throw new Error('useUser must be used inside StudentProvider')
  }

  return context
}

function useTaskSummary(tasks) {
  return useMemo(() => {
    const total = tasks.length
    const remaining = tasks.filter((task) => !task.completed).length

    return { total, remaining }
  }, [tasks])
}

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const cleanedTitle = action.payload.trim()

      if (!cleanedTitle) {
        return state
      }

      return [
        ...state,
        {
          id: Date.now() + Math.random(),
          title: cleanedTitle,
          completed: false,
        },
      ]
    }
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task,
      )
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload)
    default:
      return state
  }
}

function Header() {
  const user = useUser()

  return (
    <header className="app-header">
      <h1>STUDYHUB</h1>
      <p className="welcome">Welcome, {user.name} ({user.year})</p>
    </header>
  )
}

function ProfilePanel() {
  const user = useUser()

  return (
    <section >
      <h2>Student Details</h2>
      <div >
        <span>Name:</span>
        <strong>{user.name}</strong>
      </div>
      <div >
        <span>Email:</span>
        <strong>{user.email}</strong>
      </div>
      <div >
        <span>Year:</span>
        <strong>{user.year}</strong>
      </div>
    </section>
  )
}

function TaskStats({ tasks }) {
  const { total, remaining } = useTaskSummary(tasks)

  return (
    <h2 className="task-heading">
      MY TASKS ({remaining} remaining / {total} total)
    </h2>
  )
}

function AddTaskForm({ newTask, onTaskChange, onAddTask }) {
  return (
    <form className="add-task-form" onSubmit={onAddTask}>
      <label htmlFor="new-task" className="sr-only">
        New task:
      </label>
      <input
        id="new-task"
        type="text"
        placeholder="New task"
        value={newTask}
        onChange={(event) => onTaskChange(event.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? 'task-title completed' : 'task-title'}>
          {task.title}
        </span>
      </label>
      <button type="button" className="delete-button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  )
})

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

function TaskManager() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks)
  const [newTask, setNewTask] = useState('')

  const handleAddTask = useCallback(
    (event) => {
      event.preventDefault()
      const cleanedTitle = newTask.trim()

      if (!cleanedTitle) {
        return
      }

      dispatch({ type: 'ADD_TASK', payload: cleanedTitle })
      setNewTask('')
    },
    [newTask],
  )

  const handleToggle = useCallback((taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId })
  }, [])

  const handleDelete = useCallback((taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId })
  }, [])

  return (
    <section className="task-manager">
      <TaskStats tasks={tasks} />
      <AddTaskForm
        newTask={newTask}
        onTaskChange={setNewTask}
        onAddTask={handleAddTask}
      />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </section>
  )
}

function App() {
  return (
    <StudentProvider>
      <div className="studyhub-app">
        <Header />
        <ProfilePanel />
        <TaskManager />
      </div>
    </StudentProvider>
  )
}

export default App
