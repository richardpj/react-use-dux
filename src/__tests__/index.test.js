
import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ReduxContext, useReduxState, useReduxDispatch, useReduxBindActionCreators } from '..';

describe('react-use-dux', () => {

    const flushEffects = () => ReactDOM.render(<div />, document.createElement('div'));

    describe('useReduxState', () => {

        const setup = () => {
            let state = { x: 123, y: 'ping' };
            let subscription = {
                cancel: jest.fn(),
            };
            let store = {
                getState: () => state,
                subscribe: jest.fn(subscriber => {
                    subscription.subscriber = subscriber;
                    return subscription.cancel;
                })
            };
            let root = document.createElement('div');
            document.body.appendChild(root);
            let render = (component, theStore = store) => ReactDOM.render(<ReduxContext.Provider value={theStore}>{component}</ReduxContext.Provider>, root);
            let getContent = () => root.innerHTML;
            let unmount = () => ReactDOM.unmountComponentAtNode(root);
            let teardown = () => document.body.removeChild(root);
            return {
                state,
                subscription,
                store,
                render,
                getContent,
                unmount,
                teardown,
            };
        };
        
        const createMapState = z => state => z === 0 ? state.y : `${state.y} - z: ${z}`;

        const Component = ({z = 0, cacheError = false}) => {
            const y = useReduxState(createMapState(z), [cacheError ? 0 : z]);
            const renderCountRef = useRef(1);
            useEffect(() => {
                renderCountRef.current = renderCountRef.current + 1;
            });
            return <React.Fragment>{y} - renders: {renderCountRef.current}</React.Fragment>;
        };

        it('renders with state from the store', () => {
            
            let {
                state,
                subscription,
                store,
                render,
                getContent,
                unmount,
                teardown,
            } = setup();

            render(<Component />);

            flushEffects();

            expect(getContent()).toBe('ping - renders: 1');
            expect(store.subscribe).toBeCalledTimes(1);
            expect(subscription.cancel).toBeCalledTimes(0);

            teardown();
        });

        it('renders with new state after update', () => {
            
            let {
                state,
                subscription,
                store,
                render,
                getContent,
                unmount,
                teardown,
            } = setup();

            debugger;

            render(<Component />);

            flushEffects();

            state.y = 'not ping';
    
            subscription.subscriber();

            expect(getContent()).toBe('not ping - renders: 2');
            expect(subscription.cancel).toBeCalledTimes(0);
            expect(store.subscribe).toBeCalledTimes(1);

            teardown();
        });

        it('does not rerender when unmapped state changes', () => {
            
            let {
                state,
                subscription,
                store,
                render,
                getContent,
                unmount,
                teardown,
            } = setup();

            debugger;

            render(<Component />);

            flushEffects();

            state.x = 456;
    
            subscription.subscriber();

            expect(getContent()).toBe('ping - renders: 1');
            expect(subscription.cancel).toBeCalledTimes(0);
            expect(store.subscribe).toBeCalledTimes(1);

            teardown();
        });

        it('unsubscribes from store state when unmounted', () => {
            
            let {
                state,
                subscription,
                store,
                render,
                getContent,
                unmount,
                teardown,
            } = setup();

            render(<Component />);

            flushEffects();

            expect(store.subscribe).toBeCalledTimes(1);
            expect(subscription.cancel).toBeCalledTimes(0);

            unmount();

            expect(subscription.cancel).toBeCalledTimes(1);
            expect(store.subscribe).toBeCalledTimes(1);

            teardown();
        });

        it('resubscribes to store when store changed', () => {
            
            let {
                state,
                subscription,
                store,
                render,
                getContent,
                unmount,
                teardown,
            } = setup();

            render(<Component />);

            flushEffects();

            store = {...store};
            state.y = 'not ping';

            render(<Component/>, store);

            flushEffects();

            expect(getContent()).toBe('not ping - renders: 2')
            expect(subscription.cancel).toBeCalledTimes(1);
            expect(store.subscribe).toBeCalledTimes(2);

            teardown();
        });

        it('resubscribes to store when selector changed', () => {
            
            let {
                state,
                subscription,
                store,
                render,
                getContent,
                unmount,
                teardown,
            } = setup();

            render(<Component z={11} />);

            flushEffects();

            render(<Component z={99} />);

            flushEffects();

            expect(getContent()).toBe('ping - z: 99 - renders: 2')
            expect(subscription.cancel).toBeCalledTimes(1);
            expect(store.subscribe).toBeCalledTimes(2);

            teardown();
        });

        it('respects memoArray, caches selector, and does not resubscribe', () => {
            
            let {
                state,
                subscription,
                store,
                render,
                getContent,
                unmount,
                teardown,
            } = setup();

            render(<Component z={11} cacheError={true} />);

            flushEffects();

            render(<Component z={99} cacheError={true} />);

            flushEffects();

            expect(getContent()).toBe('ping - z: 11 - renders: 2')
            expect(subscription.cancel).toBeCalledTimes(0);
            expect(store.subscribe).toBeCalledTimes(1);

            teardown();
        });

        it('does not resubscribe to store when store or selector unchanged', () => {
            
            let {
                state,
                subscription,
                store,
                render,
                getContent,
                unmount,
                teardown,
            } = setup();

            render(<Component />);

            flushEffects();

            render(<Component/>);

            flushEffects();

            expect(getContent()).toBe('ping - renders: 2')
            expect(subscription.cancel).toBeCalledTimes(0);
            expect(store.subscribe).toBeCalledTimes(1);

            teardown();
        });

    });

    const setup = () => {
        
        let store = {
            dispatch: jest.fn(f => f)
        };
        let root = document.createElement('div');
        document.body.appendChild(root);
        let render = (component, theStore = store) => ReactDOM.render(<ReduxContext.Provider value={theStore}>{component}</ReduxContext.Provider>, root);
        let getContent = () => root.innerHTML;
        let teardown = () => document.body.removeChild(root);
        return {
            store,
            render,
            getContent,
            teardown,
        };
    };

    describe('useReduxDispatch', () => {

        it('returns dispatch when called without arguments', () => {

            let {
                store,
                render,
                getContent,
                teardown,
            } = setup();
            
            const DispatchComponent = () => {
                
                const dispatch = useReduxDispatch();
                
                let validation = dispatch === store.dispatch ? 'true' : 'false';

                return <React.Fragment>{validation}</React.Fragment>;
            };

            render(<DispatchComponent />);

            expect(getContent()).toBe('true');

            teardown();
        });

        it('injects dispatch into dispatcher factory method and returns dispatcher', () => {

            let {
                store,
                render,
                getContent,
                teardown,
            } = setup();
            
            const DispatchComponent = () => {
                
                const dispatcher = useReduxDispatch(dispatch => ({ dispatch }));
                
                let validation = dispatcher.dispatch === store.dispatch ? 'true' : 'false';

                return <React.Fragment>{validation}</React.Fragment>;
            };

            render(<DispatchComponent />);

            expect(getContent()).toBe('true');

            teardown();
        });

        it('memoizes the dispatcher', () => {

            let {
                store,
                render,
                getContent,
                teardown,
            } = setup();
            
            const DispatchRefComponent = () => {
                
                const dispatcher = useReduxDispatch(dispatch => ({ dispatch }));
                const dispatcherRef = useRef(dispatcher);

                let validation = dispatcher === dispatcherRef.current ? 'true' : 'false';

                return <React.Fragment>{validation}</React.Fragment>;
            };

            render(<DispatchRefComponent />);
            render(<DispatchRefComponent />);

            expect(getContent()).toBe('true');

            teardown();
        });

        it('respects memoArray and invalidates the cached dispatcher', () => {

            let {
                store,
                render,
                getContent,
                teardown,
            } = setup();
            
            const DispatchRefComponent = ({ x }) => {
                
                const dispatcher = useReduxDispatch(dispatch => ({ dispatch }), [x]);
                const dispatcherRef = useRef(dispatcher);

                let validation = dispatcher === dispatcherRef.current ? 'true' : 'false';

                return <React.Fragment>{validation}</React.Fragment>;
            };

            render(<DispatchRefComponent x={1} />);
            render(<DispatchRefComponent x={2} />);

            expect(getContent()).toBe('false');

            teardown();
        });

    });

    describe('useReduxBindActionCreators', () => {
        
        it('gives an actioncreator function dispatch', () => {
        
            let {
                store,
                render,
                getContent,
                teardown,
            } = setup();
            
            let actionCreator;
            let action;
            const ActionDispatchComponent = () => {
                
                actionCreator = jest.fn(action => action);
                const dispatchAction = useReduxBindActionCreators(actionCreator);
                action = { action: 'action'};
                dispatchAction(action)

                return <React.Fragment>{'ping'}</React.Fragment>;
            };

            render(<ActionDispatchComponent />);

            expect(actionCreator).toBeCalledWith(action);
            expect(store.dispatch).toBeCalledWith(action);

            teardown();
        });

        it('memoizes dispatched actioncreator functions', () => {
        
            let {
                store,
                render,
                getContent,
                teardown,
            } = setup();
            
            let actionCreator;
            let action;
            const ActionDispatchComponent = () => {
                
                actionCreator = jest.fn(action => action);
                const dispatchAction = useReduxBindActionCreators(actionCreator);
                const dispatcherActionRef = useRef(dispatchAction);
                action = { action: 'action'};
                dispatchAction(action)

                let validation = dispatcherActionRef.current === dispatchAction ? 'true' : 'false'

                return <React.Fragment>{validation}</React.Fragment>;
            };

            render(<ActionDispatchComponent />);
            render(<ActionDispatchComponent />);

            expect(getContent()).toBe('true');

            teardown();
        });

        it('respects the memoArray and invalidates cached dispatched actioncreator functions', () => {
        
            let {
                store,
                render,
                getContent,
                teardown,
            } = setup();
            
            let actionCreator;
            let action;
            const ActionDispatchComponent = (x) => {
                
                actionCreator = jest.fn(action => action);
                const dispatchAction = useReduxBindActionCreators(actionCreator, [x]);
                const dispatcherActionRef = useRef(dispatchAction);
                action = { action: 'action'};
                dispatchAction(action)

                let validation = dispatcherActionRef.current === dispatchAction ? 'true' : 'false'

                return <React.Fragment>{validation}</React.Fragment>;
            };

            render(<ActionDispatchComponent x={1} />);
            render(<ActionDispatchComponent x={2} />);

            expect(getContent()).toBe('false');

            teardown();
        });

        it('gives an actioncreator object dispatch', () => {
        
            let {
                store,
                render,
                getContent,
                teardown,
            } = setup();
            
            let actionCreator;
            let action1, action2;
            const ActionDispatchComponent = () => {
                
                actionCreator = {
                    action1: jest.fn(action => action),
                    action2: jest.fn(action => action),
                };
                const dispatchAction = useReduxBindActionCreators(actionCreator);
                action1 = { action: 'action1'};
                action2 = { action: 'action2'};
                dispatchAction.action1(action1)
                dispatchAction.action2(action2)

                return <React.Fragment>{'ping'}</React.Fragment>;
            };

            render(<ActionDispatchComponent />);

            expect(actionCreator.action1).toBeCalledTimes(1);
            expect(actionCreator.action1).toBeCalledWith(action1);
            expect(actionCreator.action2).toBeCalledTimes(1);
            expect(actionCreator.action2).toBeCalledWith(action2);
            expect(store.dispatch).toBeCalledTimes(2);
            expect(store.dispatch).toBeCalledWith(action1);
            expect(store.dispatch).toBeCalledWith(action2);

            teardown();
        });

        it('memoizes dispatched actioncreator objects', () => {
        
            let {
                store,
                render,
                getContent,
                teardown,
            } = setup();
            
            let actionCreator;
            let action1, action2;
            const ActionDispatchComponent = () => {
                
                actionCreator = {
                    action1: jest.fn(action => action),
                    action2: jest.fn(action => action),
                };
                const dispatchAction = useReduxBindActionCreators(actionCreator);
                const dispatcherActionRef = useRef(dispatchAction);
                
                let validation = dispatcherActionRef.current === dispatchAction ? 'true' : 'false'

                return <React.Fragment>{validation}</React.Fragment>;
            };

            render(<ActionDispatchComponent />);
            render(<ActionDispatchComponent />);

            expect(getContent()).toBe('true');

            teardown();
        });

        it('respects the memoArray and invalidates the cached dispatched actioncreator objects', () => {
        
            let {
                store,
                render,
                getContent,
                teardown,
            } = setup();
            
            let actionCreator;
            let action1, action2;
            const ActionDispatchComponent = (x) => {
                
                actionCreator = {
                    action1: jest.fn(action => action),
                    action2: jest.fn(action => action),
                };
                const dispatchAction = useReduxBindActionCreators(actionCreator, [x]);
                const dispatcherActionRef = useRef(dispatchAction);
                
                let validation = dispatcherActionRef.current === dispatchAction ? 'true' : 'false'

                return <React.Fragment>{validation}</React.Fragment>;
            };

            render(<ActionDispatchComponent x={1} />);
            render(<ActionDispatchComponent x={2} />);

            expect(getContent()).toBe('false');

            teardown();
        });
    });
});