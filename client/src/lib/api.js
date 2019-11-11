import localforage from "localforage";
import { format } from "date-fns";

import initialState from "../store/initialState";
import replaceFeatures from '../lib/replaceFeatures'

window.localforage = localforage;

const DRAW_KEY = "draw_layer";

const get = async () => {
  // await localforage.removeItem(DRAW_KEY)
  const layer = await localforage.getItem(DRAW_KEY);
  return layer || initialState;
};

const set = async layer => {
  await localforage.setItem(DRAW_KEY, { layer });
  return layer;
};

const update = async features => {
  const res = await get();
  if (typeof res == 'undefined') return undefined;
  const { layer } = res;
  const { past, present, future } = layer;

  /* NOTE: duplicating UPDATE_FEATURES action for localforage API */
  await localforage.setItem(DRAW_KEY, { layer: { past: [present, ...past], present: replaceFeatures(present, features), future } });

  return layer.present;
};

const log = async () => {
  console.log(
    `Saved update to localforage at:`,
    format(new Date(Date.now()), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
  );
};

export default {
  get,
  set,
  log,
  update
};
