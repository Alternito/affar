import * as THREE from 'three';
import main from '../main.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import encoder from 'three/examples/jsm/libs/draco/gltf/draco_decoder.js';


export default class Load {
	constructor() {
		this.main = new main();
		this.scene = this.main.scene;

		this.loaded = [];
		this.setLoader();
	}

	setLoader() {
		this.DracoLoader = new DRACOLoader();
		this.DracoLoader.setDecoderPath('./draco/');
		this.DracoLoader.setDecoderConfig({type: 'js'});

		this.GLTFLoader = new GLTFLoader();
		this.GLTFLoader.setDRACOLoader(this.DracoLoader);
	}

	load(resource) {
		this.GLTFLoader.load(resource.path, (gltf) => this.sc(gltf), undefined,
			function (e) {
				console.error(e);
		})
	}

	sc(gltf) {		
		const model = gltf.scene;
		model.scale.set(0.5,0.5,0.5);

		this.scene.add(model);
	}
}