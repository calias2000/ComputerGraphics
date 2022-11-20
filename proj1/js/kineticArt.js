/*PRIMEIRO PROJETO BD -- KINECT ART MOBILE 2/10/2020*/

/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var geometry, material, mesh;

var cylinder, cube, thread, obj1, obj2, obj3, finalObj;

var keyDown = false, keyUp = false, keyLeft = false, keyRight = false;

var movement = new THREE.Vector3(0, 0, 0);

var key_Q = false, key_W = false, key_A = false, key_D = false, key_Z = false, key_C = false, key_1 = false, key_2 = false, key_3 = false;

var clock = new THREE.Clock(), delta;

var activeCam, camera1, camera2, camera3;

var teta;

function createThread(obj, x, y, z, size, axis, angle){
    geometry = new THREE.CylinderGeometry(0.05, 0.05, size, 15);
    material = new THREE.MeshBasicMaterial({color: 0xffffff});
    thread = new THREE.Mesh(geometry, material);
    switch(axis){
      case 'y':
        thread.rotateY(angle);
        break;
      case 'z':
        thread.rotateZ(angle);
        break;
      case 'x':
        thread.rotateX(angle);
        break;
    }
    thread.position.set(x, y, z);
    obj.add(thread);
}

function createCube(obj, x, y, z, angle, size){
  geometry = new THREE.BoxGeometry(size,size,0.1);
  material = new THREE.MeshBasicMaterial({color: 0x3c77c8});
  cube = new THREE.Mesh(geometry, material);
  cube.rotateZ(angle);
  cube.position.set(x,y,z);
  obj.add(cube);
}

function createCylinder(obj, x, y, z, axis, size, angle, radius){
  geometry = new THREE.CylinderGeometry(radius, radius, size, 20);
  material = new THREE.MeshBasicMaterial({color: 0x3c77c8});
  cylinder = new THREE.Mesh(geometry, material);
  switch(axis){
    case 'y':
      cylinder.rotateY(angle);
      break;
    case 'z':
      cylinder.rotateZ(angle);
      break;
    case 'x':
      cylinder.rotateX(angle);
      break;
  }
  cylinder.position.set(x, y, z);
  obj.add(cylinder);
}

function createLeaf(obj, x, y, z, radius, scale, angle){
  geometry = new THREE.CylinderGeometry(radius, radius, 0.1, 20);
  material = new THREE.MeshBasicMaterial({color: 0x3c77c8});
  cylinder = new THREE.Mesh(geometry, material);
  cylinder.rotateX(Math.PI/2);
  cylinder.rotateY(angle);
  cylinder.scale.set(1, 1, scale);
  cylinder.position.set(x, y, z);
  obj.add(cylinder);
}


