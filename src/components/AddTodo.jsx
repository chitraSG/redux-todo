import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

function AddTodo() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const trimmed = input.trim();
    const addTodoHandler = (e) => {
        e.preventDefault();
        if (!trimmed) return;
        dispatch(addTodo(trimmed));
        setInput("");
    }
  return (
    <section className="todo-add" aria-labelledby="add-todo-heading">
      <h2 id="add-todo-heading" className="todo-section-title">Add a task</h2>
      <form className="todo-add__form" onSubmit={addTodoHandler}>
        <input
          className="todo-input"
          type="text"
          placeholder="What needs doing?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="New todo text"
        />
        <button className="todo-btn todo-btn--primary" type="submit" disabled={!trimmed}>
          Add
        </button>
      </form>
    </section>
  );
}

export default AddTodo;
