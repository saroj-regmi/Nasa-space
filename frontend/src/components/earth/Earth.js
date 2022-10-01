import React, { useEffect, useRef } from "react";
import domEarth, { sceneSetup, render, resizer } from "./_controller.js";

function Earth() {
  const earth = useRef(null);

  // sceneSetup();

  // render();

  useEffect(() => {
    earth.current.append(domEarth);
  }, []);

  return <div ref={earth}>Earth</div>;
}

export default Earth;
