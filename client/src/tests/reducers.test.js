import { undo, redo, updateFeatures, deleteFeatures } from '../actions';

import reducer from '../reducers';
import initialState from '../store/initialState';
import features from '../data/features';

describe('Combined Reducer', () => {
  it('should match the inital state', () => {
    expect(reducer(initialState, {})).toBe(initialState)
  })
})

describe('Layer Reducer', () => {
  describe('updateFeatures', () => {
    it('should unshift 1 feature onto empty present.features', () => {
      const [first] = features;
      const action = updateFeatures([first]);
      const state = reducer(initialState, action);

      expect(state.layer.past.length).toBe(1);
      expect(state.layer.past[0]).toBe(initialState.layer.present);

      expect(state.layer.present.features.length).toBe(1);
      expect(state.layer.present.features[0]).toBe(first);
      expect(state.layer.future.length).toBe(0);
    })

    it('should unshift 4 features to present.features if present.features is empty', () => {
      const action = updateFeatures(features);
      const state = reducer(initialState, action);

      expect(state.layer.past.length).toBe(1);
      expect(state.layer.past[0]).toBe(initialState.layer.present);

      expect(state.layer.present.features.length).toBe(4);
      expect(state.layer.present.features[0]).toBe(features[3]);
      expect(state.layer.present.features[1]).toBe(features[2]);
      expect(state.layer.present.features[2]).toBe(features[1]);
      expect(state.layer.present.features[3]).toBe(features[0]);
      expect(state.layer.future.length).toBe(0);
    })

    it('should update 1 feature if id exists in present.features', () => {
      const oneAdded = {
        past: [{ ...initialState.layer.present }],
        present: { ...initialState.layer.present, features: [features[0]] },
        future: []
      };
      const coordinates = [
        -105,
        40
      ];
      const subZeroFeatureModified = {
        ...features[0],
        geometry: {
          ...features[0].geometry,
          coordinates
        }
      };
      const action = updateFeatures([subZeroFeatureModified]);
      const state = reducer({ layer: oneAdded }, action);

      expect(state.layer.past.length).toBe(2);
      expect(state.layer.past[0]).toBe(oneAdded.present);
      expect(state.layer.past[1]).toBe(oneAdded.past[0]);

      expect(state.layer.present.features.length).toBe(1);
      expect(state.layer.present.features[0].id).toBe(features[0].id);
      expect(state.layer.present.features[0].type).toBe(features[0].type);
      expect(state.layer.present.features[0].properties).toBe(features[0].properties);
      expect(state.layer.present.features[0].geometry.type).toBe(features[0].geometry.type);
      expect(state.layer.present.features[0].geometry.coordinates).not.toBe(features[0].geometry.coordinates);
      expect(state.layer.present.features[0].geometry.coordinates[0]).toBe(coordinates[0]);
      expect(state.layer.present.features[0].geometry.coordinates[1]).toBe(coordinates[1]);

      expect(state.layer.future.length).toBe(0);
    })
  })

  describe('deleteFeatures', () => {
    it('should remove the 2 features if they are within the present.features', () => {
      const [first, second] = features;
      const oneAdded = {
        past: [{ ...initialState.layer.present }],
        present: { ...initialState.layer.present, features: [first, second] },
        future: []
      };
      const action = deleteFeatures([first, second]);
      const state = reducer({ layer: oneAdded }, action);

      expect(state.layer.present.features.length).toBe(0);
      expect(state.layer.past.length).toBe(2);
      expect(state.layer.past[0].features[0]).toBe(first);
      expect(state.layer.past[0].features[1]).toBe(second);
      expect(state.layer.future.length).toBe(0);
    })
  })

  describe('undo', () => {
    it('should match the state passed in if the past is empty', () => {
      const action = undo();
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    })

    it('should push the current present to the future, shift the sub zero of past to the present and set past to the rest of past', () => {
      const oneAdded = {
        past: [{ ...initialState.layer.present }],
        present: { ...initialState.layer.present, features: [features[0]] },
        future: []
      };
      const action = undo();
      const state = reducer({ layer: oneAdded }, action);

      expect(state.layer.past.length).toBe(0);

      expect(state.layer.present.features.length).toBe(0);
      expect(state.layer.present).toBe(oneAdded.past[0]);

      expect(state.layer.future.length).toBe(1);
      expect(state.layer.future[0]).toBe(oneAdded.present);
    })
  })

  describe('redo', () => {
    it('should match the state passed in if the future is empty', () => {
      const action = redo();
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    })

    it('should push the sub zero of future to present, shift the sub zero of past to the present and push present to past', () => {
      const oneUndo = {
        past: [],
        present: { ...initialState.layer.present },
        future: [{ ...initialState.layer.present, features: [features[0]] }]
      };
      const action = redo();
      const state = reducer({ layer: oneUndo }, action);

      expect(state.layer.past.length).toBe(1);
      expect(state.layer.past[0]).toBe(oneUndo.present);

      expect(state.layer.present.features.length).toBe(1);
      expect(state.layer.present).toBe(oneUndo.future[0]);

      expect(state.layer.future.length).toBe(0);
    })
  })
})