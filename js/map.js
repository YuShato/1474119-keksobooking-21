'use strict';
const BOOKING_AMOUNT = 5;

const pinsButtons = document.querySelector(`.map__pins`);
const fragment = document.createDocumentFragment();
const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const mapFilterForm = document.querySelector(`.map__filters`);
const allInputs = document.querySelectorAll(`fieldset`);
const allLabels = document.querySelectorAll(`.feature`);
const allFilters = mapFilterForm.querySelectorAll(`.map__filter`);
const allLabelFilterss = mapFilterForm.querySelectorAll(`.map__feature`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const inputAdress = document.querySelector(`#address`);

const setIdForCard = function (array) {
  const addCardId = function (evt) {
    if (evt.target.className === `map__pin`) {
      let cardId = Number(evt.target.dataset.id);
      if (cardId >= 0) {
        const currentCard = array.find(function (elem) {
          return elem.id === cardId;
        });
        window.data.fillCardFromServer(currentCard);
        mapFiltersContainer.before(card);
        window.popupModule.closeCardInfo();
      }
    }
  };

  mapFilterForm.addEventListener(`change`, function () {
    pinsButtons.removeEventListener(`click`, addCardId);
  });
  pinsButtons.addEventListener(`click`, addCardId);
  mapFilterForm.removeEventListener(`change`, function () {
    pinsButtons.removeEventListener(`click`, addCardId);
  });
};

const addPinFromData = function (array) {
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(window.pin.render(array[i]));
  }
  window.util.debounce(pinsButtons.appendChild(fragment));
};

const removeCreatedElements = function (parentElem, childElem) {
  if (childElem.length > 0) {
    for (let i = 0; i < childElem.length; i++) {
      parentElem.removeChild(childElem[i]);
    }
  }
};

const deleteAllPins = function () {
  const createdPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  if (createdPins.length > 0) {
    removeCreatedElements(window.map.pinsButtons, createdPins);
  }
};

const closeCurrentPopup = function () {
  const currentCards = document.querySelectorAll(`.map__card`);

  if (currentCards.length > 0) {
    currentCards[0].classList.add(`visually-hidden`);
  }
};

const showActivePage = function () {
  const createdPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  if (!createdPins.length) {
    window.backend.load(window.filter.renderCardFromServerData, window.backend.onLoadError);
    window.pin.setAdress(mapPinMain, inputAdress);
  }
  window.form.setDisableInputs(allInputs, allLabels, false, `auto`);
  window.form.setDisableInputs(allFilters, allLabelFilterss, false, `auto`);
};

const findButtonSide = function (evt) {
  if (!evt.button) {
    showActivePage();
  }
};

window.map = {
  showActivePage,
  findButtonSide,
  fragment,
  removeCreatedElements,
  BOOKING_AMOUNT,
  pinsButtons,
  deleteAllPins,
  closeCurrentPopup,
  addPinFromData,
  setIdForCard
};
