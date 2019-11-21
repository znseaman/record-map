import Api from '../lib/api'

import initialState from '../store/initialState'
import features from '../data/features'

jest.mock('localforage')

// @ts-ignore
describe('api', () => {
  // @ts-ignore
  describe('get', () => {
    // @ts-ignore
    it('should get initialState stored in localforage if no item found', async () => {
      const { layer } = await Api.get();
      expect(layer.past.length).toBe(0);
      expect(layer.present.features.length).toBe(0);
      expect(layer.future.length).toBe(0);
    })

    // @ts-ignore
    it('should get layer stored in localforage if item is found', async () => {
      const oneAdded = {
        layer:
        {
          past: [{ ...initialState.layer.present }],
          present: { ...initialState.layer.present, features: [features[0]] },
          future: []
        }
      };
      const localForageSetFn = jest.fn().mockReturnValue(oneAdded);
      const { layer } = await localForageSetFn();

      expect(layer.past.length).toBe(1);
      expect(layer.present.features.length).toBe(1);
      expect(layer.future.length).toBe(0);
    })
  })
})