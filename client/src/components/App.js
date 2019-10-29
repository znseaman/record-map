import React, { useState } from "react";
import "./App.css";
import Map from "./Map";
import Draw from "./Draw";

const App = props => {
  const [style, setStyle] = useState("mapbox://styles/mapbox/dark-v9");
  const { accessToken } = props;

  return (
    <div className="App">
      <header className="App-header">
        <Map style={style} accessToken={accessToken}>
          <Draw />
        </Map>
      </header>
    </div>
  );
};

export default App;
