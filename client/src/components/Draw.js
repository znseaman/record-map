import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getLayerHistoryFromApi,
  postLayerToApi,
  updateLayer
} from "../actions";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

class Draw extends Component {
  control = createRef();

  componentDidMount() {
    this.get();
  }

  componentDidUpdate() {
    this.set();
  }

  get = async () => {
    this.props.getLayerHistoryFromApi();
  };

  set = () => {
    const {
      layer: { present: layer }
    } = this.props;
    if (layer && layer.features && layer.features.length > 0) {
      /* Remove if there is already a layer */
      const all = this.control.draw.getAll();
      if (all) {
        this.control.draw.deleteAll();
      }
      this.control.draw.set(layer);
    }
  };

  assignRef = control => {
    this.control = control;
    if (process.env.NODE_ENV == "development") {
      window.drawControl = control;
    }
  };

  save = async () => {
    /* @TODO: move this to an action creator */
    const {
      layer: { present, past, future }
    } = this.props;
    const newPresent = this.control.draw.getAll();
    var newLayer = {
      past: [present, ...past],
      present: newPresent,
      future
    };
    this.props.postLayerToApi(newLayer);
  };

  onDrawCreate = ({ features }) => {
    console.log(`onDrawCreate`, features);
  };

  onDrawUpdate = props => {
    console.log(`onDrawUpdate`, props);
    console.log(`onDrawUpdate Features`, props.features);
  };

  onDrawSelectionChange = ({ features }) => {
    console.log(`onDrawUpdate`, features);
    // Zero features means the user has clicked away from adding a feature ("direct_select")
    if (features.length == 0) {
      this.save();
    }
  };

  onDrawActionable = props => {
    // @TODO: instead of saving all of them, determine which ones have changed and save those instead
    // this.save();
  };

  onDrawModeChange = props => {
    if (props.mode == "direct_select") {
      //   @TODO: start an edit mode
    }
    console.log(`onDrawModeChange`, props);
  };

  onDrawRender = props => {
    // console.log(`onDrawRender`, props);
  };

  render() {
    return (
      <DrawControl
        ref={this.assignRef}
        onDrawCreate={this.onDrawCreate}
        onDrawUpdate={this.onDrawUpdate}
        onDrawSelectionChange={this.onDrawSelectionChange}
        onDrawActionable={this.onDrawActionable}
        onDrawModeChange={this.onDrawModeChange}
        onDrawRender={this.onDrawRender}
      ></DrawControl>
    );
  }
}

const mapStateToProps = ({ layer }) => ({ layer });

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getLayerHistoryFromApi, postLayerToApi, updateLayer },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draw);
