// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import handlePageLoad from './modules/handle-page-load';
import sloganAnimation from './modules/slogan.js';
import prizeAnimation from './modules/prizes.js';
import timerAnimation from './modules/timer.js';
import seaCalf from './modules/seacalf.js';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
handlePageLoad();
sloganAnimation();
prizeAnimation();
timerAnimation();
seaCalf();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener(`popstate`, function() {
  let currPage = location.href.split(`#`)[1];
  document.body.classList.remove(`defaultTheme`, `blueTheme`, `lightTheme`, `darkTheme`);
  document.body.classList.add(`defaultTheme`);
});

window.addEventListener(`click`, function() {
  if(document.getElementById(`result`).classList.contains(`screen--show`)) {
    seaCalf();
  }
});
