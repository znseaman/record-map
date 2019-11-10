import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getLayerHistoryFromApi,
  postLayerToApi,
  updateLayer,
  updateLayerToApi
} from "../actions";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const Draw = props => {
  var control = useRef({});
  var selectedFeatures = useRef([]);

  useEffect(() => {
    get();
  }, [])

  useEffect(() => {
    set();
  }, [props.layer])

  const get = async () => {
    props.getLayerHistoryFromApi();
  };

  const set = () => {
    const {
      layer: { present: layer }
    } = props;
    if (layer && layer.features && layer.features.length > 0) {
      /* Remove if there is already a layer */
      const all = control.current.draw.getAll();
      if (all) {
        control.current.draw.deleteAll();
      }

      control.current.draw.set(layer);
    }
  };

  const assignRef = drawControl => {
    control.current = drawControl;
    if (process.env.NODE_ENV == "development") {
      window.drawControl = drawControl;
    }
  };

  const save = props.updateLayerToApi;

  const resetSelected = () => {
    selectedFeatures.current = [];
  }

  const onDrawCreate = ({ features }) => {
    console.log(`onDrawCreate`, features);
  };

  const onDrawUpdate = event => {
    console.log(`onDrawUpdate`, event);
    const { type, features } = event;

    if (type === 'draw.update') {
      selectedFeatures.current = features;
    }
  };

  const onDrawSelectionChange = event => {
    console.log(`onDrawSelectionChange`, event);

    // Zero features means the user has clicked away from adding a feature ("direct_select")
    if (event.features.length == 0) {
      save(selectedFeatures.current);
      resetSelected();
      return;
    }

    switch (event.type) {
      case 'draw.selectionchange':
        selectedFeatures.current = event.features
        break;
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
      onDrawUpdate={onDrawUpdate}
      onDrawSelectionChange={onDrawSelectionChange}
      onDrawActionable={onDrawActionable}
      onDrawModeChange={onDrawModeChange}
      onDrawRender={onDrawRender}
    ></DrawControl>
  );
}

const mapStateToProps = ({ layer }) => ({ layer });

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getLayerHistoryFromApi, postLayerToApi, updateLayer, updateLayerToApi },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draw);
