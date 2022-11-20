/*PRIMEIRO PROJETO BD -- KINECT ART MOBILE 2/10/2020*/

/*global THREE, requestAnimationFrame, console*/

var camera, camera1, camera2, camera3, scene, renderer;

var holes = [], balls = [], tacos = [];

var geometry, material, mesh;

var poolTable, box, hole, ball, taco_var;

var keyDown = false, keyUp = false, keyLeft = false, keyRight = false;

var aux_taco = 5;

var key_1 = false, key_2 = false, key_3 = false, key_4 = false, key_5 = false, key_6 = false, key_space = false, key_space_aux = false;

var clock = new THREE.Clock(), delta;

var aux_x = new THREE.Vector3(1,0,0).normalize(), aux_z = new THREE.Vector3(0,0,1).normalize();

var current_ball;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function createBox(obj, x, y, z, w, h, d, color){
  geometry = new THREE.BoxGeometry(w, h, d);
  material = new THREE.MeshBasicMaterial({color: color});
  box = new THREE.Mesh(geometry, material);
  box.position.set(x, y, z);
  obj.add(box);
}

function createHole(obj, x, z){
  geometry = new THREE.CylinderGeometry(2, 2, 2, 20);
  material = new THREE.MeshBasicMaterial({color: 0x000000});
  hole = new THREE.Mesh(geometry, material);
  hole.position.set(x, 20.01, z);
  obj.add(hole);
}

function createBall(obj, x, z, color){
  geometry = new THREE.SphereGeometry(1.5, 10);
  material = new THREE.MeshBasicMaterial({color: color});
  ball = new THREE.Mesh(geometry, material);
  ball.position.set(x, 23, z);
  obj.add(ball);
  return ball;
}

class poolHole{
  constructor(x, z){
    this.x = x;
    this.z = z;
    createHole(poolTable, x, z);
  }
}

function checkBoundaries(ball, vector){
  if (ball.position.z < -23.5){
    ball.position.z += -23.5 - ball.position.z;
    vector.z = -vector.z;
  }
  else if (ball.position.z > 23.5){
    ball.position.z += 23.5 - ball.position.z;
    vector.z = -vector.z;
  }
  if (ball.position.x < -48.5){
    ball.position.x += -48.5 - ball.position.x;
    vector.x = -vector.x;
  }
  else if (ball.position.x > 48.5){
    ball.position.x += 48.5 - ball.position.x;
    vector.x = -vector.x;
  }
}

class whiteBall{

  vector = new THREE.Vector3(0,0,0);
  speed = 1;
  hit = false;

  constructor(x, z){
    this.mesh = createBall(poolTable, x, z, 0xffffff);
  }

  move(){

    checkBoundaries(this.mesh, this.vector);

    if (this.vector.x != 0 || this.vector.y != 0 || this.vector.z != 0){
      this.speed -= 0.1 *delta;
    }

    if (this.speed <= 0){
    	this.vector.set(0,0,0);
      this.speed = 0;
    }

    if (this.vector.y == -1){
      this.speed = 1;
    }
    this.vector.normalize();
    this.mesh.position.x += this.vector.x * this.speed;
    this.mesh.position.y += this.vector.y * this.speed;
    this.mesh.position.z += this.vector.z * this.speed;

    this.mesh.rotation.x += this.vector.z * this.speed;
    this.mesh.rotation.z += this.vector.x * this.speed;
  }
}

class redBall{

  hit = true;

  constructor(){
    this.x = getRandom(-46, 46);
    this.z = getRandom(-21, 21);
    this.speed = getRandom(0.2, 0.6);
    this.vector = new THREE.Vector3(getRandom(-1, 1), 0, getRandom(-1, 1));
    this.mesh = createBall(poolTable, this.x, this.z, 0x812B2B);
  }

  move(){

    checkBoundaries(this.mesh, this.vector);

    if (this.vector.x != 0 || this.vector.y != -1 || this.vector.z != 0){
      this.speed -= 0.1 *delta;
    }

    if (this.speed <= 0){
    	this.vector.set(0,0,0);
      this.speed = 0;
    }

    if (this.vector.y == -1){
      this.speed = 1;
    }

    this.vector.normalize();
    this.mesh.position.x += this.vector.x * this.speed;
    this.mesh.position.z += this.vector.z * this.speed;
    this.mesh.position.y += this.vector.y * this.speed;

    this.mesh.rotation.x += this.vector.z * this.speed;
    this.mesh.rotation.z += this.vector.x * this.speed;
  }
}

