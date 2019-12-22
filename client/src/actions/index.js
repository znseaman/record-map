import {
  GET_LAYER_HISTORY_FROM_API,
  SET_LAYER_HISTORY,
  UNDO_LAYER,
  REDO_LAYER,
  RESET_LAYER,
  UPDATE_LAYER_TO_API,
  UPDATE_FEATURES,
  DELETE_FEATURES_FROM_LAYER_STORAGE,
  DELETE_FEATURES,
  UNDO_LAYER_TO_LOCAL_STORAGE,
  REDO_LAYER_TO_LOCAL_STORAGE,
  RESET_LAYER_TO_LOCAL_STORAGE,
  ADD_FEATURES_TO_LAYER_STORAGE,
  ADD_FEATURES,
  COMBINE_FEATURES_TO_LAYER_STORAGE,
  COMBINE_FEATURES,
  UNCOMBINE_FEATURES_TO_LAYER_STORAGE,
  UNCOMBINE_FEATURES
} from "../constants";

export const getLayerHistoryFromApi = () => ({
  type: GET_LAYER_HISTORY_FROM_API
});
export const setLayerHistory = layer => ({ type: SET_LAYER_HISTORY, layer });

export const undoLayerToLocalStorage = () => ({ type: UNDO_LAYER_TO_LOCAL_STORAGE })
export const undoLayer = () => ({ type: UNDO_LAYER });
export const redoLayerToLocalStorage = () => ({ type: REDO_LAYER_TO_LOCAL_STORAGE })
export const redoLayer = () => ({ type: REDO_LAYER });
export const resetLayerToLocalStorage = () => ({ type: RESET_LAYER_TO_LOCAL_STORAGE })
export const resetLayer = layer => ({ type: RESET_LAYER, layer });

export const updateLayerToApi = features => ({ type: UPDATE_LAYER_TO_API, features });
export const updateFeatures = features => ({ type: UPDATE_FEATURES, features });

export const deleteFeaturesFromLayerStorage = features => ({ type: DELETE_FEATURES_FROM_LAYER_STORAGE, features })
export const deleteFeatures = features => ({ type: DELETE_FEATURES, features })

export const addFeaturesToLayerStorage = features => ({ type: ADD_FEATURES_TO_LAYER_STORAGE, features })
export const addFeatures = features => ({ type: ADD_FEATURES, features })

export const combineFeaturesToLayerStorage = ({ deletedFeatures, createdFeatures }) => ({ type: COMBINE_FEATURES_TO_LAYER_STORAGE, deletedFeatures, createdFeatures })
export const combineFeatures = ({ deletedFeatures, createdFeatures }) => ({ type: COMBINE_FEATURES, deletedFeatures, createdFeatures })

export const uncombineFeaturesToLayerStorage = ({ deletedFeatures, createdFeatures }) => ({ type: UNCOMBINE_FEATURES_TO_LAYER_STORAGE, deletedFeatures, createdFeatures })
export const uncombineFeatures = ({ deletedFeatures, createdFeatures }) => ({ type: UNCOMBINE_FEATURES, deletedFeatures, createdFeatures })