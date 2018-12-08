
import React, { useCallback } from 'react';
import { useReduxState, useReduxBindActionCreators } from 'react-use-dux';
import { headerActions } from '../dux/actions/todoActions';
import { useKeypressHandler } from '../hooks/useKeyPressHandler';

const Header = () => {

    const { updateNewTodoText, addTodo } = useReduxBindActionCreators(headerActions);
    const newTodoText = useReduxState(state => state.newTodoText);
    const todos = useReduxState(state => state.todos);
    const textChangeHandler = useCallback(e => updateNewTodoText(e.target.value), [updateNewTodoText]);
    const keypressHandler = useKeypressHandler({
        'Enter': addTodo,
    });

    return (
            <header>
                <h1>{todos.length} - todos</h1>
                <input type="text" placeholder="What needs to be done?" className="new-todo" value={newTodoText} onChange={ textChangeHandler } onKeyPress={ keypressHandler } />
            </header>
    );
};

Header.displayName = 'Header';

export default Header;