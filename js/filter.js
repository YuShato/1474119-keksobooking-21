'use strict';

(() => {
  const mapFilterForm = document.querySelector(`.map__filters`);
  const housingTypeFilterElement = mapFilterForm.querySelector(`#housing-type`);
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);

  const applyAll = (data) => {
    return data.filter((item) => {
      return getTypeFilter(item);
    }).slice(0, 5);
  };

  const renderCardFromServerData = function (data) {
    window.DATA = data;
    const pinsData = applyAll(window.DATA);
    pinsData.forEach((elem, i) => {
      const currentIndex = elem.id = i;
      return currentIndex;
    });
    window.mapModule.setIdForCard(pinsData);
    window.mapModule.addPinFromData(pinsData);
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    mapFilterForm.removeEventListener(`click`, renderCardFromServerData);
  };


  const getTypeFilter = (data) => {
    return (housingTypeFilterElement.value !== `any`) ? housingTypeFilterElement.value === data.offer.type : true;
  };

  housingTypeFilterElement.addEventListener(`change`, () => {
    window.mapModule.deleteAllPins();
    window.mapModule.closeCurrentPopup();
    renderCardFromServerData(window.DATA);
  });

  window.filter = {
    applyAll,
    getTypeFilter,
    renderCardFromServerData
  };
})();
