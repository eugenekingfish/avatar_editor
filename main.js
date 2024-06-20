import * as THREE from 'three';

const scene = new THREE.Scene();
let width = window.innerWidth;
let height = window.innerHeight;
const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 10 );

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const renderer = new THREE.WebGLRenderer( { alpha : true} );
const loader = new THREE.TextureLoader();

const geometry = new THREE.BoxGeometry( 200, 200, 0 );
let body_mats = [];

function load_textures() {
   for (let i = 1; i <= 8; ++i) {
      const texture = loader.load("/Body/Body_0" + '' + i + '.png', );
      texture.colorSpace = THREE.SRGBColorSpace;
      body_mats[i] = new THREE.MeshBasicMaterial( { map: texture } );
   }
}
load_textures();

function init() {
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize( window.innerWidth, window.innerHeight );
   document.body.appendChild( renderer.domElement );
   scene.add(camera);
}

init();

function on_pointer_move( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function make_box(position, material) {
   let cube = new THREE.Mesh( geometry, body_mats[7] );
   cube.position.x = position.x;
   cube.position.y = position.y;
   cube.position.z = position.z;
   return cube;
}

function make_grid(columns, rows, pad, origin) {
   let boxes = [];
   let counter = 0;

   for (let y = 0; y < columns; y++) {
      for (let x = 0; x < rows; x++) {
         var pad_vec = new THREE.Vector3(0, 0, 0);
         if (x != 0 || y != 0) {
            pad_vec.x = x * pad;
            pad_vec.y = y * pad;
         }
         boxes[counter] = make_box( ( new THREE.Vector3(x, y, 0) ).add(pad_vec).add(origin) );
         counter += 1;
      }
   }
   return boxes;
}

let boxes = make_grid(4, 2, 200, new THREE.Vector3(-500,0,0));

for (let i = 0; i < boxes.length; ++i) {
   scene.add( boxes[i] );
}


camera.position.z = 1.1;

function animate() {
   /*
	raycaster.setFromCamera(pointer, camera);

	const intersects = raycaster.intersectObjects( scene.children, false);

	for ( let i = 0; i < intersects.length; i++ ) {
		intersects[i].object.material.color.set( 0xff0000 );
	}
   */
   renderer.render(scene, camera);
   window.requestAnimationFrame(animate);
}
renderer.setAnimationLoop( animate );
window.addEventListener( 'pointermove', on_pointer_move );
