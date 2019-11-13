import {
  GET_LAYER_HISTORY_FROM_API,
  SET_LAYER_HISTORY,
  UNDO,
  REDO,
  UPDATE_LAYER_TO_API,
  UPDATE_FEATURES
} from "../constants";

export const getLayerHistoryFromApi = () => ({
  type: GET_LAYER_HISTORY_FROM_API
});
export const setLayerHistory = layer => ({ type: SET_LAYER_HISTORY, layer });

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });

export const updateLayerToApi = features => ({ type: UPDATE_LAYER_TO_API, features });
export const updateFeatures = features => ({ type: UPDATE_FEATURES, features });