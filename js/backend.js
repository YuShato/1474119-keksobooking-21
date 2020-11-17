'use strict';

const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_MAIN = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;

const main = document.querySelector(`main`);
const errorMessageForm = document.querySelector(`#error`).content.querySelector(`.error`);
const formSubmitButton = document.querySelector(`.ad-form__submit`);
const allMapFilters = document.querySelectorAll(`.map__filter`);
const allMapLabels = document.querySelectorAll(`.map__feature`);
const allInputs = document.querySelectorAll(`fieldset`);
const allLabels = document.querySelectorAll(`.feature`);

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
      if (currentLoadErrors.length > 0) {
        main.removeChild(currentLoadErrors[0]);
        main.style.pointerEvents = `auto`;
      }
      document.removeEventListener(`keydown`, onEscCloseLoad);
    }
  };

  loadErrorMessage.className = `on-error`;
  loadErrorMessage.textContent = `Произошла ошибка запроса на сервер. Попробуйте перезагрузить страницу`;

  if (allErrors.length === 0) {
    window.util.debounce(main.appendChild(loadErrorMessage));
    window.util.setDisableInputs(allMapFilters, allMapLabels, true, `none`);
    window.util.setDisableInputs(allInputs, allLabels, true, `none`);
  }

  loadErrorMessage.addEventListener(`click`, function () {
    main.style.pointerEvents = `auto`;
    main.removeChild(loadErrorMessage);
  });

  document.addEventListener(`keydown`, onEscCloseLoad);
};

const onShowError = function (errorMessage) {
  const errorPopup = errorMessageForm.cloneNode(true);

  const tryAgainSend = function () {
    if (window.backend.save.loadType === `GET`) {
      window.backend.load(window.renders, window.backend.onShowError);
    } else {
      window.backend.save(new FormData(window.form.adForm), window.form.onSendSuccess, window.backend.onShowError);
    }
  };

  const cleanAllErrors = function () {
    const currentErrorMessages = document.querySelectorAll(`.error`);
    for (let i = 0; i < currentErrorMessages.length; i++) {
      main.removeChild(currentErrorMessages[i]);
    }
    formSubmitButton.addEventListener(`click`, window.util.debounce(tryAgainSend));
  };

  const checkExistErrors = function () {
    const existErrors = document.querySelectorAll(`.error`);
    if (!existErrors.length) {
      main.appendChild(errorPopup);
    }
  };

  const hideErrorMessageOnEscape = function (evt) {
    if (evt.key === `Escape`) {
      cleanAllErrors();
    }
    document.removeEventListener(`keydown`, hideErrorMessageOnEscape);
  };

  errorPopup.querySelector(`.error__message`).textContent = errorMessage;
  checkExistErrors();

  document.addEventListener(`keydown`, hideErrorMessageOnEscape);
  document.addEventListener(`click`, function (evt) {
    if (evt.target.className === `error` || evt.target.className === `error__button`) {
      cleanAllErrors();
    }
  });

  window.form.adForm.addEventListener(`submit`, window.util.debounce(tryAgainSend));
};

window.backend = {
  load,
  save,
  onShowError,
  onLoadError
};
