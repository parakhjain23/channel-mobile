import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer'

const createDebugger = require('redux-flipper').default;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  // mount it on the Store
  rootReducer,
  applyMiddleware(sagaMiddleware, createDebugger()),
);
sagaMiddleware.run(rootSaga);

export { store };
export const persistor = persistStore(store);