
import { createContext, useContext, useState, useRef, useEffect, useMemo } from 'react';
import shallowEqual from 'shallowequal';

const ReduxContext = createContext();

ReduxContext.displayName = 'ReduxContext';

export const ReduxContextProvider = ReduxContext.Provider;

const useRefState = initialValue => {

    const [state, setState] = useState(initialValue);
    const stateRef = useRef();

    useEffect(() => {
        stateRef.current = state;
    });

    return [state, setState, stateRef];
};

export const useReduxState = (selector = f => f) => {

    const store = useContext(ReduxContext);
    const [state, setState, stateRef] = useRefState(selector(store.getState()));
    
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const newState = selector(store.getState());
            if(!shallowEqual(stateRef.current, newState)) {
                setState(newState);
            }
        });
        return unsubscribe;
    },[store, selector.toString()]);
    return state;
};

const isFunction = obj => !!(obj && obj.constructor && obj.call && obj.apply);
    
const createGiveDispatch = dispatch => actionCreator => {
    const giveActionCreatorDispatch = actionCreator => (...args) => dispatch(actionCreator(...args));
    if(!actionCreator) {
        return dispatch;
    }
    if(isFunction(actionCreator)) {
        return giveActionCreatorDispatch(actionCreator);
    }
    if(Array.isArray(actionCreator)) {
        return actionCreator.map(giveActionCreatorDispatch);
    }
    return Object.keys(actionCreator).reduce((result, key) => {
        result[key] = giveActionCreatorDispatch(actionCreator[key]);
        return result;
    }, {});
};

export const useReduxDispatch = (actionCreator) => {

    const { dispatch } = useContext(ReduxContext);
    
    const giveDispatch = useMemo(() => createGiveDispatch(dispatch), [dispatch]);
    
    return useMemo(() => giveDispatch(actionCreator), [giveDispatch, actionCreator]);
}