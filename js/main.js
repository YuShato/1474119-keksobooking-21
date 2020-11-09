'use strict';
const mapPinMain = document.querySelector(`.map__pin--main`);
const inputAdress = document.querySelector(`#address`);
const allInputs = window.formModule.adForm.querySelectorAll(`fieldset`);
const allLabels = window.formModule.adForm.querySelectorAll(`.feature`);

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
window.formModule.setDisableInputForm(allInputs, allLabels, true, `none`);

document.addEventListener(`click`, function (evt) {
  if (evt.target === mapPinMain) {
    window.mapModule.showActivePage();
    window.mapModule.closeCurrentPopup();
  }
});
