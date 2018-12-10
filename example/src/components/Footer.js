
import React, { useCallback, useMemo } from 'react';
import { useReduxState, useReduxBindActionCreators } from 'react-use-dux';
import { footerActions, FILTER_TYPE } from '../dux/actions/todoActions';
import { selectFilter, selectActiveTodoCount, selectShowClearCompleted } from '../dux/selectors/todoSelectors';

const Footer = () => {

    const { removeCompletedTodos, filterTodos } = useReduxBindActionCreators(footerActions);
    const filter = useReduxState(selectFilter);
    const activeTodoCount = useReduxState(selectActiveTodoCount);
    const showClearCompleted = useReduxState(selectShowClearCompleted);

    const itemsText = activeTodoCount === 0 ?
        '' :
        activeTodoCount > 1 ?
        `${activeTodoCount} items left` :
        `${activeTodoCount} item left`;

    const createFilterProps = useCallback(filterType => {
        return filterType !== filter ?
            { onClick: e => filterTodos(filterType) } :
            { className: 'selected' };
    }, [filter]);

    const { allFilterProps, activeFilterProps, completedFilterProps } = useMemo(() => ({
        allFilterProps: createFilterProps(FILTER_TYPE.ALL),
        activeFilterProps: createFilterProps(FILTER_TYPE.ACTIVE),
        completedFilterProps: createFilterProps(FILTER_TYPE.COMPLETED),
    }), [createFilterProps]);

    return (
        <footer className="footer">
            <span className="todo-count">{itemsText}</span>
            <ul className="filters">
                <li><a { ...allFilterProps }>All</a></li>
                <li><a { ...activeFilterProps }>Active</a></li>
                <li><a { ...completedFilterProps }>Completed</a></li>
            </ul>
            { showClearCompleted ? <button className="clear-completed" onClick={ removeCompletedTodos }>Clear Completed</button> : ''}
        </footer>
    );
};

export default Footer;
