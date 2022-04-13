import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import rootSaga from './saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
  // composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
export { store };
