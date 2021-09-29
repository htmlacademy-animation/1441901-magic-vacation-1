const handlePageLoad = () => {
  window.addEventListener(`load`, () => {
    setTimeout(() => document.body.classList.add(`loaded`), 500);
  });
};

export default handlePageLoad;
