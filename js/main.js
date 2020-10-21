'use strict';

const BOOKING_AMOUNT = 8;
const mapPinMain = document.querySelector(`.map__pin--main`);

window.dataModule.createBooking(BOOKING_AMOUNT);

window.mapModule.addBookingOnMap(window.dataModule.ads, window.mapModule.fragment);

mapPinMain.addEventListener(`mousedown`, window.mapModule.findButtonSide);

window.util.setInputAttributes(window.formModule.titleInput, 30, 100);
window.util.setInputAttributes(window.formModule.priceInput, 0, 1000000);


window.formModule.checkTitleInput();
window.formModule.checkTitleInputInvalid();
window.formModule.inputAdressMessage();

window.formModule.setMinPrice();
window.pinModule.setPinAdress(mapPinMain, window.formModule.inputAdress);
window.pinModule.activeMapPinMain(mapPinMain);
window.formModule.checkInTime();
window.popupModule.closeCardEscButton();

window.formModule.checkRoomsAndGuestsCount();
window.formModule.checkSubmitForm();
