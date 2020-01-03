import localforage from "localforage";

import initialState from "../store/initialState";
import emptyGeoJSON from '../data/emptyGeoJSON';
import { updateFeatures, deleteFeatures, undoFeatures, redoFeatures, addFeatures, combineFeatures } from '../reducers/layer-reducer';

window.localforage = localforage;

const DRAW_KEY = "draw_layer";

const emptyLayer = {
  layer: {
    ...initialState.layer,
    present: emptyGeoJSON
  }
}

const get = async () => {
  const layer = await localforage.getItem(DRAW_KEY);
  return layer || emptyLayer;
};

const set = async layer => {
  await localforage.setItem(DRAW_KEY, { layer });
  return layer;
};

const update = async action => {
  const res = await get();
  if (typeof res == 'undefined') return undefined;
  const { layer } = res;

  await localforage.setItem(DRAW_KEY, { layer: updateFeatures(layer, action) })

  return layer;
};

const destroy = async action => {
  const res = await get();
  if (typeof res == 'undefined') return undefined;
  const { layer } = res;

  await localforage.setItem(DRAW_KEY, { layer: deleteFeatures(layer, action) })

  return layer;
};

const undo = async action => {
  const res = await get();
  if (typeof res == 'undefined') return undefined;
  const { layer } = res;

  await localforage.setItem(DRAW_KEY, { layer: undoFeatures(layer) })

  return layer;
};

const redo = async action => {
  const res = await get();
  if (typeof res == 'undefined') return undefined;
  const { layer } = res;

  await localforage.setItem(DRAW_KEY, { layer: redoFeatures(layer) })

  return layer;
};

const add = async action => {
  const res = await get();
  if (typeof res == 'undefined') return undefined;
  const { layer } = res;

  await localforage.setItem(DRAW_KEY, { layer: addFeatures(layer, action) })

  return layer;
}

const reset = async () => {
  await localforage.removeItem(DRAW_KEY)
  const res = await get();

  if (typeof res == 'undefined') return undefined;
  const { layer } = res;

  return layer;
};

// is just a combination of destroy & add
const combine = async action => {
  const res = await get();
  if (typeof res == 'undefined') return undefined;
  const { layer } = res;
  await localforage.setItem(DRAW_KEY, { layer: combineFeatures(layer, action) });

  return layer;
};

export default {
  get,
  set,
  update,
  destroy,
  undo,
  redo,
  add,
  reset,
  combine
};
