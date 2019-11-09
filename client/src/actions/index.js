import { GET_LAYER_FROM_API, UPDATE_LAYER } from "../constants";

export const getLayerFromApi = () => ({ type: GET_LAYER_FROM_API });
export const updateLayer = layer => ({ type: UPDATE_LAYER, layer });
