'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 25;
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const mapPinMainHeigth = mapPinMain.offsetHeight;
  let mapPinMainWidth = mapPinMain.offsetWidth;
  const TOP_BORDER_SCROLL_Y = 130;
  const BOTTOM_BORDER_SCROLL_Y = 630;
  const PIN_AFTER_ELEMENT_HEIGTH = 15;
  const MAP_PIN_WIDTH = 1200;
  const startMainPinCoords = {
    top: 375,
    left: 570
  };


  const renderPin = function (pin) {
    const PinElement = pinTemplate.cloneNode(true);
    const PinElementImg = PinElement.querySelector(`img`);
    PinElement.style.left = `${pin.location.x - PIN_WIDTH}px`;
    PinElement.style.top = `${pin.location.y - PIN_HEIGHT}px`;
    window.util.setAttributeData(PinElementImg, `alt`, pin.offer.title);
    window.util.setAttributeData(PinElementImg, `src`, pin.author.avatar);
    window.util.setAttributeData(PinElement, `data-id`, pin.id);

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
    input.value = `${Math.floor(chosenPin.left + PIN_WIDTH)}, ${Math.floor(chosenPin.top + PIN_HEIGHT)}`;
    return input.value;
  };

  const returnMainPinPosition = function () {
    mapPinMain.style.top = startMainPinCoords.top + `px`;
    mapPinMain.style.left = startMainPinCoords.left + `px`;
    setPinAdress(mapPinMain, window.formModule.inputAdress);
  };

  const activeMapPinMain = function (element) {
    element.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.mapModule.closeCurrentPopup();
        window.mapModule.showActivePage();
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

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let changePinPosition = function (myPin) {
          let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          let positionPinY = myPin.offsetTop - shift.y;
          if (positionPinY >= TOP_BORDER_SCROLL_Y - mapPinMainHeigth - PIN_AFTER_ELEMENT_HEIGTH && positionPinY <= BOTTOM_BORDER_SCROLL_Y - mapPinMainHeigth - PIN_AFTER_ELEMENT_HEIGTH) {
            myPin.style.top = positionPinY + `px`;
          }


          let halfOfPinWidth = Math.floor((mapPinMainWidth / 2)) * (-1);
          let positionPinX = myPin.offsetLeft - shift.x;
          if (positionPinX >= halfOfPinWidth && positionPinX <= MAP_PIN_WIDTH + halfOfPinWidth) {
            myPin.style.left = positionPinX + `px`;
          }

          setPinAdress(myPin, input);
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
    moveMainPin,
    returnMainPinPosition
  };
})();
