// reference: https://medium.com/@n.raj.suthar/building-a-todo-list-with-react-hooks-usereducer-95432a261c11
import React, { useEffect, useState, useReducer } from "react";

export const initialState = {
    counter: 2,
    todos: [{
      id: 1,
      text: "One",
    }, {
      id: 2,
      text: "Two",
    }],
};
  
export const reducer = (state, action) => {
    switch (action.type) {
        case "add":
        {
            const newCounter = state.counter + 1;
            const newTodo = {
            id: newCounter,
            text: action.text,
            };
            return {
            counter: newCounter,
            todos: [...state.todos, newTodo],
            };
        }
        case "edit":
        {
            const idx = state.todos.findIndex(t => t.id === action.id);
            const todo = Object.assign({}, state.todos[idx]);
            todo.text = action.text;
            const todos = Object.assign([], state.todos);
            todos.splice(idx, 1, todo);
            return {
                counter: state.counter,
                todos: todos,
            };
        }
        case "remove":
        {
            const idx = state.todos.findIndex(t => t.id === action.id);
            const todos = Object.assign([], state.todos);
            todos.splice(idx, 1);
            return {
            counter: state.counter,
            todos: todos,
            };
        }
        default:
        return state;
    }
};



const AddTodo = ({add}) => {
    const [text, setText] = useState("");
    return (
        <div className="AddTodo">
        <input value={text} onChange={e => setText(e.target.value)} className="AddTodoInput" />
        <button className="AddTodoButton" onClick={() => {add(text); setText("")}}>Add</button>
        </div>
    );
}


const Todo = ({ todo, remove, edit }) => {
    const [mode, setMode] = useState("list");
    const [text, setText] = useState(todo.text);
    return (
        <div className="Todo">
        {mode === "list"
            ? <>
            <span className="TodoText">{todo.text}</span>
            <button className="RemoveTodo" onClick={remove}>Remove</button>
            <button className="EditTodo" onClick={() => setMode("edit")}>Edit</button>
            </>
            : <>
            <input value={text} onChange={e => setText(e.target.value)} className="EditTodoInput" />
            <button className="EditTodoSave" onClick={() => {edit(text); setMode("list");}}>Save</button>
            <button className="EditTodoCancel" onClick={() => setMode("list")}>Cancel</button>
            </>}
        </div>
    );
}
  
const Test = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (<>
        <AddTodo
        add={text => dispatch({type: "add", text: text})}
        />
        {state.todos.map(t => (
        <Todo
            key={t.id}
            todo={t}
            remove={() => dispatch({type: "remove", id: t.id})}
            edit={text => dispatch({type: "edit", id: t.id, text: text})}
        />
        ))}
    </>);
}