function createArt(){
  finalObj = new THREE.Object3D();
  obj1 = new THREE.Object3D();
  createThread(obj1, 0, 40, 0, 10, "y", 0);
  createCylinder(obj1, 0, 48, 0, "x", 0.1, Math.PI/2, 3);
  createThread(obj1, 2.5, 37.5, 0, Math.sqrt(50), "z", -Math.PI/4);
  createThread(obj1, 12.5, 40, 0, 15, "z", Math.PI/2);
  createCylinder(obj1, 25, 40, 0, "x", 0.1, Math.PI/2, 5);

  obj2 = new THREE.Object3D();
  createThread(obj2, 0, 30, 0, 10, "y", 0);
  createThread(obj2, 0, 25, 0, 20, "z", -Math.PI/2.5);
  var aux_X = Math.cos(Math.PI/10);
  var aux_Y = Math.sin(Math.PI/10);
  createCube(obj2, aux_X * 12.5, 25 + aux_Y * 12.5, 0, -Math.PI/2.5, 5);
  createThread(obj2, -aux_X * 10, 25 - aux_Y * 10, 0, 40, "z", Math.PI/2.5);
  createThread(obj2, -aux_X * 10 + -aux_X * 20, 25 - aux_Y * 10 + aux_Y * 20 - 3, 0, 6, "y", 0);
  createThread(obj2, -aux_X * 10 + -aux_X * 20 - 3, 25 - aux_Y * 10 + aux_Y * 20 - 9, 0, Math.sqrt(72), "z", -Math.PI/4);
  createThread(obj2, -aux_X * 10 + -aux_X * 20 + 3, 25 - aux_Y * 10 + aux_Y * 20 - 9, 0, Math.sqrt(72), "z", Math.PI/4);
  createThread(obj2, -aux_X * 10 + -aux_X * 20 - 6, 25 - aux_Y * 10 + aux_Y * 20 - 14, 0, 4, "y", 0);
  createThread(obj2, -aux_X * 10 + -aux_X * 20 + 6, 25 - aux_Y * 10 + aux_Y * 20 - 14, 0, 4, "y", 0);
  createCube(obj2, -aux_X * 10 + -aux_X * 20 - 6, 25 - aux_Y * 10 + aux_Y * 20 - 16 - Math.sqrt(8), 0, Math.PI/4, 4);
  createCylinder(obj2, -aux_X * 10 + -aux_X * 20 + 6, 25 - aux_Y * 10 + aux_Y * 20 - 16 - Math.sqrt(32)/2, 0, "x", 0.1, Math.PI/2, Math.sqrt(32)/2);
  var aux_point = new THREE.Vector2(-aux_X * 10 + aux_X * 20, 25 - aux_Y * 10 - aux_Y * 20);
  createThread(obj2, aux_point.x + 10, aux_point.y, 0, 20, "z", Math.PI/2);
  createThread(obj2, aux_point.x, aux_point.y - 5, 0, 10, "y", 0);
  createThread(obj2, aux_point.x - Math.cos(Math.PI/10) * 5, aux_point.y - 10 + Math.sin(Math.PI/10) * 5, 0, 10, "z", 2*Math.PI/5);
  createLeaf(obj2, aux_point.x - Math.cos(Math.PI/10) * 10, aux_point.y - 10 + Math.sin(Math.PI/10) * 10, 0, 6, 0.2, -Math.PI/10);
  createLeaf(obj2, aux_point.x + 24, aux_point.y, 0, 4, 0.4, 0);
  createThread(obj2, aux_point.x/2 - Math.cos(Math.PI/4)*5, aux_point.y - 10 - aux_point.x/2 - Math.sin(Math.PI/4)*5, 0, 10 + Math.sqrt(Math.pow(aux_point.x, 2) + Math.pow(aux_point.x, 2)), "z", 3*Math.PI/4);
  createThread(obj2, aux_point.x/2 + aux_point.x, aux_point.y - 10 - aux_point.x/2, 0, Math.sqrt(Math.pow(aux_point.x, 2) + Math.pow(aux_point.x, 2)), "z", -3*Math.PI/4);

  var aux_Y2 = aux_point.y - 10 - aux_point.x;

  createThread(obj2, aux_point.x*2 + Math.cos(2*Math.PI/5) * 4, aux_Y2 + Math.sin(2*Math.PI/5) * 4, 0, 8, "z", -Math.PI/10);
  createCube(obj2, aux_point.x*2 + Math.cos(2*Math.PI/5) * 8, aux_Y2 + Math.sin(2*Math.PI/5) * 8, 0, Math.PI/4 - Math.PI/10, 3.5);

  obj3 = new THREE.Object3D();
  createThread(obj3, 0, aux_Y2 - 5, 0, 10, "y", 0);
  createThread(obj3, 0, aux_Y2 - 10, 0, 25, "z", 2*Math.PI/5);
  createThread(obj3, Math.cos(Math.PI/10) * 12.5 + Math.cos(Math.PI/10) * 7.5, aux_Y2 - 10 - Math.sin(Math.PI/10) * 12.5 + Math.sin(Math.PI/10) * 7.5, 0, 30, "z", -2*Math.PI/5);
  createCube(obj3, Math.cos(Math.PI/10) * 12.5 + Math.cos(Math.PI/10) * 22.5, aux_Y2 - 10 - Math.sin(Math.PI/10) * 12.5 + Math.sin(Math.PI/10) * 22.5, 0, Math.PI/2 - 2*Math.PI/5, 9);
  createLeaf(obj3, -Math.cos(Math.PI/10) * 12.5, aux_Y2 - 10 + Math.sin(Math.PI/10) * 12.5, 0, 4, 0.4, -Math.PI/10);

  var aux_point2 = new THREE.Vector2(Math.cos(Math.PI/10) * 12.5, aux_Y2 - 10 - Math.sin(Math.PI/10) * 12.5);

  createThread(obj3, aux_point2.x - Math.cos(Math.PI/10) * 7.5, aux_point2.y - Math.sin(Math.PI/10) * 7.5 - 2, 0, 4, "y", 0);
  createThread(obj3, aux_point2.x - Math.cos(Math.PI/10) * 7.5 - 5, aux_point2.y - Math.sin(Math.PI/10) * 7.5 - 4, 0, 20, "z", Math.PI/2);
  createCylinder(obj3, aux_point2.x - Math.cos(Math.PI/10) * 7.5 - 16, aux_point2.y - Math.sin(Math.PI/10) * 7.5 - 4, 0, "x", 0.1, Math.PI/2, 2);
  createCylinder(obj3, aux_point2.x - Math.cos(Math.PI/10) * 7.5 + 8.5, aux_point2.y - Math.sin(Math.PI/10) * 7.5 - 4, 0, "x", 0.1, Math.PI/2, 3.5);

  obj3.position.x -= Math.cos(Math.PI/4)*10;
  obj3.position.y -= Math.sin(Math.PI/4)*10;
  finalObj.add(obj1);
  finalObj.add(obj2);
  finalObj.add(obj3);
  scene.add(finalObj);
}

