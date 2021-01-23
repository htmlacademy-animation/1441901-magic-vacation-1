export default () => {
    const prizeScreen = document.querySelector(`.screen--prizes`);
  const prizes = document.querySelectorAll(`.prizes__item`);
  const prizesImg = document.querySelectorAll(`.prizes__item img`);
  const prizesNum = document.querySelectorAll(`.prizes__desc b`);
  const prizesOptions = [
    {src: `img/prize1.svg`, timeout: 500, numbers: [1, 2, 3]},
    {src: `img/prize2.svg`, timeout: 1000, numbers: [1, 2, 3, 4, 5, 6, 7]},
    {src: `img/prize3.svg`, timeout: 1500, numbers: [11, 121, 216, 324, 419, 513, 628, 734, 826, 875, 900]}
  ];


  function drawNums(prizeNum, prizesOption, fpsInterval, now, then, nums, elapsed) {
    requestAnimationFrame(() => drawNums(prizeNum, prizesOption, fpsInterval, now, then, nums, elapsed));
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval && nums.length > 0) {
      then = now - (elapsed % fpsInterval);
      prizeNum.textContent = nums.shift();
    }
  }

  function addImagesSvg(){
    for (let i = 0; i < prizesImg.length; i++) {
      let fpsInterval = 1000 / 12;
      let now = Date.now();
      let then = Date.now();
      let elapsed;
      setTimeout(() => {
        prizes[i].classList.add(`prizes__item--active`);
        prizesImg[i].src=prizesOptions[i].src;
        requestAnimationFrame(() => drawNums(prizesNum[i], prizesOptions[i], fpsInterval, now, then, prizesOptions[i].numbers, elapsed));
      }, prizesOptions[i].timeout);
    }
  }


  if (prizeScreen.classList.contains(`active`)) {
    addImagesSvg();
  }

  document.body.addEventListener(`screenChanged`, (event) => {
    if (event.detail.screenName === `prizes`) {
      addImagesSvg();
    }
  });
  



};