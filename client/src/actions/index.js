import {
  GET_LAYER_HISTORY_FROM_API,
  SET_LAYER_HISTORY,
  UPDATE_LAYER,
  UNDO_UPDATE_LAYER,
  REDO_UPDATE_LAYER,
  UPDATE_LAYER_TO_API,
  UPDATE_FEATURES
} from "../constants";

export const getLayerHistoryFromApi = () => ({
  type: GET_LAYER_HISTORY_FROM_API
});
export const setLayerHistory = layer => ({ type: SET_LAYER_HISTORY, layer });

export const updateLayer = layer => ({ type: UPDATE_LAYER, layer });

export const undoUpdateLayer = () => ({ type: UNDO_UPDATE_LAYER });
export const redoUpdateLayer = () => ({ type: REDO_UPDATE_LAYER });

export const updateLayerToApi = features => ({ type: UPDATE_LAYER_TO_API, features });
export const updateFeatures = features => ({ type: UPDATE_FEATURES, features });