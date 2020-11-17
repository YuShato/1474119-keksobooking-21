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
const main = document.querySelector(`main`);

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
      guestCount[i].disabled = false;
      if (roomNumber.value === guests.max) {
        capacity.value = 0;
      } else {
        capacity.value = roomNumber.value;
      }
      if (guestCount[i].value === guests.min || roomNumber.value < guestCount[i].value && roomNumber.value !== guests.max) {
        guestCount[i].disabled = true;
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
      selectOption[i].disabled = true;
    } else {
      selectOption[i].disabled = false;
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
  window.util.setDisableInputs(allInputs, allLabels, true, `none`);
};

const hideMessage = function (message) {
  main.removeChild(message);
};

const onSendSuccess = function () {
  const successPopup = successMessageForm.cloneNode(true);
  main.appendChild(successPopup);
  clearForm();
  adFormSubmit.removeEventListener(`click`, checkSubmitForm);

  document.addEventListener(`click`, function (evt) {
    if (evt.target === successPopup) {
      hideMessage(successPopup);
    }
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      const allUserMessages = document.querySelectorAll(`.success`);
      if (allUserMessages.length > 0) {
        main.removeChild(allUserMessages[0]);
      }
    }
  });
  window.util.setDisableInputs(allMapFilters, allMapLabels, true, `none`);
  adFormResetButton.removeEventListener(`click`, resetData);
};

const onSubmit = function (evt) {
  evt.preventDefault();
  adFormSubmit.addEventListener(`click`, checkSubmitForm);
  window.util.debounce(window.backend.save(new FormData(adForm), onSendSuccess, window.backend.onShowError));
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
  onSubmit,
  resetData,
  allMapFilters,
  allMapLabels
};
