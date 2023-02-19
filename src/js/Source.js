import * as THREE from 'three';

import p_bass from '../../mod/res/musica.glb';

import Load from './Load.js';

export default class Source {
	constructor() {
		this.loader = new Load();

		this.loader.load({
			name: 'bass', 
			path: p_bass,
			ext: 'glb'
		});
	}
}