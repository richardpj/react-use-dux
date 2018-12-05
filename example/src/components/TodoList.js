
import React from 'react';
import { useReduxState, useReduxDispatch } from 'react-use-dux';
import { useClickOutside } from '../hooks/useClickOutside';
import TodoItem from './TodoItem';
import { FILTER_TYPE, listActions } from '../dux/actions/todoActions';

const lookupFilter = {
    [FILTER_TYPE.ALL]: () => true,
    [FILTER_TYPE.ACTIVE]: todo => !todo.isCompleted,
    [FILTER_TYPE.COMPLETED]: todo => todo.isCompleted,
};

const TodoList = () => {

    const { toggleAllTodos, stopEditingTodo } = useReduxDispatch(listActions);

    const todos = useReduxState(state => state.todos);
    const editing = useReduxState(state => state.editing);
    const filter = useReduxState(state => state.filter);
    
    const textBoxRef = useClickOutside(editing !== -1 ? stopEditingTodo : null);

    const visibleTodos = todos.filter(lookupFilter[filter]);

    const allChecked = todos.length !== 0 && todos.findIndex(item => !item.isCompleted) === -1; 

    return (
        <section className="main">
            <input id="toggle-all" name="toggle-all" className="toggle-all" checked={allChecked} type="checkbox" onChange={toggleAllTodos} />
            <label htmlFor="toggle-all">All</label>
            <ul className="todo-list">
                {visibleTodos.map(todo => <TodoItem key={todo.id} {...todo} { ...todo.id === editing ? { editing: true, ref: textBoxRef } : { editing: false } } />)}
            </ul>
        </section>
    );
};

export default TodoList;