import * as THREE from "three";

(function () {
  var webglEl = document.getElementById("webgl");

  // if (!Detector.webgl) {
  //   Detector.addGetWebGLMessage(webglEl);
  //   return;
  // }

  var width = window.innerWidth,
    height = window.innerHeight;

  var radius = 0.8,
    segments = 35,
    rotation = 6;

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
  camera.position.set(0.7, 0.7, -2);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  scene.add(new THREE.AmbientLight(0x333333));

  var light = new THREE.DirectionalLight(
    new THREE.Color("rgb(253, 241, 174)"),
    1
  );
  light.position.set(1, 1, -2);
  scene.add(light);

  var sphere = createSphere(radius, segments);
  sphere.rotation.y = rotation;
  scene.add(sphere);

  var clouds = createClouds(radius, segments);
  clouds.rotation.y = rotation;
  scene.add(clouds);

  var stars = createStars(90, 64);
  scene.add(stars);

  var controls = new THREE.TrackballControls(camera);

  webglEl.appendChild(renderer.domElement);

  render();

  function render() {
    controls.update();
    sphere.rotation.x += 0.00005;
    sphere.rotation.y += 0.0008;
    clouds.rotation.y += 0.001;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function createSphere(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture("images/2_no_clouds_4k.jpg"),
        bumpMap: THREE.ImageUtils.loadTexture("images/elev_bump_4k.jpg"),
        bumpScale: 0.005,
        specularMap: THREE.ImageUtils.loadTexture("images/water_4k.png"),
        specular: new THREE.Color("grey"),
      })
    );
  }

  function createClouds(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius + 0.003, segments, segments),
      new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture("images/fair_clouds_4k.png"),
        transparent: true,
      })
    );
  }

  function createStars(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("images/galaxy_starfield.png"),
        side: THREE.BackSide,
      })
    );
  }
  window.addEventListener("resize", sar());

  function sar() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
})();
