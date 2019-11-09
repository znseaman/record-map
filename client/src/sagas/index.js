import { all, call, put, takeEvery } from "redux-saga/effects";

import Api from "../lib/api";

import { updateLayer } from "../actions";
import { GET_LAYER_FROM_API, POST_LAYER_TO_API } from "../constants";

export default function* rootSaga() {
  yield all([getLayerFromApi(), postLayerToApi()]);
}

export function* getLayerFromApi() {
  yield takeEvery(GET_LAYER_FROM_API, makeGetRequest);
}

export function* makeGetRequest() {
  const layer = yield call(Api.get);
  yield put(updateLayer(layer));
}

export function* postLayerToApi() {
  yield takeEvery(POST_LAYER_TO_API, makePostRequest);
}

export function* makePostRequest(action) {
  const layer = yield call(Api.set, action.layer);
  /* @TODO: extract this logging middleware */
  yield call(Api.log);
  yield put(updateLayer(layer));
}
