'use strict';
const mapPinMain = document.querySelector(`.map__pin--main`);
const inputAdress = document.querySelector(`#address`);
mapPinMain.addEventListener(`mousedown`, window.mapModule.findButtonSide);

window.pinModule.setPinAdress(mapPinMain, inputAdress);
window.pinModule.moveMainPin(mapPinMain, inputAdress);

window.popupModule.closeCardEscButton();

window.formModule.checkTitleInput();
window.formModule.checkTitleInputInvalid();
window.formModule.inputAdressMessage();
window.formModule.setMinPrice();
window.formModule.checkInTime();
window.formModule.checkRoomsAndGuestsCount();


document.addEventListener(`click`, function (evt) {
  if (evt.target === mapPinMain) {
    const createdPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (createdPins.length === 0) {
      window.backend.load(window.mapModule.renderCardFromServerData, window.backend.onShowError);
    }
    mapPinMain.addEventListener(`click`, window.formModule.setDisableInputForm(false, `auto`));
    window.mapModule.closeCurrentPopup();
  }
});
