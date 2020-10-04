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
        type: [`palace`, `flat`, `house`, `bungalo`],
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

createBooking(BOOKING_AMOUNT);

map.classList.remove(`map--faded`);

addBookingOnMap(ads, fragment);

mapPinsElement.appendChild(fragment);
