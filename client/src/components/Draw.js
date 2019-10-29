import React, { Component, createRef } from "react";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { format } from "date-fns";

class Draw extends Component {
  control = createRef();

  componentDidMount() {
    this.get();
  }

  get = () => {
    // Get data from localStorage
    const draw_layer = localStorage.getItem(this.DRAW_KEY);
    this.control.draw.set(JSON.parse(draw_layer));
  };

  assignRef = control => {
    this.control = control;
    if (process.env.NODE_ENV == "development") {
      window.drawControl = control;
    }
  };

  DRAW_KEY = "draw_layer";
  save = () => {
    const all = this.control.draw.getAll();
    localStorage.setItem(this.DRAW_KEY, JSON.stringify(all));
    console.log(
      `Saved update to localStorage at:`,
      format(new Date(Date.now()), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    );
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
    this.save();
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

export default Draw;
