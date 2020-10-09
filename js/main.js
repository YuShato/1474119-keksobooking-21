'use strict';

const BOOKING_AMOUNT = 8;
const PIN_HEIGHT = 70;
const PIN_WIDTH = 25;
const map = document.querySelector(`.map`);
const mapDomRect = map.getBoundingClientRect();
const ads = [];
const mapPinsElement = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const card = document.querySelector(`#card`).content.querySelector(`.popup`);
const fragment = document.createDocumentFragment();
// const newCardFragment = document.createDocumentFragment();
// const addContainerHere = document.querySelector(`.map__filters-container`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const inputAdress = document.querySelector(`#address`);
// const adFormLabel = document.querySelector(`.ad-form-header__drop-zone`);
const titleInput = adForm.querySelector(`#title`);
const priceInput = adForm.querySelector(`#price`);
const typeInput = adForm.querySelector(`#type`);
const titleOutput = adForm.querySelector(`#title-output`);
const adressOutput = adForm.querySelector(`#adress-output`);
const minPriceOutput = adForm.querySelector(`#min-price`);
const timeIn = adForm.querySelector(`#timein`);
const timeOut = adForm.querySelector(`#timeout`);
const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);

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
        title: `text`,
        address: `${addressX}, ${addressY}`,
        price: `${getRandomNumber(100, 1000)}`,
        type: [`palace`, `flat`, `house`, `bungalow`],
        rooms: `${getRandomNumber(1, 10)}`,
        guests: `${getRandomNumber(1, 10)}`,
        checkin: `${getRandomNumber(12, 14)}:00`,
        checkout: `${getRandomNumber(12, 14)}:00`,
        features: `"wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"`,
        description: `text`,
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
  if (evt.which === 1) {
    showActivePage();
  }
}

createBooking(BOOKING_AMOUNT);

addBookingOnMap(ads, fragment);

mapPinMain.addEventListener(`mousedown`, findButtonSide);

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    showActivePage();
  }
});

// adFormLabel.addEventListener(`click`, function (evt) {
//   let adFormPhoto = document.querySelector(`.ad-form-header__preview-photo`);
//   // здесь будет функция, меняющая src изображения. Но я не знаю, как ее написать
// });

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
  let selectOption = timeOut.getElementsByTagName(`option`);
  for (let i = 0; i < selectOption.length; i++) {
    if (selectOption[i].value !== timeIn.value) {
      selectOption[i].setAttribute(`disabled`, true);
    } else {
      selectOption[i].removeAttribute(`disabled`, false);
    }
  }
});


roomNumber.addEventListener(`change`, function () {
  let guestCount = capacity.getElementsByTagName(`option`);
  for (let i = 0; i < guestCount.length; i++) {
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
