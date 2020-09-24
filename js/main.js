'use strict';
const housingCount = 8;
const xMin = 100;
const xMax = 700;
const yMin = 130;
const yMax = 630;
const yMove = 70;
const xMove = 25;
const roomMinCount = 1;
const roomMaxCount = 5;
const guestMinCount = 1;
const guestMaxCount = 6;
const minPrice = 50;
const maxPrice = 350;
const startTime = 12;
const endTime = 14;
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const similarBookingCards = document.querySelector(`#card`).content.querySelector(`.map__card`);
const newPin = templatePin.cloneNode(true);
const bookingElement = similarBookingCards.cloneNode(true);
const bookingAvatar = bookingElement.querySelector(`.popup__avatar`);
const bookingTitle = bookingElement.querySelector(`.popup__title`);
const bookingAdress = bookingElement.querySelector(`.popup__text--address`);
const bookingPrice = bookingElement.querySelector(`.popup__text--price`);
const bookingType = bookingElement.querySelector(`.popup__type`);
const bookingCapacity = bookingElement.querySelector(`.popup__text--capacity`);
const bookingTime = bookingElement.querySelector(`.popup__text--time`);
const bookingDescription = bookingElement.querySelector(`.popup__description`);
const bookingPhoto = bookingElement.querySelector(`.popup__photo`);

const objHouse = {
  "housingKind": [`Лучшее`, `Замечательное`, `Очень удобное`, `Комфортное`, `Историческое`, `Комфортабельное`, `Современное`, `Молодежное`, `Стильное`, `Модное`],
  "houseNaming": [`жилье`, `проживание`, `расположение`, `местоположение`, `бунгало`],
  "housePlacing": [`в Токио`, `в столице`, `в самом центре Токио`, `в самом центре`, `в лучшем районе`, `на самой уютной улице`, `и стильная локация`],
  "housingType": [`palace`, `flat`, `house`, `bungalow`],
  "features": [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  "photosAdresses": [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
};

const objDescription = {
  "descriptionHouse": [`Ваше проживание`, `Наш вариант`, `Эта локация`, `Ваш отпуск в Токио`, `Ваш отдых в городе`],
  "descriptionAction": [`порадует`, `заставит завести инстаграм`, `приведет в восторг`, `впечатлит`, `приятно удивит`, `вдохновит`],
  "descriptionTarget": [`даже самых избирательных`, `даже Кекса`, `самого привередливого путешественника`, `даже популярного блогера`, `любого`, `даже вашего котика`],
  "descriptionItem": [`для комфортного отдыха`, `что вам понадобится в отпуске`, `нужно для хорошего отпуска`, `чтобы чувствовать себя как дома`, `для вашего удобства`]
};

let adItem = {
  "author": {
    "avatar": ``
  },
  "offer": {
    "title": ``,
    "address": ``,
    "price": 0,
    "type": ``,
    "rooms": 0,
    "guests": 0,
    "checkin": ``,
    "checkout": ``,
    "features": ``,
    "description": ``,
    "photos": ``
  },
  "location": {
    "x": 0,
    "y": 0
  }
};

let getRandomIntNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let getRandomItem = function (myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
};

let getRandomNoRepeatNumber = function (min, max, size) {
  let values = [];
  while (values.length < size) {
    values.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return values;
};

let getImageUrl = function (min, max, size) {
  let imageNumber = getRandomNoRepeatNumber(min, max, size);
  if (imageNumber[0] < 10) {
    return `img/avatars/user0${imageNumber[0]}.png`;
  } else {
    return `img/avatars/user${imageNumber}.png`;
  }
};

let getRandomText = function (array1, array2, array3) {
  return `${getRandomItem(array1)} ${getRandomItem(array2)} ${getRandomItem(array3)}`;
};

let getCheckTime = function (min, max) {
  return `${getRandomIntNumber(min, max)}:00`;
};

let contains = function (arr, elem) {
  return arr.indexOf(elem) !== -1;
};

let getFeatures = function (myArray) {
  let featureAmount = `${getRandomIntNumber(1, myArray.length)}`;
  let featuresList = [];

  for (let i = 0; i < featureAmount; i++) {
    let newElem = `${getRandomItem(myArray)}`;
    if (contains(myArray, newElem) !== -1) {
      featuresList.push(newElem);
    }
  }
  return featuresList.join(`, `);
};

let setBookingData = function (elem, sourse) {
  elem.textContent = sourse;
};

map.classList.remove(`map--faded`);

for (let i = 0; i < housingCount; i++) {
  adItem.author.avatar = getImageUrl(1, housingCount, 1);
  adItem.offer.title = getRandomText(objHouse.housingKind, objHouse.houseNaming, objHouse.housePlacing);
  adItem.offer.adress = `(${getRandomIntNumber(xMin, xMax)}, ${getRandomIntNumber(yMin, yMax)})`;
  adItem.offer.price = `${getRandomIntNumber(minPrice, maxPrice)}`;
  adItem.offer.type = `${getRandomItem(objHouse.housingType)}`;
  adItem.offer.rooms = `${getRandomIntNumber(roomMinCount, roomMaxCount)}`;
  adItem.offer.guests = `${getRandomIntNumber(guestMinCount, guestMaxCount)}`;
  adItem.offer.checkin = `${getCheckTime(startTime, endTime)}`;
  adItem.offer.checkout = `${getCheckTime(startTime, endTime)}`;
  adItem.offer.features = `${getFeatures(objHouse.features)}`;
  adItem.offer.description = `${getRandomText(objHouse.housingKind, objHouse.houseNaming, objHouse.housePlacing)}. ${getRandomText(objDescription.descriptionHouse, objDescription.descriptionAction, objDescription.descriptionTarget)}. У нас есть все ${getRandomItem(objDescription.descriptionItem)}`;
  adItem.offer.photos = `${getRandomItem(objHouse.photosAdresses)}`;
  adItem.location.x = `${getRandomIntNumber(xMin, xMax)}`;
  adItem.location.y = `${getRandomIntNumber(yMin, yMax)}`;

  let getCapacity = function () {
    return `${adItem.offer.rooms} комнаты для ${adItem.offer.guests} гостей`;
  };

  let getGuestTime = function () {
    return `Заезд после ${adItem.offer.checkin}, выезд до ${adItem.offer.checkout}`;
  };

  map.appendChild(bookingElement);
  bookingAvatar.setAttribute(`src`, adItem.author.avatar);
  bookingPhoto.setAttribute(`src`, adItem.offer.photos);
  bookingPhoto.setAttribute(`alt`, adItem.offer.title);
  setBookingData(bookingTitle, adItem.offer.title);
  setBookingData(bookingAdress, adItem.offer.adress);
  setBookingData(bookingPrice, adItem.offer.price);
  setBookingData(bookingType, adItem.offer.type);
  setBookingData(bookingCapacity, getCapacity());
  setBookingData(bookingTime, getGuestTime());
  setBookingData(bookingDescription, adItem.offer.description);
  newPin.querySelector(`img`).setAttribute(`src`, adItem.offer.photos);
  newPin.style = `left: ${adItem.location.x + xMove}px; top: ${adItem.location.y + yMove}px`;
  mapPins.documentFragment(newPin);

}
