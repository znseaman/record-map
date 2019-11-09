import localforage from "localforage";

window.localforage = localforage;

const DRAW_KEY = "draw_layer";

const get = async () => {
  const layer = await localforage.getItem(DRAW_KEY);
  return layer;
};

const set = async layer => {
  await localforage.setItem(DRAW_KEY, layer);
  return layer;
};

export default {
  get,
  set
};
