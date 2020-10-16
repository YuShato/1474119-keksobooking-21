'use strict';

const BOOKING_AMOUNT = 8;
const PIN_HEIGHT = 70;
const PIN_WIDTH = 25;
const map = document.querySelector(`.map`);
const mapDomRect = map.getBoundingClientRect();
const ads = [];
const mapPinsElement = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const fragment = document.createDocumentFragment();
const mapPinMain = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const inputAdress = document.querySelector(`#address`);
const titleInput = adForm.querySelector(`#title`);
const priceInput = adForm.querySelector(`#price`);
const typeInput = adForm.querySelector(`#type`);
const titleOutput = adForm.querySelector(`#title-output`);
const adressOutput = adForm.querySelector(`#adress-output`);
const minPriceOutput = adForm.querySelector(`#min-price`);
const formSubmitOutput = adForm.querySelector(`#submit-output`);
const timeIn = adForm.querySelector(`#timein`);
const timeOut = adForm.querySelector(`#timeout`);
const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);
const adFormSubmit = adForm.querySelector(`.ad-form__submit`);
const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
const popupTitle = card.querySelector(`.popup__title`);
const popupTextAdress = card.querySelector(`.popup__text--address`);
const popupTextPrice = card.querySelector(`.popup__text--price`);
const popupType = card.querySelector(`.popup__type`);
const popupCapacity = card.querySelector(`.popup__text--capacity`);
const popupTime = card.querySelector(`.popup__text--time`);
const popupDescription = card.querySelector(`.popup__description`);
const popupPhoto = card.querySelector(`.popup__photo`);
const popupPhotosContainer = card.querySelector(`.popup__photos`);
const popupAvatar = card.querySelector(`.popup__avatar`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);
adForm.action = `https://21.javascript.pages.academy/keksobooking`;
adForm.method = `POST`;
inputAdress.required = true;
inputAdress.readOnly = true;

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

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const addressX = getRandomNumber(100, 1200);
const addressY = getRandomNumber(130, 630);

const setAttributeData = function (elem, attribute, data) {
  elem.setAttribute(attribute, data);
};

const setInputAttributes = function (input, min, max) {
  input.required = true;
  input.setAttribute(`min`, min);
  input.setAttribute(`max`, max);
};

const renderPin = function (pin) {
  const PinElement = pinTemplate.cloneNode(true);
  const PinElementImg = PinElement.querySelector(`img`);
  PinElement.style.left = `${pin.location.x - PIN_WIDTH}px`;
  PinElement.style.top = `${pin.location.y - PIN_HEIGHT}px`;
  setAttributeData(PinElementImg, `alt`, pin.offer.title);
  setAttributeData(PinElementImg, `src`, pin.author.avatar);

  return PinElement;
};

const createBooking = function (count) {
  for (let i = 0; i < count; i++) {
    let ad = {
      author: {
        avatar: `img/avatars/user0` + (i + 1) + `.png`
      },

      offer: {
        title: `Title text`,
        address: `${addressX}, ${addressY}`,
        price: `${getRandomNumber(100, 1000)}`,
        type: {
          palace: `Дворец`,
          flat: `Квартира`,
          house: `Дом`,
          bungalow: `Бунгало`
        },
        rooms: `${getRandomNumber(1, 10)}`,
        guests: `${getRandomNumber(1, 10)}`,
        checkin: `${getRandomNumber(12, 14)}:00`,
        checkout: `${getRandomNumber(12, 14)}:00`,
        features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
        description: `Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`,
        photos: `Text Array`
      },

      location: {
        x: getRandomNumber(0, mapDomRect.width),
        y: getRandomNumber(130, 630)
      }
    };

    ads[i] = ad;
  }
};

const addBookingOnMap = function (array, parentElement) {
  array.forEach(function (item) {
    parentElement.appendChild(renderPin(item));
  });
};

const randomProperty = function (obj) {
  let keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
};

const fillPriceAttribute = function (type, input) {
  let currentPriceMessage = ``;
  input.setAttribute(`placeholder`, type);
  input.setAttribute(`min`, type);
  currentPriceMessage = `Минимальная цена ${type}`;
  minPriceOutput.value = currentPriceMessage;
  return currentPriceMessage;
};

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

let setPinAdress = function (pin, input) {
  let chosenPin = getCoords(pin);
  input.value = `${chosenPin.left + PIN_WIDTH}, ${chosenPin.top + PIN_HEIGHT}`;
  return input.value;
};

function showActivePage() {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  mapPinsElement.appendChild(fragment);
}

function findButtonSide(evt) {
  if (evt.button === 0) {
    showActivePage();
    mapFiltersContainer.before(card);
    fillAdCardDescription(ads[0]);
  }
}

const fillPhotoSrc = function () {
  const photosSrc = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  setAttributeData(popupPhoto, `src`, photosSrc[0]);
  let findCreatedImg = popupPhotosContainer.querySelectorAll(`.popup__photo`);
  if (findCreatedImg.length < photosSrc.length) {
    for (let i = 1; i < photosSrc.length; i++) {
      const newImgElem = popupPhoto.cloneNode(true);
      setAttributeData(newImgElem, `src`, photosSrc[i]);
      popupPhotosContainer.appendChild(newImgElem);
    }
  }
};

const randomFeatures = function () {
  let htmlfeat = document.querySelectorAll(`.popup__feature`);

  for (let i = 0; i < htmlfeat.length; i++) {
    let itemDeleteIndex = getRandomNumber(0, htmlfeat.length - 1);
    htmlfeat[itemDeleteIndex].classList.toggle(`hidden`);
  }
};

const fillAdCardDescription = function (elem) {
  popupTitle.textContent = elem.offer.title;
  popupTextAdress.textContent = elem.offer.adress;
  popupTextPrice.textContent = `${elem.offer.price}₽/ночь`;
  popupType.textContent = randomProperty(elem.offer.type);
  popupCapacity.textContent = `${elem.offer.rooms} комнаты для ${elem.offer.guests} гостей`;
  popupTime.textContent = `Заезд после ${elem.offer.checkin}, выезд до ${elem.offer.checkout}`;
  popupDescription.textContent = elem.offer.description;
  fillPhotoSrc();
  randomFeatures();
  setAttributeData(popupAvatar, `src`, elem.author.avatar);
};

createBooking(BOOKING_AMOUNT);

addBookingOnMap(ads, fragment);

mapPinMain.addEventListener(`mousedown`, findButtonSide);

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    showActivePage();
  }
});

setInputAttributes(titleInput, 30, 100);
setInputAttributes(priceInput, 0, 1000000);


titleInput.addEventListener(`invalid`, function () {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity(`Обязательное поле`);
  } else {
    titleInput.setCustomValidity(``);
  }
});

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

inputAdress.addEventListener(`click`, function () {
  adressOutput.value = `Для изменения адреса передвиньте метку на карте`;
});

inputAdress.addEventListener(`mouseleave`, function () {
  adressOutput.value = ``;
});

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

setPinAdress(mapPinMain, inputAdress);

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

function errorSubmitMessage(timeout, message, color) {
  setTimeout(() => {
    adFormSubmit.textContent = message;
    adFormSubmit.style.color = color;
  }, timeout);
}

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