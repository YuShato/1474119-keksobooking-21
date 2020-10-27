'use strict';

(function () {
  const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const mapPins = document.querySelector(`.map__pins`);

  const popupClose = function () {
    let currentCard = document.querySelector(`.map__card`);
    currentCard.classList.remove(`visually-hidden`);
    let buttonClose = currentCard.querySelector(`.popup__close`);
    buttonClose.addEventListener(`click`, function () {
      currentCard.classList.add(`visually-hidden`);
    });
  };

  const openCardInfo = function () {
    mapFiltersContainer.before(card);
    popupClose();
  };

  const closeCardEscButton = function () {
    mapPins.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        const currentCard = document.querySelector(`.map__card`);
        currentCard.classList.add(`visually-hidden`);
      }
    });
  };

  window.popupModule = {
    openCardInfo,
    closeCardEscButton,
    popupClose
  };
})();

