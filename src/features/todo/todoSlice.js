import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id: "1", text: "Buy groceries"}],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.todos.push(action.payload);
            },
            prepare: (text) => ({
                payload: { id: nanoid(), text },
            }),
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? action.payload : todo);
        },
    },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;