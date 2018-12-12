
import { createContext, useContext, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import { bindActionCreators } from 'redux';
import shallowEqual from 'shallowequal';

export const ReduxContext = createContext();

ReduxContext.displayName = 'ReduxContext';

export const reduxBatchUpdateMiddleware = ({dispatch, getState}) => next => action => {
    let retVal;
    batchedUpdates(() => retVal = next(action));
    return retVal;
}

const useRefState = initialValue => {

    const [state, setState] = useState(initialValue);
    const stateRef = useRef();

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    return [state, setState, stateRef];
};

export const useReduxState = (selector, memoArray = []) => {

    const store = useContext(ReduxContext);
    const selectorCb = useCallback(selector, memoArray);
    const newState = selectorCb(store.getState());
    const [state, setState, stateRef] = useRefState(newState);
    if(!shallowEqual(state, newState)) {
        setState(newState); //selector or store changed so update internal state copy.
    }
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const newState = selectorCb(store.getState());
            if(!shallowEqual(stateRef.current, newState)) {
                setState(newState);
            }
        });
        return unsubscribe;
    },[store, selectorCb]);
    return state;
};

export const useReduxDispatch = (fn, memoArray = []) => {
    
    const { dispatch } = useContext(ReduxContext);
    return useMemo(() => fn ? fn(dispatch) : dispatch, [dispatch, ...memoArray]);
};

export const useReduxBindActionCreators = (actionCreators, memoArray = []) => {

    const { dispatch } = useContext(ReduxContext);    
    return useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch, ...memoArray]);
};
