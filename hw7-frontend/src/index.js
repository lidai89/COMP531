import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import Hello from './hello'
require('./ricebook.css')
const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(logger,thunkMiddleware))

render(
    <Provider store={store}>
        <Hello />
    </Provider>,
    document.getElementById('app')
)
