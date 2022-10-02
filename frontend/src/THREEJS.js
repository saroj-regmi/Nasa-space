import React, { useEffect, useRef } from "react";

import * as T from "three";
import { Color } from "three";
import image from "./img/map.jpg";
import styles from "./styles/earth.module.css";
import stars from "./img/galaxy_starfield.png";
import bMap from "./img/elev_bump_4k.jpg";
import Wmap from "./img/water_4k.png";
import sunTexture from "./img/sun.jpg";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import cloudTexture from "./img/fair_clouds_4k.png";
import * as dat from "dat.gui";

// for importing the 3d model

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertLatLon } from "./calculator";
let canvas,
  renderer,
  scene,
  camera,
  earth,
  controls,
  satelliteObj,
  locationObj,
  sun,
  hamroSatellite,
  earthObj;

const gui = new dat.GUI();

const changingData = {
  "One day": 3600,
  earthX: 0,
  earthY: 0,
  earthZ: 0,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 1.5,
};
// gui.add(changingData, "One day", 60, 86400);
// gui.add(changingData, "earthX", -1000, 1000);
// gui.add(changingData, "earthY", -1000, 1000);
// gui.add(changingData, "earthZ", -1000, 100);
gui.add(changingData, "cameraX", -100, 100);
gui.add(changingData, "cameraY", -100, 100);
gui.add(changingData, "cameraZ", -100, 100);

const reducingScale = 10000;

const earthRadius = 6400 / reducingScale;
const sunRadius = 696340 / reducingScale;
let light;

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

  controls = new OrbitControls(camera, renderer.domElement);
  // blocking the y control for the rotation.
  // controls.minPolarAngle = Math.PI / 2;
  // controls.maxPolarAngle = Math.PI / 2;
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);
  scene.add(new T.AmbientLight(0x0333333));

  // sunLight.position.set(-413, 228, -208);
  light = new T.PointLight(new Color("rgb(253, 241, 174)"), 1);
  light.position.set(-100, 73, 4.2);
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
      new T.SphereGeometry(radius, 60, 60),
      new T.MeshBasicMaterial({
        map: texture,
        side: T.DoubleSide,
      })
    )
  );
}

let clouds;
function createClouds() {
  clouds = new T.Mesh(
    new T.SphereGeometry(earthRadius + 0.003, 60, 60),
    new T.MeshPhongMaterial({
      map: new T.TextureLoader().load(cloudTexture),
      transparent: true,
    })
  );

  earth.add(clouds);
}
function getSun() {
  sun = new T.Mesh(
    new T.SphereGeometry(sunRadius, 60, 60),
    new T.MeshPhongMaterial({
      emissive: new Color("#d89830"),
      map: new T.TextureLoader().load(sunTexture),
      emissiveIntensity: 1,
    })
  );
  sun.position.set(-413, 228, -208);
  scene.add(sun);
}

function getSattelite() {
  satelliteObj = new T.Object3D();

  new GLTFLoader().load("/hamro_s.glb", (model) => {
    hamroSatellite = model;
    const scale = 10.8 / reducingScale;
    // model.scene.position.set(0.1, 0.7, 0.2);
    model.scene.scale.set(scale, scale, scale);

    // model.scene.castShadow(true);

    model.scene.position.x = 1;
    satelliteObj.add(model.scene);
    model.scene.rotateY += rotation;
  });
  scene.add(satelliteObj);
}

function getEarth() {
  earth = createSphere(earthRadius, 60);
  earth.rotation.z = 0;
  earth.rotation.x = 0;
  // earth.rotation.y = -Math.PI / 2;
  earthObj = new T.Object3D();
  earthObj.add(earth);

  scene.add(earthObj);
}

function getLocation(lat, lon) {
  let { x, y, z } = convertLatLon(lat, lon, earthRadius);

  locationObj = new T.Object3D();

  let location = new T.Mesh(
    new T.SphereGeometry(0.05, 50),
    new T.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  );

  location.position.set(x, y, z);
  locationObj.add(location);
  scene.add(locationObj);
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

let rotation = 0;
// this is for animating the stuffs
function animate() {
  // this will rerender continuously for creating a animation

  earth.rotation.y += earthRadius / changingData["One day"];
  satelliteObj.rotation.y += (earthRadius / changingData["One day"]) * 16;
  clouds.rotation.y += earthRadius / changingData["One day"] + 0.001;
  clouds.rotation.x += earthRadius / changingData["One day"] + 0.0001;
  // if we move the sphere then the location also should be rotated respectively.
  // this will make sure to sync the rotation so that the coordinates do not miss match
  locationObj.rotation.y = earth.rotation.y;

  // changing the x y and z of the earth

  if (light) render();
  requestAnimationFrame(animate);
}

// generating a marker for the city and adding it

// looking for window resize
window.addEventListener("resize", resizeWindow);

function THREEJS() {
  useEffect(() => {
    //  setsup the three js screen for us
    setup();
    getSun();
    getEarth();
    getSattelite();
    createStars(1000);
    createClouds();
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
