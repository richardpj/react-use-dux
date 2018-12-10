
import React from 'react';
import { useReduxState, useReduxBindActionCreators } from 'react-use-dux';
import { listActions } from '../dux/actions/todoActions';
import TodoItem from './TodoItem';
import { selectVisibleTodoIds, selectAllChecked } from '../dux/selectors/todoSelectors';

const TodoList = () => {

    const { toggleAllTodos } = useReduxBindActionCreators(listActions);

    const visibleTodoIds = useReduxState(selectVisibleTodoIds, [], true);
    const allChecked = useReduxState(selectAllChecked); 

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