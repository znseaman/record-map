import React from "react";
import classes from "./App.module.css";
import Map from "./Map";
import Draw from "./Draw";
import Sidebar from "./Sidebar";

const App = () => {
  return (
    <div className={classes["App"]}>
      <Sidebar />
      <Map>
        <Draw />
      </Map>
    </div>
  );
};

export default App;
