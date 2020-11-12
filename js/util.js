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
