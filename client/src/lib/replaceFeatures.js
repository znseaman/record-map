export default function replaceFeatures(present, features) {
  /* don't manipulate present object */
  var localPresent = { ...present };
  for (let feature of features) {
    /* Replace the feature by id */
    const index = localPresent.features.findIndex(f => f.id == feature.id);
    if (index != -1) {
      localPresent.features[index] = feature;
    } else {
      /* Add the feature */
      localPresent.features = [feature, ...localPresent.features];
    }
  }

  return localPresent;
}

