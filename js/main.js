'use strict';

const BOOKING_AMOUNT = 8;
const PIN_HEIGHT = 70;
const PIN_WIDTH = 25;
const map = document.querySelector(`.map`);
const mapDomRect = map.getBoundingClientRect();
const ads = [];
const mapPinsElement = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
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

const randomProperty = function (obj) {
  let keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
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

// task 3.2

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

mapFiltersContainer.before(card);

const fillPhotoSrc = function () {
  const photosSrc = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  setAttributeData(popupPhoto, `src`, photosSrc[0]);

  for (let i = 1; i < photosSrc.length; i++) {
    const newImgElem = popupPhoto.cloneNode(true);
    setAttributeData(newImgElem, `src`, photosSrc[i]);
    popupPhotosContainer.appendChild(newImgElem);
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

fillAdCardDescription(ads[0]);
