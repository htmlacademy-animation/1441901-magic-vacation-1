export default () => {
  let ww = document.documentElement.clientWidth,
    wh = document.documentElement.clientHeight;

  let seaCalfCanvas = document.getElementById("sea_calf");
  seaCalfCanvas.width = ww;
  seaCalfCanvas.height = wh;
  let ctxCalf = seaCalfCanvas.getContext('2d');

  let calf = new Image();
  let ice = new Image();
  let snow = new Image();
  let plane = new Image();
  let tree = new Image();
  let tree2 = new Image();
  let planeBg = new Image();
  calf.src = "img/sea-calf-2.png";
  snow.src = "img/snowflake.png";
  plane.src = "img/airplane.png";
  tree.src = "img/tree.png";
  tree2.src = "img/tree2.png";
  planeBg.src = "img/back.png";
  ice.src = "img/ice.png";

  function drawBack() {
    ctxCalf.drawImage(planeBg, (ww - planeBg.width) / 2, (wh / 2) - planeBg.height);
  }

  function drawTree() {
    ctxCalf.drawImage(tree2, (ww / 2) + 10, (wh / 2) - 200);
    ctxCalf.drawImage(tree, (ww / 2) + 80, (wh / 2) - 140);
  }

  function drawSnow() {
    ctxCalf.drawImage(snow, (ww / 2) - 150, (wh / 2) - 20, 150, 150);
    ctxCalf.drawImage(snow, (ww / 2) + 150, (wh / 2) + 20, 100, 100);
  }

  function drawPlane() {
    ctxCalf.drawImage(plane, (ww + 300) / 2, (wh / 2) - 300, 300, 300);
  }

  function drawIce() {
    ctxCalf.drawImage(ice, (ww - ice.width) / 2, (wh - ice.height) / 2);
  }

  function drawCalf() {
    ctxCalf.drawImage(calf, (ww - 600) / 2, (wh - 600) / 2, 600, 600);
  }

  function draw() {
    ctxCalf.clearRect(0, 0, ww, wh);
    drawBack();
    drawTree();
    drawPlane();
    drawIce();
    drawCalf();
    drawSnow();
    requestAnimationFrame(draw);
  }

  window.onload = function () {
    draw();
  }
};