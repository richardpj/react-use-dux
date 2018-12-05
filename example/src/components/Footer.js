
import React from 'react';
import { useReduxState, useReduxDispatch } from 'react-use-dux';
import { footerActions, FILTER_TYPE } from '../dux/actions/todoActions';

const Footer = () => {

    const { removeCompletedTodos, filterTodos } = useReduxDispatch(footerActions);
    const todos = useReduxState(state => state.todos);
    const filter = useReduxState(state => state.filter);

    const itemsLeft = todos.reduce((prev, next) => !next.isCompleted ? prev + 1 : prev, 0);

    const itemsText = itemsLeft === 0 ?
        '' :
        itemsLeft > 1 ?
        `${itemsLeft} items left` :
        `${itemsLeft} item left`;

    const createFilterProps = filterType => {
        return filterType !== filter ?
            { onClick: e => filterTodos(filterType) } :
            { className: 'selected' };
    };

    return (
        <footer className="footer">
            <span className="todo-count">{itemsText}</span>
            <ul className="filters">
                <li><a { ...createFilterProps(FILTER_TYPE.ALL) }>All</a></li>
                <li><a { ...createFilterProps(FILTER_TYPE.ACTIVE) }>Active</a></li>
                <li><a { ...createFilterProps(FILTER_TYPE.COMPLETED) }>Completed</a></li>
            </ul>
            { itemsLeft < todos.length ? <button className="clear-completed" onClick={ removeCompletedTodos }>Clear Completed</button> : ''}
        </footer>
    );
};

export default Footer;