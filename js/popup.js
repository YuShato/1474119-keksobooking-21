'use strict';
(function () {
  const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const mapPins = document.querySelector(`.map__pins`);

  const popupClose = function () {
    let currentCards = document.querySelectorAll(`.map__card`);

    if (currentCards.length > 0) {
      currentCards[0].classList.remove(`visually-hidden`);
      let buttonClose = currentCards[0].querySelector(`.popup__close`);
      buttonClose.addEventListener(`click`, function () {
        currentCards[0].classList.add(`visually-hidden`);
      });
    }
  };

  const openCardInfo = function () {
    mapFiltersContainer.before(card);
  };

  const closeCardEscButton = function () {
    mapPins.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        const currentCards = document.querySelector(`.map__card`);
        if (currentCards.length > 0) {
          currentCards[0].classList.add(`visually-hidden`);
        }
      }
    });
  };

  window.popupModule = {
    openCardInfo,
    closeCardEscButton,
    popupClose
  };
})();
