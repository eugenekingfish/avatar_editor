import * as THREE from 'three';

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const loader = new THREE.TextureLoader();

// Initialising the renderer and creating animation loop
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

scene.add(camera);
camera.position.z = -5;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

let body_mats = [];

init();

function init_sprite_mats() {
   for (let i = 1; i <= 8; ++i) {
      let map = loader.load("/Body/Body_0" + '' + i + '.png', );
      body_mats[i] = new THREE.SpriteMaterial( { map: map, color : 0xfa0000} );
   }
}

function init() {

   // Initialising the camera

   /*
   init_sprite_mats();
   const sprite = new THREE.Sprite( body_mats[1] );
   scene.add( sprite );
   */

   /*
   let sprites = make_grid(1, 1, 0.1, new THREE.Vector3(0,0,0));

   for (let i = 0; i < sprites.length; ++i) {
      scene.add( sprites[i] );
   }
   */
}


function on_pointer_move( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function make_sprite(position) {
   let sprite = new THREE.Sprite( { map : body_mats[2] } );
   sprite.position.set(position);
   return sprite;
}

function make_grid(columns, rows, pad, origin) {
   let sprites = [];
   let counter = 0;

   for (let y = 0; y < columns; y++) {
      for (let x = 0; x < rows; x++) {
         var pad_vec = new THREE.Vector3(0, 0, 0);
         if (x != 0 || y != 0) {
            pad_vec.x = x * pad;
            pad_vec.y = y * pad;
         }
         sprites[counter] = make_sprite( ( new THREE.Vector3(x, y, 0) ).add(pad_vec).add(origin) );
         counter += 1;
      }
   }
   return sprites;
}

function animate() {
   cube.rotation.x += 0.01;
   cube.rotation.y += 0.01;
   renderer.render( scene, camera );
}
