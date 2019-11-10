import localforage from "localforage";
import { format } from "date-fns";

import initialState from "../store/initialState";

window.localforage = localforage;

const EMPTY_GEOJSON = {
  type: "FeatureCollection",
  features: []
};

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

  // If empty present, add empty GeoJSON features
  if (Object.keys(layer.present).length == 0) {
    layer.present = EMPTY_GEOJSON;
  }

  const wasEmpty = layer.present.features.length == 0;
  for (let feature of features) {
    if (wasEmpty) {
      layer.present.features = [feature, ...layer.present.features];
    } else {
      /* Find id */
      const index = layer.present.features.findIndex(f => f.id == feature.id);
      if (index != -1) {
        layer.present.feature[index] = feature;
      } else {
        layer.present.features = [feature, ...layer.present.features];
      }
    }
  }

  await localforage.setItem(DRAW_KEY, { layer });

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
