export default () => {
class AccentTypographyBuild {
  constructor(
    elementSelector,
    timer,
    classForActivate,
    property
  ) {
    this._TIME_SPACE = 100;

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 0;

    this.prePareText();
  }

  createElement(letter) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    //span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
    span.style.animation = `${this._property} ${this._timer}ms ease-in ${this._timeOffset}ms forwards`;

    this._timeOffset += 20;
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent.trim().split(` `).filter((latter)=>latter !== '');

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, latter) => {
        fragment.appendChild(this.createElement(latter));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}

const animationTopScreenTextLine = new AccentTypographyBuild(`.intro__title`, 500, `active`, `translate-span`);
setTimeout(()=>{
  animationTopScreenTextLine.runAnimation();
}, 500);

const animationDate = new AccentTypographyBuild(`.intro__date`, 500, `active`, `translate-span`);
setTimeout(()=>{
  animationDate.runAnimation();
}, 800);

const animationStoryScreenTextLine = new AccentTypographyBuild(`.slider__item-title`, 500, `active`, `translate-span`);
setTimeout(()=>{
  animationStoryScreenTextLine.runAnimation();
}, 500);

const animationPrizesScreenTextLine = new AccentTypographyBuild(`.prizes__title`, 500, `active`, `translate-span`);
setTimeout(()=>{
  animationPrizesScreenTextLine.runAnimation();
}, 500);

const animationRulesScreenTextLine = new AccentTypographyBuild(`.rules__title`, 500, `active`, `translate-span`);
setTimeout(()=>{
  animationRulesScreenTextLine.runAnimation();
}, 500);

const animationGameScreenTextLine = new AccentTypographyBuild(`.game__title`, 500, `active`, `translate-span`);
setTimeout(()=>{
  animationGameScreenTextLine.runAnimation();
}, 500);
};
