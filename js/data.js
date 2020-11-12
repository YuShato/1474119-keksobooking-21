'use strict';

(function () {
  const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const popupPhoto = card.querySelector(`.popup__photo`);
  const popupPhotosContainer = card.querySelector(`.popup__photos`);
  const featuresContainer = card.querySelector(`.popup__features`);
  const popupTitle = card.querySelector(`.popup__title`);
  const popupTextAdress = card.querySelector(`.popup__text--address`);
  const popupTextPrice = card.querySelector(`.popup__text--price`);
  const popupType = card.querySelector(`.popup__type`);
  const popupCapacity = card.querySelector(`.popup__text--capacity`);
  const popupTime = card.querySelector(`.popup__text--time`);
  const popupDescription = card.querySelector(`.popup__description`);
  const popupAvatar = card.querySelector(`.popup__avatar`);

  const cleanListElement = function (parentElem, childElemClass) {
    const allCreatedElements = card.querySelectorAll(childElemClass);
    for (let i = 0; i < allCreatedElements.length; i++) {
      parentElem.removeChild(allCreatedElements[i]);
    }
  };

  const fillPhotoSrc = function (elem) {
    const photosSrc = elem.offer.photos;
    window.dataModule.cleanListElement(popupPhotosContainer, `.popup__photo`);

    if (photosSrc.length > 0) {
      for (let i = 0; i < photosSrc.length; i++) {
        const newImgElem = popupPhoto.cloneNode(true);
        window.util.setAttributeData(newImgElem, `src`, photosSrc[i]);
        popupPhotosContainer.appendChild(newImgElem);
      }
    }
  };

  const getCardFeatures = function (elem) {
    const fragmentFeat = document.createDocumentFragment();
    window.dataModule.cleanListElement(featuresContainer, `.popup__feature`);

    for (let i = 0; i < elem.offer.features.length; i++) {
      let newFeatElem = document.createElement(`li`);
      newFeatElem.className = `popup__feature popup__feature--${elem.offer.features[i]}`;
      fragmentFeat.appendChild(newFeatElem);
    }
    featuresContainer.appendChild(fragmentFeat);
  };

  const translateHousingType = function (elem) {
    let typeValue = ``;
    switch (elem.offer.type) {
      case `bungalow`:
        typeValue = `Бунгало`;
        break;
      case `flat`:
        typeValue = `Квартира`;
        break;
      case `house`:
        typeValue = `Дом`;
        break;
      case `palace`:
        typeValue = `Дворец`;
    }
    return typeValue;
  };

  const setGuestsText = function (elem) {
    let guestsCount = ``;
    switch (elem.offer.guests) {
      case 0:
        guestsCount = `не для гостей`;
        break;
      case 1:
        guestsCount = `для 1 гостя`;
        break;
      default:
        guestsCount = `для ${elem.offer.guests} гостей`;
    }
    return guestsCount;
  };

  const setRoomsText = function (elem) {
    let roomsCount = ``;
    switch (elem.offer.rooms) {
      case 0:
        roomsCount = `это даже не комната `;
        break;
      case 1:
        roomsCount = `1 комната `;
        break;
      case (elem.offer.rooms > 1 && elem.offer.rooms > 5):
        roomsCount = `${elem.offer.rooms} комнаты `;
        break;
      default:
        roomsCount = `${elem.offer.rooms} комнат `;
    }
    return roomsCount;
  };

  const fillCardFromServer = function (elem) {
    popupTitle.textContent = elem.offer.title;
    popupTextAdress.textContent = elem.offer.address;
    popupTextPrice.textContent = `${elem.offer.price}₽/ночь`;
    popupType.textContent = translateHousingType(elem);
    popupCapacity.textContent = setRoomsText(elem) + setGuestsText(elem);
    popupTime.textContent = `Заезд после ${elem.offer.checkin}, выезд до ${elem.offer.checkout}`;
    popupDescription.textContent = elem.offer.description;
    window.dataModule.fillPhotoSrc(elem);
    window.dataModule.getCardFeatures(elem);

    if (elem.author.avatar !== `img/avatars/default.png`) {
      card.appendChild(popupAvatar);
      window.util.setAttributeData(popupAvatar, `src`, elem.author.avatar);
    } else {
      const currentPopupPhoto = card.querySelector(`.popup__avatar`);
      if (currentPopupPhoto) {
        card.removeChild(currentPopupPhoto);
      }
    }
  };

  window.dataModule = {
    cleanListElement,
    fillPhotoSrc,
    getCardFeatures,
    fillCardFromServer
  };
})();
