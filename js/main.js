'use strict';
const mapPinMain = document.querySelector(`.map__pin--main`);
const inputAdress = document.querySelector(`#address`);
const allInputs = window.form.adForm.querySelectorAll(`fieldset`);
const allLabels = window.form.adForm.querySelectorAll(`.feature`);
const mapFilterForm = document.querySelector(`.map__filters`);
const allMapFilters = mapFilterForm.querySelectorAll(`.map__filter`);
const allMapLabels = mapFilterForm.querySelectorAll(`.map__feature`);

mapPinMain.addEventListener(`mousedown`, window.map.findButtonSide);

window.pin.setStartAdress(mapPinMain, inputAdress);
window.pin.move(mapPinMain, inputAdress);

window.form.checkTitleInput();
window.form.checkTitleInputInvalid();
window.form.inputAdressMessage();
window.form.setMinPrice();
window.form.onTimeChange();
window.form.checkRoomsAndGuestsCount();
window.form.setDisableInputs(allInputs, allLabels, true, `none`);
window.form.setDisableInputs(allMapFilters, allMapLabels, true, `none`);

document.addEventListener(`click`, function (evt) {
  if (evt.target === mapPinMain) {
    window.map.showActivePage();
    window.map.closeCurrentPopup();
  }
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    const currentCards = document.querySelectorAll(`.map__card`);
    if (currentCards.length > 0) {
      currentCards[0].classList.add(`visually-hidden`);
    }
  }
});
