import { EventEmitter } from 'eventemitter3/umd/eventemitter3.js';

export default class Clock extends EventEmitter {
	constructor() {
		super();
		this.then = Date.now();
		this.deltaTime;
		this.freq();
	}

	freq() {
		this.now = Date.now();
		this.deltaTime = this.now - this.then;
		this.then = this.now;

		this.emit("render");
		window.requestAnimationFrame(() => this.freq());
	}
}