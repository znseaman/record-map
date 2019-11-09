import localforage from "localforage";
import { format } from "date-fns";

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

const log = async () => {
  console.log(
    `Saved update to localforage at:`,
    format(new Date(Date.now()), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
  );
};

export default {
  get,
  set,
  log
};
