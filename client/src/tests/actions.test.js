import {
  GET_LAYER_HISTORY_FROM_API,
  SET_LAYER_HISTORY,
  UNDO_LAYER,
  REDO_LAYER,
  UPDATE_LAYER_TO_API,
  UPDATE_FEATURES,
  DELETE_FEATURES,
  ADD_FEATURES,
} from '../constants'

import { setLayerHistory, getLayerHistoryFromApi, undoLayer, redoLayer, updateLayerToApi, updateFeatures, deleteFeatures, addFeatures } from "../actions";

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

  describe("undoLayer", () => {
    it('should return UNDO_LAYER as the action type', () => {
      const action = undoLayer();
      expect(action.type).toBe(UNDO_LAYER)
    })
  });

  describe("redoLayer", () => {
    it('should return REDO_LAYER as the action type', () => {
      const action = redoLayer();
      expect(action.type).toBe(REDO_LAYER)
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

  describe("deleteFeatures", () => {
    it('should return DELETE_FEATURES as the action type', () => {
      const action = deleteFeatures(features);
      expect(action.type).toBe(DELETE_FEATURES)
    })

    it('should return provided features on the action', () => {
      const action = deleteFeatures(features);
      expect(action.features).toBe(features)
    })
  });

  describe("addFeatures", () => {
    it('should return ADD_FEATURES as the action type', () => {
      const action = addFeatures(features);
      expect(action.type).toBe(ADD_FEATURES)
    })

    it('should return provided features on the action', () => {
      const action = addFeatures(features);
      expect(action.features).toBe(features)
    })
  });
});
