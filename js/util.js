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

const setDisableInputs = function (inputs, labels, isDisable, pointerEvents) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = isDisable;
  }
  for (let j = 0; j < labels.length; j++) {
    labels[j].style.pointerEvents = pointerEvents;
  }
};

window.util = {
  setInputAttributes,
  debounce,
  setDisableInputs
};
