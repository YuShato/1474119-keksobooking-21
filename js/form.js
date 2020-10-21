'use strict';

(function () {
  const typeInput = document.querySelector(`#type`);
  const titleOutput = document.querySelector(`#title-output`);
  const adressOutput = document.querySelector(`#adress-output`);
  const minPriceOutput = document.querySelector(`#min-price`);
  const formSubmitOutput = document.querySelector(`#submit-output`);
  const timeIn = document.querySelector(`#timein`);
  const timeOut = document.querySelector(`#timeout`);
  const roomNumber = document.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);
  const adFormSubmit = document.querySelector(`.ad-form__submit`);
  const titleTextContent = {
    min: 30,
    max: 100
  };

  const minPrices = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  const adForm = document.querySelector(`.ad-form`);
  const inputAdress = adForm.querySelector(`#address`);
  const titleInput = adForm.querySelector(`#title`);
  const priceInput = adForm.querySelector(`#price`);

  adForm.action = `https://21.javascript.pages.academy/keksobooking`;
  adForm.method = `POST`;
  titleInput.required = true;
  inputAdress.readOnly = true;
  window.util.setInputAttributes(titleInput, 30, 100);
  window.util.setInputAttributes(priceInput, 0, 1000000);

  const fillPriceAttribute = function (type, input) {
    let currentPriceMessage = ``;
    input.setAttribute(`placeholder`, type);
    input.setAttribute(`min`, type);
    currentPriceMessage = `Минимальная цена ${type}`;
    minPriceOutput.value = currentPriceMessage;
    return currentPriceMessage;
  };

  const errorSubmitMessage = function (timeout, message, color) {
    setTimeout(() => {
      adFormSubmit.textContent = message;
      adFormSubmit.style.color = color;
    }, timeout);
  };
  const checkSubmitForm = function () {
    adFormSubmit.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      if (titleInput.value.length >= titleInput.min && priceInput.value.length > 0) {
        adForm.submit();
      } else {
        formSubmitOutput.textContent = `Пожалуйста, проверьте введенные данные. Ошибка отправки формы. Исправьте данные и нажмите еще раз на кнопку "Отправить".`;
        errorSubmitMessage(0, `Ошибка отправки`, `red`);
        errorSubmitMessage(2000, `Отправить повторно`, `gold`);
      }
    });
  };

  const checkRoomsAndGuestsCount = function () {
    roomNumber.addEventListener(`change`, function () {
      let guestCount = capacity.querySelectorAll(`option`);
      for (let i = 0; i < guestCount.length; i++) {
        guestCount[i].removeAttribute(`disabled`, false);
        if (roomNumber.value === `100`) {
          capacity.value = 0;
        } else {
          capacity.value = roomNumber.value;
        }
        if (guestCount[i].value === `0` || roomNumber.value < guestCount[i].value && roomNumber.value !== `100`) {
          guestCount[i].setAttribute(`disabled`, true);
        }
      }
    });
  };

  const checkInTime = function () {
    timeIn.addEventListener(`change`, function () {
      timeOut.value = timeIn.value;
      let selectOption = timeOut.querySelectorAll(`option`);
      for (let i = 0; i < selectOption.length; i++) {
        if (selectOption[i].value !== timeIn.value) {
          selectOption[i].setAttribute(`disabled`, true);
        } else {
          selectOption[i].removeAttribute(`disabled`, false);
        }
      }
    });
  };

  const setMinPrice = function () {
    typeInput.addEventListener(`change`, function () {

      switch (typeInput.value) {
        case `bungalow`:
          fillPriceAttribute(minPrices.bungalow, priceInput);
          break;
        case `flat`:
          fillPriceAttribute(minPrices.flat, priceInput);
          break;
        case `house`:
          fillPriceAttribute(minPrices.house, priceInput);
          break;
        case `palace`:
          fillPriceAttribute(minPrices.palace, priceInput);
          break;
        default:
          break;
      }
    });
  };

  const checkTitleInput = function () {
    titleInput.addEventListener(`input`, function () {
      let valueLength = titleInput.value.length;
      let currentMessage = ``;

      if (valueLength < titleTextContent.min) {

        titleInput.setCustomValidity(`Ещё ` + (titleTextContent.min - valueLength) + ` симв.`);
        currentMessage = `Ещё ` + (titleTextContent.min - valueLength) + ` симв.`;
      } else if (valueLength > titleTextContent.max) {
        titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - titleTextContent.max) + ` симв.`);
        currentMessage = `Удалите лишние ` + (valueLength - titleTextContent.max) + ` симв.`;
      } else {
        titleInput.setCustomValidity(``);
        currentMessage = `Отличный заголовок!`;
        titleOutput.style.color = `green`;
      }

      titleOutput.value = currentMessage;
    });
  };

  const inputAdressMessage = function () {
    inputAdress.addEventListener(`click`, function () {
      adressOutput.value = `Для изменения адреса передвиньте метку на карте`;
    });

    inputAdress.addEventListener(`mouseleave`, function () {
      adressOutput.value = ``;
    });
  };

  const checkTitleInputInvalid = function () {
    titleInput.addEventListener(`invalid`, function () {
      if (titleInput.validity.valueMissing) {
        titleInput.setCustomValidity(`Обязательное поле`);
      } else {
        titleInput.setCustomValidity(``);
      }
    });
  };

  window.formModule = {
    checkSubmitForm,
    checkRoomsAndGuestsCount,
    checkInTime,
    setMinPrice,
    checkTitleInput,
    inputAdressMessage,
    checkTitleInputInvalid

  };


})();
