
import React, { useCallback } from 'react';
import { useReduxState, useReduxBindActionCreators } from 'react-use-dux';
import { headerActions } from '../dux/actions/todoActions';
import { useKeypressHandler } from '../hooks/useKeyPressHandler';
import { selectNewTodoText } from '../dux/selectors/todoSelectors';

const Header = () => {

    const { updateNewTodoText, addTodo } = useReduxBindActionCreators(headerActions);
    const newTodoText = useReduxState(selectNewTodoText);
    const textChangeHandler = useCallback(e => updateNewTodoText(e.target.value), [updateNewTodoText]);
    const keypressHandler = useKeypressHandler({
        'Enter': addTodo,
    });

    return (
            <header>
                <h1>todos</h1>
                <input type="text" placeholder="What needs to be done?" className="new-todo" value={newTodoText} onChange={ textChangeHandler } onKeyPress={ keypressHandler } />
            </header>
    );
};

Header.displayName = 'Header';

export default Header;