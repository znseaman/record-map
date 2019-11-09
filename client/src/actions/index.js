import {
  GET_LAYER_FROM_API,
  POST_LAYER_TO_API,
  UPDATE_LAYER
} from "../constants";

export const getLayerFromApi = () => ({ type: GET_LAYER_FROM_API });
export const postLayerToApi = layer => ({ type: POST_LAYER_TO_API, layer });
export const updateLayer = layer => ({ type: UPDATE_LAYER, layer });
