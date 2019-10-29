import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

const { REACT_APP_MAPBOX_ACCESS_TOKEN: accessToken } = process.env;

ReactDOM.render(
  <App accessToken={accessToken} />,
  document.getElementById("root")
);
