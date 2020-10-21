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

  window.formModule = {
    inputAdress: document.querySelector(`#address`),
    adForm: document.querySelector(`.ad-form`),
    titleInput: document.querySelector(`#title`),
    priceInput: document.querySelector(`#price`),

    fillPriceAttribute(type, input) {
      let currentPriceMessage = ``;
      input.setAttribute(`placeholder`, type);
      input.setAttribute(`min`, type);
      currentPriceMessage = `Минимальная цена ${type}`;
      minPriceOutput.value = currentPriceMessage;
      return currentPriceMessage;
    },

    errorSubmitMessage(timeout, message, color) {
      setTimeout(() => {
        adFormSubmit.textContent = message;
        adFormSubmit.style.color = color;
      }, timeout);
    },
    checkSubmitForm() {
      adFormSubmit.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        if (window.formModule.titleInput.value.length >= window.formModule.titleInput.min && window.formModule.priceInput.value.length > 0) {
          window.formModule.adForm.submit();
        } else {
          formSubmitOutput.textContent = `Пожалуйста, проверьте введенные данные. Ошибка отправки формы. Исправьте данные и нажмите еще раз на кнопку "Отправить".`;
          window.formModule.errorSubmitMessage(0, `Ошибка отправки`, `red`);
          window.formModule.errorSubmitMessage(2000, `Отправить повторно`, `gold`);
        }
      });
    },

    checkRoomsAndGuestsCount() {
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
    },

    checkInTime() {
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
    },

    setMinPrice() {
      typeInput.addEventListener(`change`, function () {

        switch (typeInput.value) {
          case `bungalow`:
            window.formModule.fillPriceAttribute(minPrices.bungalow, window.formModule.priceInput);
            break;
          case `flat`:
            window.formModule.fillPriceAttribute(minPrices.flat, window.formModule.priceInput);
            break;
          case `house`:
            window.formModule.fillPriceAttribute(minPrices.house, window.formModule.priceInput);
            break;
          case `palace`:
            window.formModule.fillPriceAttribute(minPrices.palace, window.formModule.priceInput);
            break;
          default:
            break;
        }
      });
    },

    checkTitleInput() {
      window.formModule.titleInput.addEventListener(`input`, function () {
        let valueLength = window.formModule.titleInput.value.length;
        let currentMessage = ``;

        if (valueLength < titleTextContent.min) {

          window.formModule.titleInput.setCustomValidity(`Ещё ` + (titleTextContent.min - valueLength) + ` симв.`);
          currentMessage = `Ещё ` + (titleTextContent.min - valueLength) + ` симв.`;
        } else if (valueLength > titleTextContent.max) {
          window.formModule.titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - titleTextContent.max) + ` симв.`);
          currentMessage = `Удалите лишние ` + (valueLength - titleTextContent.max) + ` симв.`;
        } else {
          window.formModule.titleInput.setCustomValidity(``);
          currentMessage = `Отличный заголовок!`;
          titleOutput.style.color = `green`;
        }

        titleOutput.value = currentMessage;
      });
    },

    inputAdressMessage() {
      window.formModule.inputAdress.addEventListener(`click`, function () {
        adressOutput.value = `Для изменения адреса передвиньте метку на карте`;
      });

      window.formModule.inputAdress.addEventListener(`mouseleave`, function () {
        adressOutput.value = ``;
      });
    },

    checkTitleInputInvalid() {
      window.formModule.titleInput.addEventListener(`invalid`, function () {
        if (window.formModule.titleInput.validity.valueMissing) {
          window.formModule.titleInput.setCustomValidity(`Обязательное поле`);
        } else {
          window.formModule.titleInput.setCustomValidity(``);
        }
      });
    }

  };

  window.formModule.adForm.action = `https://21.javascript.pages.academy/keksobooking`;
  window.formModule.adForm.method = `POST`;
  window.formModule.titleInput.required = true;
  window.formModule.inputAdress.readOnly = true;
})();
