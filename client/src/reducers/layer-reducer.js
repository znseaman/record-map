import {
  UPDATE_LAYER,
  SET_LAYER_HISTORY,
  UNDO_UPDATE_LAYER,
  REDO_UPDATE_LAYER,
  UPDATE_FEATURES
} from "../constants";

export default (state = {}, action) => {
  const { past, present, future } = state;
  switch (action.type) {
    case SET_LAYER_HISTORY:
      return action.layer;
    case UPDATE_FEATURES:
      /* @TODO: fix logic here */
      if (Object.keys(present).length == 0) {
        return {
          past,
          present: { ...present, ...action.layer },
          future
        };
      }

      return {
        past: [present, ...past],
        present: { ...present, ...action.layer },
        future
      };
    case UPDATE_LAYER:
      /* @TODO: fix logic here */
      if (Object.keys(present).length == 0) {
        return {
          past,
          present: { ...present, ...action.layer },
          future
        };
      }

      return {
        past: [present, ...past],
        present: { ...present, ...action.layer },
        future
      };
    case UNDO_UPDATE_LAYER:
      if (past.length == 0) return state;

      var newFuture = [present, ...future];
      var [newPresent, ...newPast] = past;

      return {
        past: newPast,
        present: newPresent,
        future: newFuture
      };
    case REDO_UPDATE_LAYER:
      if (future.length == 0) return state;

      var [newPresent, ...newFuture] = future;
      var newPast = [present, ...past];

      return {
        past: newPast,
        present: newPresent,
        future: newFuture
      };
  }
  return state;
};
