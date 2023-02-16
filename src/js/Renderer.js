import * as THREE from 'three';
import main from '../main.js';

export default class Renderer {
	constructor() {	
		this.main = new main();
		this.scene = this.main.scene;
		this.canvas = this.main.canvas;
		this.camera = this.main.camera.perspectiveCamera;

		this.renderer = new THREE.WebGLRenderer( {
			canvas: this.canvas
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	resize() {
		this.renderer.setPixelRatio(window.pixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	update() {
		this.renderer.render(this.scene, this.camera);
	}
}