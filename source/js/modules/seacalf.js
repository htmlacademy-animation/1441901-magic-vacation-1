import {bezierEasing} from '../helpers/cubic-bezier';
import {animateDuration, animateEasing} from '../helpers/animate';
import {runSerial, runSerialLoop} from '../helpers/promise';

let winW=document.documentElement.clientWidth;
let winH=document.documentElement.clientHeight;


export default () => {
  constructor() {
    this.canvas = document.querySelector(`#sea_calf`);
    this.ctx = this.canvas.getContext(`2d`);

    this.calfImg = new Image();
    this.iceImg = new Image();
    this.snowLeftImg = new Image();
    this.snowRightImg = new Image();
    this.planeImg = new Image();
    this.planeBgImg = new Image();
    this.treeImg = new Image();
    this.tree2Img = new Image();

    this.loadingCounter = 0;
    this.isAnimated = true;
    this.startAnimations = [];
    
    this.snowOpacity = 1;

    this.sceneX = 0;
    this.sceneY = 0;
    this.sceneAngle = 0;

    this.initEventListeners();
    this.loadImages();

    this.calfWidth = 600;
    this.calfHeight = this.calfWidth;
    this.calfL = Math.round((winW - this.calfWidth) / 2);
    this.calfT = Math.round((winH - this.calfHeight) / 2); 

    this.iceWidth = this.iceImg.width;
    this.iceHeight = this.iceImg.height;
    this.iceL = Math.round((winW - this.iceWidth) / 2);
    this.iceT = Math.round((winW - this.iceHeight) / 2);

    this.planeWidth = 300;
    this.planeHeight = this.planeWidth;
    this.planeL = Math.round((winW + 300) / 2);
    this.planeT = Math.round(winH / 2 - 300);
    this.planeAngle = 0;

    this.planeBgWidth = this.planeBgImg.width;
    this.planeBgHeight = this.planeBgImg.width;
    this.planeBgL = Math.round((winW - this.planeBgWidth) / 2);
    this.planeBgT = Math.round((winW - this.planeBgHeight) / 2);

    this.snowLeftWidth = 200;
    this.snowLeftHeight = this.snowLeftWidth;
    this.snowLeftL = Math.round(winW / 2 - 200);
    this.snowLeftT = Math.round(winH / 2 - 30);

    this.snowRightWidth = 180;
    this.snowRightHeight = this.snowRightWidth;
    this.snowRightL = Math.round(winW / 2 + 200);
    this.snowRightT = Math.round(winH / 2 + 30);

    this.treeWidth = this.treeImg.width;
    this.treeHeight = this.treeImg.height;
    this.treeL = Math.round(winW / 2 + 80);
    this.treeT = Math.round(winH / 2 - 200);

    this.tree2Width = this.tree2Img.width;
    this.tree2Height = this.tree2Img.height;
    this.tree2L = Math.round(winW / 2 + 10);
    this.tree2T = Math.round(winH / 2 - 140);
  }


  increaseLoadingCounter() {
    this.loadingCounter++;

    if (this.loadingCounter === 7) {
      this.drawScene();
    }
  }


  initEventListeners() {
    this.calfImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.iceImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.planeImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.planeBgImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.snowLeftImg.onload = () => {
      this.increaseLoadingCounter();
    };
    
    this.snowRightImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.treeImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.tree2Img.onload = () => {
      this.increaseLoadingCounter();
    };
  }


  loadImages() {
    this.calfImg.src         = `/img/sea-calf-2.png`;
    this.iceImg.src          = `/img/ice.png`;
    this.planeImg.src         = `/img/airplane.png`;
    this.planeBgImg.src    = `/img/back.png`;
    this.treeImg.src   = `/img/tree.png`;
    this.tree2Img.src  = `/img/tree2.png`;
    this.snowLeftImg.src = `/img/snowflake.png`;
    this.snowRightImg.src = `/img/snowflake.png`;
  }

  rotateCtx(angle, cx, cy) {
    this.ctx.translate(cx, cy);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.translate(-cx, -cy);
  }

/*
  drawMoon(x, y, radius, dx, angle) {
    x *= wFactor;
    y *= hFactor;

    this.ctx.save();
    this.rotateCtx(angle, x, y);

    // outer arc
    this.ctx.beginPath();
    let startAngle = Math.PI / 8;
    this.ctx.arc(x, y, radius, startAngle, 2 * Math.PI - startAngle);
    this.ctx.strokeStyle = `#fff`;
    this.ctx.stroke();
    this.ctx.closePath();

    // inner arc
    this.ctx.beginPath();
    startAngle += Math.PI / 24;
    this.ctx.arc(x + dx + 1, y, radius - dx, startAngle, 2 * Math.PI - startAngle);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
*/

  drawPlane() {
    this.ctx.save();
    this.ctx.drawImage(
      this.planeBgImg,
      this.planeBgL,
      this.planeBgT,
      this.planeBgWidth,
      this.planeBgHeight
    );
    this.ctx.restore();

    this.ctx.save();
    this.ctx.drawImage(
      this.planeImg,
      this.planeL,
      this.planeT,
      this.planeWidth,
      this.planeHeight
    );
    this.ctx.restore();

    this.ctx.save();
    this.ctx.drawImage(
      this.treeImg,
      this.treeL,
      this.treeT,
      this.treeWidth,
      this.treeHeight
    );
    this.ctx.restore();
    
    this.ctx.save();
    this.ctx.drawImage(
      this.tree2Img,
      this.tree2L,
      this.tree2T,
      this.tree2Width,
      this.tree2Height
    );
    this.ctx.restore();
  }


  drawCalf() {
    this.ctx.globalAlpha = 1;
    //this.ctx.translate(this.sceneX * wFactor, this.sceneY * wFactor);
    //this.rotateCtx(this.sceneAngle, winW / 2, winH / 2);
    this.ctx.drawImage(this.iceImg, this.iceL, this.iceT, this.iceWidth, this.iceHeight);

    this.ctx.save();
    //this.rotateCtx(this.finAngle, this.finL + 21 * wFactor, this.finT + 31 * wFactor);
    this.ctx.drawImage(this.calfImg, this.calfL, this.calfT, this.calfWidth, this.calfHeight);
    this.ctx.restore();
  }


  drawSnow() {
    this.ctx.drawImage(
      this.snowLeftImg,
      this.snowLeftL,
      this.snowLeftT,
      this.snowLeftWidth,
      this.snowLeftHeight
    );

    this.ctx.drawImage(
      this.snowRightImg,
      this.snowRightL,
      this.snowRightT,
      this.snowRightWidth,
      this.snowRightHeight
    );
  }


  drawScene() {
    this.canvas.width = winW;
    this.canvas.height = winH;

    this.ctx.clearRect(0, 0, winW, winH);

    if (this.isAnimated) {
      this.ctx.globalAlpha = this.snowOpacity;

      this.drawPlane();
      this.drawCalf();
      this.drawSnow();
    }
  }
/* bg animation */
/*
  animateStarsInfinite() {
    const starsAnimations = [
      () => animateDuration(this.getStarsAnimationTick(), 2960),
      () => animateDuration(this.getStarsAnimationTick(), 2960),
      () => animateDuration(this.getStarsAnimationTick(), 2960),
    ];

    runSerial(starsAnimations);
  }

  startStarsAnimationInfinite() {
    const globalAnimationTick = (globalProgress) => {
      if (globalProgress === 0) {
        this.animateStarsInfinite();
      }
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 6000)
    ];

    runSerial(animations).then(this.startStarsAnimationInfinite.bind(this));
  }

  animateMoon() {
    const moonRotateTick = (from, to) => (progress) => {
      this.moonRotateAngle = from + progress * (to - from);
    };

    const moonAnimations = [
      () => animateEasing(moonRotateTick(-450, -20), 2033, bezierEasing(0.55, 0, 0.12, 1)),
      () => animateEasing(moonRotateTick(-20, -37), 683, bezierEasing(0.31, 0, 0.69, 1)),
      () => animateEasing(moonRotateTick(-37, -32), 717, bezierEasing(0.17, 0, 0.69, 1)),
    ];

    runSerial(moonAnimations);
  }

/* snow animation */
/*
  animateSnow() {
    const cloudLeftXTick = (from, to) => (progress) => {
      this.cloudLeftL = from + progress * (to - from);
    };
    const cloudRightXTick = (from, to) => (progress) => {
      this.cloudRightL = from + progress * (to - from);
    };

    const cloudLeftXFrom = (1113 - 612 / 2) * wFactor;
    const cloudLeftXTo = cloudLeftXFrom - 660 * wFactor;
    const cloudLeftAnimations = [
      () => animateEasing(cloudLeftXTick(cloudLeftXFrom, cloudLeftXTo), 2467, bezierEasing(0.11, 0, 0, 1)),
    ];

    const cloudRightXFrom = (463 - 644 / 2) * wFactor;
    const cloudRightXTo = cloudRightXFrom + 660 * wFactor;
    const cloudRightAnimations = [
      () => animateEasing(cloudRightXTick(cloudRightXFrom, cloudRightXTo), 2467, bezierEasing(0.11, 0, 0, 1)),
    ];

    runSerial(cloudLeftAnimations);
    runSerial(cloudRightAnimations);

    const cloudsOpacityTick = (progress) => {
      this.cloudsOpacity = progress;
    };

    animateEasing(cloudsOpacityTick, 850, bezierEasing(0, 0, 1, 1));
  }


  animateSnowInfinite() {
    const cloudLeftYTick = (from, to) => (progress) => {
      this.cloudLeftT = from + progress * (to - from);
    };
    const cloudRightYTick = (from, to) => (progress) => {
      this.cloudRightT = from + progress * (to - from);
    };
    const symmetricalEase = bezierEasing(0.33, 0, 0.67, 1);

    const cloudLeftYFrom = this.cloudLeftT;
    const cloudLeftYTo = cloudLeftYFrom - 20 * wFactor;
    const cloudLeftAnimations = [
      () => animateEasing(cloudLeftYTick(cloudLeftYFrom, cloudLeftYTo), 4883, symmetricalEase),
      () => animateEasing(cloudLeftYTick(cloudLeftYTo, cloudLeftYFrom), 4317, symmetricalEase),
    ];

    const cloudRightYFrom = this.cloudRightT;
    const cloudRightYTo = cloudRightYFrom + 20 * wFactor;
    const cloudRightAnimations = [
      () => animateEasing(cloudRightYTick(cloudRightYFrom, cloudRightYTo), 4883, symmetricalEase),
      () => animateEasing(cloudRightYTick(cloudRightYTo, cloudRightYFrom), 4317, symmetricalEase),
    ];

    runSerial(cloudLeftAnimations);
    runSerial(cloudRightAnimations);
  }


  startAnimateSnow() {
    const globalAnimationTick = (globalProgress) => {
      if (globalProgress === 0) {
        this.animateSnow();
      }
    }

    const animations = [
      () => animateDuration(globalAnimationTick, 2467)
    ];

    runSerial(animations).then(this.startAnimateSnowInfinite.bind(this));
  }


  startAnimateSnowInfinite() {
    const globalAnimationTick = (globalProgress) => {
      if (globalProgress === 0) {
        this.animateCloudsInfinite();
      }
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 9200)
    ];

    runSerial(animations).then(this.startAnimateSnowInfinite.bind(this));
  }


/* calf animation */
/*
  animateCalfShow() {
    const whaleXAnimationTick = (progress) => {
      const from = 1180;
      const to = 50;

      this.sceneX = from + progress * (to - from);
    };

    animateEasing(whaleXAnimationTick, 3900, bezierEasing(0.11, 0.26, 0, 1));
  }


  animateCalfInfinite() {
    const whaleYAnimationTick = (from, to) => (progress) => {
      this.sceneY = from + progress * (to - from);
    };

    const whalePeriod = 6000;
    const symmetricalEase = bezierEasing(0.33, 0, 0.67, 1);

    const whaleYFrom = 80;
    const whaleYTo = 0;
    const whaleYAnimations = [
      () => animateEasing(whaleYAnimationTick(whaleYFrom, whaleYTo), whalePeriod * 0.52, symmetricalEase),
      () => animateEasing(whaleYAnimationTick(whaleYTo, whaleYFrom), whalePeriod * 0.48, symmetricalEase),
    ];

    runSerialLoop(whaleYAnimations);

    const whaleAngleAnimationTick = (from, to) => (progress) => {
      this.sceneAngle = from + progress * (to - from);
    };

    const whaleAnglePhase = whalePeriod * 0.25;
    const whaleAngleStart = 0;
    const whaleAngleFrom = 5;
    const whaleAngleTo = -3;
    const whaleAngleAnimations = [
      () => animateEasing(whaleAngleAnimationTick(whaleAngleFrom, whaleAngleTo), whalePeriod * 0.5, symmetricalEase),
      () => animateEasing(whaleAngleAnimationTick(whaleAngleTo, whaleAngleFrom), whalePeriod * 0.5, symmetricalEase),
    ];

    // Создаёт разницу фаз между колебаниями вверх-вниз и колебаниями угла наклона корпуса кита
    animateEasing(whaleAngleAnimationTick(whaleAngleStart, whaleAngleFrom), whaleAnglePhase, symmetricalEase)
      .then(() => {
        runSerialLoop(whaleAngleAnimations);
      });

    const whaleFinAnimationTick = (from, to) => (progress) => {
      this.finAngle = from + progress * (to - from);
    };

    const whaleFinAnimations = [
      () => animateEasing(whaleFinAnimationTick(26, 3), whalePeriod * 0.39, bezierEasing(0.33, 0, 0.33, 1)),
      () => animateEasing(whaleFinAnimationTick(3, 26), whalePeriod * 0.61, bezierEasing(0.46, 0, 0.67, 1)),
    ];

    runSerialLoop(whaleFinAnimations);

    // Все движения второстепенных частей кроме плавника сдвигаем на одну небольшую величину.
    // Так словно эти части увлекаются движением корпуса и немного от него отстают.
    const whaleSecondaryPartsPhase = whalePeriod * 0.06;
    
    const whaleTailAnimationTick = (from, to) => (progress) => {
      this.tailAngle = from + progress * (to - from);
    };

    const whaleTailAnimations = [
      () => animateEasing(whaleTailAnimationTick(-20, 7), whalePeriod * 0.54, symmetricalEase),
      () => animateEasing(whaleTailAnimationTick(7, -20), whalePeriod * 0.46, symmetricalEase),
    ];

    animateEasing(whaleTailAnimationTick(-19, -20), whaleSecondaryPartsPhase, symmetricalEase)
      .then(() => {
        runSerialLoop(whaleTailAnimations)
      });

    const balloonLeftYAnimationTick = (from, to) => (progress) => {
      this.balloonLeftT = from + progress * (to - from);
    };

    const balloonLeftYFrom = this.balloonLeftT;
    const balloonLeftYTo = balloonLeftYFrom + 20 * wFactor;
    const balloonLeftYStart = balloonLeftYFrom + 2 * wFactor;
    const balloonLeftYAnimations = [
      () => animateEasing(balloonLeftYAnimationTick(balloonLeftYFrom, balloonLeftYTo), whalePeriod * 0.54, symmetricalEase),
      () => animateEasing(balloonLeftYAnimationTick(balloonLeftYTo, balloonLeftYFrom), whalePeriod * 0.46, symmetricalEase),
    ];

    animateEasing(balloonLeftYAnimationTick(balloonLeftYStart, balloonLeftYFrom), whaleSecondaryPartsPhase, symmetricalEase)
      .then(() => {
        runSerialLoop(balloonLeftYAnimations)
      });

    const balloonLeftXAnimationTick = (from, to) => (progress) => {
      this.balloonLeftL = from + progress * (to - from);
    };

    const balloonLeftXFrom = this.balloonLeftL;
    const balloonLeftXTo = balloonLeftXFrom + 8 * wFactor;
    const balloonLeftXStart = balloonLeftXFrom + 1 * wFactor;
    const balloonLeftXAnimations = [
      () => animateEasing(balloonLeftXAnimationTick(balloonLeftXFrom, balloonLeftXTo), whalePeriod * 0.54, symmetricalEase),
      () => animateEasing(balloonLeftXAnimationTick(balloonLeftXTo, balloonLeftXFrom), whalePeriod * 0.46, symmetricalEase),
    ];

    animateEasing(balloonLeftXAnimationTick(balloonLeftXStart, balloonLeftXFrom), whaleSecondaryPartsPhase, symmetricalEase)
      .then(() => {
        runSerialLoop(balloonLeftXAnimations)
      });

    const balloonRightYAnimationTick = (from, to) => (progress) => {
      this.balloonRightT = from + progress * (to - from);
    };

    const balloonRightYFrom = this.balloonRightT;
    const balloonRightYTo = balloonRightYFrom + 20 * wFactor;
    const balloonRightYStart = balloonRightYFrom + 2 * wFactor;
    const balloonRightYAnimations = [
      () => animateEasing(balloonRightYAnimationTick(balloonRightYFrom, balloonRightYTo), whalePeriod * 0.42, symmetricalEase),
      () => animateEasing(balloonRightYAnimationTick(balloonRightYTo, balloonRightYFrom), whalePeriod * 0.58, symmetricalEase),
    ];

    animateEasing(balloonRightYAnimationTick(balloonRightYStart, balloonRightYFrom), whaleSecondaryPartsPhase, symmetricalEase)
      .then(() => {
        runSerialLoop(balloonRightYAnimations)
      });

    const balloonRightXAnimationTick = (from, to) => (progress) => {
      this.balloonRightL = from + progress * (to - from);
    };

    const balloonRightXFrom = this.balloonRightL;
    const balloonRightXTo = balloonRightXFrom + 5 * wFactor;
    const balloonRightXStart = balloonRightXFrom + 0.5 * wFactor;
    const balloonRightXAnimations = [
      () => animateEasing(balloonRightXAnimationTick(balloonRightXFrom, balloonRightXTo), whalePeriod * 0.42, symmetricalEase),
      () => animateEasing(balloonRightXAnimationTick(balloonRightXTo, balloonRightXFrom), whalePeriod * 0.58, symmetricalEase),
    ];

    animateEasing(balloonRightXAnimationTick(balloonRightXStart, balloonRightXFrom), whaleSecondaryPartsPhase, symmetricalEase)
      .then(() => {
        runSerialLoop(balloonRightXAnimations)
      });
  }


/* all animation */
/*
  startAnimationInfinite() {
    const globalAnimationTick = () => {
      this.drawScene();
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 6000)
    ];

    runSerial(animations).then(this.startAnimationInfinite.bind(this));
  }


  startAnimation(options) {
    if (!this.isAnimated) {
      this.isAnimated = true;

      const globalAnimationTick = (globalProgress) => {
        const showCalfAnimationDelay = 0;
        const snowAnimationDelay = 233;
        const planeAnimationDelay = 350;

        if (globalProgress >= showCalfAnimationDelay && this.startAnimations.indexOf(showCalfAnimationDelay) < 0) {
          this.startAnimations.push(showCalfAnimationDelay);

          this.animateCalfShow();
          this.animateCalfInfinite();
          this.startAnimationInfinite();
        }

        if (globalProgress >= planeAnimationDelay && this.startAnimations.indexOf(planeAnimationDelay) < 0) {
          this.startAnimations.push(planeAnimationDelay);

          this.startPlaneAnimationInfinite();
          this.animatePlane();
        }

        if (globalProgress >= snowAnimationDelay && this.startAnimations.indexOf(snowAnimationDelay) < 0) {
          this.startAnimations.push(snowAnimationDelay);

          this.startAnimateSnow();
        }
      };

      animateDuration(globalAnimationTick, 3900);
    }
  }*/
}