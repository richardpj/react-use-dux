# react-use-dux

> React bindings for Redux using the new React hooks proposal.

[![NPM](https://img.shields.io/npm/v/react-use-dux.svg)](https://www.npmjs.com/package/react-use-dux) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
  * [`ReduxContext` and `reduxBatchUpdateMiddleware`](#reduxcontext-and-reduxbatchupdatemiddleware)
  * [`useReduxState(selector, memoArray)`](#usereduxstateselector-memoarray)
  * [`useReduxDispatch(dispatcherFactory, memoArray)`](#usereduxdispatchdispatcherfactory-memoarray)
  * [`useReduxBindActionCreators(actionCreator, memoArray)`](#usereduxbindactioncreatorsactioncreator-memoarray)
* [Example](#example)
* [Changes](#changes)
* [Thanks](#thanks)
* [License](#license)

## Installation

```bash
# YARN
yarn add react-use-dux
# NPM
npm install --save react-use-dux
```
## Usage

NOTE: React hooks currently require react and react-dom version 16.7.0-alpha.0 or higher.

In order to use the hooks, your Redux store must be available in the React context from `ReduxContext.Provider`.

### `ReduxContext` and `reduxBatchUpdateMiddleware`

Before you can use the hook, you must provide your Redux store via `ReduxContext.Provider`. Additionally it is recommended that you apply the supplied `reduxBatchUpdateMiddleware` to your store in order to guarantee that actions that may cause cascading re-renders will be batched into one render. This is due to the way that `react-use-dux` uses the built in state hook under the hood. It is envisioned that react will prevent these setState cascading updates in the future so hopefully this feature can be removed in a later release.

```jsx
import {createStore, compose, applyMiddleware} from 'redux';
import {ReduxContext, reduxBatchUpdateMiddleware} from 'react-use-dux';

const store = createStore(/*...*/,compose(applyMiddleware(/*...*/, reduxBatchUpdateMiddleware)));

ReactDOM.render(
  <ReduxContext.Provider value={store}>
    <App />
  </ReduxContext.Provider>,
  document.getElementById('root'),
);
```

### `useReduxState(selector, memoArray)`

Runs the given selector function to subscribe to a part of the redux state. Preferably call it for each part of the state to which you subscribe. You may subscribe to several portions of the state using a single selector (not recommended). Shallow comparison is now supported by default but can be turned off. This option will be removed in a later version as it will probably cause issues.

Your selector will be memoized using the provided memoArray argument. Ensure that all values captured by the selector function are included in the memoArray.

It is also possible to subscribe to the entire state by passing void arguments but this is not recommended.

Avoid creating deeply nested state subscriptions as this will cause the state subscription to fire for every action as no stronger/deeper form of comparison is supported for performance reasons.
```js
import {useReduxState} from 'react-use-dux';

const MyComponent = (props) => {

    const x = useReduxState(state => state.x);
    const y = useReduxState(state => state.y);
    //OR using shallow comparison
    const { x, y } = useReduxState(({ x, y }) => ({ x, y }), [], true);

    return (
        {\* ...JSX... *\}
    );
};
``` 
Avoid capture of subscribed state values in the selectors of subsequent subscriptions as this will cause anomalous behaviour.
```js
//Avoid...
const filter = useReduxState(state => state.filter);
const filteredTodos = useReduxState(state => state.todos.filter(filter), [filter]); //fail sauce.
//Rather...
const filteredTodos = useReduxState(state => state.todos.filter(state.filter));
```
If you really want to reuse selectors think about adopting a library like [reselect](https://github.com/reduxjs/reselect). If you look at the provided example application you'll see that it includes the use of reselect as well as argument currying to make it more clear when values are captured and should be added to the memoArray.

### `useReduxDispatch(dispatcherFactory, memoArray)`

Either returns the dispatch method, or returns the result of executing the provided dispatcher factory method.

The output of this method will be memoized using the provided memoArray argument. Ensure that all values captured in your provided function are included in the memoArray.
```js
import {useReduxDispatch} from 'react-use-dux';

const MyComponent = (props) => {

    const dispatch = useReduxDispatch();
    //OR
    const dispatcher = useReduxDispatch(dispatch => { /* create dispatcher */ });
    
    return (
        {\* ...JSX... *\}
    );
};
```
### `useReduxBindActionCreators(actionCreator, memoArray)`

Either gives an action creator function dispatch, or gives an object (preferred) with action creator function properties dispatch.

The output of this method will be memoized using the provided memoArray argument. Ensure that all values captured in your provided function(s) are included in the memoArray.
```js
import {useReduxBindActionCreators} from 'react-use-dux';
import actions from './dux/actions';

const MyComponent = (props) => {

    const doThing1 = useReduxBindActionCreators(actions.doThing1);
    //OR
    const { doThing1, doThing2 } = useReduxBindActionCreators(actions);


    return (
        {\* ...JSX... *\}
    );
};
```
## Example

To run the example project locally:

```bash
# In one terminal, run `yarn start` in the root to rebuild the library itself
cd ./react-use-dux
yarn start

# In another terminal, run `yarn start` in the `example` folder
cd example
yarn start
```
## Changes

This API has been evolving rapidly as I've experimented with it and measured the performance and usability of various design choices. It is more stable now and you can adopt it (please no prod deployment until the react team releases hooks!) without fear of breaking changes for now.

That said if you feel strongly about geting it changed (or heaven forfen you've found a bug) you're welcome to raise an [issue](https://github.com/richardpj/react-use-dux/issues) or [pull request](https://github.com/richardpj/react-use-dux/pulls).

## Thanks

This project was boostrapped using [create-react-library](https://github.com/transitive-bullshit/create-react-library). The code was inspired by the project [redux-react-hook](https://github.com/facebookincubator/redux-react-hook) but with a few improvements. Thanks also to [@ianobermiller](https://github.com/ianobermiller) for providing some great feedback leading to some great improvements in version 2.

## License

MIT © [richardpj](https://github.com/richardpj)
