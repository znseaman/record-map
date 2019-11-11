import { all, call, put, takeEvery } from "redux-saga/effects";

import Api from "../lib/api";

import { setLayerHistory, updateFeatures } from "../actions";
import { GET_LAYER_HISTORY_FROM_API, UPDATE_LAYER_TO_API } from "../constants";

export default function* rootSaga() {
  yield all([getLayerFromApi(), updateLayerToApi()]);
}

export function* getLayerFromApi() {
  yield takeEvery(GET_LAYER_HISTORY_FROM_API, makeGetRequest);
}

export function* makeGetRequest() {
  const { layer } = yield call(Api.get);
  yield put(setLayerHistory(layer));
}

export function* updateLayerToApi() {
  yield takeEvery(UPDATE_LAYER_TO_API, makeUpdateRequest);
}

export function* makeUpdateRequest(action) {
  yield call(Api.update, action);
  /* @TODO: extract this logging middleware */
  yield call(Api.log);
  yield put(updateFeatures(action.features));
}
