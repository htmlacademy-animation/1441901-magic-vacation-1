export default () => {
  const prizeScreen = document.querySelector(`.screen--prizes`);
  const prizeJourneys = prizeScreen.querySelector(`.prizes__item--journeys img`);
  const prizeCases = prizeScreen.querySelector(`.prizes__item--cases img`);
  const prizeCodes = prizeScreen.querySelector(`.prizes__item--codes img`);

  const images = [
    {
      name: `prize-journeys`,
      path: `img/prize1.svg`,
      timeDelay: 500,
      target: prizeJourneys,
    },
    {
      name: `prize-cases`,
      path: `img/prize2.svg`,
      timeDelay: 500,
      target: prizeCases,
    },
    {
      name: `prize-codes`,
      path: `img/prize3.svg`,
      timeDelay: 500,
      target: prizeCodes,
    },
  ];

  
  function addImagesSvg() {
    if (!prizeJourneys.hasAttribute(`src`)) {
      images.forEach(({path, timeDelay, target, name}, i) => {
        setTimeout(() => {
          target.setAttribute(`src`, `${path}?time=${Date.now()}`);

          
          if (target === prizeJourneys) {
            prizeScreen
              .querySelector(`.prizes__item--journeys`)
              .classList.add(`active`);
          }
        }, timeDelay);
      });
    }
    return;
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