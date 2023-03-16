import * as THREE from 'three';
import main from '../../main.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { EventEmitter } from 'eventemitter3/umd/eventemitter3.js'

export default class Load extends EventEmitter {
	constructor(attributes) {
		super();

		this.main = new main();
		this.parent = this.main.parent;
		this.scene = this.main.scene;

		this.loaded = [];
		this.setLoader();
		this.load(attributes)

		this.track = attributes.length;
		this.tracked = 0;
	}

	setLoader() {
		this.loaders = [];

		this.loaders.DracoLoader = new DRACOLoader();
		this.loaders.DracoLoader.setDecoderPath('./draco/');
		this.loaders.DracoLoader.setDecoderConfig({type: 'js'});

		this.loaders.GLTFLoader = new GLTFLoader();
		this.loaders.GLTFLoader.setDRACOLoader(this.loaders.DracoLoader);

		this.loaders.TextureLoader = new THREE.TextureLoader();
	}

	load(attributes = []) {
		this.loaders.push({
			ext: ['glb', 'gltf'],
			add: (resource) => {
				this.loaders.GLTFLoader.load(resource.path, (gltf) => {
					this.save(gltf, resource)
					this.scene.add(gltf.scene)
				})
			}
		});

		this.loaders.push({
			ext: ['png', 'jpg'],
			add: (resource) => {	
				this.loaders.TextureLoader.load(resource.path, (result) => this.save(result, resource))
			}
		});

		for (const attribute of attributes) {
			let extension = attribute.ext;
			let loader = this.loaders.find(_extension => _extension.ext.find((ext) => ext === extension))
			if (loader) {
				loader.add(attribute);
			}
		}
	}

	save(result, asset) {
		this.loaded[asset.name] = result;
		this.tracked++;

		if (this.tracked == this.track) {
			this.emit("loaded")
		}
    }
}