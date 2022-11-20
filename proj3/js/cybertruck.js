/*PRIMEIRO PROJETO BD -- KINECT ART MOBILE 2/10/2020*/

/*global THREE, requestAnimationFrame, console*/

var camera, camera1, camera2, camera3, scene, renderer;

var geometry, material, mesh, shape;

var meshBasic, meshLambert, meshPhong;

var palanque, carrocaria, chassis, directionalLight, wheels, frontLight, backLight, windoh, bote, floor;

var coneMaterial, floorBasic, floorLambert, floorPhong, chassisBasic, chassisLambert, chassisPhong, carrocariaBasic, carrocariaLambert, carrocariaPhong, windohBasic, windohLambert, windohPhong, wheelsBasic, wheelsLambert, wheelsPhong, frontLightBasic, frontLightLambert, frontLightPhong, backLightBasic, backLightLambert, backLightPhong, palanqueBasic, palanqueLambert, palanquePhong;

var keyDown = false, keyUp = false, keyLeft = false, keyRight = false;

var key_1 = false, key_2 = false, key_3 = false, key_4 = false, key_5 = false, key_6 = false, key_space = false, key_space_aux = false;

var clock = new THREE.Clock(), delta;

var spot1, spot2, spot3;

function createSpotlight(x, y, z, axis, angle){
  geometry = new THREE.ConeGeometry(25, 50, 30);
  mesh = new THREE.Mesh(geometry, coneMaterial);
  mesh.position.set(x, y, z);
  switch(axis){
    case "x":
      mesh.rotateX(angle);
      break;
    case "z":
      mesh.rotateZ(angle);
      break;
  }
  cone.add(mesh);
  geometry = new THREE.SphereGeometry(15, 20, 20);
  mesh = new THREE.Mesh(geometry, coneMaterial);
  if(x < 0){
    mesh.position.set(x-25*Math.cos(Math.PI/4), y+25*Math.cos(Math.PI/4), z);
    spot1.position.set(x, y, z);
    spot1.target.position.set(0, 0, 0);
    scene.add(spot1.target);
    scene.add(spot1);
  }
  else if(x > 0){
    mesh.position.set(x+25*Math.cos(Math.PI/4), y+25*Math.cos(Math.PI/4), z);
    spot2.position.set(x, y, z);
    spot3.target.position.set(0, 0, 0);
    scene.add(spot2.target);
    scene.add(spot2);
  }
  else{
    mesh.position.set(x, y+25*Math.cos(Math.PI/4), z-25*Math.cos(Math.PI/4));
    spot3.position.set(x, y, z);
    spot3.target.position.set(0, 0, 0);
    scene.add(spot3.target);
    scene.add(spot3);

  }
  cone.add(mesh);
}

function createFloor(){
  geometry = new THREE.BoxGeometry(5000, 5000, 2);
  mesh = new THREE.Mesh(geometry, floorBasic);
  mesh.position.set(0, -41, 0);
  mesh.rotateX(Math.PI/2);
  floor.add(mesh);

}

function createPalanque(){
  geometry = new THREE.CylinderGeometry(350, 350, 50, 100);
  mesh = new THREE.Mesh(geometry, palanqueBasic);
  mesh.position.set(0,-15,0);
  palanque.add(mesh);
}

function createWheel(x, z){
  geometry = new THREE.CylinderGeometry(47.6, 47.6, 33.78, 50);
  mesh = new THREE.Mesh(geometry, wheelsBasic);
  mesh.rotateX(Math.PI/2);
  mesh.position.set(x, 57.6, z);
  wheels.add(mesh);
}

function createAxis(x, z, size, axis){
  geometry = new THREE.CylinderGeometry(3, 3, size, 10);
  mesh = new THREE.Mesh(geometry, chassisBasic);
  switch (axis){
    case "x":
      mesh.rotateX(Math.PI/2);
      break;
    case "z":
      mesh.rotateZ(Math.PI/2);
      break;
  }
  mesh.position.set(x, 57.6, z);
  chassis.add(mesh);
}

function createChassis(x, y, z, comprimento, largura, altura, axis, angle){
  geometry = new THREE.BoxGeometry(comprimento, largura, altura);
  mesh = new THREE.Mesh(geometry, chassisBasic);
  switch(axis){
    case "x":
      mesh.rotateX(Math.PI/2);
      break;
    case "y":
      mesh.rotateY(angle);
      break;
    case "z":
      mesh.rotateZ(angle);
      break;
  }
  mesh.position.set(x, y, z);
  chassis.add(mesh);
}

