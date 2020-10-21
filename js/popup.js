'use strict';

(function () {
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
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const mapPins = document.querySelector(`.map__pins`);

  window.popupModule = {
    fillPhotoSrc() {
      const photosSrc = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
      window.util.setAttributeData(popupPhoto, `src`, photosSrc[0]);
      let findCreatedImg = popupPhotosContainer.querySelectorAll(`.popup__photo`);
      if (findCreatedImg.length < photosSrc.length) {
        for (let i = 1; i < photosSrc.length; i++) {
          const newImgElem = popupPhoto.cloneNode(true);
          window.util.setAttributeData(newImgElem, `src`, photosSrc[i]);
          popupPhotosContainer.appendChild(newImgElem);
        }
      }
    },

    fillAdCardDescription(elem) {
      popupTitle.textContent = elem.offer.title;
      popupTextAdress.textContent = elem.offer.adress;
      popupTextPrice.textContent = `${elem.offer.price}₽/ночь`;
      popupType.textContent = window.util.getRandomProperty(elem.offer.type);
      popupCapacity.textContent = `${elem.offer.rooms} комнаты для ${elem.offer.guests} гостей`;
      popupTime.textContent = `Заезд после ${elem.offer.checkin}, выезд до ${elem.offer.checkout}`;
      popupDescription.textContent = elem.offer.description;
      window.popupModule.fillPhotoSrc();
      window.dataModule.randomFeatures();
      window.util.setAttributeData(popupAvatar, `src`, elem.author.avatar);
    },

    popupClose() {
      let currentCard = document.querySelector(`.map__card`);
      currentCard.classList.remove(`visually-hidden`);
      let buttonClose = document.querySelector(`.popup__close`);
      buttonClose.addEventListener(`click`, function () {
        currentCard.classList.add(`visually-hidden`);
      });
    },

    openCardInfo(currentIndex) {
      window.popupModule.fillAdCardDescription(window.dataModule.ads[currentIndex - 1]);
      mapFiltersContainer.before(card);
      window.popupModule.popupClose();
    },

    closeCardEscButton() {
      mapPins.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          const currentCard = document.querySelector(`.map__card`);
          currentCard.classList.add(`visually-hidden`);
        }
      });
    }
  };
})();
