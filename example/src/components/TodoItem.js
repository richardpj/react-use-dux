
import React from 'react';
import { useReduxDispatch } from 'react-use-dux';
import { useClickOutside } from '../hooks/useClickOutside';
import { itemActions } from '../dux/actions/todoActions';

const TodoItem = (props) => {

    const { editTodo, removeTodo, toggleTodo, updateTodoText, stopEditingTodo } = useReduxDispatch(itemActions);

    const textBoxRef = useClickOutside(props.editing ? stopEditingTodo : null);

    const keypressHandler = e => {
        if(e.key === 'Enter') {
            stopEditingTodo();
        }
    };

    return (
        <li {...props.editing ? { className: 'editing' } : {}}>
            <div className="view">
                <input type="checkbox" className="toggle" checked={props.isCompleted} onChange={e => toggleTodo(props.id)} />
                <label onDoubleClick={e => editTodo(props.id)}>{props.text}</label>
                <button className="destroy" onClick={e => removeTodo(props.id)}></button>
            </div>
            <input className="edit" { ...props.editing ? { ref: textBoxRef } : {} } value={props.text} onChange={e => updateTodoText(e.target.value)} onKeyPress={ e => keypressHandler(e)} />
        </li>
    );
};

export default TodoItem;