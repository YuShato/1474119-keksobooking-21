'use strict';
(function () {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const fileChooserAvatar = document.querySelector(`.ad-form-header__upload input[type=file]`);
  const previewAvatar = document.querySelector(`.ad-form-header__preview img`);
  const fileChooserHousing = document.querySelector(`.ad-form__upload input[type=file]`);
  const previewHousing = document.querySelector(`.ad-form__photo`);

  const setPhotoAvatar = function (fileChooser, preview) {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  const createHousingImg = function (parentElem) {
    const myImg = document.createElement(`img`);
    myImg.setAttribute(`alt`, `Фотография жилья`);
    myImg.setAttribute(`height`, `100%`);
    myImg.setAttribute(`width`, `100%`);
    myImg.setAttribute(`src`, `img/muffin-grey.svg`);
    myImg.className = `housing-image`;
    myImg.style.borderRadius = `5px`;
    parentElem.appendChild(myImg);
  };

  fileChooserAvatar.addEventListener(`change`, function () {
    setPhotoAvatar(fileChooserAvatar, previewAvatar);
  });
  fileChooserHousing.addEventListener(`click`, function () {
    let allHousingImage = document.querySelectorAll(`.housing-image`);
    if (allHousingImage.length === 0) {
      createHousingImg(previewHousing);
    }
  });

  const setHousingImage = function () {
    const previewHousingImg = previewHousing.querySelector(`img`);
    setPhotoAvatar(fileChooserHousing, previewHousingImg);
    fileChooserHousing.addEventListener(`change`, setHousingImage);
  };

  fileChooserHousing.addEventListener(`change`, setHousingImage);
})();
