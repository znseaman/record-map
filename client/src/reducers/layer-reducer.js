import { concat, includes, lensProp, map, prop, reject, set } from 'ramda';
import { findIndexById } from '../utils';
import {
  SET_LAYER_HISTORY,
  UNDO_LAYER,
  REDO_LAYER,
  RESET_LAYER,
  UPDATE_FEATURES,
  DELETE_FEATURES,
  ADD_FEATURES,
} from "../constants";

import initialState from '../store/initialState';

export default (state = initialState.layer, action) => {
  switch (action.type) {
    case SET_LAYER_HISTORY:
      return action.layer;
    case ADD_FEATURES:
      return addFeatures(state, action);
    case UPDATE_FEATURES:
      return updateFeatures(state, action);
    case DELETE_FEATURES:
      return deleteFeatures(state, action);
    case UNDO_LAYER:
      return undoFeatures(state);
    case REDO_LAYER:
      return redoFeatures(state);
    case RESET_LAYER:
      return action.layer;
  }
  return state;
};

const L = {
  features: lensProp('features')
};

export function updateFeatures(state, action) {
  const { past, present, future } = state;
  return {
    past: concat([present], past),
    present: set(
      L.features,
      replaceFeatures(present.features, action.features),
      present
    ),
    future
  }
}

// @TODO: remove the unnecessary branching
export function replaceFeatures(arr1, arr2) {
  /* Don't manipulate present object */
  var localArr1 = [...arr1];
  for (let feature of arr2) {
    const index = findIndexById(feature)(localArr1);
    if (index > -1) {
      localArr1[index] = feature;
    }
  }

  return localArr1;
}

export function deleteFeatures(state, action) {
  const { past, present, future } = state;
  return {
    past: concat([present], past),
    present: set(
      L.features,
      removeFeatures(present.features, action.features),
      present
    ),
    future
  }
}

// @IDEA: try placing these 2 arrays into List Containers
export function removeFeatures(arr1, arr2) {
  const keys = map(prop('id'), arr2);
  const predicate = f => includes(f.id, keys);
  return reject(predicate, arr1);
}

export function undoFeatures(state) {
  const { past, present, future } = state;

  if (past.length == 0) return state;

  var [newPresent, ...newPast] = past;

  return {
    past: newPast,
    present: newPresent,
    future: concat([present], future)
  };
}

export function redoFeatures(state) {
  const { past, present, future } = state;

  if (future.length == 0) return state;

  var [newPresent, ...newFuture] = future;

  return {
    past: concat([present], past),
    present: newPresent,
    future: newFuture
  };
}

export function addFeatures(state, action) {
  const { past, present, future } = state;
  return {
    past: concat([present], past),
    present: set(
      L.features,
      concat(present.features, action.features),
      present
    ),
    future
  }
}
