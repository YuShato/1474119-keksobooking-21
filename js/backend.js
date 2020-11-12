'use strict';
(function () {
  const errorMessageForm = document.querySelector(`#error`).content.querySelector(`.error`);
  const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  const StatusCode = {
    OK: 200
  };

  const TIMEOUT_IN_MS = 10000;

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
    createXhr(onLoad, onError, `POST`, URL, data);
  };

  const onLoadError = function () {
    const loadErrorMessage = document.createElement(`div`);
    loadErrorMessage.textContent = `Произошла ошибка запроса на сервер. Попробуйте перезагрузить страницу`;
    loadErrorMessage.style =
      `background-color: rgba(255, 86, 53, 0.7);
      z-index: 100; position: absolute;
      top: 20%;
      width: 33%;
      height: 200px;
      margin-left: 20%;
      color: white;
      font-size: 30px;
      text-align: center;
      padding: 25px;
      tabindex = 0;`;
    document.body.appendChild(loadErrorMessage);

    const onEscCloseLoad = function (evt) {
      if (evt.key === `Escape`) {
        document.body.removeChild(loadErrorMessage);
        document.removeEventListener(`keydown`, onEscCloseLoad);
      }
    };

    loadErrorMessage.addEventListener(`click`, function () {
      document.body.removeChild(loadErrorMessage);
    });

    document.addEventListener(`keydown`, onEscCloseLoad);
  };

  const onShowError = function (errorMessage) {
    const errorPopup = errorMessageForm.cloneNode(true);

    const tryAgainSend = function () {
      if (window.backend.save.loadType === `GET`) {
        window.backend.load(window.renderPins, window.util.onShowError);
      } else {
        window.backend.save(new FormData(window.formModule.adForm), window.formModule.onFormSendSuccess, window.backend.onShowError);
      }
    };

    errorPopup.querySelector(`.error__message`).textContent = errorMessage;
    errorPopup.style = `z-index: 100;`;

    document.body.insertAdjacentElement(`afterbegin`, errorPopup);

    let currentErrorMessage = document.querySelector(`.error`);
    const hideErrorMessageOnEscape = function (evt) {

      if (evt.key === `Escape`) {
        evt.preventDefault();
        document.body.removeChild(currentErrorMessage);
      }
      document.removeEventListener(`keydown`, hideErrorMessageOnEscape);
    };

    document.addEventListener(`keydown`, hideErrorMessageOnEscape);
    currentErrorMessage.addEventListener(`click`, function (evt) {
      if (evt.target.className === `error` || evt.target.className === `error__button`) {
        document.body.removeChild(currentErrorMessage);
      }
    });

    window.formModule.adForm.addEventListener(`submit`, tryAgainSend);
  };

  window.backend = {
    load,
    save,
    onShowError,
    onLoadError
  };
})();
