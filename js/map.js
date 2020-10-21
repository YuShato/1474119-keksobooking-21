'use strict';

(function () {
  const mapPinsElement = document.querySelector(`.map__pins`);

  window.mapModule = {
    fragment: document.createDocumentFragment(),

    addBookingOnMap(array, parentElement) {
      array.forEach(function (item) {
        parentElement.appendChild(window.pinModule.renderPin(item));
      });
    },

    showActivePage() {
      window.dataModule.map.classList.remove(`map--faded`);
      window.formModule.adForm.classList.remove(`ad-form--disabled`);
      mapPinsElement.appendChild(window.mapModule.fragment);
    },

    findButtonSide(evt) {
      if (evt.button === 0) {
        window.mapModule.showActivePage();
        window.dataModule.addPinsInfo();
      }
    },

  };
})();
