
import { TODO_UPDATE_NEW, TODO_ADD, TODO_REMOVE, TODO_EDIT, TODO_STOP_EDITING,
    TODO_UPDATE_TEXT, TODO_TOGGLE_COMPLETE, TODO_TOGGLE_COMPLETE_ALL,
    TODO_REMOVE_COMPLETED, TODO_FILTER, FILTER_TYPE } from '../actions/todoActions';

const initialState = {
    newTodoText: '',
    todos: [ 
        { id:0, text:'Learn React hooks', isCompleted:true },
        { id:1, text:'Use react-use-dux', isCompleted:false },
        { id:2, text:'Enjoy the awesomeness', isCompleted:false },
    ],
    editing: -1,
    filter: FILTER_TYPE.ALL,
};

const reducerMap = {
    [TODO_UPDATE_NEW]: (state, action) => {
        if(action.text !== state.newTodoText) {
            return {
                ...state,
                newTodoText: action.text,
            };
        }
        return state;
    },
    [TODO_ADD]: (state, action) => {
        let todos = [...state.todos];
        todos.push({
            id: Math.max(-1, ...todos.map(item => item.id)) + 1,
            text: state.newTodoText,
            isCompleted: false,
        });
        return {
            ...state,
            todos,
            newTodoText: '',
        };
    },
    [TODO_REMOVE]: (state, action) => {
        let todos = [...state.todos];
        let itemIndex = todos.findIndex(item => item.id === action.id);
        if (itemIndex === -1) {
            console.log('Should not happen!');
            return state;
        }
        return {
            ...state,
            todos,
        };
    },
    [TODO_EDIT]: (state, action) => {
        let itemIndex = state.todos.findIndex(item => item.id === action.id);
        if(itemIndex === -1) {
            console.log('Should not happen!');
            return state;
        }
        return {
            ...state,
            editing: action.id,
        };
    },
    [TODO_STOP_EDITING]: (state, action) => {
        return {
            ...state,
            editing: -1,
        };
    },
    [TODO_UPDATE_TEXT]: (state, action) => {
        let todos = [...state.todos];
        let itemIndex = todos.findIndex(item => item.id === state.editing);
        if(itemIndex === -1) {
            console.log('Should not happen!');
            return state;
        }
        let item = todos[itemIndex];
        todos.splice(itemIndex, 1, {
            ...item,
            text: action.text
        });
        return {
            ...state,
            todos,
        };
    },
    [TODO_TOGGLE_COMPLETE]: (state, action) => {
        let todos = [...state.todos];
        let itemIndex = todos.findIndex(item => item.id === action.id);
        if(itemIndex === -1) {
            console.log('Should not happen!');
            return state;
        }
        let item = todos[itemIndex];
        todos.splice(itemIndex, 1, {
            ...item,
            isCompleted: !item.isCompleted
        });
        return {
            ...state,
            todos,
        };
    },
    [TODO_TOGGLE_COMPLETE_ALL]: (state, action) => {
        let allCompleted = state.todos.findIndex(item => item.isCompleted === false) === -1;
        if(allCompleted) {
            
            let todos = state.todos.map(item => ({ ...item, isCompleted: false }));
            return {
                ...state,
                todos,
            };
        }
        let todos = state.todos.map(item => item.isCompleted ? item : { ...item, isCompleted: true });
        return {
            ...state,
            todos,
        };
    },
    [TODO_REMOVE_COMPLETED]: (state, action) => {
        let todos = state.todos.filter(item => !item.isCompleted);
        if(todos.length === state.todos.length) {
            console.log('Should not happen!');
            return state;
        }
        let editing = state.editing;
        if(editing === -1 || todos.findIndex(item => item.id === editing) !== -1) {
            return {
                ...state,
                todos,
            };
        }
        return {
            ...state,
            todos,
            editing: -1
        };
    },
    [TODO_FILTER]: (state, action) => {
        if(state.filter === action.filter) {
            return state;
        }
        return {
            ...state,
            filter: action.filter,
        }
    }
};

const todoReducer = (state = initialState, action) => {
    if(reducerMap.hasOwnProperty(action.type)) {
        return reducerMap[action.type](state, action);
    }
    return state;
}; 

export default todoReducer;