function createFace4(v1, v2, v3, v4, word){
  var square = new THREE.Geometry();

  square.vertices.push(v1);
  square.vertices.push(v2);
  square.vertices.push(v3);
  square.vertices.push(v4);

  square.faces.push(new THREE.Face3(2,1,0));
  square.faces.push(new THREE.Face3(0,3,2));

  square.computeFaceNormals();
  square.computeVertexNormals();

  if (word == "w"){
    mesh = new THREE.Mesh(square, windohBasic);
    windoh.add(mesh);
  }
  else if (word == "fl"){
    mesh = new THREE.Mesh(square, frontLightBasic);
    frontLight.add(mesh);
  }
  else if (word == "bl"){
    mesh = new THREE.Mesh(square, backLightBasic);
    backLight.add(mesh);
  }
  else{
    mesh = new THREE.Mesh(square, carrocariaBasic);
    carrocaria.add(mesh);
  }
}

function create(){
  palanque = new THREE.Object3D();
  chassis = new THREE.Object3D();
  carrocaria = new THREE.Object3D();
  wheels = new THREE.Object3D();
  windoh = new THREE.Object3D();
  frontLight = new THREE.Object3D();
  backLight = new THREE.Object3D();
  bote = new THREE.Object3D();
  floor = new THREE.Object3D();
  cone = new THREE.Object3D();

  coneMaterial = new THREE.MeshBasicMaterial({color: 0xfcff03})
  palanqueBasic = new THREE.MeshBasicMaterial({color: 0xb1b1b1});
  chassisBasic = new THREE.MeshBasicMaterial({color: 0x3A3636});
  carrocariaBasic = new THREE.MeshBasicMaterial({color: 0x767778});
  wheelsBasic = new THREE.MeshBasicMaterial({color: 0x121212});
  windohBasic = new THREE.MeshBasicMaterial({color: 0x3D3D3D});
  frontLightBasic = new THREE.MeshBasicMaterial({color: 0xABE9D9});
  backLightBasic = new THREE.MeshBasicMaterial({color: 0xCE1E33});
  floorBasic = new THREE.MeshBasicMaterial({color: 0x2ea5bf})

  palanqueLambert = new THREE.MeshLambertMaterial({color: 0xb1b1b1});
  chassisLambert = new THREE.MeshLambertMaterial({color: 0x3A3636});
  carrocariaLambert = new THREE.MeshLambertMaterial({color: 0x767778});
  wheelsLambert = new THREE.MeshLambertMaterial({color: 0x121212});
  windohLambert = new THREE.MeshLambertMaterial({color: 0x3D3D3D});
  frontLightLambert = new THREE.MeshLambertMaterial({color: 0xABE9D9});
  backLightLambert = new THREE.MeshLambertMaterial({color: 0xCE1E33});
  floorLambert = new THREE.MeshLambertMaterial({color: 0x2ea5bf})

  palanquePhong = new THREE.MeshPhongMaterial({color: 0xb1b1b1});
  chassisPhong = new THREE.MeshPhongMaterial({color: 0x3A3636});
  carrocariaPhong = new THREE.MeshPhongMaterial({color: 0x767778});
  wheelsPhong = new THREE.MeshPhongMaterial({color: 0x121212});
  windohPhong = new THREE.MeshPhongMaterial({color: 0x3D3D3D});
  frontLightPhong = new THREE.MeshPhongMaterial({color: 0xABE9D9});
  backLightPhong = new THREE.MeshPhongMaterial({color: 0xCE1E33});
  floorPhong = new THREE.MeshPhongMaterial({color: 0x2ea5bf})

  spot1 = new THREE.SpotLight(0xFFFFFF, 0);
  spot2 = new THREE.SpotLight(0xFFFFFF, 0);
  spot3 = new THREE.SpotLight(0xFFFFFF, 0);

  createFloor();
  createPalanque();
  createWheel(190.35, 84.46);
  createWheel(-190.35, 84.46);
  createWheel(-190.35, -84.46);
  createWheel(190.35, -84.46);

  createAxis(190.35, 0, 135.14, "x");
  createAxis(-190.35, 0, 135.14, "x");

  createChassis(0, 57.6, 0, 255.5, 178.92, 6, "x", Math.PI/2);
  createChassis(0, 57.6, 0, 495.9, 105.14, 6, "x", Math.PI/2);

  createChassis(-252.95, 57.6, 0, 20, 178.92, 6, "x", Math.PI/2);
  createChassis(-265, 57.6, 72, 30, 6, 14, "y", -Math.PI/3);
  createChassis(-265, 57.6, -72, 30, 6, 14, "y", Math.PI/3);
  createChassis(-263.5, 57.6, 0, 30, 124, 6, "x", Math.PI/2);
  createChassis(262.95, 57.6, 0, 40, 20, 179, "y", 0);

  createChassis(-247.95, 75, 79.46, 20, 40, 10, "y", Math.PI/2);
  createChassis(-233, 102, 79.46, 10, 40, 20, "z", -Math.PI/3.2);
  createChassis(-190.35, 112, 79.46, 59, 10, 20, "y", 0);
  createChassis(-142.85, 99, 79.46, 10, 50, 20, "z", Math.PI/3.2);
  createChassis(-123.75, 72.5, 79.46, 10, 32.5, 20, "y", 0);

  createChassis(-247.95, 75, -79.46, 20, 40, 10, "y", Math.PI/2);
  createChassis(-233, 102, -79.46, 10, 40, 20, "z", -Math.PI/3.2);
  createChassis(-190.35, 112, -79.46, 59, 10, 20, "y", 0);
  createChassis(-142.85, 99, -79.46, 10, 50, 20, "z", Math.PI/3.2);
  createChassis(-123.75, 72.5, -79.46, 10, 32.5, 20, "y", 0);

  createChassis(247.95, 75, -79.46, 20, 40, 10, "y", Math.PI/2);
  createChassis(233, 102, -79.46, 10, 40, 20, "z", Math.PI/3.2);
  createChassis(190.35, 112, -79.46, 59, 10, 20, "y", 0);
  createChassis(142.85, 99, -79.46, 10, 50, 20, "z", -Math.PI/3.2);
  createChassis(123.75, 72.5, -79.46, 10, 32.5, 20, "y", 0);

  createChassis(247.95, 75, 79.46, 20, 40, 10, "y", Math.PI/2);
  createChassis(233, 102, 79.46, 10, 40, 20, "z", Math.PI/3.2);
  createChassis(190.35, 112, 79.46, 59, 10, 20, "y", 0);
  createChassis(142.85, 99, 79.46, 10, 50, 20, "z", -Math.PI/3.2);
  createChassis(123.75, 72.5, 79.46, 10, 32.5, 20, "y", 0);


  //FRONT BUMPER
  createFace4(new THREE.Vector3(-279, 60, 62), new THREE.Vector3(-279, 110, 62), new THREE.Vector3(-263, 120, 90), new THREE.Vector3(-263, 60, 90));
  createFace4(new THREE.Vector3(-279, 60, -62), new THREE.Vector3(-279, 110, -62), new THREE.Vector3(-279, 110, 62), new THREE.Vector3(-279, 60, 62));
  createFace4(new THREE.Vector3(-263, 120, -90), new THREE.Vector3(-279, 110, -62), new THREE.Vector3(-279, 60, -62), new THREE.Vector3(-263, 60, -90));

  createFace4(new THREE.Vector3(-279, 115, 62), new THREE.Vector3(-190, 150, 62), new THREE.Vector3(-190, 150, 80),  new THREE.Vector3(-263, 125, 90));
  createFace4(new THREE.Vector3(-279, 115, -62), new THREE.Vector3(-190, 150, -62), new THREE.Vector3(-190, 150, 62),  new THREE.Vector3(-279, 115, 62));
  createFace4(new THREE.Vector3(-190, 150, -80), new THREE.Vector3(-190, 150, -62), new THREE.Vector3(-279, 115, -62), new THREE.Vector3(-263, 125, -90));

  createFace4(new THREE.Vector3(-190, 150, 70), new THREE.Vector3(-60, 196, 50), new THREE.Vector3(-60, 196, 62), new THREE.Vector3(-190, 150, 80));
  createFace4(new THREE.Vector3(-60, 196, -62), new THREE.Vector3(-50, 200, -60), new THREE.Vector3(-50, 200, 60), new THREE.Vector3(-60, 196, 62));
  createFace4(new THREE.Vector3(-60, 196, -62), new THREE.Vector3(-60, 196, -50), new THREE.Vector3(-190, 150, -70), new THREE.Vector3(-190, 150, -80));


  //FRONT LIGHTSSS
  createFace4(new THREE.Vector3(-279, 110, 62), new THREE.Vector3(-279, 115, 62), new THREE.Vector3(-263, 125, 90), new THREE.Vector3(-263, 120, 90), "fl");
  createFace4(new THREE.Vector3(-279, 110, -62), new THREE.Vector3(-279, 115, -62), new THREE.Vector3(-279, 115, 62), new THREE.Vector3(-279, 110, 62), "fl");
  createFace4(new THREE.Vector3(-263, 125, -90), new THREE.Vector3(-279, 115, -62), new THREE.Vector3(-279, 110, -62), new THREE.Vector3(-263, 120, -90), "fl");


  //RIGHT FRONT GUARDA LAMAS
  createFace4(new THREE.Vector3(-263, 60, 90), new THREE.Vector3(-263, 125, 90), new THREE.Vector3(-250, 125, 90), new THREE.Vector3(-250, 60, 90));
  createFace4(new THREE.Vector3(-250, 93, 90), new THREE.Vector3(-250, 125, 90), new THREE.Vector3(-216, 125, 90), new THREE.Vector3(-216, 115, 90));
  createFace4(new THREE.Vector3(-216, 115, 90), new THREE.Vector3(-216, 125, 90), new THREE.Vector3(-160, 125, 90), new THREE.Vector3(-160, 115, 90));
  createFace4(new THREE.Vector3(-160, 115, 90), new THREE.Vector3(-160, 125, 90), new THREE.Vector3(-120, 125, 90), new THREE.Vector3(-120, 90, 90));


  createFace4(new THREE.Vector3(-120, 60, 90), new THREE.Vector3(-120, 125, 90), new THREE.Vector3(120, 125, 90), new THREE.Vector3(120, 60, 90));
  createFace4(new THREE.Vector3(120, 125, -90), new THREE.Vector3(-120, 125, -90), new THREE.Vector3(-120, 60, -90), new THREE.Vector3(120, 60, -90));


  //RIGHT BACK GUARDA LAMAS
  createFace4(new THREE.Vector3(250, 125, 90), new THREE.Vector3(283, 125, 90), new THREE.Vector3(283, 60, 90), new THREE.Vector3(250, 60, 90));
  createFace4(new THREE.Vector3(216, 125, 90), new THREE.Vector3(250, 125, 90), new THREE.Vector3(250, 93, 90), new THREE.Vector3(216, 115, 90));
  createFace4(new THREE.Vector3(160, 125, 90), new THREE.Vector3(216, 125, 90), new THREE.Vector3(216, 115, 90), new THREE.Vector3(160, 115, 90));
  createFace4(new THREE.Vector3(120, 125, 90), new THREE.Vector3(160, 125, 90), new THREE.Vector3(160, 115, 90), new THREE.Vector3(120, 90, 90));


  //LEFT FRONT GUARDA LAMAS
  createFace4(new THREE.Vector3(-250, 125, -90), new THREE.Vector3(-263, 125, -90), new THREE.Vector3(-263, 60, -90), new THREE.Vector3(-250, 60, -90));
  createFace4(new THREE.Vector3(-216, 125, -90), new THREE.Vector3(-250, 125, -90), new THREE.Vector3(-250, 93, -90), new THREE.Vector3(-216, 115, -90));
  createFace4(new THREE.Vector3(-160, 125, -90), new THREE.Vector3(-216, 125, -90), new THREE.Vector3(-216, 115, -90), new THREE.Vector3(-160, 115, -90));
  createFace4(new THREE.Vector3(-120, 125, -90), new THREE.Vector3(-160, 125, -90), new THREE.Vector3(-160, 115, -90), new THREE.Vector3(-120, 90, -90));


  //LEFT BACK GUARDA LAMAS
  createFace4(new THREE.Vector3(283, 60, -90), new THREE.Vector3(283, 125,- 90), new THREE.Vector3(250, 125,- 90), new THREE.Vector3(250, 60, -90));
  createFace4(new THREE.Vector3(250, 93, -90), new THREE.Vector3(250, 125,- 90), new THREE.Vector3(216, 125,- 90), new THREE.Vector3(216, 115,- 90));
  createFace4(new THREE.Vector3(216, 115,-90), new THREE.Vector3(216, 125,-90), new THREE.Vector3(160, 125,-90), new THREE.Vector3(160, 115,-90));
  createFace4(new THREE.Vector3(160, 115,-90), new THREE.Vector3(160, 125,-90), new THREE.Vector3(120, 125,-90), new THREE.Vector3(120, 90, -90));

  //BACK
  createFace4(new THREE.Vector3(283, 120, 90), new THREE.Vector3(283, 120, -90), new THREE.Vector3(283, 60, -90), new THREE.Vector3(283, 60, 90));
  createFace4(new THREE.Vector3(283, 125, 90), new THREE.Vector3(283, 125, -90), new THREE.Vector3(283, 120, -90), new THREE.Vector3(283, 120, 90), "bl");
  createFace4(new THREE.Vector3(-50, 200, 60), new THREE.Vector3(-50, 200, -60), new THREE.Vector3(283, 125, -90), new THREE.Vector3(283, 125, 90));

  //SIDE BODY
  createFace4(new THREE.Vector3(80, 125, 90), new THREE.Vector3(60, 176, 68), new THREE.Vector3(283, 125, 90), new THREE.Vector3(120, 125, 90));
  createFace4(new THREE.Vector3(-50, 190, 63), new THREE.Vector3(-50, 200, 60), new THREE.Vector3(60, 176, 68), new THREE.Vector3(65, 166, 72));
  createFace4(new THREE.Vector3(-240, 125, 90), new THREE.Vector3(-263, 125, 90), new THREE.Vector3(-50, 200, 60), new THREE.Vector3(-50, 190, 63));
  createFace4(new THREE.Vector3(-240, 125, 90), new THREE.Vector3(-190, 145, 81.5), new THREE.Vector3(73, 145, 81.5), new THREE.Vector3(80, 125, 90));

  createFace4(new THREE.Vector3(283, 125, -90), new THREE.Vector3(60, 176, -68), new THREE.Vector3(80, 125, -90), new THREE.Vector3(120, 125, -90));
  createFace4(new THREE.Vector3(60, 176, -68), new THREE.Vector3(-50, 200, -60), new THREE.Vector3(-50, 190, -63), new THREE.Vector3(65, 166, -72));
  createFace4(new THREE.Vector3(-50, 200, -60), new THREE.Vector3(-263, 125, -90), new THREE.Vector3(-240, 125, -90), new THREE.Vector3(-50, 190, -63));
  createFace4(new THREE.Vector3(73, 145, -81.5), new THREE.Vector3(-190, 145, -81.5), new THREE.Vector3(-240, 125, -90), new THREE.Vector3(80, 125, -90));

  //WINDOHHHH
  createFace4(new THREE.Vector3(-190, 145, 81.5), new THREE.Vector3(-50, 190, 63), new THREE.Vector3(65, 166, 72.3), new THREE.Vector3(73, 145, 81.5), "w");
  createFace4(new THREE.Vector3(65, 166, -72.3), new THREE.Vector3(-50, 190, -63), new THREE.Vector3(-190, 145, -81.5), new THREE.Vector3(73, 145, -81.5), "w");
  createFace4(new THREE.Vector3(-190, 150, -70), new THREE.Vector3(-60, 196, -50), new THREE.Vector3(-60, 196, 50), new THREE.Vector3(-190, 150, 70), "w");

  createSpotlight(500, 500, 0, "z", -Math.PI/4);
  createSpotlight(-500, 500, 0, "z", Math.PI/4);
  createSpotlight(0, 500, -500, "x", -Math.PI/4);

  bote.add(carrocaria);
  bote.add(chassis);
  bote.add(wheels);
  bote.add(windoh);
  bote.add(frontLight);
  bote.add(backLight);
  bote.add(palanque);

  scene.add(bote);
  scene.add(floor);
  scene.add(cone);

  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);
}


