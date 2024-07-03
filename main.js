import * as THREE from 'three';

const scene = new THREE.Scene();
let width = window.innerWidth;
let height = window.innerHeight;

const camera = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1, 10 );
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer( { alpha : true} );
const loader = new THREE.TextureLoader();

let body_mats = [];

function load_textures() {
   for (let i = 1; i <= 8; ++i) {
      let texture = loader.load("/Body/Body_0" + '' + i + '.png', );
      body_mats[i] = new THREE.SpriteMaterial( { map: texture } );
   }
}

function init() {
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize( window.innerWidth, window.innerHeight );
   renderer.setAnimationLoop( animate );
   document.body.appendChild( renderer.domElement );

   scene.add(camera);

   load_textures();
   const sprite = new THREE.Sprite( body_mats[1] );
   scene.add( sprite );

   /*
   let sprites = make_grid(1, 1, 0.1, new THREE.Vector3(0,0,0));

   for (let i = 0; i < sprites.length; ++i) {
      scene.add( sprites[i] );
   }
   */
}

init();

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
   renderer.render( scene, camera );
}
