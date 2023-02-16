import * as THREE from 'three';
import main from '../main.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import encoder from 'three/examples/jsm/libs/draco/gltf/draco_decoder.js';
import bass from '../../mod/bass.gltf';

export default class Load {
	constructor() {	
		this.main = new main();
		this.scene = this.main.scene;
		



		this.gltf = new GLTFLoader();
		this.loa();
	}

	loa() {
		this.gltf.load(bass, (gltf) => this.save(gltf), undefined,
		 function (e) {
			console.error(e);
		})
	}

	save(gltf) {
		const model = gltf.scene;
		model.scale.set( 0.5, 0.5, 0.5 );

		this.scene.add(model);
	}
}