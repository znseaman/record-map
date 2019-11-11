import {
  GET_LAYER_HISTORY_FROM_API,
  SET_LAYER_HISTORY,
  UPDATE_LAYER,
  UNDO_UPDATE_LAYER,
  REDO_UPDATE_LAYER,
  UPDATE_LAYER_TO_API,
  UPDATE_FEATURES
} from '../constants'

import { setLayerHistory, getLayerHistoryFromApi, updateLayer, undoUpdateLayer, redoUpdateLayer, updateLayerToApi, updateFeatures } from "../actions";

import initialState from '../store/initialState';
import features from '../data/features';

describe('Layer Actions', () => {
  describe("getLayerHistoryFromApi", () => {
    it('should return GET_LAYER_HISTORY_FROM_API as the action type', () => {
      const action = getLayerHistoryFromApi();
      expect(action.type).toBe(GET_LAYER_HISTORY_FROM_API)
    })
  });

  describe("setLayerHistory", () => {
    it('should return SET_LAYER_HISTORY as the action type', () => {
      const { layer } = initialState;
      const action = setLayerHistory(layer);
      expect(action.type).toBe(SET_LAYER_HISTORY)
    })

    it('should return provided layer on the action', () => {
      const { layer } = initialState;
      const action = setLayerHistory(layer);
      expect(action.layer).toBe(layer)
    })
  });

  describe("updateLayer", () => {
    it('should return UPDATE_LAYER as the action type', () => {
      const { layer: { present: layer } } = initialState;
      const action = updateLayer(layer);
      expect(action.type).toBe(UPDATE_LAYER)
    })

    it('should return provided layer on the action', () => {
      const { layer: { present: layer } } = initialState;
      const action = updateLayer(layer);
      expect(action.layer).toBe(layer)
    })
  });

  describe("undoUpdateLayer", () => {
    it('should return UNDO_UPDATE_LAYER as the action type', () => {
      const action = undoUpdateLayer();
      expect(action.type).toBe(UNDO_UPDATE_LAYER)
    })
  });

  describe("redoUpdateLayer", () => {
    it('should return REDO_UPDATE_LAYER as the action type', () => {
      const action = redoUpdateLayer();
      expect(action.type).toBe(REDO_UPDATE_LAYER)
    })
  });

  describe("updateLayerToApi", () => {
    it('should return UPDATE_LAYER_TO_API as the action type', () => {
      const action = updateLayerToApi(features);
      expect(action.type).toBe(UPDATE_LAYER_TO_API)
    })

    it('should return provided features on the action', () => {
      const action = updateLayerToApi(features);
      expect(action.features).toBe(features)
    })
  });

  describe("updateFeatures", () => {
    it('should return UPDATE_FEATURES as the action type', () => {
      const action = updateFeatures(features);
      expect(action.type).toBe(UPDATE_FEATURES)
    })

    it('should return provided features on the action', () => {
      const action = updateFeatures(features);
      expect(action.features).toBe(features)
    })
  });
});
