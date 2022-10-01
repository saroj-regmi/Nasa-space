import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  TrackballControls,
  MeshPhongMaterial,
  ImageUtils,
  Color,  
  SphereGeometry,
  MeshBasicMaterial,
  BackSide,
} from "three";

// defining all the variable in the global scope
var width,
  height,
  radius,
  segments,
  rotation,
  scene,
  camera,
  renderer,
  light,
  sphere,
  clouds,
  stars,
  controls;

//   sets up the scene for the three js and the earth to work properly.
export const sceneSetup = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  radius = 0.8;
  segments = 35;
  rotation = 6;

  scene = new Scene();

  camera = new PerspectiveCamera(45, width / height, 0.01, 1000);
  camera.position.set(0.7, 0.7, -2);

  renderer = new WebGLRenderer();
  renderer.setSize(width, height);

  scene.add(new AmbientLight(0x333333));

  light = new DirectionalLight(new Color("rgb(253, 241, 174)"), 1);
  light.position.set(1, 1, -2);
  scene.add(light);

  sphere = createSphere(radius, segments);
  sphere.rotation.y = rotation;
  scene.add(sphere);

  clouds = createClouds(radius, segments);
  clouds.rotation.y = rotation;
  scene.add(clouds);

  stars = createStars(90, 64);
  scene.add(stars);

  controls = new TrackballControls(camera);
};

export function render() {
  controls.update();
  sphere.rotation.x += 0.00005;
  sphere.rotation.y += 0.0008;
  clouds.rotation.y += 0.001;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function createSphere(radius, segments) {
  return new Mesh(
    new SphereGeometry(radius, segments, segments),
    new MeshPhongMaterial({
      map: ImageUtils.loadTexture("images/2_no_clouds_4k.jpg"),
      bumpMap: ImageUtils.loadTexture("images/elev_bump_4k.jpg"),
      bumpScale: 0.005,
      specularMap: ImageUtils.loadTexture("images/water_4k.png"),
      specular: new Color("grey"),
    })
  );
}

function createClouds(radius, segments) {
  return new Mesh(
    new SphereGeometry(radius + 0.003, segments, segments),
    new MeshPhongMaterial({
      map: ImageUtils.loadTexture("images/fair_clouds_4k.png"),
      transparent: true,
    })
  );
}

function createStars(radius, segments) {
  return new Mesh(
    new SphereGeometry(radius, segments, segments),
    new MeshBasicMaterial({
      map: ImageUtils.loadTexture("images/galaxy_starfield.png"),
      side: BackSide,
    })
  );
}
//   addEventListener("resize", resizer());

// export function resizer() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

export default renderer.domElement;
