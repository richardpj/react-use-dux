
import React, { forwardRef, memo } from 'react';
import { useReduxDispatch } from 'react-use-dux';
import { useKeypressHandler } from '../hooks/useKeyPressHandler';
import { itemActions } from '../dux/actions/todoActions';

const TodoItem = memo(forwardRef(({ id, text, isCompleted, editing }, ref) => {

    const { editTodo, removeTodo, toggleTodo, updateTodoText, stopEditingTodo } = useReduxDispatch(itemActions);

    const keypressHandler = useKeypressHandler(() => ({
        'Enter': stopEditingTodo,
    }));

    return (
        <li {...editing ? { className: 'editing' } : {}}>
            <div className="view">
                <input type="checkbox" className="toggle" checked={isCompleted} onChange={e => toggleTodo(id)} />
                <label onDoubleClick={() => editTodo(id)}>{text}</label>
                <button className="destroy" onClick={() => removeTodo(id)}></button>
            </div>
            <input className="edit" { ...editing ? { ref: ref } : {} } value={text} onChange={e => updateTodoText(e.target.value)} onKeyPress={ keypressHandler } />
        </li>
    );
}));

TodoItem.displayName = 'TodoItem';

export default TodoItem;