class taco{

  selected = false;

  constructor(x, z, axis, wx, wz){
    this.axis = axis;
    this.createTaco(x, z, axis);
    this.wx = wx;
    this.wz = wz;
    this.generateWhiteBall();
  }

  createTaco(x, z, axis){
    geometry = new THREE.CylinderGeometry(0.4, 0.4, 20, 20);
    material = new THREE.MeshBasicMaterial({color: 0xf2bd54});
    this.mesh = new THREE.Mesh(geometry, material);
    switch(axis){
      case "x":
        this.mesh.rotateX(Math.PI/2);
        if (z < 0){
          this.rotation_point = new THREE.Vector2(x, z + 10 + 1.5);
        }
         else if (z > 0){
          this.rotation_point = new THREE.Vector2(x, z - 10 - 1.5);
        }
        break;
      case "z":
        this.mesh.rotateZ(Math.PI/2);
        if (x < 0){
          this.rotation_point = new THREE.Vector2(x + 10 + 1.5, z);
        }
         else if (x > 0){
          this.rotation_point = new THREE.Vector2(x - 10 - 1.5, z);
        }
        break;
    }
    this.original_point = new THREE.Vector2(x, z);
    this.mesh.position.set(x, 23, z);
    scene.add(this.mesh);
  }

  generateWhiteBall(){
    this.wB = new whiteBall(this.wx, this.wz);
    balls.push(this.wB);
  }

  rotate(value){

    var vec = new THREE.Vector3(this.mesh.position.x - this.rotation_point.x, 0, this.mesh.position.z - this.rotation_point.y);
    var vec2 = new THREE.Vector3(-vec.x, 0, -vec.z);
    if ((this.mesh.position.z < 0 && this.mesh.position.x < 50 && this.mesh.position.x > -50 && vec2.angleTo(aux_z) < 2*Math.PI/6) || (this.mesh.position.z > 0 && this.mesh.position.x < 50 && this.mesh.position.x > -50 && vec.angleTo(aux_z) < 2*Math.PI/6) || (this.mesh.position.z < 25 && this.mesh.position.z > -25 && this.mesh.position.x > 50 && vec.angleTo(aux_x) < 2*Math.PI/6) || (this.mesh.position.z < 25 && this.mesh.position.z > -25 && this.mesh.position.x < -50 && vec2.angleTo(aux_x) < 2*Math.PI/6)){
      var axis = new THREE.Vector3(0, 1, 0).normalize();
      var point = new THREE.Vector3(this.rotation_point.x, 23, this.rotation_point.y);
      this.mesh.position.sub(point);
      this.mesh.position.applyAxisAngle(axis, value);
      this.mesh.position.add(point);


      if (this.axis == "x"){
        this.mesh.rotateZ(-value);
      } else{
        this.mesh.rotateX(value);
      }
    }
    else{
      var axis = new THREE.Vector3(0, 1, 0).normalize();
      var point = new THREE.Vector3(this.rotation_point.x, 23, this.rotation_point.y);
      this.mesh.position.sub(point);
      this.mesh.position.applyAxisAngle(axis, -10*value);
      this.mesh.position.add(point);


      if (this.axis == "x"){
        this.mesh.rotateZ(10*value);
      } else{
        this.mesh.rotateX(-10*value);
      }
    }
  }

  get vector(){
    switch(this.axis){
      case "x":
        var vector = new THREE.Vector3(0, this.mesh.position.z - this.rotation_point.y, 0).normalize();
        break;
      case "z":
        var vector = new THREE.Vector3(0, this.rotation_point.x - this.mesh.position.x, 0).normalize();
        break;
    }
    return vector;
  }
}

