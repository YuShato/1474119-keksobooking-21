'use strict';

const DEBOUNCE_INTERVAL = 500;

const setInputAttributes = function (input, min, max) {
  input.required = true;
  input.min = min;
  input.max = max;
};

const debounce = function (cb) {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(function () {
      cb.call(null, ...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.util = {
  setInputAttributes,
  debounce
};