function createScene() {
    'use strict';
    scene = new THREE.Scene();
    create();
}

function createCamera() {
    'use strict';
    var aspect = window.innerWidth/window.innerHeight;
    camera1 = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,2000);
    camera1.position.set(-800, 700, -700);
    camera1.lookAt(scene.position);
    camera2 = new THREE.OrthographicCamera(-600, 600, 300, -300, 1, 2000);
    camera2.position.set(0, 10, 351);
    //camera2.rotateX(-Math.PI/2);
    camera3 = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,1000);
    camera = camera1;
}

function rotatePalanque(){
  if (keyRight){
    bote.rotateY(-delta);
  }
  if (keyLeft){
    bote.rotateY(delta);
  }
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 32:
            key_space = true;
            key_space_aux = true;
            break;
        case 49:
          if (spot1.intensity == 1){
            spot1.intensity = 0;
          }
          else{
            spot1.intensity = 1;
          }
          break;
        case 50:
          if (spot2.intensity == 1){
            spot2.intensity = 0;
          }
          else{
            spot2.intensity = 1;
          }
          break;
        case 51:
          if (spot3.intensity == 1){
            spot3.intensity = 0;
          }
          else{
            spot3.intensity = 1;
          }
          break;
        case 52:
            camera = camera1;
            break;
        case 53:
            camera = camera2;
            break;
        case 39:
            keyRight = true;
            break;
        case 37:
            keyLeft = true;
            break;
        case 69:
            carrocaria.children.forEach(function(child){
              if (child.material.type == "MeshPhongMaterial"){
                child.material = carrocariaLambert;
              }
              else{
                child.material = carrocariaPhong;
              }
            })
            wheels.children.forEach(function(child){
              if (child.material.type == "MeshPhongMaterial"){
                child.material = wheelsLambert;
              }
              else{
                child.material = wheelsPhong;
              }
            })
            windoh.children.forEach(function(child){
              if (child.material.type == "MeshPhongMaterial"){
                child.material = windohLambert;
              }
              else{
                child.material = windohPhong;
              }
            })
            chassis.children.forEach(function(child){
              if (child.material.type == "MeshPhongMaterial"){
                child.material = chassisLambert;
              }
              else{
                child.material = chassisPhong;
              }
            })
            palanque.children.forEach(function(child){
              if (child.material.type == "MeshPhongMaterial"){
                child.material = palanqueLambert;
              }
              else{
                child.material = palanquePhong;
              }
            })
            frontLight.children.forEach(function(child){
              if (child.material.type == "MeshPhongMaterial"){
                child.material = frontLightLambert;
              }
              else{
                child.material = frontLightPhong;
              }
            })
            backLight.children.forEach(function(child){
              if (child.material.type == "MeshPhongMaterial"){
                child.material = backLightLambert;
              }
              else{
                child.material = backLightPhong;
              }
            })
            floor.children.forEach(function(child){
              if (child.material.type == "MeshPhongMaterial"){
                child.material = floorLambert;
              }
              else{
                child.material = floorPhong;
              }
            })
            break;
        case 81:
            if (directionalLight.intensity == 1){
              directionalLight.intensity = 0;
            }
            else{
              directionalLight.intensity = 1;
            }
            break;
        case 87:
            carrocaria.children.forEach(function(child){
              if (child.material.type == "MeshBasicMaterial"){
                child.material = carrocariaLambert;
              }
              else{
                child.material = carrocariaBasic;
              }
            })
            wheels.children.forEach(function(child){
              if (child.material.type == "MeshBasicMaterial"){
                child.material = wheelsLambert;
              }
              else{
                child.material = wheelsBasic;
              }
            })
            windoh.children.forEach(function(child){
              if (child.material.type == "MeshBasicMaterial"){
                child.material = windohLambert;
              }
              else{
                child.material = windohBasic;
              }
            })
            chassis.children.forEach(function(child){
              if (child.material.type == "MeshBasicMaterial"){
                child.material = chassisLambert;
              }
              else{
                child.material = chassisBasic;
              }
            })
            palanque.children.forEach(function(child){
              if (child.material.type == "MeshBasicMaterial"){
                child.material = palanqueLambert;
              }
              else{
                child.material = palanqueBasic;
              }
            })
            frontLight.children.forEach(function(child){
              if (child.material.type == "MeshBasicMaterial"){
                child.material = frontLightLambert;
              }
              else{
                child.material = frontLightBasic;
              }
            })
            backLight.children.forEach(function(child){
              if (child.material.type == "MeshBasicMaterial"){
                child.material = backLightLambert;
              }
              else{
                child.material = backLightBasic;
              }
            })
            floor.children.forEach(function(child){
              if (child.material.type == "MeshBasicMaterial"){
                child.material = floorLambert;
              }
              else{
                child.material = floorBasic;
              }
            })
            break;
    }
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
        case 39:
            keyRight = false;
            break;
        case 37:
            keyLeft = false;
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
    rotatePalanque();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
