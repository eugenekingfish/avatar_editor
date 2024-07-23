import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 5000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const loader = new THREE.TextureLoader();

camera.position.z = 5;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
   raycaster.setFromCamera(pointer, camera);

   // Get intersected objects
   const intersects_bodies = raycaster.intersectObjects(bodies.children);
   const intersects_faces = raycaster.intersectObjects(faces.children);
   const intersects_eyes = raycaster.intersectObjects(eyes.children);
   const intersects_mouths = raycaster.intersectObjects(mouths.children);

   // Reset colours of all objects
   bodies.children.forEach(child => {
      if (child.material) {
         child.material.color.set(0xffffff); // Assuming white is the original color
         child.scale.set(1,1,1);
      }
   });

   // Set colour for intersected objects
   intersects_bodies.forEach(intersect => {
      if (intersect.object.material) {
         //intersect.object.material.color.set(0xf270b1);
         intersect.object.scale.set(1.1, 1.1,1);
         master_body.material = intersect.object.material;
      }
   });

   intersects_faces.forEach(intersect => {
      if (intersect.object.material) {
         //intersect.object.material.color.set(0xf270b1);
         intersect.object.scale.set(1.1, 1.1,1);
         master_face.material = intersect.object.material;
      }
   });

   intersects_eyes.forEach(intersect => { if (intersect.object.material) { //intersect.object.material.color.set(0xf270b1);
         intersect.object.scale.set(1.1, 1.1,1);
         master_eyes.material = intersect.object.material;
      }
   });
   intersects_mouths.forEach(intersect => {
      if (intersect.object.material) {
         //intersect.object.material.color.set(0xf270b1);
         intersect.object.scale.set(1.1, 1.1,1);
         master_mouth.material = intersect.object.material;
      }
   });

}

let body_mats = [];
let face_mats = [];
let eye_mats = [];
let mouth_mats = [];

function init_sprite_mats() {

   // Bodies
   for (let i = 1; i <= 8; ++i) {
      let map = loader.load("/Body/Body_0" + '' + i + '.png', );
      body_mats[i] = new THREE.SpriteMaterial( { map: map } );
   }

   // Faces
   for (let i = 1; i <= 5; ++i) {
      let map = loader.load("/Face/Face_0" + '' + i + '.png', );
      face_mats[i] = new THREE.SpriteMaterial( { map: map } );
   }

   // Eyes
   for (let i = 1; i <= 14; ++i) {
      let prefix = "/Eyes/Eyes";
      if (i < 10) {
         prefix += "_0";
      }
      else {
         prefix += "_"
      }
      let map = loader.load(prefix + '' + i + '.png', );
      eye_mats[i] = new THREE.SpriteMaterial( { map: map } );
   }

   // Mouths

   for (let i = 1; i <= 11; ++i) {
      let prefix = "/Mouth/Mouth";
      if (i < 10) {
         prefix += "_0";
      }
      else {
         prefix += "_"
      }
      let map = loader.load(prefix + '' + i + '.png', );
      mouth_mats[i] = new THREE.SpriteMaterial( { map: map } );
   }
}

init_sprite_mats();

var columns = 1;
var rows = 5;
var counter = 1;
//let bodies = new THREE.Group();

function create_grid(arr, cols, rows, x_shift, y_shift) {

   let counter = 1;
   let out = new THREE.Group();

   for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
         const sprite = new THREE.Sprite( arr[counter] );
         sprite.scale.set (1, 1, 1);
         sprite.position.x = x + x_shift;
         sprite.position.y = y + y_shift;
         out.add(sprite);
         counter += 1;
      }
   }
   return out;
}

var bodies = create_grid(body_mats, 2, 4, 0, 0);
var faces = create_grid(face_mats, 2, 3, 2, 0);
var eyes = create_grid(eye_mats, 7, 2, -0.5, -2);
var mouths = create_grid(mouth_mats, 2, 6, -5, -2);

scene.add(bodies);
scene.add(faces);
scene.add(eyes);
scene.add(mouths);


let master_body = new THREE.Sprite ( body_mats[1] );
let master_face = new THREE.Sprite ( face_mats[1] );
let master_eyes = new THREE.Sprite ( eye_mats[1] );
let master_mouth = new THREE.Sprite ( mouth_mats[1] );

master_body.scale.set(3,3,1);
master_face.scale.set(3,3,1);
master_eyes.scale.set(3,3,1);
master_mouth.scale.set(3,3,1);
master_body.position.x = -1.9;
master_face.position.x = -1.9;
master_eyes.position.x = -1.9;
master_mouth.position.x = -1.9;
master_face.position.z = -0.01;
scene.add (master_body);
scene.add (master_face);
scene.add (master_eyes);
scene.add (master_mouth);

function animate() {
   window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
}
window.addEventListener( 'pointermove', onPointerMove );
