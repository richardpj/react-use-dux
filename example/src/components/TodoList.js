
import React from 'react';
import { useReduxState, useReduxBindActionCreators } from 'react-use-dux';
import { FILTER_TYPE, listActions } from '../dux/actions/todoActions';
import TodoItem from './TodoItem';

const lookupFilter = {
    [FILTER_TYPE.ALL]: () => true,
    [FILTER_TYPE.ACTIVE]: todo => !todo.isCompleted,
    [FILTER_TYPE.COMPLETED]: todo => todo.isCompleted,
};

const TodoList = () => {

    const { toggleAllTodos } = useReduxBindActionCreators(listActions);

    const visibleTodoIds = useReduxState(state => {
        return state.todos.filter(lookupFilter[state.filter]).map(todo => todo.id)
    }, [], true);
    const allChecked = useReduxState(state => state.todos.length !== 0 && state.todos.findIndex(item => !item.isCompleted) === -1); 

    return (
        <section className="main">
            <input id="toggle-all" name="toggle-all" className="toggle-all" checked={allChecked} type="checkbox" onChange={toggleAllTodos} />
            <label htmlFor="toggle-all">All</label>
            <ul className="todo-list">
                {visibleTodoIds.map(todoId => <TodoItem key={todoId} id={todoId} />)}
            </ul>
        </section>
    );
};

export default TodoList;