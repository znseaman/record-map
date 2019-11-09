import { UPDATE_LAYER } from "../constants";

export default (layer = {}, action) => {
  switch (action.type) {
    case UPDATE_LAYER:
      return action.layer;
  }
  return layer;
};
