import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import PropTypes from "prop-types";

const Map = props => {
  const { style, accessToken } = props;
  const Map = ReactMapboxGl({
    accessToken
  });

  return (
    <Map
      style={style}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}
    >
      {props.children}
    </Map>
  );
};

Map.propTypes = {
  style: PropTypes.string.isRequired
};

export default Map;
