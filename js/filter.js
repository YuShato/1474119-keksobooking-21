'use strict';

const mapFilterForm = document.querySelector(`.map__filters`);
const housingTypeFilter = mapFilterForm.querySelector(`#housing-type`);
const housingPriceFilter = mapFilterForm.querySelector(`#housing-price`);
const housingRoomsFilter = mapFilterForm.querySelector(`#housing-rooms`);
const housingGuestsFilter = mapFilterForm.querySelector(`#housing-guests`);
const housingFeaturesFilter = mapFilterForm.querySelector(`#housing-features`);
const map = document.querySelector(`.map`);
const allFilters = mapFilterForm.querySelectorAll(`.map__filter`);
const allCheckboxFilters = mapFilterForm.querySelectorAll(`.map__checkbox`);
const adFormResetButton = document.querySelector(`.ad-form__reset`);

const MAX_PIN_ON_MAP = 5;

const filterPrices = {
  MIN: 10000,
  MAX: 50000
};

const setFiltersStartValue = function () {
  for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].value = `any`;
  }
  for (let j = 0; j < allCheckboxFilters.length; j++) {
    allCheckboxFilters[j].checked = false;
  }
};

const onKeydownEnterFeatures = function (elems, parentElem) {
  parentElem.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      for (let i = 0; i < elems.length; i++) {
        if (evt.target === elems[i] && elems[i].checked === false) {
          elems[i].checked = true;
        } else if (evt.target === elems[i] && elems[i].checked === true) {
          elems[i].checked = false;
        }
      }
    }
  });
};

const getFeaturesFilter = function (data) {
  const checkedFilterFeatures = housingFeaturesFilter.querySelectorAll(`.map__checkbox:checked`);

  if (checkedFilterFeatures.length === 0) {
    return true;
  }

  let isFeature = true;

  checkedFilterFeatures.forEach(function (checkedFeature) {
    if (!data.offer.features.includes(checkedFeature.value)) {
      isFeature = false;
    }
  });

  return isFeature;
};

const applyAll = function (data) {
  return data.filter(function (item) {
    return getTypeFilter(item) &&
      getPriceFilter(item) &&
      getRoomsFilter(item) &&
      getGuestsFilter(item) &&
      getFeaturesFilter(item);
  }).slice(0, MAX_PIN_ON_MAP);
};

const getTypeFilter = function (data) {
  return (housingTypeFilter.value !== `any`) ? housingTypeFilter.value === data.offer.type : true;
};

const getPriceFilter = function (data) {
  return housingPriceFilter.value === `any` ||
    (housingPriceFilter.value === `low` && data.offer.price < filterPrices.MIN) ||
    (housingPriceFilter.value === `middle` && (data.offer.price >= filterPrices.MIN && data.offer.price <= filterPrices.MAX)) ||
    (housingPriceFilter.value === `high` && data.offer.price > filterPrices.MAX);
};

const getRoomsFilter = function (data) {
  return housingRoomsFilter.value !== `any` ? +housingRoomsFilter.value === data.offer.rooms : true;
};

const getGuestsFilter = function (data) {
  return housingGuestsFilter.value !== `any` ? +housingGuestsFilter.value === data.offer.guests : true;
};

const renderCardFromServerData = function (data) {
  window.DATA = data;
  const pinsData = applyAll(window.DATA);
  pinsData.forEach(function (elem, i) {
    const currentIndex = elem.id = i;
    return currentIndex;
  });

  window.mapModule.setIdForCard(pinsData);
  window.mapModule.addPinFromData(pinsData);
  map.classList.remove(`map--faded`);
  window.formModule.adForm.classList.remove(`ad-form--disabled`);
  mapFilterForm.removeEventListener(`click`, renderCardFromServerData);
  adFormResetButton.addEventListener(`click`, window.formModule.resetForm);
};

mapFilterForm.addEventListener(`change`, function () {
  window.mapModule.deleteAllPins();
  window.mapModule.closeCurrentPopup();
  window.debounce(renderCardFromServerData(window.DATA));
});

onKeydownEnterFeatures(allCheckboxFilters, mapFilterForm);

window.filter = {
  applyAll,
  getTypeFilter,
  renderCardFromServerData,
  setFiltersStartValue,
  onKeydownEnterFeatures
};
