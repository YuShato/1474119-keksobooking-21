'use strict';

const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);

const closeCardInfo = function () {
  const currentCards = document.querySelectorAll(`.map__card`);

  if (currentCards.length > 0) {
    currentCards[0].classList.remove(`visually-hidden`);
    const buttonClose = currentCards[0].querySelector(`.popup__close`);
    buttonClose.addEventListener(`click`, function () {
      currentCards[0].classList.add(`visually-hidden`);
    });
  }
};

const openCardInfo = function () {
  mapFiltersContainer.before(card);
};

window.popupModule = {
  openCardInfo,
  closeCardInfo
};
