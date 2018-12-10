
import { createSelector } from 'reselect';
import { FILTER_TYPE } from '../actions/todoActions';

export const selectNewTodoText = state => state.newTodoText;
export const selectTodos = state => state.todos;

export const createTodoItemSelector = id => createSelector(
    selectTodos,
    todos => todos[todos.findIndex(item => item.id === id)]
);

export const createIsEditingSelector = id => state => state.editing === id;

export const selectFilter = state => state.filter;

const lookupFilter = {
    [FILTER_TYPE.ALL]: () => true,
    [FILTER_TYPE.ACTIVE]: todo => !todo.isCompleted,
    [FILTER_TYPE.COMPLETED]: todo => todo.isCompleted,
};

export const selectVisibleTodoIds = createSelector(
    [ selectFilter, selectTodos ],
    (filter, todos) => todos.filter(lookupFilter[filter]).map(todo => todo.id)
);

export const selectActiveTodoCount = createSelector(
    selectTodos,
    todos => todos.reduce((prev, next) => !next.isCompleted ? prev + 1 : prev, 0)
);

export const selectTodosLength = createSelector(
    selectTodos,
    todos => todos.length
);

export const selectShowClearCompleted = createSelector(
    [ selectTodosLength, selectActiveTodoCount ],
    (todosLength, activeTodoCount) => activeTodoCount < todosLength
);

export const selectAllChecked = createSelector(
    [ selectTodosLength, selectActiveTodoCount ],
    (todosLength, activeTodoCount) => todosLength !== 0 && activeTodoCount === 0
);
