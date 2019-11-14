import { all, call, put, takeEvery } from "redux-saga/effects";

import Api from "../lib/api";

import { setLayerHistory, updateFeatures, deleteFeatures } from "../actions";
import {
  GET_LAYER_HISTORY_FROM_API, UPDATE_LAYER_TO_API,
  DELETE_FEATURES_FROM_LAYER_STORAGE
} from "../constants";

export default function* rootSaga() {
  yield all([getLayerFromApi(), updateLayerToApi(), deleteFeaturesFromLayerStorage()]);
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

export function* deleteFeaturesFromLayerStorage() {
  yield takeEvery(DELETE_FEATURES_FROM_LAYER_STORAGE, makeDeleteRequest);
}

export function* makeDeleteRequest(action) {
  yield call(Api.destroy, action);
  /* @TODO: extract this logging middleware */
  yield call(Api.log);
  yield put(deleteFeatures(action.features));
}