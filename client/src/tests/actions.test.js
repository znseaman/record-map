import { getLayerHistoryFromApi } from "../actions";

import reducer from "../reducers";
import initialState from "../store/initialState";

describe("Combined Reducer", () => {
  it("should match the initial state", () => {
    expect(reducer(initialState, {})).toBe(initialState);
  });
});
