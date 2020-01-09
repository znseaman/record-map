import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classes from "./Sidebar.module.css";
import Button from 'react-bootstrap/Button';

import { undoLayerToLocalStorage, redoLayerToLocalStorage, resetLayerToLocalStorage } from "../actions";

const Sidebar = props => {
  const { undo, redo, reset } = props;
  return (
    <aside className={classes["Sidebar"]}>
      <h1>Record Map</h1>
      <p>Add, remove, combine, and uncombine points, lines, and polygons.</p>
      <p>The map records the user's actions and allows the user to undo / redo actions as well as reset the map to its original empty state.</p>
      <Button className={classes["margin-10"]} variant="outline-dark" size="sm" onClick={undo}>Undo</Button>
      <Button className={classes["margin-10"]} variant="outline-dark" size="sm" onClick={redo}>Redo</Button>
      <Button className={classes["margin-10"]} variant="outline-dark" size="sm" onClick={() => window.confirm('Are you sure you want to reset the layer?') ? reset() : null}>Reset</Button>
      {/* <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button onClick={() => window.confirm('Are you sure you want to reset the layer?') ? reset() : null}>Reset</button> */}
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
