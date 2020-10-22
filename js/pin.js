'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 25;
  const mapOverlay = document.querySelector(`.map__overlay`);


  const renderPin = function (pin) {
    const PinElement = pinTemplate.cloneNode(true);
    const PinElementImg = PinElement.querySelector(`img`);
    PinElement.style.left = `${pin.location.x - PIN_WIDTH}px`;
    PinElement.style.top = `${pin.location.y - PIN_HEIGHT}px`;
    window.util.setAttributeData(PinElementImg, `alt`, pin.offer.title);
    window.util.setAttributeData(PinElementImg, `src`, pin.author.avatar);

    return PinElement;
  };

  const getCoords = function (elem) {
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  let setPinAdress = function (pin, input) {
    let chosenPin = getCoords(pin);
    input.value = `${chosenPin.left + PIN_WIDTH}, ${chosenPin.top + PIN_HEIGHT}`;
    return input.value;
  };

  const activeMapPinMain = function (element) {
    element.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.mapModule.showActivePage();
        window.dataModule.addPinsInfo();
      }
    });
  };

  const moveMainPin = function (pin, input) {
    pin.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let mapBorderCoords = mapOverlay.getBoundingClientRect();
      let mapPinMain = document.querySelector(`.map__pin--main`);
      const findPinPosition = function (pinElem) {
        return {
          pinLeftPosition: pinElem.offsetLeft,
          pinTopPosition: pinElem.offsetTop
        };
      };


      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let changePinPosition = function (myPin) {
          let newObj = findPinPosition(myPin);
          let posLeft = newObj.pinLeftPosition + PIN_WIDTH / 2;
          let posTop = newObj.pinTopPosition - PIN_HEIGHT;
          let posRight = newObj.pinLeftPosition + PIN_WIDTH * 6;
          let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          if (posLeft > mapBorderCoords.left && posRight < mapBorderCoords.right && posTop > mapBorderCoords.top && posTop < mapBorderCoords.bottom) {
            pin.style.top = (pin.offsetTop - shift.y) + `px`;
            pin.style.left = (pin.offsetLeft - shift.x) + `px`;
            setPinAdress(pin, input);
          }

        };
        changePinPosition(mapPinMain);

      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  window.pinModule = {
    renderPin,
    getCoords,
    setPinAdress,
    activeMapPinMain,
    moveMainPin
  };
})();
