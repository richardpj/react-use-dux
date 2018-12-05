# react-use-dux

> React bindings for Redux using the new React hooks proposal.

[![NPM](https://img.shields.io/npm/v/react-use-dux.svg)](https://www.npmjs.com/package/react-use-dux) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
  * [`ReduxContextProvider`](#-reduxcontextprovider-)
  * [`useReduxState(stateSelector)`](#-usereduxstate-stateselector--)
  * [`useReduxDispatch(void or actionCreator or array or object)`](#-usereduxdispatch-void-or-actioncreator-or-array-or-object--)
* [Example](#example)
* [FAQ](#faq)
* [Thanks](#thanks)
* [License](#license)

## Installation

```bash
# YARN
yarn add react-redux-use-hooks
# NPM
npm install --save react-redux-use-hooks
```
## Usage

NOTE: React hooks currently require react and react-dom version 16.7.0-alpha.0 or higher.

In order to use the hooks, your Redux store must be in available in the React context from `ReduxContextProvider`.

### `ReduxContextProvider`

Before you can use the hook, you must provide your Redux store via `ReduxContextProvider`:

```jsx
import {createStore} from 'redux';
import {ReduxContextProvider} from 'react-use-dux';

const store = createStore(/*...*/);

ReactDOM.render(
  <ReduxContextProvider value={store}>
    <App />
  </ReduxContextProvider>,
  document.getElementById('root'),
);
```

### `useReduxState(stateSelector = f => f, useShallowCompare = false)`

Runs the given selector function to subscribe to a part of the redux state. Preferably call it for each part of the state to which you subscribe. You may subscribe to several portions of the state using a single selector (not recommended) but you must enable shallow comparison for this to work efficiently.

**NOTE:** It is not necessary to extract or memoize your selector.

It is also possible to subscribe to the entire state by passing void arguments but this is not recommended.

**DO NOT** create deeply nested state subscriptions as this will cause the state subscription to fire for every action as no stronger/deeper form of comparison is supported for performance reasons.

```js
import {useReduxState} from 'react-use-dux';

const MyComponent = (props) => {

    const x = useReduxState(state => state.x);
    const y = useReduxState(state => state.y);
    //OR using shallow comparison
    const { x, y } = useReduxState({ x, y } => ({ x, y }), true);

    return (
        {\* ...JSX... *\}
    );
};
``` 

### `useReduxDispatch(void or actionCreator or array or object)`

Either returns the dispatch method, gives an action creator dispatch, gives and array of action creators dispatch ,or an object (preferred) with action creator properties dispatch.

```js
import {useReduxDispatch} from 'react-use-dux';
import actions from './dux/actions';

const MyComponent = (props) => {

    const dispatch = useReduxDispatch();
    //OR
    const doThing1 = useReduxDispatch(actions.doThing1);
    //OR
    const [ doThing1, doThing2 ] = useReduxDispatch(actions);
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
cd ./redux-use-dux
yarn start

# In another terminal, run `yarn start` in the `example` folder
cd example
yarn start
```

## Thanks

This project was boostrapped using [create-react-library](https://github.com/transitive-bullshit/create-react-library). The code was inspired by the project [redux-react-hook](https://github.com/facebookincubator/redux-react-hook/blob/master/README.md#usemappedstatemapstate) but hopefully I've made some major improvements.

## License

MIT © [richardpj](https://github.com/richardpj)
