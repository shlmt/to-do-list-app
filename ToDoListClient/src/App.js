import React, { useEffect, useState } from 'react'
import service from './service.js'

function App() {
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useState([])

  const getTodos = async () => {
    const todos = await service.getTasks()
    setTodos(todos)
  }

  const createTodo = async (e) => {
    e.preventDefault()
    await service.addTask(newTodo)
    setNewTodo("")
    await getTodos()
  }

  const updateCompleted = async (todo, isComplete) => {
    await service.setCompleted(todo.id, isComplete)
    await getTodos()
  }

  const deleteTodo = async (id) => {
    await service.deleteTask(id)
    await getTodos()
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isCompleted ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isCompleted} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </section >
  )
}

export default App