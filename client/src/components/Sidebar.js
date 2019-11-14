import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classes from "./Sidebar.module.css";

import { undoLayerToLocalStorage, redoLayerToLocalStorage } from "../actions";

const Sidebar = props => {
  const { undo, redo } = props;
  return (
    <aside className={classes["Sidebar"]}>
      <h1>Record Map</h1>
      <p>A map able to record a layer and undo / redo actions</p>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </aside>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      undo: undoLayerToLocalStorage,
      redo: redoLayerToLocalStorage
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Sidebar);
