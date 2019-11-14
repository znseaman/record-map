import {
  GET_LAYER_HISTORY_FROM_API,
  SET_LAYER_HISTORY,
  UNDO_LAYER,
  REDO_LAYER,
  UPDATE_LAYER_TO_API,
  UPDATE_FEATURES,
  DELETE_FEATURES_FROM_LAYER_STORAGE,
  DELETE_FEATURES,
  UNDO_LAYER_TO_LOCAL_STORAGE,
  REDO_LAYER_TO_LOCAL_STORAGE
} from "../constants";

export const getLayerHistoryFromApi = () => ({
  type: GET_LAYER_HISTORY_FROM_API
});
export const setLayerHistory = layer => ({ type: SET_LAYER_HISTORY, layer });

export const undoLayerToLocalStorage = () => ({ type: UNDO_LAYER_TO_LOCAL_STORAGE })
export const undoLayer = () => ({ type: UNDO_LAYER });
export const redoLayerToLocalStorage = () => ({ type: REDO_LAYER_TO_LOCAL_STORAGE })
export const redoLayer = () => ({ type: REDO_LAYER });

export const updateLayerToApi = features => ({ type: UPDATE_LAYER_TO_API, features });
export const updateFeatures = features => ({ type: UPDATE_FEATURES, features });

export const deleteFeaturesFromLayerStorage = features => ({ type: DELETE_FEATURES_FROM_LAYER_STORAGE, features })
export const deleteFeatures = features => ({ type: DELETE_FEATURES, features })