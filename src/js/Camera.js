import * as THREE from 'three';
import main from "../main.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
	constructor() {
		this.main = new main();
		this.scene = this.main.scene;
		this.canvas = this.main.canvas;
		this.perspective();
		this.orbit();
	}

	perspective() {
		this.perspectiveCamera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 500);
		this.perspectiveCamera.position.z = 1;
		this.perspectiveCamera.position.y = 3;
		this.perspectiveCamera.position.x = 0.5;
		this.scene.add(this.perspectiveCamera);
	}

	orbit() {
		this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
		this.controls.maxDistance = 7;
		this.controls.minDistance = 1;
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
        this.controls.enableZoom = true;
	}

	resize() {
		this.perspectiveCamera.aspect = window.innerWidth/window.innerHeight;
		this.perspectiveCamera.updateProjectionMatrix();
	}

	update() {
		this.controls.update();
	}
}