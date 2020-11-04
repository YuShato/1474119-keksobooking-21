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
window.formModule.setDisableInputForm(true, `none`);

document.addEventListener(`click`, function (evt) {
  if (evt.target === mapPinMain) {
    window.mapModule.showActivePage();
    window.mapModule.closeCurrentPopup();
  }
});
