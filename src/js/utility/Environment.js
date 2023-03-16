import * as THREE from 'three';

import main from '../../main.js'
import Load from './Load.js';

import { EventEmitter } from 'eventemitter3/umd/eventemitter3.js';

export default class Env extends EventEmitter {
	constructor() {
		super();
		this.main = new main();
		
		this.load = this.main.load;


	}
}