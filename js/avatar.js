'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const fileChooserAvatar = document.querySelector(`.ad-form-header__upload input[type=file]`);
const previewAvatar = document.querySelector(`.ad-form-header__preview img`);
const fileChooserHousing = document.querySelector(`.ad-form__upload input[type=file]`);
const previewHousing = document.querySelector(`.ad-form__photo`);
const defaultSrc = `img/muffin-grey.svg`;
const borderRadiusValue = `5px`;
const newImgClassName = `housing-image`;
const imgParamsValue = `100%`;
const imgAlt = `Фотография жилья`;

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
  myImg.alt = imgAlt;
  myImg.style.height = imgParamsValue;
  myImg.style.width = imgParamsValue;
  myImg.src = defaultSrc;
  myImg.className = newImgClassName;
  myImg.style.borderRadius = borderRadiusValue;
  parentElem.appendChild(myImg);
};

fileChooserAvatar.addEventListener(`change`, function () {
  setPhotoAvatar(fileChooserAvatar, previewAvatar);
});
fileChooserHousing.addEventListener(`click`, function () {
  const allHousingImages = document.querySelectorAll(`.housing-image`);
  if (!allHousingImages.length) {
    createHousingImg(previewHousing);
  }
});

const setHousingImage = function () {
  const previewHousingImg = previewHousing.querySelector(`img`);
  setPhotoAvatar(fileChooserHousing, previewHousingImg);
  fileChooserHousing.addEventListener(`change`, setHousingImage);
};

fileChooserHousing.addEventListener(`change`, setHousingImage);
