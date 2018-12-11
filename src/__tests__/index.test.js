
import React from 'react';
import ReactDOM from 'react-dom';
import {Store} from 'redux';
import {ReduxContext, useReduxState, useReduxDispatch, useReduxBindActionCreators } from '..';

describe('react-use-dux', () => {
    describe('useReduxState', () => {

        // let state;

        // const createStore = () => ({
        //     dispatch: action => action,
        //     getState: () => state,
        //     subscribe: jest.fn((listener) => {
        //       subscriberCallback = listener;
        //       return jest.fn();
        //     }),
        //     replaceReducer: () =>  undefined,
        //   });

        it('should work', () => {
            expect(true).toBe(true);
        });
    });
});