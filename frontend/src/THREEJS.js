import React, { useEffect, useRef } from "react";
import * as T from "three";
import { Color } from "three";
import image from "./img/map.jpg";
import styles from "./styles/earth.module.css";
import stars from "./img/galaxy_starfield.png";
import bMap from "./img/elev_bump_4k.jpg";
import Wmap from "./img/water_4k.png";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// for importing the 3d model

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
let canvas, renderer;

let scene;
let camera;

let earth;
let controls;
let hamroSatellite;

const setup = () => {
  // setting up the scene
  canvas = document.querySelector("#canvas");
  scene = new T.Scene();
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera = new T.PerspectiveCamera(100, width / height, 0.01, 1000);
  camera.position.set(0, 0, 1.5);
  renderer = new T.WebGLRenderer({
    canvas,
    antialias: true,
  });

  controls = new OrbitControls(camera, renderer.domElement);
  // blocking the y control for the rotation.
  // controls.minPolarAngle = Math.PI / 2;
  // controls.maxPolarAngle = Math.PI / 2;
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
    // new T.BoxGeometry(1, 1, 1),

    new T.MeshPhongMaterial({
      map: mainMap,
      bumpMap: bumpMap,
      bumpScale: 0.005,
      specularMap: waterMap,
      specular: new T.Color("grey"),
    })
  );
}

// creating a big sphere to make the stars in the background

function createStars(radius) {
  const texture = new T.TextureLoader().load(stars);
  return new T.Mesh(
    new T.BoxGeometry(radius, radius, radius),
    new T.MeshBasicMaterial({
      map: texture,
      side: T.BackSide,
    })
  );
}

// render this will render the items
const render = () => {
  controls.update();

  renderer.render(scene, camera);
};

// this will reinitiate the variable upon resize
function resizeWindow() {
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function getSattelite() {
  new GLTFLoader().load("/hamro_s.glb", (model) => {
    hamroSatellite = model;
    const scale = 0.0007;
    // model.scene.position.set(0.1, 0.7, 0.2);
    model.scene.scale.set(scale, scale, scale);
    console.log();
    // model.scene.castShadow(true);

    model.scene.position.x = 1;
    earth.add(model.scene);
    model.scene.rotateY += rotation;
  });
}
let rotation = 0;
// this is for animating the stuffs
function animate() {
  // this will rerender continuously for creating a animation

  earth.rotation.y += 0.005;

  render();
  requestAnimationFrame(animate);
}

function getEarth() {
  earth = createSphere(0.5834132413, 60);
  earth.rotation.z = 0;
  earth.rotation.x = -0.4;
  earth.rotation.y = 0;

  scene.add(earth);
  scene.add(createStars(10));
}
// looking for window resize
window.addEventListener("resize", resizeWindow);

function THREEJS() {
  useEffect(() => {
    //  setsup the three js screen for us
    setup();
    getEarth();
    getSattelite();
    render();
    animate();
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
}

export default THREEJS;
