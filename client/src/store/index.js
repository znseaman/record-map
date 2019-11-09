import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";
import saga from "../sagas";

import reducers from "../reducers";
import initialState from "./initialState";
import { getLayerFromApi } from "../actions";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

/* The saga begins! */
sagaMiddleware.run(saga);

// store.dispatch(getLayerFromApi());

export default store;
