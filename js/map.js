'use strict';

(function () {
  const mapPinsElement = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);

  const addBookingOnMap = function (array, parentElement) {
    array.forEach(function (item) {
      parentElement.appendChild(window.pinModule.renderPin(item));
    });
  };

  const showActivePage = function () {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    mapPinsElement.appendChild(fragment);
  };

  const findButtonSide = function (evt) {
    if (evt.button === 0) {
      showActivePage();
      window.dataModule.addPinsInfo();
    }
  };
  window.mapModule = {
    addBookingOnMap,
    showActivePage,
    findButtonSide,
    fragment
  };
})();
