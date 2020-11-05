'use strict';

(function () {
  const mapPinsElement = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  const BOOKING_AMOUNT = 5;

  const setIdForCard = function (array) {
    const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const mapFiltersContainer = document.querySelector(`.map__filters-container`);
    mapPinsElement.addEventListener(`click`, function (evt) {
      if (evt.target.className === `map__pin`) {
        let cardId = Number(evt.target.dataset.id);
        if (cardId >= 0) {
          const currentCard = array.find((elem) => elem.id === cardId);
          window.dataModule.fillCardFromServer(currentCard);
          mapFiltersContainer.before(card);
          window.popupModule.popupClose();
        }
      }
    });
  };

  const addPinFromData = function (array) {
    for (let i = 0; i < array.length; i++) {
      fragment.appendChild(window.pinModule.renderPin(array[i]));
    }
    mapPinsElement.appendChild(fragment);
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

  // const renderCardFromServerData = function (pinsData) {
  //   pinsData.forEach((elem, i) => {
  //     const currentIndex = elem.id = i;
  //     return currentIndex;
  //   });

  //   const pinsDataTest = pinsData.length > 5 ? pinsData.slice(0, 5) : pinsData;
  //   addPinFromData(pinsDataTest);
  //   map.classList.remove(`map--faded`);
  //   adForm.classList.remove(`ad-form--disabled`);
  //   setIdForCard(pinsDataTest);
  // };


  const closeCurrentPopup = function () {
    let currentCards = document.querySelectorAll(`.map__card`);

    if (currentCards.length > 0) {
      currentCards[0].classList.add(`visually-hidden`);
    }
  };

  const showActivePage = function () {
    const createdPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (createdPins.length === 0) {
      window.backend.load(window.filter.renderCardFromServerData, window.backend.onShowError);
    }
    window.formModule.setDisableInputForm(false, `auto`);
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
    closeCurrentPopup,
    addPinFromData,
    setIdForCard
  };
})();
