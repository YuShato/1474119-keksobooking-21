'use strict';
const MAX_PIN_ON_MAP = 5;

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

const filterPrices = {
  MIN: 10000,
  MAX: 50000
};

const selectValues = {
  any: `any`,
  low: `low`,
  middle: `middle`,
  hight: `hight`
};

const setFiltersStartValue = function () {
  for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].value = selectValues.any;
  }
  for (let j = 0; j < allCheckboxFilters.length; j++) {
    allCheckboxFilters[j].checked = false;
  }
};

const onKeydownEnterFeatures = function (elems, parentElem) {
  parentElem.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      for (let i = 0; i < elems.length; i++) {
        if (evt.target === elems[i]) {
          elems[i].checked = !elems[i].checked;
        }
      }
    }
  });
};

const getFeaturesFilter = function (data) {
  const checkedFilterFeatures = housingFeaturesFilter.querySelectorAll(`.map__checkbox:checked`);
  let isFeature = true;

  if (!checkedFilterFeatures.length) {
    return true;
  }

  checkedFilterFeatures.forEach(function (checkedFeature) {
    if (!data.offer.features.includes(checkedFeature.value)) {
      isFeature = false;
    }
  });
  return isFeature;
};

const applyAll = function (data) {
  return data.filter(function (item) {
    return getTypeHousing(item) &&
      getPriceFilter(item) &&
      getRoomsFilter(item) &&
      getGuestsFilter(item) &&
      getFeaturesFilter(item);
  }).slice(0, MAX_PIN_ON_MAP);
};

const getTypeHousing = function (data) {
  return (housingTypeFilter.value !== selectValues.any) ? housingTypeFilter.value === data.offer.type : true;
};

const getPriceFilter = function (data) {
  return housingPriceFilter.value === selectValues.any ||
    (housingPriceFilter.value === selectValues.low && data.offer.price < filterPrices.MIN) ||
    (housingPriceFilter.value === selectValues.middle && (data.offer.price >= filterPrices.MIN && data.offer.price <= filterPrices.MAX)) ||
    (housingPriceFilter.value === selectValues.hight && data.offer.price > filterPrices.MAX);
};

const getRoomsFilter = function (data) {
  return housingRoomsFilter.value !== selectValues.any ? +housingRoomsFilter.value === data.offer.rooms : true;
};

const getGuestsFilter = function (data) {
  return housingGuestsFilter.value !== selectValues.any ? +housingGuestsFilter.value === data.offer.guests : true;
};

const renderCardFromServerData = function (data) {
  window.DATA = data;
  const pinsData = applyAll(window.DATA);
  pinsData.forEach(function (elem, i) {
    const currentIndex = elem.id = i;
    return currentIndex;
  });

  window.map.setIdForCard(pinsData);
  window.util.debounce(window.map.addPinFromData(pinsData));
  map.classList.remove(`map--faded`);
  window.form.adForm.classList.remove(`ad-form--disabled`);
  mapFilterForm.removeEventListener(`click`, renderCardFromServerData);
  adFormResetButton.addEventListener(`click`, window.form.resetData);
};

const onFilterUpdate = function () {
  window.map.deleteAllPins();
  window.map.closeCurrentPopup();
  renderCardFromServerData(window.DATA);
};

mapFilterForm.addEventListener(`change`, window.util.debounce(onFilterUpdate));
mapFilterForm.addEventListener(`keydown`, window.util.debounce(onFilterUpdate));
onKeydownEnterFeatures(allCheckboxFilters, mapFilterForm);

window.filter = {
  applyAll,
  getTypeHousing,
  renderCardFromServerData,
  setFiltersStartValue,
  onKeydownEnterFeatures
};
