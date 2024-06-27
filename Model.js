import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class Model {
  constructor(scene, src) {
    this.posX = 0;
    this.posY = 0;
    this.posZ = 0;
    this.rotX = 0;
    this.rotY = 0;
    this.rotZ = 0;
    this.scale = 1;

    let parent = this;
    const loader = new GLTFLoader();
    loader.load(
      src,
      function (gltf) {
        parent.model = gltf.scene;
        parent.model.position.x += parent.posX;
        parent.model.position.y += parent.posY;
        parent.model.position.z += parent.posZ;
        parent.model.rotation.x += parent.rotX;
        parent.model.rotation.y += parent.rotY;
        parent.model.rotation.z += parent.rotZ;
        parent.model.scale.set(
          parent.scale * gltf.scene.scale.x,
          parent.scale * gltf.scene.scale.y,
          parent.scale * gltf.scene.scale.z
        );
        scene.add(parent.model);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }

  moveX(value) {
    this.model.position.x = value;
  }

  moveY(value) {
    this.model.position.y = value;
  }

  moveZ(value) {
    this.model.position.z = value;
  }

  get x() {
    return this.model.position.x;
  }

  get y() {
    return this.model.position.y;
  }

  get z() {
    return this.model.position.z;
  }

  setup() {
    this.rotZ = 1 * Math.PI;
    this.posY = +3;
    this.scale = 0.8;
  }

  rotate() {
    this.model.rotation.y += 0.01;
  }

  antiRotate() {
    this.model.rotation.y -= 0.01;
  }
}
