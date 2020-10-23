'use strict';

const BOOKING_AMOUNT = 8;
const mapPinMain = document.querySelector(`.map__pin--main`);
const inputAdress = document.querySelector(`#address`);

window.dataModule.createBooking(BOOKING_AMOUNT);

window.mapModule.addBookingOnMap(window.dataModule.ads, window.mapModule.fragment);
mapPinMain.addEventListener(`mousedown`, window.mapModule.findButtonSide);

window.pinModule.activeMapPinMain(mapPinMain);
window.pinModule.setPinAdress(mapPinMain, inputAdress);
window.pinModule.moveMainPin(mapPinMain, inputAdress);

window.popupModule.closeCardEscButton();

window.formModule.checkTitleInput();
window.formModule.checkTitleInputInvalid();
window.formModule.inputAdressMessage();
window.formModule.setMinPrice();
window.formModule.checkInTime();
window.formModule.checkRoomsAndGuestsCount();
window.formModule.checkSubmitForm();
