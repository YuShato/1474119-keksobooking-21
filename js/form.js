'use strict';

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
const successMessageForm = document.querySelector(`#success`).content.querySelector(`.success`);
const adForm = document.querySelector(`.ad-form`);
const inputAdress = adForm.querySelector(`#address`);
const titleInput = adForm.querySelector(`#title`);
const priceInput = adForm.querySelector(`#price`);
const allInputs = adForm.querySelectorAll(`fieldset`);
const allLabels = adForm.querySelectorAll(`.feature`);
const mapFilterForm = document.querySelector(`.map__filters`);
const allMapFilters = mapFilterForm.querySelectorAll(`.map__filter`);
const allMapLabels = mapFilterForm.querySelectorAll(`.map__feature`);
const adFormResetButton = adForm.querySelector(`.ad-form__reset`);
const allFormFeatures = document.querySelectorAll(`.feature__checkbox`);

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

const guests = {
  min: `0`,
  max: `100`
};

const typeValues = {
  bungalow: `bungalow`,
  flat: `flat`,
  house: `house`,
  palace: `palace`
};

adForm.action = `https://21.javascript.pages.academy/keksobooking`;
adForm.method = `POST`;
titleInput.required = true;
inputAdress.readOnly = true;
window.util.setInputAttributes(titleInput, 30, 100);
window.util.setInputAttributes(priceInput, 0, 1000000);

const fillPriceAttribute = function (type, input) {
  let currentPriceMessage = ``;
  input.placeholder = type;
  input.min = type;
  currentPriceMessage = `Минимальная цена ${type}`;
  minPriceOutput.value = currentPriceMessage;
  return currentPriceMessage;
};

const errorSubmitMessage = function (timeout, message, color) {
  setTimeout(function () {
    adFormSubmit.textContent = message;
    adFormSubmit.style.color = color;
  }, timeout);
};

const checkSubmitForm = function (evt) {
  evt.preventDefault();
  if (titleInput.value.length >= titleInput.min && priceInput.value.length > 0) {
    formSubmitOutput.textContent = `Форма объявления заполнена верно`;
  } else {
    formSubmitOutput.textContent = `Пожалуйста, проверьте введенные данные. Ошибка отправки формы. Исправьте данные и нажмите еще раз на кнопку "Отправить".`;
    errorSubmitMessage(0, `Ошибка отправки`, `red`);
    errorSubmitMessage(2000, `Отправить повторно`, `gold`);
  }
};

const checkRoomsAndGuestsCount = function () {
  const checkRoomNumber = function () {
    const guestCount = capacity.querySelectorAll(`option`);
    for (let i = 0; i < guestCount.length; i++) {
      guestCount[i].removeAttribute(`disabled`, false);
      if (roomNumber.value === guests.max) {
        capacity.value = 0;
      } else {
        capacity.value = roomNumber.value;
      }
      if (guestCount[i].value === guests.min || roomNumber.value < guestCount[i].value && roomNumber.value !== guests.max) {
        guestCount[i].setAttribute(`disabled`, true);
      }
    }
  };
  roomNumber.addEventListener(`change`, checkRoomNumber);
  capacity.addEventListener(`change`, checkRoomNumber);
};

const compareTime = function () {
  timeOut.value = timeIn.value;
  const selectOption = timeOut.querySelectorAll(`option`);
  for (let i = 0; i < selectOption.length; i++) {
    if (selectOption[i].value !== timeIn.value) {
      selectOption[i].setAttribute(`disabled`, true);
    } else {
      selectOption[i].removeAttribute(`disabled`, false);
    }
  }
};

const onTimeChange = function () {
  timeIn.addEventListener(`change`, compareTime);
  timeOut.addEventListener(`change`, compareTime);
};

const setMinPrice = function () {
  const checkPriceInput = function () {

    switch (typeInput.value) {
      case typeValues.bungalow:
        fillPriceAttribute(minPrices.bungalow, priceInput);
        break;
      case typeValues.flat:
        fillPriceAttribute(minPrices.flat, priceInput);
        break;
      case typeValues.house:
        fillPriceAttribute(minPrices.house, priceInput);
        break;
      case typeValues.palace:
        fillPriceAttribute(minPrices.palace, priceInput);
        break;
      default:
        break;
    }
  };

  typeInput.addEventListener(`change`, checkPriceInput);
  priceInput.addEventListener(`input`, checkPriceInput);
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

const deleteUploadPhotos = function () {
  const imgUploads = adForm.querySelectorAll(`img`);
  for (let i = 0; i < imgUploads.length; i++) {
    imgUploads[i].src = `img/muffin-grey.svg`;
  }
};

const clearForm = function () {
  adForm.reset();
  window.map.deleteAllPins();
  window.map.closeCurrentPopup();
  window.pin.getPosition();
  window.filter.setFiltersStartValue();
  deleteUploadPhotos();
  document.querySelector(`.map`).classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  setDisableInputs(allInputs, allLabels, true, `none`);
};

const hideMessage = function (message) {
  document.body.removeChild(message);
};
const hideUserMessageOnEscape = function (target, message) {
  target.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideMessage(message);
    }
  });
};

const setDisableInputs = function (inputs, labels, isDisable, pointerEvents) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = isDisable;
  }
  for (let j = 0; j < labels.length; j++) {
    labels[j].style = `pointer-events: ${pointerEvents}`;
  }
};

const onSendSuccess = function () {
  const successPopup = successMessageForm.cloneNode(true);
  successPopup.style = `z-index: 1200;`;
  document.body.insertAdjacentElement(`afterbegin`, successPopup);
  clearForm();
  adFormSubmit.removeEventListener(`click`, checkSubmitForm);
  document.addEventListener(`click`, function (evt) {
    if (evt.target === successPopup) {
      hideMessage(successPopup);
    }
  });
  hideUserMessageOnEscape(document, successPopup);
  window.form.setDisableInputs(allMapFilters, allMapLabels, true, `none`);
  adFormResetButton.removeEventListener(`click`, resetData);
};

const onEnterSubmitForm = function () {
  adFormSubmit.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      checkSubmitForm();
    }
  });
};

const onSubmit = function (evt) {
  evt.preventDefault();
  adFormSubmit.addEventListener(`click`, checkSubmitForm);
  onEnterSubmitForm();
  window.backend.save(new FormData(adForm), onSendSuccess, window.backend.onShowError);
};

const resetData = function (evt) {
  evt.preventDefault();
  clearForm();
};

adForm.addEventListener(`submit`, onSubmit);
adFormResetButton.addEventListener(`click`, resetData);
adFormResetButton.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    resetData();
  }
});

window.filter.onKeydownEnterFeatures(allFormFeatures, adForm);

window.form = {
  checkRoomsAndGuestsCount,
  onTimeChange,
  setMinPrice,
  checkTitleInput,
  inputAdressMessage,
  checkTitleInputInvalid,
  adForm,
  onSendSuccess,
  inputAdress,
  setDisableInputs,
  hideUserMessageOnEscape,
  onSubmit,
  resetData,
  allMapFilters,
  allMapLabels
};
