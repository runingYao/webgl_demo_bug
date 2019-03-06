import './weapp-adapter'
window.THREE = require('./three.js');

let scene_ctx;

/*********在主屏canvas上绘制2d内容***********/
function create2DScene(){

  //获取主屏canvas上下文，绘制背景
  scene_ctx = canvas.getContext('2d');
  scene_ctx.fillStyle = '#FFFF00';
  scene_ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);


  //绘制文本
  let group = wx.createCanvas();
  let ctx = group.getContext('2d')
  ctx.font = "30px Verdana";
  // 创建渐变
  let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  // 用渐变填色
  ctx.fillStyle = gradient;
  ctx.fillText("My First Game", 10, 90);

  scene_ctx.drawImage(group, 0, 0);
  group.addEventListener('touchstart', (e) => {
    console.log(e.clientX);
  });
}



/*********创建3d场景，并绘制到主屏上***********/
function create3DScene(){
  //创建离屏canvas
  let mycanvas = wx.createCanvas();
  mycanvas.width = mycanvas.height = 300;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer({ canvas: mycanvas });

  renderer.setSize(300, 300);

  mycanvas.appendChild(renderer.domElement);
  var geometry = new THREE.CubeGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;

  //渲染，刷新离屏canvas中的内容并实时绘制到主屏canvas中
  function render() {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    renderer.render(scene, camera);
    scene_ctx.drawImage(mycanvas, 0, 200);
    requestAnimationFrame(render);

  }

  render();
}

create2DScene();
create3DScene();

