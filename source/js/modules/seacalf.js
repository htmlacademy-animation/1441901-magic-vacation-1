import {bezierEasing} from '../helpers/cubic-bezier';
import {animateEasing, animateProgress, animateDuration} from '../helpers/animate';
import {runSerial, runSerialLoop} from '../helpers/promise';

export default () => {
  let ww = window.innerWidth;
  let wh = window.innerHeight;
  let wd = window.innerWidth / 1440;

  let seaCalfCanvas = document.getElementById(`sea_calf`);
  seaCalfCanvas.width = ww;
  seaCalfCanvas.height = wh;
  let ctxCalf = seaCalfCanvas.getContext('2d');

  let calfImg = new Image();
  let iceImg = new Image();
  let snowLeftImg = new Image();
  let snowRightImg = new Image();
  let planeImg = new Image();
  let treeImg = new Image();
  let tree2Img = new Image();
  let planeBgImg = new Image();
  calfImg.src = "img/sea-calf-2.png";
  snowLeftImg.src = "img/snowflake.png";
  snowRightImg.src = "img/snowflake.png";
  planeImg.src = "img/airplane.png";
  treeImg.src = "img/tree.png";
  tree2Img.src = "img/tree2.png";
  planeBgImg.src = "img/back.png";
  iceImg.src = "img/ice.png";

  const sizes = {
    planeBg: {
      width: 586 * wd,
      height: 324 * wd,
      deltaX: -25 * wd,
      deltaY: -183 * wd
    },
    plane: {
      width: 100 * wd,
      height: 100 * wd,
      deltaX: 556 * wd,
      deltaY: -145 * wd
    },
    tree: {
      width: 50 * wd,
      height: 159 * wd,
      deltaX: 267 * wd,
      deltaY: -119 * wd
    },
    treeS: {
      width: 38 * wd,
      height: 101 * wd,
      deltaX: 313 * wd,
      deltaY: -61 * wd
    },
    ice: {
      width: 408 * wd,
      height: 167 * wd
    },
    calf: {
      width: 500 * wd,
      height: 500 * wd,
      deltaX: 0,
      deltaY: -250 * wd
    },
    snowLeft: {
      width: 150 * wd,
      height: 150 * wd,
      deltaX: -103 * wd,
      deltaY: -101 * wd
    },
    snowRight: {
      width: 120 * wd,
      height: 120 * wd,
      deltaX: 387 * wd,
      deltaY: -10 * wd
    },
  };
  const startPoint = {
    x: Math.round((ww - sizes.ice.width) / 2),
    y: (wh / 2 + 100)
  };

  const animations = [];
  const bezierFunc = bezierEasing(0.33, 0, 0.67, 1);
  
  // переменные параметры для анимации моржа  и льдины
  let calfTranslateY = wh - sizes.calf.height * wd,
    iceTranslateY = wh - sizes.ice.height * wd - sizes.calf.deltaY * wd,
    calfRotateAngle = 0;


  function rotate(angle, cx, cy) {
    this.ctx.translate(cx, cy);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.translate(-cx, -cy);
  };
  
  // смена перемещения моржа и льдины по оси Y
  const calfTranslateYAnimationTick = (from, to) => (progress) => {
    calfTranslateY = from + progress * (to - from);
  };
  const iceTranslateYAnimationTick = (from, to) => (progress) => {
    iceTranslateY = from + progress * (to - from);
  };

  function drawSnow() {
    ctxCalf.save();
    ctxCalf.drawImage(
      snowLeftImg,
      startPoint.x + sizes.snowLeft.deltaX,
      startPoint.y + sizes.snowLeft.deltaY,
      sizes.snowLeft.width,
      sizes.snowLeft.height);
    ctxCalf.restore();

    ctxCalf.save();
    ctxCalf.drawImage(
      snowRightImg,
      startPoint.x + sizes.snowRight.deltaX,
      startPoint.y + sizes.snowRight.deltaY,
      sizes.snowRight.width,
      sizes.snowRight.height);
    ctxCalf.restore();
  }

  function drawPlane() {
    ctxCalf.save();
    ctxCalf.drawImage(
      planeBgImg,
      startPoint.x + sizes.planeBg.deltaX,
      startPoint.y + sizes.planeBg.deltaY,
      sizes.planeBg.width,
      sizes.planeBg.height);
    ctxCalf.restore();

    ctxCalf.save();
    ctxCalf.drawImage(
      tree2Img,
      startPoint.x + sizes.treeS.deltaX,
      startPoint.y + sizes.treeS.deltaY,
      sizes.treeS.width,
      sizes.treeS.height);
    ctxCalf.restore();

    ctxCalf.save();
    ctxCalf.drawImage(
      treeImg,
      startPoint.x + sizes.tree.deltaX,
      startPoint.y + sizes.tree.deltaY,
      sizes.tree.width,
      sizes.tree.height);
    ctxCalf.restore();

    ctxCalf.save();
    ctxCalf.drawImage(
      planeImg,
      startPoint.x + sizes.plane.deltaX,
      startPoint.y + sizes.plane.deltaY,
      sizes.plane.width,
      sizes.plane.height);
    ctxCalf.restore();
  }

  function drawCalf() {
    ctxCalf.save();
    ctxCalf.drawImage(
      iceImg,
      startPoint.x,
      startPoint.y,
      sizes.ice.width,
      sizes.ice.height);
    ctxCalf.restore();

    ctxCalf.save();
    ctxCalf.transform(1, 0, 0, 1, 0, calfTranslateY);
    ctxCalf.drawImage(
      calfImg,
      startPoint.x + sizes.calf.deltaX,
      startPoint.y + sizes.calf.deltaY,
      sizes.calf.width,
      sizes.calf.height);
    ctxCalf.restore();
  }

  function draw() {
    ctxCalf.clearRect(0, 0, ww, wh);
    drawPlane();
    drawCalf();
    drawSnow();
    //requestAnimationFrame(draw);
  }

  function animateCalf() {
    const translateYEasing = bezierEasing(0.33, 0, 0.67, 1);
    animateEasing(calfTranslateYAnimationTick(calfTranslateY, 0), 3800, translateYEasing);
  }
  function animateIce() {
    const translateYEasing = bezierEasing(0.33, 0, 0.67, 1);
    animateEasing(iceTranslateYAnimationTick(iceTranslateY, 0), 3800, translateYEasing);
  }
  

  // вспомогательный массив об уже запущенных анимациях
  let startCalfAnimations = [];

  // вспомогательная функция для отрисовки каждого кадра
  const globalFluidAnimationTick = (globalProgress) => {
    // в начале анимации запускаем анимацию моржа и льдины
    if (globalProgress >= 0 && startCalfAnimations.indexOf('calf') === -1) {
      startCalfAnimations.push('calf');
      animateCalf();
    }
    if (globalProgress >= 0 && startCalfAnimations.indexOf('ice') === -1) {
      startCalfAnimations.push('ice');
      animateIce();
    }
    // отрисовываем сцену с новыми параметрами
    draw();
  };

// запускаем анимацию на 7 секунды
animateDuration(globalFluidAnimationTick, 7068);

  /*window.onload = function () {
    draw();
    //runSerialLoop(snowAnimate);
  }*/
};