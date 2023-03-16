import main from '../../main.js';
import { EventEmitter } from 'eventemitter3/umd/eventemitter3.js';

export default class Resize extends EventEmitter {
	constructor() {
		super();
		window.addEventListener("resize", () => {
			this.emit("resize");
		});
	}
}