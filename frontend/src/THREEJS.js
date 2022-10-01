import React, { useEffect, useRef } from "react";
import * as T from "three";
import { Color } from "three";
import image from "./img/map.jpg";
import styles from "./styles/earth.module.css";
import stars from "./img/test.webp";
import bMap from "./img/elev_bump_4k.jpg";
import Wmap from "./img/water_4k.png";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

let canvas, renderer;

let scene;
let camera;

let earth;
let controls;

const setup = () => {
  // setting up the scene
  canvas = document.querySelector("#canvas");
  scene = new T.Scene();
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera = new T.PerspectiveCamera(100, width / height, 0.01, 1000);
  camera.position.set(0, 0, 1);
  renderer = new T.WebGLRenderer({
    canvas,
    antialias: true,
  });

  controls = new TrackballControls(camera, renderer.domElement);

  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);
  scene.add(new T.AmbientLight(0x0333333));

  var light = new T.DirectionalLight(new Color("rgb(253, 241, 174)"), 1);
  light.position.set(0.5, 0.7, 1);
  scene.add(light);
};

function createSphere(radius, segments) {
  const mainMap = new T.TextureLoader().load(image);
  const bumpMap = new T.TextureLoader().load(bMap);

  const waterMap = new T.TextureLoader().load(Wmap);

  return new T.Mesh(
    new T.SphereGeometry(radius, segments, segments),

    new T.MeshPhongMaterial({
      map: mainMap,
      bumpMap: bumpMap,
      bumpScale: 0.005,
      specularMap: waterMap,
      specular: new T.Color("grey"),
    })
  );
}

// render this will render the items
const render = () => {
  // this will rerender continuously for creating a animation
  earth.rotation.y += 0.0005;
  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

// this will reinitiate the variable upon resize
function resizeWindow() {
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// looking for window resize
window.addEventListener("resize", resizeWindow);

function THREEJS() {
  useEffect(() => {
    //  setsup the three js screen for us
    setup();
    earth = createSphere(0.5834132413, 60);
    scene.add(earth);
    scene.background = new T.TextureLoader().load(stars);

    render();
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
}

export default THREEJS;
