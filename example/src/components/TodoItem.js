
import React, { forwardRef, memo, useEffect } from 'react';
import { useReduxBindActionCreators } from 'react-use-dux';
import { useKeypressHandler } from '../hooks/useKeyPressHandler';
import { itemActions } from '../dux/actions/todoActions';

const TodoItem = memo(forwardRef(({ id, text, isCompleted, editing, todoEditText }, ref) => {

    const { editTodo, removeTodo, toggleTodo, updateTodoText, stopEditingTodo } = useReduxBindActionCreators(itemActions);

    const keypressHandler = useKeypressHandler({
        'Enter': stopEditingTodo,
    });

    useEffect(() => {
        if(editing) {
            ref.current.focus();
        }
    },[editing]);

    return (
        <li {...editing ? { className: 'editing' } : {}}>
            <div className="view">
                <input type="checkbox" className="toggle" checked={isCompleted} onChange={e => toggleTodo(id)} />
                <label onDoubleClick={() => editTodo(id)}>{text}</label>
                <button className="destroy" onClick={() => removeTodo(id)}></button>
            </div>
            <input type="text" className="edit" { ...editing ? { ref: ref } : {} } value={editing? todoEditText : '' } onChange={e => updateTodoText(e.target.value)} onKeyPress={ keypressHandler } />
        </li>
    );
}));
//TODO: Separate editText state.
TodoItem.displayName = 'TodoItem';

export default TodoItem;