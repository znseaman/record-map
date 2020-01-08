import uuid from 'uuid/v4'
import { undoLayer, redoLayer, updateFeatures, deleteFeatures, addFeatures, combineFeatures, uncombineFeatures } from '../actions';

import reducer from '../reducers';
import initialState from '../store/initialState';
import features from '../data/features';
import emptyGeoJSON from '../data/emptyGeoJSON';

describe('Combined Reducer', () => {
  it('should match the inital state', () => {
    expect(reducer(initialState, {})).toBe(initialState)
  })
})

describe('Layer Reducer', () => {
  describe('updateFeatures', () => {
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

  describe('undoLayer', () => {
    it('should match the state passed in if the past is empty', () => {
      const action = undoLayer();
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    })

    it('should push the current present to the future, shift the sub zero of past to the present and set past to the rest of past', () => {
      const emptyLayer = {
        layer: {
          ...initialState.layer,
          present: emptyGeoJSON
        }
      }
      const oneAdded = {
        past: [{ ...emptyLayer.layer.present }],
        present: { ...initialState.layer.present, features: [features[0]] },
        future: []
      };
      const action = undoLayer();
      const state = reducer({ layer: oneAdded }, action);

      expect(state.layer.past.length).toBe(0);

      expect(state.layer.present.features.length).toBe(0);
      expect(state.layer.present).toBe(oneAdded.past[0]);

      expect(state.layer.future.length).toBe(1);
      expect(state.layer.future[0]).toBe(oneAdded.present);
    })
  })

  describe('redoLayer', () => {
    it('should match the state passed in if the future is empty', () => {
      const action = redoLayer();
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    })

    it('should push the sub zero of future to present, shift the sub zero of past to the present and push present to past', () => {
      const oneUndo = {
        past: [],
        present: { ...initialState.layer.present },
        future: [{ ...initialState.layer.present, features: [features[0]] }]
      };
      const action = redoLayer();
      const state = reducer({ layer: oneUndo }, action);

      expect(state.layer.past.length).toBe(1);
      expect(state.layer.past[0]).toBe(oneUndo.present);

      expect(state.layer.present.features.length).toBe(1);
      expect(state.layer.present).toBe(oneUndo.future[0]);

      expect(state.layer.future.length).toBe(0);
    })
  })

  describe('addFeatures', () => {
    it('should add 1 feature to present.features', () => {
      const emptyLayer = {
        layer: {
          ...initialState.layer,
          present: emptyGeoJSON
        }
      }
      const [first] = features;
      const action = addFeatures([first]);
      const state = reducer(emptyLayer, action);

      expect(state.layer.past.length).toBe(1);
      expect(state.layer.past[0]).toBe(emptyLayer.layer.present);

      expect(state.layer.present.features.length).toBe(1);
      expect(state.layer.present.features[0]).toBe(first);

      expect(state.layer.future.length).toBe(0);
    })
  })

  describe('combineFeatures', () => {
    it('should combine 2 feature polygons to 1 feature in present.features', () => {
      const [, , three, four] = features;
      const deletedFeatures = [three, four];
      const emptyLayer = {
        layer: {
          ...initialState.layer,
          present: emptyGeoJSON
        }
      }
      const uncombinedPolygons = {
        past: [{ ...emptyLayer.layer.present }],
        present: { ...initialState.layer.present, features: deletedFeatures },
        future: []
      };
      const createdFeatures = [
        {
          "id": uuid(),
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": [
              ...three.geometry.coordinates,
              ...four.geometry.coordinates,
            ]
          }
        }
      ];
      const action = combineFeatures({ createdFeatures, deletedFeatures });
      const state = reducer({ layer: uncombinedPolygons }, action);

      expect(state.layer.past.length).toBe(2);
      expect(state.layer.past[0]).toStrictEqual(uncombinedPolygons.present);

      expect(state.layer.present.features.length).toBe(1);
      expect(state.layer.present.features).toStrictEqual(createdFeatures);

      expect(state.layer.future.length).toBe(0);
    })
  })

  describe('uncombineFeatures', () => {
    it('should uncombine 1 feature polygons to 2 features in present.features', () => {
      const [, , three, four] = features;
      const createdFeatures = [three, four];
      const emptyLayer = {
        layer: {
          ...initialState.layer,
          present: emptyGeoJSON
        }
      }
      const deletedFeatures = [
        {
          "id": uuid(),
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": [
              ...three.geometry.coordinates,
              ...four.geometry.coordinates,
            ]
          }
        }
      ];
      const combinedPolygon = {
        past: [{ ...emptyLayer.layer.present }],
        present: { ...initialState.layer.present, features: deletedFeatures },
        future: []
      };
      const action = uncombineFeatures({ createdFeatures, deletedFeatures });
      const state = reducer({ layer: combinedPolygon }, action);

      expect(state.layer.past.length).toBe(2);
      expect(state.layer.past[0]).toStrictEqual(combinedPolygon.present);
      expect(state.layer.present.features.length).toBe(2);
      expect(state.layer.present.features).toStrictEqual(createdFeatures);

      expect(state.layer.future.length).toBe(0);
    })
  })
})