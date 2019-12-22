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

  const assignRef = drawControl => {
    control.current = drawControl;
    if (process.env.NODE_ENV == "development") {
      window.drawControl = drawControl;
    }
  };

  const onDrawCreate = ({ features }) => {
    console.log(`onDrawCreate`, features);
    add(features);
  };

  const onDrawDelete = event => {
    console.log(`onDrawDelete`, event);
    const { type, features } = event;
    if (type === "draw.delete") {
      remove(features);
    }
  };

  const onDrawCombine = async event => {
    console.log(`onDrawCombine`, event);
    const { type, createdFeatures, deletedFeatures } = event;
    if (type === "draw.combine") {
      await combine({ deletedFeatures, createdFeatures });
    }
  };

  const onDrawUncombine = async event => {
    console.log(`onDrawUncombine`, event);
    const { type, createdFeatures, deletedFeatures } = event;
    if (type === "draw.uncombine") {
      await uncombine({ deletedFeatures, createdFeatures });
    }
  };

  const onDrawUpdate = event => {
    console.log(`onDrawUpdate`, event);
    const { type, features, action } = event;

    if (type === "draw.update" && (action == "move" || action == "change_coordinates")) {
      selectedFeatures.current = features;
    }
  };

  const onDrawSelectionChange = event => {
    console.log(`onDrawSelectionChange`, event);

    // Zero features means the user has clicked away from adding a feature ("direct_select")
    if (event.features.length == 0 && selectedFeatures.current.length > 0) {
      save(selectedFeatures.current);
    }
  };

  const onDrawActionable = event => {
    // @TODO: instead of saving all of them, determine which ones have changed and save those instead
    // console.log(`onDrawActionable`, event)
  };

  const onDrawModeChange = event => {
    if (event.mode == "direct_select") {
      //   @TODO: start an edit mode
    }
    console.log(`onDrawModeChange`, event);
  };

  const onDrawRender = event => {
    // console.log(`onDrawRender`, event);
  };

  return (
    <DrawControl
      ref={assignRef}
      onDrawCreate={onDrawCreate}
      onDrawDelete={onDrawDelete}
      onDrawCombine={onDrawCombine}
      onDrawUncombine={onDrawUncombine}
      onDrawUpdate={onDrawUpdate}
      onDrawSelectionChange={onDrawSelectionChange}
      onDrawActionable={onDrawActionable}
      onDrawModeChange={onDrawModeChange}
      onDrawRender={onDrawRender}
    ></DrawControl>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draw);
