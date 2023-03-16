import * as THREE from 'three';
import main from "../main.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const pos = new THREE.Vector2();
let INTERSECTED;

export default class Camera {
	constructor() {
		this.main = new main();
		this.scene = this.main.scene;
		this.canvas = this.main.canvas;
		this.raycaster = new THREE.Raycaster();

		console.log(this.scene)

		this.perspective();
		this.orbit();

		document.addEventListener("mousemove", moved);
	}

	perspective() {
		this.perspectiveCamera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 500);
		this.perspectiveCamera.position.y = 4;

		const light1  = new THREE.AmbientLight(0x0, 0.3);
    	this.perspectiveCamera.add( light1 );

		const light2  = new THREE.DirectionalLight(0xffffff, 2.5);
    	light2.position.set(0.5, 0, 0.866);
    	this.perspectiveCamera.add( light2 );

    	const hemiLight = new THREE.HemisphereLight();
	    this.scene.add(hemiLight);
		this.scene.add(this.perspectiveCamera);
	}

	orbit() {
		this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
		this.controls.enableDamping = true;
	}

	resize() {
		this.perspectiveCamera.aspect = window.innerWidth/window.innerHeight;
		this.perspectiveCamera.updateProjectionMatrix();
	}

	update() {
		this.raycaster.setFromCamera(pos, this.perspectiveCamera);
		const intersect = this.raycaster.intersectObjects(this.scene.children, true);
		if (intersect.length > 0) {

			if (INTERSECTED) {
				if (!(INTERSECTED.parent.name == "room"))  {
					INTERSECTED.parent.children.forEach((childs) => {
						childs.material.emissive.setHex(INTERSECTED.currentHex)
					})
				}
			}
			INTERSECTED = intersect[0].object
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			if (!(INTERSECTED.parent.name == "room"))  {

			INTERSECTED.parent.children.forEach((childs) => {
				childs.material.emissive.setHex(0xffffff)
			})
		}

		} else {
			if (INTERSECTED) {
				INTERSECTED.parent.children.forEach((childs) => {
					childs.material.emissive.setHex(INTERSECTED.currentHex)
				})
			}

			INTERSECTED = null;
		}

		this.controls.update();
	}
}

function moved(event) {
	pos.set(((event.clientX / window.innerWidth ) * 2 - 1), (-( event.clientY / window.innerHeight ) * 2 + 1));
}