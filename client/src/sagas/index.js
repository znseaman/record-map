import { all, call, put, takeEvery } from "redux-saga/effects";

import Api from "../lib/api";

import { setLayerHistory, updateFeatures, deleteFeatures, undoLayer, redoLayer, addFeatures, resetLayer, combineFeatures, uncombineFeatures } from "../actions";
import {
  GET_LAYER_HISTORY_FROM_API, UPDATE_LAYER_TO_API,
  DELETE_FEATURES_FROM_LAYER_STORAGE, UNDO_LAYER_TO_LOCAL_STORAGE,
  REDO_LAYER_TO_LOCAL_STORAGE,
  ADD_FEATURES_TO_LAYER_STORAGE,
  RESET_LAYER_TO_LOCAL_STORAGE,
  COMBINE_FEATURES_TO_LAYER_STORAGE,
  UNCOMBINE_FEATURES_TO_LAYER_STORAGE,
} from "../constants";

export default function* rootSaga() {
  yield all([getLayerFromApi(), updateLayerToApi(), deleteFeaturesFromLayerStorage(), undoLayerToLocalStorage(), redoLayerToLocalStorage(), addFeatureToLayerStorage(), resetLayerToLocalStorage(), combineFeatureToLayerStorage(), uncombineFeatureToLayerStorage()]);
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
  yield put(updateFeatures(action.features));
}

export function* deleteFeaturesFromLayerStorage() {
  yield takeEvery(DELETE_FEATURES_FROM_LAYER_STORAGE, makeDeleteRequest);
}

export function* makeDeleteRequest(action) {
  yield call(Api.destroy, action);
  yield put(deleteFeatures(action.features));
}

export function* undoLayerToLocalStorage() {
  yield takeEvery(UNDO_LAYER_TO_LOCAL_STORAGE, makeUndoRequest);
}

export function* makeUndoRequest() {
  yield call(Api.undo);
  yield put(undoLayer());
}

export function* redoLayerToLocalStorage() {
  yield takeEvery(REDO_LAYER_TO_LOCAL_STORAGE, makeRedoRequest);
}

export function* makeRedoRequest() {
  yield call(Api.redo);
  yield put(redoLayer());
}

export function* addFeatureToLayerStorage() {
  yield takeEvery(ADD_FEATURES_TO_LAYER_STORAGE, makeCreateRequest);
}

export function* makeCreateRequest(action) {
  yield call(Api.add, action);
  yield put(addFeatures(action.features));
}

export function* resetLayerToLocalStorage() {
  yield takeEvery(RESET_LAYER_TO_LOCAL_STORAGE, makeResetRequest);
}

export function* makeResetRequest() {
  const layer = yield call(Api.reset);

  yield put(resetLayer(layer));
}

export function* combineFeatureToLayerStorage() {
  yield takeEvery(COMBINE_FEATURES_TO_LAYER_STORAGE, makeCombineRequest);
}

export function* makeCombineRequest(action) {
  yield call(Api.combine, action);
  yield put(combineFeatures(action));
}

export function* uncombineFeatureToLayerStorage() {
  yield takeEvery(UNCOMBINE_FEATURES_TO_LAYER_STORAGE, makeUncombineRequest);
}

export function* makeUncombineRequest(action) {
  yield call(Api.combine, action);
  yield put(uncombineFeatures(action));
}