function updateCamera(){
  if (key_1){
    camera = camera1;
  }
  if (key_2){
    camera = camera2;
  }
  if (key_3){
    camera = camera3;
  }
}


function updateObj2(){
  teta = 0;
  if (key_A){
    obj2.rotation.y -= delta;
    teta -= delta;
  }
  if (key_D){
    obj2.rotation.y += delta;
    teta += delta;
  }
  if(teta!=0){
    var axis = new THREE.Vector3(0, obj3.position.y, 0).normalize();
    var point = new THREE.Vector3(0, 0, 0);
    obj3.position.sub(point);
    obj3.position.applyAxisAngle(axis, -teta);
    obj3.position.add(point);
  }
}

function updateObj3(){
  teta = 0;
  if (key_Z){
    teta -= delta;
  }
  if (key_A){
    teta -= delta;
  }
  if (key_Q){
    teta -= delta;
  }
  if (key_C){
    teta += delta;
  }
  if (key_D){
    teta += delta;
  }
  if (key_W){
    teta += delta;
  }

  obj3.rotation.y += teta;
}

function updateFinalObj(){
  teta = 0;
  if (key_Q){
    obj1.rotation.y += -delta;
    obj2.rotation.y += -delta;
    teta -= delta;
  }
  if (key_W){
    obj1.rotation.y += delta;
    obj2.rotation.y += delta;
    teta += delta;
  }
  if (keyDown){
      movement.x = 1;
  } if (keyUp){
      movement.x = -1;
  } if (keyLeft){
      movement.z = 1;
  } if (keyRight){
      movement.z = -1;
  }
  if(teta!=0){
    var axis = new THREE.Vector3(0, obj3.position.y, 0).normalize();
    var point = new THREE.Vector3(0, 0, 0);

    obj3.position.sub(point);
    obj3.position.applyAxisAngle(axis, -teta);
    obj3.position.add(point);
  }

  movement.normalize();
  finalObj.translateOnAxis(movement, 6*delta);
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    createArt();
}

function createCamera() {
    'use strict';
    var aspect = window.innerWidth/window.innerHeight;
    camera1 = new THREE.OrthographicCamera(-105, 105, 50, -50, 1, 1000);
    camera1.position.set(0, 10, 100);
    camera2 = new THREE.OrthographicCamera(-105, 105, 50, -50, 1, 1000);
    camera2.position.set(0, 100, 0);
    camera2.rotateX(-Math.PI/2);
    camera3 = new THREE.OrthographicCamera(-105, 105, 50, -50, 1, 1000);
    camera3.position.set(100, 10, 0);
    camera3.rotateY(Math.PI/2);
    camera = camera1;
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
        case 68:
            key_D = true;
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
        case 90:
            key_Z = true;
            break;
        case 67:
            key_C = true;
            break;
        case 49:
            key_1 = true;
            break;
        case 50:
            key_2 = true;
            break;
        case 51:
            key_3 = true;
            break;
        case 52:
            finalObj.traverse(function(child){
              if (child instanceof THREE.Mesh){
                child.material.wireframe = !child.material.wireframe;
              }
            })
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
        case 68:
            key_D = false;
            break;
        case 81:
            key_Q = false;
            break;
        case 90:
            key_Z = false;
            break;
        case 67:
            key_C = false;
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
        case 49:
            key_1 = false;
            break;
        case 50:
            key_2 = false;
            break;
        case 51:
            key_3 = false;
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
    delta = clock.getDelta();
    updateCamera();
    updateObj2();
    updateObj3();
    updateFinalObj();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
