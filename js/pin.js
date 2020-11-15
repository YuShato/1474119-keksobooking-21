'use strict';

const PIN_HEIGHT = 70;
const PIN_WIDTH = 25;
const TOP_BORDER_SCROLL_Y = 130;
const BOTTOM_BORDER_SCROLL_Y = 630;
const PIN_AFTER_ELEMENT_HEIGTH = 15;
const MAP_PIN_WIDTH = 1200;
window.DATA = [];

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapPinMainHeigth = mapPinMain.offsetHeight;
let mapPinMainWidth = mapPinMain.offsetWidth;

const startMainPinCoords = {
  top: 375,
  left: 570
};

const render = function (pin) {
  const clonedPin = pinTemplate.cloneNode(true);
  const clonedPinImg = clonedPin.querySelector(`img`);
  clonedPin.style.left = `${pin.location.x - PIN_WIDTH}px`;
  clonedPin.style.top = `${pin.location.y - PIN_HEIGHT}px`;
  clonedPinImg.alt = pin.offer.title;
  clonedPinImg.src = pin.author.avatar;
  clonedPin.dataset.id = pin.id;

  return clonedPin;
};

const getCoords = function (elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

const setStartAdress = function (pin, input) {
  const chosenPin = getCoords(pin);
  input.value = `${Math.floor(chosenPin.left + PIN_WIDTH / 2)}, ${Math.floor(chosenPin.top + PIN_HEIGHT / 2)}`;
  return input.value;
};

const setAdress = function (pin, input) {
  const chosenPin = getCoords(pin);
  input.value = `${Math.floor(chosenPin.left + PIN_WIDTH / 2)}, ${Math.floor(chosenPin.top + PIN_HEIGHT)}`;
  return input.value;
};

const getPosition = function () {
  mapPinMain.style.top = startMainPinCoords.top + `px`;
  mapPinMain.style.left = startMainPinCoords.left + `px`;
  setAdress(mapPinMain, window.form.inputAdress);
};

const active = function (element) {
  element.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.map.closeCurrentPopup();
      window.map.showActivePage();
    }
  });
};

const move = function (pin, input) {
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

        setAdress(myPin, input);
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

window.pin = {
  render,
  getCoords,
  setAdress,
  setStartAdress,
  active,
  move,
  getPosition
};
