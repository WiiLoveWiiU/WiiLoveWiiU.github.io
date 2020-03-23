"use strict";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75, window.innerWidth/window.innerHeight, 0.1, 1000
  // FOV, aspect ratio, draw distance start, end
);

var renderer = new THREE.WebGLRenderer({antialias: true});

var textureCube = new THREE.CubeTextureLoader().load([
  "cubemap/posx.jpg",
  "cubemap/negx.jpg",
  "cubemap/posy.jpg",
  "cubemap/negy.jpg",
  "cubemap/posz.jpg",
  "cubemap/negz.jpg"
]);
scene.background = textureCube;

var green = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  envMap: textureCube,
  roughness: 0,
  metalness: 0.0
});

//var cube = new THREE.BoxGeometry(1, 1, 1);
//var box = new THREE.Mesh(cube, green);
//box.scale.set(1, 1, 1);
//box.position.set(2, 0, 0);
//scene.add(box);

//var sphere = new THREE.SphereGeometry(0.5, 32, 32);
//var ball = new THREE.Mesh(sphere, green);
//ball.scale.set(1, 1, 1);
//ball.position.set(-2, 0, 0);
//scene.add(ball);

var thing;
new THREE.STLLoader().load(
  'models/WiiU.stl',
  function(objecc) {
    thing = new THREE.Mesh(objecc, green);
    thing.position.set(0, 0, 0);
    thing.rotation.set(-Math.PI / 2, 0, 0);
    thing.scale.set(25, 25, 25);
    scene.add(thing);
    animate();
  }
);

//var plane = new THREE.PlaneGeometry();
//var floor = new THREE.Mesh(plane, green);
//floor.rotation.set(-Math.PI / 2, 0, 0);
//floor.scale.set(8, 8, 8);
//floor.position.set(0, -2, 0);
//scene.add(floor);

var ambient = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambient);
var light = new THREE.PointLight(0xffffff);
light.position.set(-1, 2, 4);
scene.add(light);

camera.position.set(0, 0, 3);

document.addEventListener("mousemove", mousemove, false);

var mouseX = 0;
var mouseY = 0;

function mousemove() {
  mouseX = (event.clientX - (window.innerWidth / 2)) * 0.025; //4
  mouseY = (event.clientY - (window.innerHeight / 2)) * 0.025; //4
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  //box.rotation.x += 0.01;
  //box.rotation.y += 0.01;

  //thing.rotation.z += 0.01;
}

document.body.appendChild(renderer.domElement);
window.addEventListener('resize', resize, false);

function resize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

resize();