function createPoolTable(){
  poolTable = new THREE.Object3D();
  createBox(poolTable, 0, 20, 0, 100, 2, 50, 0x2c7025);
  createBox(poolTable, 0, 23.5, 25.5, 100, 7, 1, 0x4c3219);
  createBox(poolTable, 0, 23.5, -25.5, 100, 7, 1, 0x4c3219);
  createBox(poolTable, -50.5, 23.5, 0, 1, 7, 52, 0x4c3219);
  createBox(poolTable, 50.5, 23.5, 0, 1, 7, 52, 0x4c3219);

  holes.push(new poolHole(-48, 23));
  holes.push(new poolHole(-48, -23));
  holes.push(new poolHole(48, 23));
  holes.push(new poolHole(48, -23));
  holes.push(new poolHole(0, 23));
  holes.push(new poolHole(0, -23));

  tacos.push(new taco(-25, -35, "x", -25, -23.5));
  tacos.push(new taco(25, -35, "x", 25, -23.5));
  tacos.push(new taco(-25, 35, "x", -25, 23.5));
  tacos.push(new taco(25, 35, "x", 25, 23.5));
  tacos.push(new taco(-60, 0, "z", -48.5, 0));
  tacos.push(new taco(60, 0, "z", 48.5, 0));

  current_ball = balls[0];

  for (var n = 0; n < 16; n++){
    balls.push(new redBall());
  }

  scene.add(poolTable);
}

function updateTacos(){
  if (keyLeft){
    tacos.forEach(function(taco){
      if (taco.selected){
        taco.rotate(0.3 *delta);
      }
    });
  }
  if (keyRight){
    tacos.forEach(function(taco){
      if (taco.selected){
        taco.rotate(-0.3 * delta);
      }
    });
  }

  if (key_space){
    if (aux_taco > 0 && key_space_aux){
      var counter = 0;
      tacos.forEach(function(taco){
        if (taco.selected){
          taco.mesh.translateOnAxis(taco.vector, 0.1);
        }
        counter++;
      });
      aux_taco -= 0.1;
    }
    else{
      key_space_aux = false;
      if (aux_taco < 5){
        var counter = 0;
        tacos.forEach(function(taco){
          if (taco.selected){
            taco.mesh.translateOnAxis(taco.vector, -0.5);
          }
          counter++;
        });
        aux_taco += 0.5;
      }
      else{
        key_space = false;
        tacos.forEach(function(taco){
          if (taco.selected && taco.wB.hit == false){
            var vector = new THREE.Vector3(taco.rotation_point.x - taco.mesh.position.x, 0, taco.rotation_point.y - taco.mesh.position.z).normalize();
            taco.wB.vector = vector;
            taco.wB.hit = true;
            current_ball = taco.wB;
            camera3.position.set(taco.wx - vector.x * 15, 30, taco.wz - vector.z * 15);
            //taco.generateWhiteBall();
          }
        });
      }
    }
  }
}

function updateBalls(){
  var counter = 0;
  balls.forEach(function(ball){
    for (var i = counter + 1; i < balls.length; i++){
      if (ball.mesh.position.distanceTo(balls[i].mesh.position) < 3 && ball.hit == true && balls[i].hit == true){
        if (ball.speed > balls[i].speed){
          balls[i].speed = ball.speed;
        }
        else{
          ball.speed = balls[i].speed;
        }
        var overlap = 0.5*(ball.mesh.position.distanceTo(balls[i].mesh.position) - 3);
        ball.mesh.position.x -= overlap*(ball.mesh.position.x-balls[i].mesh.position.x);
        ball.mesh.position.z -= overlap*(ball.mesh.position.z-balls[i].mesh.position.z);
        balls[i].mesh.position.x += overlap*(ball.mesh.position.x-balls[i].mesh.position.x);
        balls[i].mesh.position.z += overlap*(ball.mesh.position.z-balls[i].mesh.position.z);
        var normal = new THREE.Vector3(balls[i].mesh.position.x - ball.mesh.position.x, 0, balls[i].mesh.position.z - ball.mesh.position.z);
        var tang = new THREE.Vector3(-normal.z, 0, normal.x);
        var dpTan1 = ball.vector.x * tang.x + ball.vector.z * tang.z;
        var dpTan2 = balls[i].vector.x * tang.x + balls[i].vector.z * tang.z;
        var dpNorm1 = ball.vector.x * normal.x + ball.vector.z * normal.z;
        var dpNorm2 = balls[i].vector.x * normal.x + balls[i].vector.z * normal.z;

        ball.vector.x = tang.x * dpTan1 + normal.x * dpNorm2;
        ball.vector.z = tang.z * dpTan1 + normal.z * dpNorm2;
        balls[i].vector.x = tang.x * dpTan2 + normal.x * dpNorm1;
        balls[i].vector.z = tang.z * dpTan2 + normal.z * dpNorm1;
      }
    }
    holes.forEach(function(hole){

      if (hole.x - 0.7 < ball.mesh.position.x && ball.mesh.position.x < hole.x + 0.7 && hole.z - 0.7 < ball.mesh.position.z && ball.mesh.position.z < hole.z + 0.7){
        ball.vector.set(0, -1, 0);
      }
    });
    ball.move();
    counter++;
  });
}

