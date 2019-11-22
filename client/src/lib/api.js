import localforage from "localforage";
import { format } from "date-fns";

import initialState from "../store/initialState";
import emptyGeoJSON from '../data/emptyGeoJSON';
import { updateFeatures, deleteFeatures, undoFeatures, redoFeatures, addFeatures } from '../reducers/layer-reducer';

window.localforage = localforage;

const DRAW_KEY = "draw_layer";

const emptyLayer = {
  layer: {
    ...initialState.layer,
    present: emptyGeoJSON
  }
}

const get = async () => {
  // await localforage.removeItem(DRAW_KEY)
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

const log = async () => {
  console.log(
    `Saved update to localforage at:`,
    format(new Date(Date.now()), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
  );
};

const add = async action => {
  const res = await get();
  if (typeof res == 'undefined') return undefined;
  const { layer } = res;

  await localforage.setItem(DRAW_KEY, { layer: addFeatures(layer, action) })

  return layer;
}

export default {
  get,
  set,
  log,
  update,
  destroy,
  undo,
  redo,
  add,
};
