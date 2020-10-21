'use strict';

(function () {
  window.util = {
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    getRandomProperty(obj) {
      let keys = Object.keys(obj);
      return obj[keys[keys.length * Math.random() << 0]];
    },

    setInputAttributes(input, min, max) {
      input.required = true;
      input.setAttribute(`min`, min);
      input.setAttribute(`max`, max);
    },

    setAttributeData(elem, attribute, data) {
      elem.setAttribute(attribute, data);
    }

  };
})();
