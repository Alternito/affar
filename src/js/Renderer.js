import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
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
		this.renderer.useLegacyLights = false;
		this.renderer.outputEncoding = THREE.sRGBEncoding;
   	    this.renderer.setClearColor( 0xcccccc );
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.toneMapping = THREE.LinearToneMapping;
		this.renderer.toneMappingExposure = 0.3


		this.pmremGenerator = new THREE.PMREMGenerator( this.renderer );
   		this.pmremGenerator.compileEquirectangularShader();

		this.envi = this.pmremGenerator.fromScene( new RoomEnvironment() ).texture;
		this.scene.environment = this.envi
	}

	resize() {
		this.renderer.setPixelRatio(window.pixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	update() {
		this.renderer.render(this.scene, this.camera);
	}
}