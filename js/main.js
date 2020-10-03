'use strict';

const BOOKING_AMOUNT = 8;
const PIN_HEIGHT = 70;
const PIN_WIDTH = 25;

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const renderPin = function (pin) {
  const PinElement = pinTemplate.cloneNode(true);

  PinElement.style.left = (pin.location.x - PIN_WIDTH) + `px`;
  PinElement.style.top = (pin.location.y - PIN_HEIGHT) + `px`;
  PinElement.querySelector(`img`).src = pin.author.avatar;
  PinElement.querySelector(`img`).alt = pin.offer.title;

  return PinElement;
};

const map = document.querySelector(`.map`);
const mapDomRect = map.getBoundingClientRect();

const ads = [];
const addressX = getRandomNumber(100, 1200);
const addressY = getRandomNumber(130, 630);

for (let i = 0; i < BOOKING_AMOUNT; i++) {
  let ad = {
    author: {
      avatar: `img/avatars/user0` + (i + 1) + `.png`
    },

    offer: {
      title: `text`,
      address: addressX + `, ` + addressY,
      price: `${getRandomNumber(100, 1000)}`,
      type: [`palace`, `flat`, `house`, `bungalo`],
      rooms: `${getRandomNumber(1, 10)}`,
      guests: `${getRandomNumber(1, 10)}`,
      checkin: `${getRandomNumber(12, 14)}:00`,
      checkout: `${getRandomNumber(12, 14)}:00`,
      features: `"wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"`,
      description: `text`,
      photos: `Tetx Array`
    },

    location: {
      x: getRandomNumber(0, mapDomRect.width),
      y: getRandomNumber(130, 630)
    }
  };

  ads[i] = ad;
}

map.classList.remove(`map--faded`);

const mapPinsElement = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const fragment = document.createDocumentFragment();

ads.forEach(function (item) {
  fragment.appendChild(renderPin(item));
});

mapPinsElement.appendChild(fragment);
