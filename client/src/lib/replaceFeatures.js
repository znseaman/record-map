export default function replaceFeatures(present, features) {
  for (let feature of features) {
    /* Replace the feature by id */
    const index = present.features.findIndex(f => f.id == feature.id);
    if (index != -1) {
      present.features[index] = feature;
    } else {
      /* Add the feature */
      present.features = [feature, ...present.features];
    }
  }

  return present;
}

