'use strict';

(function () {
  const errorMessageForm = document.querySelector(`#error`).content.querySelector(`.error`);
  const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const StatusCode = {
    OK: 200
  };
  // const TIMEOUT_IN_MS = 1;
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

  const onShowError = (errorMessage) => {
    const errorPopup = errorMessageForm.cloneNode(true);

    const hideErrorPopup = function () {
      window.pinModule.returnMainPinPosition();
      document.body.removeChild(errorPopup);
    };
    errorPopup.querySelector(`.error__message`).textContent = errorMessage;
    errorPopup.style = `z-index: 100;`;
    document.body.insertAdjacentElement(`afterbegin`, errorPopup);
    const errorButton = errorPopup.querySelector(`.error__button`);
    errorButton.addEventListener(`click`, hideErrorPopup);
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        hideErrorPopup();
      }
    });
    window.formModule.hideUserMessageOnEscape(errorButton, errorPopup);
  };


  window.backend = {
    load,
    save,
    onShowError
  };


})();
