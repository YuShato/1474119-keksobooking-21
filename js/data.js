'use strict';

(function () {
  const addressX = window.util.getRandomNumber(100, 1200);
  const addressY = window.util.getRandomNumber(130, 630);
  const map = document.querySelector(`.map`);
  const mapDomRect = map.getBoundingClientRect();
  const mapPins = document.querySelector(`.map__pins`);
  const ads = [];

  const createBooking = function (count) {
    for (let i = 0; i < count; i++) {
      let ad = {
        author: {
          avatar: `img/avatars/user0` + (i + 1) + `.png`
        },

        offer: {
          title: `Title text`,
          address: `${addressX}, ${addressY}`,
          price: `${window.util.getRandomNumber(100, 1000)}`,
          type: {
            palace: `Дворец`,
            flat: `Квартира`,
            house: `Дом`,
            bungalow: `Бунгало`
          },
          rooms: `${window.util.getRandomNumber(1, 10)}`,
          guests: `${window.util.getRandomNumber(1, 10)}`,
          checkin: `${window.util.getRandomNumber(12, 14)}:00`,
          checkout: `${window.util.getRandomNumber(12, 14)}:00`,
          features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
          description: `Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`,
          photos: `Text Array`
        },

        location: {
          x: window.util.getRandomNumber(0, mapDomRect.width),
          y: window.util.getRandomNumber(130, 630)
        }
      };

      ads[i] = ad;
    }
  };

  const randomFeatures = function () {
    let htmlfeat = document.querySelectorAll(`.popup__feature`);

    for (let i = 0; i < htmlfeat.length; i++) {
      let itemDeleteIndex = window.util.getRandomNumber(0, htmlfeat.length - 1);
      htmlfeat[itemDeleteIndex].classList.toggle(`hidden`);
    }
  };

  const addPinsInfo = function () {
    mapPins.addEventListener(`click`, function (evt) {
      if (evt.target.className === `map__pin`) {
        let pins = document.querySelectorAll(`.map__pin`);
        for (let i = 1; i < pins.length; i++) {
          if (pins[i] === evt.target) {
            window.popupModule.openCardInfo(i);
          }
        }
      }
    });
  };

  window.dataModule = {
    ads,
    addPinsInfo,
    randomFeatures,
    createBooking
  };

})();
