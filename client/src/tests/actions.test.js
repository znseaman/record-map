import {
  GET_LAYER_HISTORY_FROM_API,
  SET_LAYER_HISTORY,
  UNDO,
  REDO,
  UPDATE_LAYER_TO_API,
  UPDATE_FEATURES
} from '../constants'

import { setLayerHistory, getLayerHistoryFromApi, undo, redo, updateLayerToApi, updateFeatures } from "../actions";

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

  describe("undo", () => {
    it('should return UNDO as the action type', () => {
      const action = undo();
      expect(action.type).toBe(UNDO)
    })
  });

  describe("redo", () => {
    it('should return REDO as the action type', () => {
      const action = redo();
      expect(action.type).toBe(REDO)
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
