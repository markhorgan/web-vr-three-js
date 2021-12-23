import { Mesh, HemisphereLight, PerspectiveCamera, Scene, WebGLRenderer, BoxGeometry, MeshStandardMaterial, Vector3 } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

let camera, scene, renderer;

function init() {
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-0.5, 0.5, 2);
  camera.lookAt(new Vector3());
  scene = new Scene();

  renderer = new WebGLRenderer({
      antialias: true,
      canvas: canvas,
      alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

  renderer.setAnimationLoop(function () {
    renderer.render(scene, camera);
  });

  initVR();
  initScene();
}

function initVR() {
  renderer.xr.enabled = true;

  document.body.appendChild(VRButton.createButton(renderer));
}

function initScene() {
  const boxGeometry = new BoxGeometry(0.5, 0.5, 0.5);
  const boxMaterial = new MeshStandardMaterial({ color: 0x5853e6 });
  const box = new Mesh(boxGeometry, boxMaterial);
  scene.add(box);

  const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});
