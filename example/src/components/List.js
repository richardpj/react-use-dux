
import React from 'react';
import { useReduxState, useReduxDispatch } from 'react-use-dux';
import TodoItem from './TodoItem';
import { FILTER_TYPE, toggleAllTodos as toggleAllTodosAction } from '../dux/actions/todoActions';

const lookupFilter = {
    [FILTER_TYPE.ALL]: todo => true,
    [FILTER_TYPE.ACTIVE]: todo => !todo.isCompleted,
    [FILTER_TYPE.COMPLETED]: todo => todo.isCompleted,
};

const List = (props) => {

    const toggleAllTodos = useReduxDispatch(toggleAllTodosAction);

    const todos = useReduxState(state => state.todos);
    const editing = useReduxState(state => state.editing);
    const filter = useReduxState(state => state.filter);
    
    const visibleTodos = todos.filter(lookupFilter[filter]);

    const allChecked = todos.findIndex(item => !item.isCompleted) === -1; 

    return (
        <section className="main">
            <input id="toggle-all" name="toggle-all" className="toggle-all" checked={allChecked} type="checkbox" onChange={toggleAllTodos} />
            <label htmlFor="toggle-all">All</label>
            <ul className="todo-list">
                {visibleTodos.map(todo => <TodoItem key={todo.id} {...todo} editing={ todo.id === editing } />)}
            </ul>
        </section>
    );
};

export default List;