
import React, { forwardRef, memo } from 'react';
import { useReduxDispatch } from 'react-use-dux';
import { useKeypressHandler } from '../hooks/useKeyPressHandler';
import { itemActions } from '../dux/actions/todoActions';

const TodoItem = memo(forwardRef((props, ref) => {

    const { editTodo, removeTodo, toggleTodo, updateTodoText, stopEditingTodo } = useReduxDispatch(itemActions);

    const keypressHandler = useKeypressHandler(() => ({
        'Enter': stopEditingTodo,
    }));

    return (
        <li {...props.editing ? { className: 'editing' } : {}}>
            <div className="view">
                <input type="checkbox" className="toggle" checked={props.isCompleted} onChange={e => toggleTodo(props.id)} />
                <label onDoubleClick={e => editTodo(props.id)}>{props.text}</label>
                <button className="destroy" onClick={e => removeTodo(props.id)}></button>
            </div>
            <input className="edit" { ...props.editing ? { ref: ref } : {} } value={props.text} onChange={e => updateTodoText(e.target.value)} onKeyPress={ e => keypressHandler(e)} />
        </li>
    );
}));

TodoItem.displayName = 'TodoItem';

export default TodoItem;