import React from "react";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={classes["Sidebar"]}>
      <h1>Record Map</h1>
      <p>A map able to record a layer and undo / redo actions</p>
      {/* <button>Undo</button>
      <button>Redo</button> */}
    </aside>
  );
};

export default Sidebar;
