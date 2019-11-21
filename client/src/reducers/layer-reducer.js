import { concat } from 'ramda';
import {
  SET_LAYER_HISTORY,
  UNDO_LAYER,
  REDO_LAYER,
  UPDATE_FEATURES,
  DELETE_FEATURES,
  ADD_FEATURES,
} from "../constants";

import initialState from '../store/initialState';

export default (state = initialState.layer, action) => {
  const { past, present, future } = state;
  switch (action.type) {
    case SET_LAYER_HISTORY:
      return action.layer;
    case ADD_FEATURES:
      return addFeatures(state, action);
    case UPDATE_FEATURES:
      /* @TODO: separate out add & update functionality */
      return updateFeatures(state, action);
    case DELETE_FEATURES:
      return deleteFeatures(state, action);
    case UNDO_LAYER:
      return undoFeatures(state);
    case REDO_LAYER:
      return redoFeatures(state);
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

// @TODO: remove the unnecessary branching
// Things happening below:
// 1) checking if it already exists, then replace it at that index
// 2) if it doesn't, then `concat` both arrays
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

export function deleteFeatures(state, action) {
  const { past, present, future } = state;
  return {
    past: [present, ...past],
    present: removeFeatures(present, action.features),
    future
  }
}

// @TODO: this can be simplified to pass in keys instead of features
export function removeFeatures(present, features) {
  /* Don't manipulate present object */
  var localPresent = { ...present };
  var keys = features.map(f => f.id);

  localPresent.features = localPresent.features.filter(f => !keys.includes(f.id));

  return localPresent;
}

export function undoFeatures(state) {
  const { past, present, future } = state;

  if (past.length == 0) return state;

  var newFuture = [present, ...future];
  var [newPresent, ...newPast] = past;

  return {
    past: newPast,
    present: newPresent,
    future: newFuture
  };
}

export function redoFeatures(state) {
  const { past, present, future } = state;

  if (future.length == 0) return state;

  var [newPresent, ...newFuture] = future;
  var newPast = [present, ...past];

  return {
    past: newPast,
    present: newPresent,
    future: newFuture
  };
}

export function addFeatures(state, action) {
  const { past, present, future } = state;
  return {
    past: [present, ...past],
    present: {
      ...present,
      features: concat(present.features, action.features)
    },
    future
  }
}
