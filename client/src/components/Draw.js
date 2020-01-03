import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getLayerHistoryFromApi,
  updateLayerToApi,
  deleteFeaturesFromLayerStorage,
  addFeaturesToLayerStorage,
  combineFeaturesToLayerStorage,
  uncombineFeaturesToLayerStorage
} from "../actions";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const mapStateToProps = ({ layer: { present } }) => ({ layer: present });

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      add: addFeaturesToLayerStorage,
      get: getLayerHistoryFromApi,
      save: updateLayerToApi,
      remove: deleteFeaturesFromLayerStorage,
      combine: combineFeaturesToLayerStorage,
      uncombine: uncombineFeaturesToLayerStorage,
    },
    dispatch
  );
};

const Draw = props => {
  var control = useRef({});
  var selectedFeatures = useRef([]);

  const { add, get, save, remove, layer, combine, uncombine } = props;

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    if (Object.keys(layer).length > 0) set()
  }, [layer]);

  const set = () => {
    /* @TODO: diff the current and newly changed layer to see if they have changed before updating possibly using jsondiffpatch, turf, deep-diff */
    /* @TODO: the only times when `set` is necessary to call in on get, undo & redo */
    /* Remove if there is already a layer */
    const all = control.current.draw.getAll();
    if (all) {
      control.current.draw.deleteAll();
    }

    control.current.draw.set(layer);
  };

  const assignRef = drawControl => control.current = drawControl;

  const onDrawCreate = ({ features }) => {
    features.forEach(f => f.properties.createdAt = new Date(Date.now()));
    add(features);
  }

  const onDrawDelete = ({ features }) => {
    features.forEach(f => f.properties.deletedAt = new Date(Date.now()));
    remove(features);
  }

  const onDrawCombine = ({ createdFeatures, deletedFeatures }) => {
    const now = new Date(Date.now());
    createdFeatures.forEach(f => f.properties.createdAt = now);
    deletedFeatures.forEach(f => f.properties.deletedAt = now);
    combine({ deletedFeatures, createdFeatures });
  }

  const onDrawUncombine = ({ createdFeatures, deletedFeatures }) => {
    const now = new Date(Date.now());
    createdFeatures.forEach(f => f.properties.createdAt = now);
    deletedFeatures.forEach(f => f.properties.deletedAt = now);
    uncombine({ deletedFeatures, createdFeatures });
  }

  const onDrawUpdate = ({ type, features, action }) => {
    if (type === "draw.update" && (action == "move" || action == "change_coordinates")) {
      selectedFeatures.current = features;
    }
  };

  const onDrawSelectionChange = event => {
    // Zero features means the user has clicked away from adding a feature ("direct_select")
    if (event.features.length == 0 && selectedFeatures.current.length > 0) {
      selectedFeatures.current.forEach(f => f.properties.updatedAt = new Date(Date.now()));
      save(selectedFeatures.current);
      // reset selectedFeatures ref
      selectedFeatures.current = [];
    }
  };

  const noOp = () => { };

  return (
    <DrawControl
      ref={assignRef}
      onDrawCreate={onDrawCreate}
      onDrawDelete={onDrawDelete}
      onDrawCombine={onDrawCombine}
      onDrawUncombine={onDrawUncombine}
      onDrawUpdate={onDrawUpdate}
      onDrawSelectionChange={onDrawSelectionChange}
      onDrawActionable={noOp}
      onDrawModeChange={noOp}
      onDrawRender={noOp}
    ></DrawControl>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draw);
