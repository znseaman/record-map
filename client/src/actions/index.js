import {
  GET_LAYER_FROM_API,
  POST_LAYER_TO_API,
  UPDATE_LAYER,
  UNDO_UPDATE_LAYER,
  REDO_UPDATE_LAYER
} from "../constants";

export const getLayerFromApi = () => ({ type: GET_LAYER_FROM_API });
export const postLayerToApi = layer => ({ type: POST_LAYER_TO_API, layer });
export const updateLayer = layer => ({ type: UPDATE_LAYER, layer });

export const undoUpdateLayer = () => ({ type: UNDO_UPDATE_LAYER });
export const redoUpdateLayer = () => ({ type: REDO_UPDATE_LAYER });
