import React, { useEffect, useRef } from "react";

import * as T from "three";
import { Color } from "three";
import image from "./img/map.jpg";
import styles from "./styles/earth.module.css";
import stars from "./img/galaxy_starfield.png";
import bMap from "./img/elev_bump_4k.jpg";
import Wmap from "./img/water_4k.png";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// for importing the 3d model

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertLatLon } from "./calculator";
let canvas, renderer;

let scene;
let camera;

let earth;
let controls;
let satelliteObj;
let locationObj;

let hamroSatellite;

const gui = new dat.GUI();

const changingData = {
  "One day": 3600,
};

gui.add(changingData, "One day", 60, 86400);

const reducingScale = 100000;

const earthRadius = 64000 / reducingScale;

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
  scene.add(
    new T.Mesh(
      new T.BoxGeometry(radius, radius, radius),
      new T.MeshBasicMaterial({
        map: texture,
        side: T.BackSide,
      })
    )
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
  satelliteObj = new T.Object3D();

  new GLTFLoader().load("/hamro_s.glb", (model) => {
    hamroSatellite = model;
    const scale = 108 / reducingScale;
    // model.scene.position.set(0.1, 0.7, 0.2);
    model.scene.scale.set(scale, scale, scale);

    // model.scene.castShadow(true);

    model.scene.position.x = 1;
    satelliteObj.add(model.scene);
    model.scene.rotateY += rotation;
  });
  scene.add(satelliteObj);
}
let rotation = 0;
// this is for animating the stuffs
function animate() {
  // this will rerender continuously for creating a animation

  earth.rotation.y += earthRadius / changingData["One day"];
  satelliteObj.rotation.y += (earthRadius / changingData["One day"]) * 16;

  // if we move the sphere then the location also should be rotated respectively.

  // this will make sure to sync the rotation so that the coordinates do not miss match
  locationObj.rotation.y = earth.rotation.y;

  render();
  requestAnimationFrame(animate);
}

function getEarth() {
  earth = createSphere(earthRadius, 60);
  earth.rotation.z = 0;
  earth.rotation.x = 0;
  earth.rotation.y = -Math.PI / 2;

  scene.add(earth);
}

// generating a marker for the city and adding it

function getLocation(lat, lon) {
  let { x, y, z } = convertLatLon(lat, lon);

  locationObj = new T.Object3D();

  let location = new T.Mesh(
    new T.SphereGeometry(0.05, 50),
    new T.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  );

  location.position.set(x, y, z + 0.1);
  locationObj.add(location);
  scene.add(locationObj);
}

// looking for window resize
window.addEventListener("resize", resizeWindow);

function THREEJS() {
  useEffect(() => {
    //  setsup the three js screen for us
    setup();
    getEarth();
    getSattelite();
    createStars(10);
    // generates a city for a give coordinate
    // mumbai city
    getLocation(28.7, 77.8777);

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
