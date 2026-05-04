import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';

function Todo() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const next = editText.trim();
    if (!next || !editingId) {
      cancelEdit();
      return;
    }
    dispatch(updateTodo({ id: editingId, text: next }));
    cancelEdit();
  };

  const onEditKeyDown = (e) => {
    if (e.key === 'Escape') cancelEdit();
  };

  const removeTodoHandler = (id) => {
    dispatch(removeTodo(id));
    if (editingId === id) cancelEdit();
  };

  return (
    <section className="todo-list-section" aria-labelledby="list-heading">
      <div className="todo-list-section__head">
        <h2 id="list-heading" className="todo-section-title">Your tasks</h2>
        <span className="todo-count" aria-live="polite">
          {todos.length} {todos.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {todos.length === 0 ? (
        <p className="todo-empty">Nothing here yet. Add a task above.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-card">
              {editingId === todo.id ? (
                <form className="todo-card__edit" onSubmit={saveEdit}>
                  <input
                    className="todo-input todo-card__edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={onEditKeyDown}
                    aria-label="Edit task"
                    autoFocus
                  />
                  <div className="todo-card__edit-actions">
                    <button type="submit" className="todo-btn todo-btn--primary todo-btn--small">
                      Save
                    </button>
                    <button type="button" className="todo-btn todo-btn--ghost todo-btn--small" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p
                    className="todo-card__text"
                    title="Double-click to edit"
                    onDoubleClick={() => startEdit(todo)}
                  >
                    {todo.text}
                  </p>
                  <div className="todo-card__actions">
                    <button
                      type="button"
                      className="todo-btn todo-btn--ghost todo-btn--small"
                      onClick={() => startEdit(todo)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="todo-btn todo-btn--danger todo-btn--small"
                      onClick={() => removeTodoHandler(todo.id)}
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Todo
