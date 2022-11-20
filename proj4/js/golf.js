var scene, camera, renderer;
var controls;
var flag, spot, light;
var clock = new THREE.Clock(), delta;
var materialFloor1, materialBall1, materialFloor2, materialBall2, botMaterial1, topMaterial1, botMaterial2, topMaterial2;

function createScene(){
  'use strict';

  scene = new THREE.Scene();

  createSkybox();
  createFloor();
  createBall();
  createFlag();
  createPointLight();
  createDirectionalLight();
}


function createCamera(){
  'use strict';

    camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,40000);
    camera.position.set(120,30,0);
    

              
}

function init(){
  'use strict';

  renderer = new THREE.WebGLRenderer({ antialias: true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener('keydown', onKeyDown);


  createScene();
  createCamera();

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();  

}


function createFloor() {
  var floorMap = new THREE.TextureLoader().load("../textures/golfField.png");
  floorMap.wrapS = THREE.RepeatWrapping;
  floorMap.wrapT = THREE.RepeatWrapping;
  floorMap.repeat.set(16,16);

  var floorBump = new THREE.TextureLoader().load("../textures/fieldBump.jpg");
  floorBump.wrapS = THREE.RepeatWrapping;
  floorBump.wrapT = THREE.RepeatWrapping;
  floorBump.repeat.set(16,16);

  geometry = new THREE.BoxGeometry(200, 10, 200);
  materialFloor1 = new THREE.MeshPhongMaterial({map: floorMap, bumpMap: floorBump});
  materialFloor2 = new THREE.MeshBasicMaterial({map: floorMap, bumpMap: floorBump});
  floor = new THREE.Mesh(geometry, materialFloor1);
  floor.position.set(50,-5,30);
  scene.add(floor);

}


function createBall() {

  var ballMap = new THREE.TextureLoader().load("../textures/golfBall.png");
  ballMap.wrapS = THREE.RepeatWrapping;
  ballMap.wrapT = THREE.RepeatWrapping;
  ballMap.repeat.set(1,1);

  geometry = new THREE.SphereGeometry(2,15,15);
  materialBall1 = new THREE.MeshPhongMaterial({ map: ballMap, bumpMap: ballMap});
  materialBall2 = new THREE.MeshBasicMaterial({map: ballMap, bumpMap: ballMap});
  ball = new THREE.Mesh(geometry, materialBall1);
  ball.userData = { jumping: true, step: 0 };
  ball.position.set(50, 2, 30);
  scene.add(ball);
}

function createFlag(){
  flag = new THREE.Object3D();
  botGeometry = new THREE.CylinderGeometry(1,1,75,15);
  botMaterial1 = new THREE.MeshPhongMaterial({color: 0xd35400});
  botMaterial2 = new THREE.MeshBasicMaterial({color: 0xd35400});
  var bot = new THREE.Mesh(botGeometry,botMaterial1);
  bot.position.set(0, 37.5, 0);
  flag.add(bot);
  topGeometry = new THREE.BoxGeometry(2,15,30);
  topMaterial1 = new THREE.MeshPhongMaterial({color: 0xff0000});
  topMaterial2 = new THREE.MeshBasicMaterial({color: 0xff0000});
  var top = new THREE.Mesh(topGeometry,topMaterial1);
  top.position.set(0,67.5,-15);
  flag.add(top);
  scene.add(flag);
}

function createSkybox(){

  var loader = new THREE.TextureLoader();
  loader.setPath("../textures/cubemap/");

  geometry = new THREE.BoxGeometry(2000,2000,2000);
  var cubematerials = [
    new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load("corona_ft.png")}),
    new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load("corona_bk.png")}),
    new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load("corona_up.png")}),
    new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load("corona_dn.png")}),
    new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load("corona_rt.png")}),
    new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load("corona_lf.png")})
    ];

    var boxMaterial = new THREE.MeshFaceMaterial(cubematerials);
    var box = new THREE.Mesh(geometry, boxMaterial);

    scene.add(box);

}

function createPointLight(){

  light = new THREE.PointLight( 0xffffff, 1);
  light.position.set( 50, 150, 30 );
  light.target = scene;
  scene.add( light );

}


function createDirectionalLight(){

  spot = new THREE.DirectionalLight( 0xffffff, 1);
  spot.position.set(150,100,100);
  spot.target = ball;
  scene.add( spot );

}




function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
      case 68:
        if (spot.intensity == 1){
          spot.intensity = 0;
        }
        else{
          spot.intensity = 1;
        }
        break;
      case 80:
        if (light.intensity == 1){
          light.intensity = 0;
        }
        else{
          light.intensity = 1;
        }
        break;
      case 87:
        ball.material.wireframe = !ball.material.wireframe;
        floor.material.wireframe = !floor.material.wireframe;
        flag.traverse(function(child){
              if (child instanceof THREE.Mesh){
                child.material.wireframe = !child.material.wireframe;
              }
            })
        break;
      case 73:
        if (floor.material.type == "MeshPhongMaterial"){
                floor.material = materialFloor2;
                ball.material = materialBall2;
                flag.children[0].material = botMaterial2;
                flag.children[1].material = topMaterial2;
              }
        else{
          floor.material = materialFloor1;
          ball.material = materialBall1;
          flag.children[0].material = botMaterial1;
          flag.children[1].material = topMaterial1;
        }
        break;
      case 66: //s
        ball.userData.jumping = !ball.userData.jumping;
        break;
    }

}

function animate(){
  
  delta = clock.getDelta();
  flag.rotateY(delta);
  if (ball.userData.jumping) {
        ball.userData.step += 0.08;
        ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step))) + 2;
        ball.position.z = 15 * (Math.cos(ball.userData.step));
    }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}