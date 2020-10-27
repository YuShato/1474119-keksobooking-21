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

  const renderCardFromServerData = function (pinsData) {
    const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const mapFiltersContainer = document.querySelector(`.map__filters-container`);

    if (pinsData.length > BOOKING_AMOUNT) {
      addPinFromData(BOOKING_AMOUNT, pinsData);
    } else {
      addPinFromData(pinsData.length, pinsData);
    }

    mapPinsElement.appendChild(fragment);
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    let allPins = document.querySelectorAll(`.map__pin`);
    mapPinsElement.addEventListener(`click`, function (evt) {
      for (let i = 0; i < allPins.length; i++) {
        if (evt.target === allPins[i]) {
          window.dataModule.fillCardFromServer(pinsData[i - 1]);
          mapFiltersContainer.before(card);
        }
      }
      window.popupModule.popupClose();
    });

  };

  const showActivePage = function () {
    window.backend.load(renderCardFromServerData, window.backend.onShowError);
    window.popupModule.popupClose();
  };

  const findButtonSide = function (evt) {
    if (evt.button === 0) {
      showActivePage();
    }
  };
  window.mapModule = {
    showActivePage,
    findButtonSide,
    fragment
  };
})();
