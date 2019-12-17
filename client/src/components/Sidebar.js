import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classes from "./Sidebar.module.css";

import { undoLayerToLocalStorage, redoLayerToLocalStorage, resetLayerToLocalStorage } from "../actions";

const Sidebar = props => {
  const { undo, redo, reset } = props;
  return (
    <aside className={classes["Sidebar"]}>
      <h1>Record Map</h1>
      <p>A map that records a layer with undo / redo actions</p>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button onClick={() => window.confirm('Are you sure you want to reset the layer?') ? reset() : null}>Reset</button>
    </aside>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      undo: undoLayerToLocalStorage,
      redo: redoLayerToLocalStorage,
      reset: resetLayerToLocalStorage,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Sidebar);
