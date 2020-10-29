'use strict';

(function () {
  const mapPinsElement = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const BOOKING_AMOUNT = 8;

  const addPinFromData = function (maxCount, array) {
    for (let i = 0; i < maxCount; i++) {
      fragment.appendChild(window.pinModule.renderPin(array[i]));
    }
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
      removeCreatedElements(window.mapModule.mapPinsElement, createdPins);
    }
  };

  const renderCardFromServerData = function (pinsData) {
    const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const mapFiltersContainer = document.querySelector(`.map__filters-container`);

    deleteAllPins();

    if (pinsData.length > BOOKING_AMOUNT) {
      addPinFromData(BOOKING_AMOUNT, pinsData);
    } else {
      addPinFromData(pinsData.length, pinsData);
    }

    mapPinsElement.appendChild(fragment);
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    let allPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    mapPinsElement.addEventListener(`click`, function (evt) {
      for (let i = 0; i < allPins.length; i++) {
        if (evt.target === allPins[i]) {
          window.dataModule.fillCardFromServer(pinsData[i]);
          mapFiltersContainer.before(card);
        }
      }
      window.popupModule.popupClose();
    });
  };

  const closeCurrentPopup = function () {
    let currentCards = document.querySelectorAll(`.map__card`);

    if (currentCards.length > 0) {
      currentCards[0].classList.add(`visually-hidden`);
    }
  };

  const showActivePage = function () {
    window.backend.load(renderCardFromServerData, window.backend.onShowError);
  };

  const findButtonSide = function (evt) {
    if (evt.button === 0) {
      showActivePage();
    }
  };
  window.mapModule = {
    showActivePage,
    findButtonSide,
    fragment,
    removeCreatedElements,
    BOOKING_AMOUNT,
    mapPinsElement,
    deleteAllPins,
    closeCurrentPopup
  };
})();
