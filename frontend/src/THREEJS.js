import React, { useEffect, useRef } from "react";

import "./styles/marker.css";
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

import * as E from "threex.domevents";
import { data } from "./countries";

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

const color = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
];

const raycaster = new T.Raycaster();
const pointer = new T.Vector2();

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("pointermove", onPointerMove);

const gui = new dat.GUI();

const changingData = {
  "One day": 3600,
  marker: 0,
  markery: 0,
};
gui.add(changingData, "One day", 3600, 86400);
gui.add(changingData, "marker", 0, 10);
gui.add(changingData, "markery", 0, 10);

const reducingScale = 10000;

const earthRadius = 6400 / reducingScale;
const sunRadius = 696340 / reducingScale;
let light;

let domevents;

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

  // domevents = new E.DomEvents(camera, renderer);
};

function locationHover() {
  raycaster.setFromCamera(pointer, camera);
  const intersect = raycaster.intersectObjects(locationObj.children);
  intersect.forEach((ele, i) => {
    if (i != 1) return;
    console.log(ele.object.id);
  });
}

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

locationObj = new T.Object3D();
function getLocation(lat, lon, country, colorIndex) {
  let { x, y, z } = convertLatLon(lat, lon, earthRadius);

  const capsule = new T.Mesh(
    new T.SphereGeometry(0.006, 30, 30),
    new T.MeshPhongMaterial({
      color: new Color(color[colorIndex]),
    })
  );
  capsule.userData = { country, lat, lon };
  // marker.position.set(x, y, z);
  capsule.position.set(x, y, z);
  capsule.rotation.set(0, 0, 0);

  locationObj.add(capsule);

  // domevents.addEventListener(capsule, "click", () => {
  //   alert(country);
  // });
}

// render this will render the items
const render = () => {
  scene.add(locationObj);
  controls.update();
  renderer.render(scene, camera);
};

// this will reinitiate the variable upon resize
function resizeWindow() {
  if (camera) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let rotation = 0;
let marker;

// this is for animating the stuffs
function animate() {
  // this will rerender continuously for creating a animation

  earth.rotation.y += earthRadius / changingData["One day"];
  satelliteObj.rotation.y += (earthRadius / changingData["One day"]) * 16;
  clouds.rotation.y += earthRadius / changingData["One day"] + 0.00001;
  clouds.rotation.x += earthRadius / changingData["One day"] + 0.000001;
  // if we move the sphere then the location also should be rotated respectively.
  // this will make sure to sync the rotation so that the coordinates do not miss match
  locationObj.rotation.y = earth.rotation.y;
  locationHover();

  render();
  requestAnimationFrame(animate);
}

// generating a marker for the city and adding it

// looking for window resize
window.addEventListener("resize", resizeWindow);

function THREEJS({ states: { latitude, longitude } }) {
  useEffect(() => {
    //  setsup the three js screen for us
    setup();
    getSun();
    getEarth();
    getSattelite();
    createStars(1000);
    createClouds();

    // generates a city for a give coordinate

    data.map((elem, index) => {
      getLocation(
        parseInt(elem[2]),
        parseInt(elem[3]),
        elem[0],
        Math.floor(Math.random() * 10 + 1)
      );
    });
    console.log(locationObj.children);

    render();

    animate();
  }, []);
  useEffect(() => {
    if (!camera || !latitude || !longitude) return;
    const { x, y, z } = convertLatLon(
      parseInt(latitude),
      parseInt(longitude),
      earthRadius
    );

    new GLTFLoader().load("/scene.gltf", (model) => {
      marker = model.scene;
      const scale = 0.01;
      // model.scene.position.set(0.1, 0.7, 0.2);
      model.scene.scale.set(scale, scale, scale);

      // model.scene.castShadow(true);

      // model.scene.position.z = 1;
      model.scene.position.set(x, y, z + 0.03);
      model.scene.rotateX = 0;
      model.scene.rotateY = 1;

      locationObj.add(model.scene);
    });
    scene.add(locationObj);

    camera.position.set(x, y, z);
  }, [latitude, longitude]);

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
}

export default THREEJS;
