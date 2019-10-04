import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducers from '../redux/reducers';
import rootSagas from '../redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
// const store = createStore(rootReducers);

sagaMiddleware.run(rootSagas);

export default store;
