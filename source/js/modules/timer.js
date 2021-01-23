export default () => {
  const GAME_DURATION=5 * 60 * 1000;
  let endTime = Date.now() + GAME_DURATION;
  const minutesElement = document.querySelector(`.game__counter span:first-child`);
  const secondsElement = document.querySelector(`.game__counter span:last-child`);

  let fpsInterval = 1000 / 12;
  let now, then = Date.now(), elapsed;

  function showTime() {
    let currTime = Date.now();
    let minutes = `00`;
    let seconds = `00`;
    let timeDiff = endTime - currTime;
    if (timeDiff > 0) {
      let timer = new Date(timeDiff);
      minutes = timer.getMinutes() < 10 ? `0` + timer.getMinutes() : timer.getMinutes();
      seconds = timer.getSeconds() < 10 ? `0` + timer.getSeconds() : timer.getSeconds();
    }
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
  }

  function tick() {
    requestAnimationFrame(tick);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      showTime();
    }
  }

  window.addEventListener(`popstate`, function() {
    endTime = Date.now() + GAME_DURATION;
    tick();
  }, false);

  window.addEventListener(`load`, function() {
    endTime = Date.now() + GAME_DURATION;
    tick();
  }, false);
};
