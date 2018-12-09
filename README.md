# react-use-dux

> React bindings for Redux using the new React hooks proposal.

[![NPM](https://img.shields.io/npm/v/react-use-dux.svg)](https://www.npmjs.com/package/react-use-dux) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
  * [ReduxContext](#reduxcontext)
  * [useReduxState](#usereduxstate)
  * [useReduxDispatch](#usereduxdispatch)
  * [useReduxBindActionCreators](#usereduxbindactioncreators)
* [Example](#example)
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

### ReduxContext

Before you can use the hook, you must provide your Redux store via `ReduxContext.Provider`:

```jsx
import {createStore} from 'redux';
import {ReduxContext} from 'react-use-dux';

const store = createStore(/*...*/);

ReactDOM.render(
  <ReduxContext.Provider value={store}>
    <App />
  </ReduxContext.Provider>,
  document.getElementById('root'),
);
```

### useReduxState

#### `useReduxState(selector = f => f, memoArray = [], useShallowCompare = false)`

Runs the given selector function to subscribe to a part of the redux state. Preferably call it for each part of the state to which you subscribe. You may subscribe to several portions of the state using a single selector (not recommended) but you must enable shallow comparison for this to work efficiently.

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
It is an antipattern to capture subscribed state values in the selectors of subsequent subscriptions and will cause anomalous behaviour. If you must do it then use a ref but rather avoid it entirely.

```js
//Avoid...
const filter = useReduxState(state => state.filter);
const filteredTodos = useReduxState(state => state.todos.filter(filter), [filter]); //fail sauce.
//Rather...
const filteredTodos = useReduxState(state => state.todos.filter(state.filter));
```

### useReduxDispatch

#### `useReduxDispatch(void | dispatch => any, memoArray = [])`

Either returns the dispatch method, or returns the result of executing the provided method.

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

### useReduxBindActionCreators

#### `useReduxBindActionCreators(actionCreator | actionCreatorObject, memoArray = [])`

Either gives an action creator dispatch, or gives an object (preferred) with action creator properties dispatch.

**NOTE:** The output of this method will be memoized using the provided memoArray argument. Ensure that all values captured in your provided function(s) are included in the memoArray.

```js
import {useReduxDispatch} from 'react-use-dux';
import actions from './dux/actions';

const MyComponent = (props) => {

    const doThing1 = useReduxDispatch(actions.doThing1);
    //OR
    const { doThing1, doThing2 } = useReduxDispatch(actions);


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

## Thanks

This project was boostrapped using [create-react-library](https://github.com/transitive-bullshit/create-react-library). The code was inspired by the project [redux-react-hook](https://github.com/facebookincubator/redux-react-hook) but with a few improvements. Thanks also to [@ianobermiller](https://github.com/ianobermiller) for providing some great feedback leading to some great improvements in version 2.

## License

MIT © [richardpj](https://github.com/richardpj)
