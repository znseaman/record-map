import { all, call, put, takeEvery } from "redux-saga/effects";

import Api from "../lib/api";

import { setLayerHistory, updateLayer } from "../actions";
import { GET_LAYER_HISTORY_FROM_API, POST_LAYER_TO_API } from "../constants";

export default function* rootSaga() {
  yield all([getLayerFromApi(), postLayerToApi()]);
}

export function* getLayerFromApi() {
  yield takeEvery(GET_LAYER_HISTORY_FROM_API, makeGetRequest);
}

export function* makeGetRequest() {
  const { layer } = yield call(Api.get);
  /* @TODO: make option to stop remove cache from localforage for past & future within browser */
  const startFresh = {
    past: [],
    present: layer.present || {},
    future: []
  };

  yield put(setLayerHistory(startFresh));
}

export function* postLayerToApi() {
  yield takeEvery(POST_LAYER_TO_API, makePostRequest);
}

export function* makePostRequest(action) {
  const { layer } = yield call(Api.set, action.layer);
  /* @TODO: extract this logging middleware */
  yield call(Api.log);
  yield put(updateLayer(layer));
}
