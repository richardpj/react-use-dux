
import React from 'react';
import { useReduxState, useReduxDispatch } from 'react-use-dux';
import { headerActions } from '../dux/actions/todoActions';

const Header = (props) => {

    const { updateNewTodoText, addTodo} = useReduxDispatch(headerActions);
    const newTodoText = useReduxState(state => state.newTodoText);

    const keypressHandler = e => {
        if(e.key === 'Enter') {
            addTodo();
        }
    };

    return (
            <header>
                <h1>todos</h1>
                <input type="text" placeholder="What needs to be done?" className="new-todo" value={newTodoText} onChange={ e => updateNewTodoText(e.target.value) } onKeyPress={ e => keypressHandler(e) } />
            </header>
    );
};

export default Header;