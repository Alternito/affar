import * as THREE from 'three';
import './style.css';

import Camera from './js/Camera.js';
import Renderer from './js/Renderer.js';

import Clock from './js/utility/Clock.js';
import Resize from './js/utility/Resize.js';
import Environment from './js/utility/Environment.js';
import Source from './js/utility/Source.js';
import Load from './js/utility/Load.js';

export default class main {
	static instance;
	constructor(canvas) {
		if (main.instance) {
			return main.instance;
		}
		main.instance = this;

		this.canvas = canvas;
		this.scene = new THREE.Scene();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.load = new Load(Source);
		this.clock = new Clock();
		this.resize = new Resize();
		this.environment = new Environment();

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