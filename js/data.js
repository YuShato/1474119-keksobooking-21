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

  const fillCardFromServer = function (elem) {
    popupTitle.textContent = elem.offer.title;
    popupTextAdress.textContent = elem.offer.address;
    popupTextPrice.textContent = `${elem.offer.price}₽/ночь`;
    popupType.textContent = elem.offer.type;
    popupCapacity.textContent = `${elem.offer.rooms} комнаты для ${elem.offer.guests} гостей`;
    popupTime.textContent = `Заезд после ${elem.offer.checkin}, выезд до ${elem.offer.checkout}`;
    popupDescription.textContent = elem.offer.description;
    window.dataModule.fillPhotoSrc(elem);
    window.dataModule.getCardFeatures(elem);

    if (elem.author.avatar !== `img/avatars/default.png`) {
      card.appendChild(popupAvatar);
      window.util.setAttributeData(popupAvatar, `src`, elem.author.avatar);
    } else {
      card.removeChild(popupAvatar);
    }
  };

  window.dataModule = {
    cleanListElement,
    fillPhotoSrc,
    getCardFeatures,
    fillCardFromServer
  };

})();
