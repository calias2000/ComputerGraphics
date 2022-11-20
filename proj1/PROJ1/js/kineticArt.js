/*PRIMEIRO PROJETO BD -- KINECT ART MOBILE 2/10/2020*/

/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var geometry, material, mesh;

var cylinder, cube, thread, obj1, obj2, finalObj;

var keyDown = false, keyUp = false, keyLeft = false, keyRight = false;

var movement = new THREE.Vector3(0, 0, 0);

var key_Q = false, key_W = false, key_A = false, key_S = false;

function createThread(obj, x, y, z, size, axis){
    geometry = new THREE.CylinderGeometry(0.05, 0.05, size, 15);
    material = new THREE.MeshBasicMaterial({color: 0xC16161});
    thread = new THREE.Mesh(geometry, material);
    switch(axis){
      case 'y':
        thread.rotateY(Math.PI/2);
        break;
      case 'z':
        thread.rotateZ(Math.PI/2);
        break;
      case 'x':
        thread.rotateX(Math.PI/2);
        break;
    }
    thread.position.set(x, y, z);
    obj.add(thread);
}

function createCube(obj, x, y, z){
  geometry = new THREE.BoxGeometry(2,2,2);
  material = new THREE.MeshBasicMaterial({color: 0xC16161});
  cube = new THREE.Mesh(geometry, material);
  cube.position.set(x,y,z);
  obj.add(cube);
}

function createCylinder(obj, x, y, z, axis, size){
  geometry = new THREE.CylinderGeometry(1, 1, size, 20);
  material = new THREE.MeshBasicMaterial({color: 0xC16161});
  cylinder = new THREE.Mesh(geometry, material);
  switch(axis){
    case 'y':
      cylinder.rotateY(Math.PI/2);
      break;
    case 'z':
      cylinder.rotateZ(Math.PI/2);
      break;
    case 'x':
      cylinder.rotateX(Math.PI/2);
      break;
  }
  cylinder.position.set(x, y, z);
  obj.add(cylinder);
}

function createArt(){
  finalObj = new THREE.Object3D();
  obj1 = new THREE.Object3D();
  createThread(obj1, 0, 35, 0, 16, "y");
  createThread(obj1, 0, 41, 0, 20, "z");
  createCube(obj1, 11, 41, 0);
  createCube(obj1, -11, 41, 0);
  createThread(obj1, 11, 39.5, 0, 1, "y");
  createThread(obj1, -11, 39.5, 0, 1, "y");
  createThread(obj1, 11, 39, 0, 10, "z");
  createThread(obj1, -11, 39, 0, 10, "z");
  createThread(obj1, 6, 35, 0, 8, "y");
  createThread(obj1, 16, 35, 0, 8, "y");
  createThread(obj1, -6, 35, 0, 8, "y");
  createThread(obj1, -16, 35, 0, 8, "y");
  createCube(obj1, 6, 30, 0);
  createCube(obj1, 16, 30, 0);
  createCube(obj1, -6, 30, 0);
  createCube(obj1, -16, 30, 0);

  obj2 = new THREE.Object3D();
  createThread(obj2, 0, 27, 0, 22, "z");
  createThread(obj2, 11, 31, 0, 8, "y");
  createThread(obj2, -11, 31, 0, 8, "y");
  createCube(obj2, 11, 36, 0);
  createCube(obj2, -11, 36, 0);
  createThread(obj2, 0, 25, 0, 4, "y");
  createCylinder(obj2, 0, 22, 0, "z", 10);
  createThread(obj2, 2.5, 20, 0, 2, "y");
  createThread(obj2, -2.5, 20, 0, 2, "y");
  createThread(obj2, 0, 19, 0, 20, "z");
  createCube(obj2, 11, 19, 0);
  createCube(obj2, -11, 19, 0);
  createThread(obj2, 11, 14, 0, 8, "y");
  createThread(obj2, -11, 14, 0, 8, "y");
  createCylinder(obj2, 11, 9, 0, "z", 7);
  createCylinder(obj2, -11, 9, 0, "z", 7);
  createCylinder(obj2, 0, 22, 20, "x", 40);
  //obj1.position.set(0,0,0);


  finalObj.add(obj1);
  finalObj.add(obj2);
  scene.add(finalObj);
}

function updateObj1(){
    if (key_Q){
      obj1.rotation.y += -0.05;
    }
    if (key_W){
      obj1.rotation.y += 0.05;
    }
}

function updateObj2(){
  if (key_A){
    obj2.rotation.y += -0.05;
  }
  if (key_S){
    obj2.rotation.y += 0.05;
  }
}

function updateFinalObj(){
    if (keyDown){
        movement.x = 1;
    } if (keyUp){
        movement.x = -1;
    } if (keyLeft){
        movement.z = 1;
    } if (keyRight){
        movement.z = -1;
    }

    movement.normalize();
    finalObj.translateOnAxis(movement, 0.5);
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    createArt();
}

function createCamera() {
    'use strict';
    var aspect = window.innerWidth/window.innerHeight;
    var frustum = 100;
    camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 87:
            key_W = true;
            break;
        case 81:
            key_Q = true;
            break;
        case 65:
            key_A = true;
            break;
        case 83:
            key_S = true;
            break;
        case 38:
            keyUp = true;
            break;
        case 39:
            keyRight = true;
            break;
        case 37:
            keyLeft = true;
            break;
        case 40:
            keyDown = true;
            break;
    }
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
        case 87:
            key_W = false;
            break;
        case 65:
            key_A = false;
            break;
        case 83:
            key_S = false;
            break;
        case 81:
            key_Q = false;
            break;
        case 38:
            keyUp = false;
            movement.x = 0;
            break;
        case 39:
            keyRight = false;
            movement.z = 0;
            break;
        case 37:
            keyLeft = false;
            movement.z = 0;
            break;
        case 40:
            keyDown = false;
            movement.x = 0;
            break;
    }
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', resize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    createScene();
    createCamera();
}

function resize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

    updateObj1();
    updateObj2();
    updateFinalObj();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
