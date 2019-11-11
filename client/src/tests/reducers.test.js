import { undoUpdateLayer, redoUpdateLayer } from '../actions';

import reducer from '../reducers';
import initialState from '../store/initialState';
import features from '../data/features';

describe('Combined Reducer', () => {
  it('should match the inital state', () => {
    expect(reducer(initialState, {})).toBe(initialState)
  })
})

describe('Layer Reducer', () => {
  describe('undoUpdateLayer', () => {
    it('should match the state passed in if the past is empty', () => {
      const action = undoUpdateLayer();
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    })

    it('should add the current present to future array', () => {
      const oneAdded = {
        past: [{ ...initialState.layer.present }],
        present: { ...initialState.layer.present, features: [features[0]] },
        future: []
      };
      const action = undoUpdateLayer();
      const state = reducer({ layer: oneAdded }, action);
      expect(state.layer.future.length).toBe(1);
      expect(state.layer.present.features.length).toBe(0);
      /* @TODO: check for past */

      /* @TODO: split these into separate it statements */
    })
  })

  describe('redoUpdateLayer', () => {
    it('should match the state passed in if the future is empty', () => {
      const action = redoUpdateLayer();
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    })
  })
})