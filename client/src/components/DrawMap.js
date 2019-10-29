import React, { useRef } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { format } from "date-fns";

const { REACT_APP_MAPBOX_ACCESS_TOKEN: TOKEN } = process.env;
const Map = ReactMapboxGl({
  accessToken: TOKEN
});

function DrawMap() {
  var drawControl = useRef();

  const DRAW_KEY = "draw_layer";
  function save() {
    const all = drawControl.draw.getAll();
    localStorage.setItem(DRAW_KEY, JSON.stringify(all));
    console.log(
      `Saved update to localStorage at:`,
      format(new Date(Date.now()), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    );
  }

  const onDrawCreate = ({ features }) => {
    console.log(`onDrawCreate`, features);
  };

  const onDrawUpdate = props => {
    console.log(`onDrawUpdate`, props);
    console.log(`onDrawUpdate Features`, props.features);
  };

  const onDrawSelectionChange = ({ features }) => {
    console.log(`onDrawUpdate`, features);
    // Zero features means the user has clicked away from adding a feature ("direct_select")
    if (features.length == 0) {
      save();
    }
  };

  const onDrawModeChange = props => {
    if (props.mode == "direct_select") {
      //   @TODO: start an edit mode
    }
    console.log(`onDrawModeChange`, props);
  };

  const onDrawRender = ({ features }) => {
    // console.log(`onDrawRender`, features);
  };

  const onDrawActionable = props => {
    // @TODO: instead of saving all of them, determine which ones have changed and save those instead
    save();
  };

  const onStyleLoad = () => {
    // Get data from localStorage
    const draw_layer = localStorage.getItem(DRAW_KEY);
    drawControl.draw.set(JSON.parse(draw_layer));
  };

  return (
    <Map
      onStyleLoad={onStyleLoad}
      style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}
    >
      <DrawControl
        onDrawCreate={onDrawCreate}
        onDrawUpdate={onDrawUpdate}
        onDrawSelectionChange={onDrawSelectionChange}
        onDrawModeChange={onDrawModeChange}
        onDrawRender={onDrawRender}
        onDrawActionable={onDrawActionable}
        ref={control => {
          if (process.env.NODE_ENV == "production") {
            drawControl = control;
          } else if (process.env.NODE_ENV == "development") {
            drawControl = control;
            window.drawControl = control;
          }
        }}
      />
    </Map>
  );
}

export default DrawMap;
