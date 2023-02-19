import * as THREE from 'three';
import './style.css';

import Clock from './js/Clock.js';
import Resize from './js/Resize.js';
import Camera from './js/Camera.js';
import Renderer from './js/Renderer.js';
import Load from './js/Load.js';
import Source from './js/Source.js';

export default class main {
	static instance;
	constructor(canvas) {
		if (main.instance) {
			return main.instance;
		}
		main.instance = this;

		this.canvas = canvas;
		this.scene = new THREE.Scene();
		this.load = new Load();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.clock = new Clock();
		this.resize = new Resize();
		this.source = new Source();

		this.light1 = new THREE.PointLight( 0xffffff, 1.7, 50 );
		this.light1.castShadow = true;
		this.light1.position.z = 0;
		this.light1.position.y = 4;
		this.scene.add( this.light1 );

		this.scene.background = new THREE.Color( 0xbfe3dd );

		this.clock.on("render", () => this.update());

		this.resize.on("resize", () => this.size());
	}

	size() {
		this.renderer.resize();
	}

	update() {
		this.renderer.update();
		this.camera.update();
	}
}