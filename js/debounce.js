'use strict';

(() => {

  const DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb) {
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
})();
