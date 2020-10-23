'use strict';

(function () {

  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomProperty = function (obj) {
    let keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
  };

  const setInputAttributes = function (input, min, max) {
    input.required = true;
    input.setAttribute(`min`, min);
    input.setAttribute(`max`, max);
  };

  const setAttributeData = function (elem, attribute, data) {
    elem.setAttribute(attribute, data);
  };

  window.util = {
    getRandomNumber,
    getRandomProperty,
    setInputAttributes,
    setAttributeData
  };
})();


// let mapPinMain = document.querySelector(`.map__pin--main`);
// let y = function (myPin) {
//   let mapBorderCoords = mapOverlay.getBoundingClientRect();
//   const findPinPosition = function (pinElem) {
//     return {
//       pinLeftPosition: pinElem.offsetLeft,
//       pinTopPosition: pinElem.offsetTop
//     };
//   };
//   let newObj = findPinPosition(myPin);
//   let posLeft = newObj.pinLeftPosition + PIN_WIDTH;
//   let posTop = newObj.pinTopPosition + PIN_HEIGHT;
//   if (posLeft > mapBorderCoords.left && posLeft < mapBorderCoords.right && posTop > mapBorderCoords.top && posTop < mapBorderCoords.bottom) {
//     console.log(`в пределах`);
//   }

// };
// y(mapPinMain);