function updateCamera(){
  current_ball.vector.normalize();
  camera3.position.x += current_ball.vector.x * current_ball.speed;
  camera3.position.z += current_ball.vector.z * current_ball.speed;
  camera3.lookAt(current_ball.mesh.position);
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    createPoolTable();
}

function createCamera() {
    'use strict';
    var aspect = window.innerWidth/window.innerHeight;
    camera1 = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,1000);
    camera1.position.set(0, 100, 80);
    camera1.lookAt(scene.position);
    camera2 = new THREE.OrthographicCamera(-105, 105, 50, -50, 1, 1000);
    camera2.position.set(0, 100, 0);
    camera2.rotateX(-Math.PI/2);
    camera3 = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,1000);
    camera3.position.set(0,30,0);
    camera = camera2;
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 32:
            key_space = true;
            key_space_aux = true;
            break;
        case 50:
            camera = camera1;
            break;
        case 49:
            camera = camera2;
            break;
        case 51:
            camera = camera3;
            break;
        case 39:
            keyRight = true;
            break;
        case 37:
            keyLeft = true;
            break;
        case 52:
            tacos[0].selected = !tacos[0].selected;
            if (tacos[0].selected == true){
              tacos[0].mesh.material.color.setHex(0x00ff00);
            } else{
              tacos[0].mesh.material.color.setHex(0xf2bd54);
            }
            break;
        case 53:
            tacos[1].selected = !tacos[1].selected;
            if (tacos[1].selected == true){
              tacos[1].mesh.material.color.setHex(0x00ff00);
            } else{
              tacos[1].mesh.material.color.setHex(0xf2bd54);
            }
            break;
        case 54:
            tacos[2].selected = !tacos[2].selected;
            if (tacos[2].selected == true){
              tacos[2].mesh.material.color.setHex(0x00ff00);
            } else{
              tacos[2].mesh.material.color.setHex(0xf2bd54);
            }
            break;
        case 55:
            tacos[3].selected = !tacos[3].selected;
            if (tacos[3].selected == true){
              tacos[3].mesh.material.color.setHex(0x00ff00);
            } else{
              tacos[3].mesh.material.color.setHex(0xf2bd54);
            }
            break;
        case 56:
            tacos[4].selected = !tacos[4].selected;
            if (tacos[4].selected == true){
              tacos[4].mesh.material.color.setHex(0x00ff00);
            } else{
              tacos[4].mesh.material.color.setHex(0xf2bd54);
            }
            break;
        case 57:
            tacos[5].selected = !tacos[5].selected;
            if (tacos[5].selected == true){
              tacos[5].mesh.material.color.setHex(0x00ff00);
            } else{
              tacos[5].mesh.material.color.setHex(0xf2bd54);
            }
            break;
        case 58:
            poolTable.traverse(function(child){
              if (child instanceof THREE.Mesh && (child.material.color.getHex() == 0x4c3219 || child.material.color.getHex() == 0xffffff)){
                child.material.wireframe = !child.material.wireframe;
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
  renderer.setSize(window.innerWidth, window.innerHeight);
  var viewSize = 100;
  if(camera == camera1 || camera == camera3){
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
  }
  else{
    var aspect = window.innerWidth / window.innerHeight;
    var newSize = viewSize;
    camera.left = -aspect * newSize / 2;
    camera.right = aspect * newSize  / 2;
    camera.top = newSize / 2;
    camera.bottom = -newSize / 2;
    camera.updateProjectionMatrix();
  }
}

function animate() {
    delta = clock.getDelta();
    updateTacos();
    updateBalls();
    updateCamera();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
