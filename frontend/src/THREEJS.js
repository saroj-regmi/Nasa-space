import React, { useEffect, useRef } from "react";
import * as T from "three";

const canvas = document.querySelector("#canvas");

console.log(canvas);
// setting up the renderer
const renderer = new T.WebGLRenderer({
  canvas,
  antialias: true,
});

let scene;
let camera;

const setup = () => {
  // setting up the scene
  T.Scene();
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera = T.PerspectiveCamera(45, width / height, 0.01, 1000);
  camera.position.set(0.7, 0.7, -2);

  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  const light = new T.DirectionalLight(new T.Color("rgb(253, 241, 174)"), 1);
};

// render this will render the items
const render = () => {
  renderer.render(scene, camera);
};

function THREEJS() {
  useEffect(() => {
    //  setsup the three js screen for us
    setup();
    render();
  }, []);
  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
}

export default THREEJS;
