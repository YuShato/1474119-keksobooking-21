'use strict';

const DEBOUNCE_INTERVAL = 500;

window.debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(() => {
      cb.call(null, ...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
