import {
  UPDATE_LAYER,
  SET_LAYER_HISTORY,
  UNDO_UPDATE_LAYER,
  REDO_UPDATE_LAYER,
  UPDATE_FEATURES
} from "../constants";

import initialState from '../store/initialState';

export default (state = initialState.layer, action) => {
  const { past, present, future } = state;
  switch (action.type) {
    case SET_LAYER_HISTORY:
      return action.layer;
    case UPDATE_FEATURES:
      /* @TODO: separate out add & update functionality */
      return updateFeatures(state, action);
    case UPDATE_LAYER:
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

export function updateFeatures(state, action) {
  const { past, present, future } = state;
  return {
    past: [present, ...past],
    present: replaceFeatures(present, action.features),
    future
  }
}

export function replaceFeatures(present, features) {
  /* Don't manipulate present object */
  var localPresent = { ...present };
  for (let feature of features) {
    const index = localPresent.features.findIndex(f => f.id == feature.id);
    if (index != -1) {
      /* Replace the feature by index */
      localPresent.features[index] = feature;
    } else {
      /* Add the feature */
      localPresent.features = [feature, ...localPresent.features];
    }
  }

  return localPresent;
}

