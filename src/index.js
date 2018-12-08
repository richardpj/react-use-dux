
import { createContext, useContext, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import { bindActionCreators } from 'redux';
import shallowEqual from 'shallowequal';

export const ReduxContext = createContext();

ReduxContext.displayName = 'ReduxContext';

const useRefState = initialValue => {

    const [state, setState] = useState(initialValue);
    const stateRef = useRef();

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    return [state, setState, stateRef];
};

export const useReduxState = (selector, memoArray = [], useShallowCompare = false) => {

    const store = useContext(ReduxContext);
    const memoSelector = useCallback(selector, memoArray);
    const [state, setState, stateRef] = useRefState(memoSelector(store.getState()));
    
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const newState = memoSelector(store.getState());
            if(useShallowCompare ? !shallowEqual(stateRef.current, newState) : stateRef.current !== newState) {
                setState(newState);
            }
        });
        return unsubscribe;
    },[store, memoSelector]);
    return state;
};

export const useReduxDispatch = (fn, memoArray = []) => {
    
    const { dispatch } = useContext(ReduxContext);
    const batchedDispatch = useCallback((...args) => batchedUpdates(() => dispatch(...args)), [dispatch]);
    return useMemo(() => actionCreator ? fn(batchedDispatch) : batchedDispatch, [dispatch, ...memoArray]);
};

export const useReduxBindActionCreators = (actionCreators, memoArray = []) => {

    const { dispatch } = useContext(ReduxContext);
    const batchedDispatch = useCallback((...args) => batchedUpdates(() => dispatch(...args)), [dispatch]);
    return useMemo(() => bindActionCreators(actionCreators, batchedDispatch), [dispatch, ...memoArray]);
};