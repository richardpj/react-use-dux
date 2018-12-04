
export const TODO_UPDATE_NEW = 'TODO_UPDATE_NEW';
export const TODO_ADD = 'TODO_ADD';
export const TODO_REMOVE = 'TODO_REMOVE';
export const TODO_EDIT = 'TODO_EDIT';
export const TODO_STOP_EDITING = 'TODO_STOP_EDITING';
export const TODO_UPDATE_TEXT = 'TODO_UPDATE_TEXT';
export const TODO_TOGGLE_COMPLETE = 'TODO_TOGGLE_COMPLETE';
export const TODO_TOGGLE_COMPLETE_ALL = 'TODO_TOGGLE_COMPLETE_ALL';
export const TODO_REMOVE_COMPLETED = 'TODO_REMOVE_COMPLETED';
export const TODO_FILTER = 'TODO_FILTER';

export const FILTER_TYPE = {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED'
};

export const updateNewTodoText = text => ({ type: TODO_UPDATE_NEW, text });
export const addTodo = () => ({ type: TODO_ADD });
export const removeTodo = id => ({ type: TODO_REMOVE, id });
export const editTodo = id => ({ type: TODO_EDIT, id });
export const stopEditingTodo = () => ({ type: TODO_STOP_EDITING }); 
export const updateTodoText = text => ({ type: TODO_UPDATE_TEXT, text });
export const toggleTodo = id => ({ type: TODO_TOGGLE_COMPLETE, id });
export const toggleAllTodos = () => ({ type: TODO_TOGGLE_COMPLETE_ALL });
export const removeCompletedTodos = () => ({ type: TODO_REMOVE_COMPLETED });
export const filterTodos = filter => ({ type: TODO_FILTER, filter });

export const headerActions = {
    updateNewTodoText,
    addTodo,
};

export const itemActions = {
    editTodo,
    removeTodo,
    toggleTodo,
    stopEditingTodo,
    updateTodoText,
};

export const footerActions = {
    removeCompletedTodos,
    filterTodos
};
