import { all, call, put, takeEvery } from "redux-saga/effects";

import Api from "../lib/api";

import { updateLayer } from "../actions";
import { GET_LAYER_FROM_API } from "../constants";

export default function* rootSaga() {
  yield all([getLayerFromApi()]);
}

export function* getLayerFromApi() {
  yield takeEvery(GET_LAYER_FROM_API, makeApiRequest);
}

export function* makeApiRequest() {
  const layer = yield call(Api.get);
  yield put(updateLayer(layer));
}
