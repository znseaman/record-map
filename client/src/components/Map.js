import React, { useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import PropTypes from "prop-types";
import classes from "./Map.module.css";

const Map = props => {
  const [style, setStyle] = useState("mapbox://styles/mapbox/dark-v9");
  const { REACT_APP_MAPBOX_ACCESS_TOKEN: accessToken } = process.env;
  const Map = ReactMapboxGl({
    accessToken
  });

  return (
    <section className={classes["Map"]}>
      <Map
        style={style}
        containerStyle={{
          height: "100vh"
        }}
      >
        {props.children}
      </Map>
    </section>
  );
};

Map.propTypes = {
  style: PropTypes.string.isRequired
};

export default Map;
