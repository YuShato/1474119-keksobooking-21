'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 25;

  window.pinModule = {
    renderPin(pin) {
      const PinElement = pinTemplate.cloneNode(true);
      const PinElementImg = PinElement.querySelector(`img`);
      PinElement.style.left = `${pin.location.x - PIN_WIDTH}px`;
      PinElement.style.top = `${pin.location.y - PIN_HEIGHT}px`;
      window.util.setAttributeData(PinElementImg, `alt`, pin.offer.title);
      window.util.setAttributeData(PinElementImg, `src`, pin.author.avatar);

      return PinElement;
    },

    getCoords(elem) {
      let box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    },

    setPinAdress(pin, input) {
      let chosenPin = window.pinModule.getCoords(pin);
      input.value = `${chosenPin.left + PIN_WIDTH}, ${chosenPin.top + PIN_HEIGHT}`;
      return input.value;
    },

    activeMapPinMain(element) {
      element.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Enter`) {
          window.mapModule.showActivePage();
          window.dataModule.addPinsInfo();
        }
      });
    }


  };
})();
