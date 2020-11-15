'use strict';

const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_MAIN = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;

const main = document.querySelector(`main`);
const errorMessageForm = document.querySelector(`#error`).content.querySelector(`.error`);

const StatusCode = {
  OK: 200
};

const createXhr = function (onLoad, onError, method, adress, data) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(method, adress);
  xhr.send(data);
};

const load = function (onLoad, onError) {
  createXhr(onLoad, onError, `GET`, URL_DATA, ``);
};

const save = function (data, onLoad, onError) {
  createXhr(onLoad, onError, `POST`, URL_MAIN, data);
};

const onLoadError = function () {
  const loadErrorMessage = document.createElement(`div`);
  const allErrors = document.querySelectorAll(`.on-error`);

  const onEscCloseLoad = function (evt) {
    if (evt.key === `Escape`) {
      const currentLoadErrors = document.querySelectorAll(`.on-error`);
      main.removeChild(currentLoadErrors[0]);
      document.removeEventListener(`keydown`, onEscCloseLoad);
    }
  };

  loadErrorMessage.className = `on-error`;
  loadErrorMessage.textContent = `Произошла ошибка запроса на сервер. Попробуйте перезагрузить страницу`;

  if (!allErrors.length) {
    window.util.debounce(main.appendChild(loadErrorMessage));
  }

  window.form.setDisableInputs(window.form.allMapFilters, window.form.allMapLabels, true, `none`);

  loadErrorMessage.addEventListener(`click`, function () {
    main.removeChild(loadErrorMessage);
  });

  document.addEventListener(`keydown`, onEscCloseLoad);
};

const onShowError = function (errorMessage) {
  const errorPopup = errorMessageForm.cloneNode(true);
  const currentErrorMessage = document.querySelector(`.error`);

  const tryAgainSend = function () {
    if (window.backend.save.loadType === `GET`) {
      window.backend.load(window.renders, window.util.onShowError);
    } else {
      window.backend.save(new FormData(window.form.adForm), window.form.onSendSuccess, window.backend.onShowError);
    }
  };

  const hideErrorMessageOnEscape = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      main.removeChild(currentErrorMessage);
    }
    document.removeEventListener(`keydown`, hideErrorMessageOnEscape);
  };

  errorPopup.querySelector(`.error__message`).textContent = errorMessage;
  main.insertAdjacentElement(`afterbegin`, errorPopup);
  document.addEventListener(`keydown`, hideErrorMessageOnEscape);
  currentErrorMessage.addEventListener(`click`, function (evt) {
    if (evt.target.className === `error` || evt.target.className === `error__button`) {
      main.removeChild(currentErrorMessage);
    }
  });

  window.form.adForm.addEventListener(`submit`, tryAgainSend);
};

window.backend = {
  load,
  save,
  onShowError,
  onLoadError
};
