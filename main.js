import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js';
import Model from './Model.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x333333, 20);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(-30, 50, 0);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, -1.5, 5);
controls.update();

const gridHelper = new THREE.GridHelper(4, 2);
scene.add(gridHelper);

scene.background = new THREE.CubeTextureLoader()
  .setPath('./skybox/')
  .load(['nx.jpg', 'px.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

const crisp = new Model(scene, './models/crisp.glb');
const hand = new Model(scene, './models/emoji.glb');
hand.setup();

function animate(t) {
  TWEEN.update(t);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  crisp.rotate();
  hand.antiRotate();
}

document.onkeydown = (e) => {
  if (e.keyCode === 38) {
    const tween = new TWEEN.Tween({ z: crisp.z })
      .to(
        {
          z: crisp.z - 2,
        },
        500
      )
      .onUpdate((coords) => {
        crisp.moveZ(coords.z);
      });
    tween.start();
  }

  if (e.keyCode === 40) {
    const tween = new TWEEN.Tween({ z: crisp.z })
      .to(
        {
          z: crisp.z + 2,
        },
        500
      )
      .onUpdate((coords) => {
        crisp.moveZ(coords.z);
      });
    tween.start();
  }

  if (e.keyCode === 37) {
    const tween = new TWEEN.Tween({ x: crisp.x })
      .to(
        {
          x: crisp.x - 2,
        },
        500
      )
      .onUpdate((coords) => {
        crisp.moveX(coords.x);
      });
    tween.start();
  }

  if (e.keyCode === 39) {
    const tween = new TWEEN.Tween({ x: crisp.x })
      .to(
        {
          x: crisp.x + 2,
        },
        500
      )
      .onUpdate((coords) => {
        crisp.moveX(coords.x);
      });
    tween.start();
  }
};
