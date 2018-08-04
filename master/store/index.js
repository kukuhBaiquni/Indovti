import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from '../actions/sagas'

const sagaMiddleware = createSagaMiddleware()
const enhancer = compose(applyMiddleware(sagaMiddleware))
export const store = createStore(rootReducer, enhancer)
sagaMiddleware.run(rootSaga)
