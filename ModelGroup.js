import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class ModelGroup extends THREE.Group {
  constructor() {
    super();

    this.modelUrl = './models/crispBag.glb';
    this.onCreate();
  }

  onCreate() {
    new GLTFLoader().load(this.modelUrl, (gltf) => {
      this.add(gltf.scene);
    });
  }

  updateTransform() {
    this.rotation.z += Math.PI / 2;
    this.scale.set(2.0, 2.0, 2.0);
  }

  rotate() {
    this.rotation.y += 0.0001;
  }

  dispose() {
    // Dispose everything that was created in this class - GLTF model, materials etc.
  }
}
