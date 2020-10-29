'use strict';
const mapPinMain = document.querySelector(`.map__pin--main`);
const inputAdress = document.querySelector(`#address`);
mapPinMain.addEventListener(`mousedown`, window.mapModule.findButtonSide);

document.addEventListener(`click`, function (evt) {
  if (evt.target === mapPinMain) {
    const createdPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (createdPins.length < window.mapModule.BOOKING_AMOUNT) {
      window.mapModule.removeCreatedElements(document, createdPins);
      window.pinModule.activeMapPinMain(mapPinMain);
    }
    window.mapModule.closeCurrentPopup();
  }
});

window.pinModule.setPinAdress(mapPinMain, inputAdress);
window.pinModule.moveMainPin(mapPinMain, inputAdress);

window.popupModule.closeCardEscButton();

window.formModule.checkTitleInput();
window.formModule.checkTitleInputInvalid();
window.formModule.inputAdressMessage();
window.formModule.setMinPrice();
window.formModule.checkInTime();
window.formModule.checkRoomsAndGuestsCount();
