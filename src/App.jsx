import AddTodo from './components/AddTodo'
import Todo from './components/Todo'
import './App.css'

function App() {
  return (
    <main className="todo-app">
      <h1>Redux toolkit</h1>
      <AddTodo />
      <Todo />
    </main>
  )
}

export default App
