(()=>{"use strict";window.util={setInputAttributes:function(e,t,n){e.required=!0,e.min=t,e.max=n},debounce:function(e){let t=null;return function(...n){t&&clearTimeout(t),t=setTimeout((function(){e.call(null,...n)}),500)}}},(()=>{const e=document.querySelector("main"),t=document.querySelector("#error").content.querySelector(".error"),n=function(e,t,n,o,r){const i=new XMLHttpRequest;i.responseType="json",i.addEventListener("load",(function(){200===i.status?e(i.response):t("Статус ответа: "+i.status+" "+i.statusText)})),i.addEventListener("error",(function(){t("Произошла ошибка соединения")})),i.addEventListener("timeout",(function(){t("Запрос не успел выполниться за "+i.timeout+"мс")})),i.timeout=1e4,i.open(n,o),i.send(r)};window.backend={load:function(e,t){n(e,t,"GET","https://21.javascript.pages.academy/keksobooking/data","")},save:function(e,t,o){n(t,o,"POST","https://21.javascript.pages.academy/keksobooking",e)},onShowError:function(n){const o=t.cloneNode(!0),r=document.querySelector(".error"),i=function(t){"Escape"===t.key&&(t.preventDefault(),e.removeChild(r)),document.removeEventListener("keydown",i)};o.querySelector(".error__message").textContent=n,e.insertAdjacentElement("afterbegin",o),document.addEventListener("keydown",i),r.addEventListener("click",(function(t){"error"!==t.target.className&&"error__button"!==t.target.className||e.removeChild(r)})),window.form.adForm.addEventListener("submit",(function(){"GET"===window.backend.save.loadType?window.backend.load(window.renders,window.util.onShowError):window.backend.save(new FormData(window.form.adForm),window.form.onSendSuccess,window.backend.onShowError)}))},onLoadError:function(){const t=document.createElement("div"),n=document.querySelectorAll(".on-error"),o=function(t){if("Escape"===t.key){const t=document.querySelectorAll(".on-error");e.removeChild(t[0]),document.removeEventListener("keydown",o)}};t.className="on-error",t.textContent="Произошла ошибка запроса на сервер. Попробуйте перезагрузить страницу",n.length||window.util.debounce(e.appendChild(t)),window.form.setDisableInputs(window.form.allMapFilters,window.form.allMapLabels,!0,"none"),t.addEventListener("click",(function(){e.removeChild(t)})),document.addEventListener("keydown",o)}}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=e.querySelector(".popup__photo"),n=e.querySelector(".popup__photos"),o=e.querySelector(".popup__features"),r=e.querySelector(".popup__title"),i=e.querySelector(".popup__text--address"),c=e.querySelector(".popup__text--price"),u=e.querySelector(".popup__type"),a=e.querySelector(".popup__text--capacity"),l=e.querySelector(".popup__text--time"),d=e.querySelector(".popup__description"),s=e.querySelector(".popup__avatar"),f="Бунгало",m="Квартира",p="Дом",w="Дворец";window.data={cleanListElement:function(t,n){const o=e.querySelectorAll(n);for(let e=0;e<o.length;e++)t.removeChild(o[e])},fillPhotoSrc:function(e){const o=e.offer.photos;if(window.data.cleanListElement(n,".popup__photo"),o.length>0)for(let e=0;e<o.length;e++){const r=t.cloneNode(!0);r.src=o[e],n.appendChild(r)}},getCardFeatures:function(e){const t=document.createDocumentFragment();window.data.cleanListElement(o,".popup__feature");for(let n=0;n<e.offer.features.length;n++){let o=document.createElement("li");o.className="popup__feature popup__feature--"+e.offer.features[n],t.appendChild(o)}o.appendChild(t)},fillCardFromServer:function(t){if(r.textContent=t.offer.title,i.textContent=t.offer.address,c.textContent=t.offer.price+"₽/ночь",u.textContent=function(e){let t="";switch(e.offer.type){case"bungalow":t=f;break;case"flat":t=m;break;case"house":t=p;break;case"palace":t=w}return t}(t),a.textContent=function(e){let t="";switch(e.offer.rooms){case 0:t="это даже не комната ";break;case 1:t="1 комната ";break;case e.offer.rooms>1&&e.offer.rooms>5:t=e.offer.rooms+" комнаты ";break;default:t=e.offer.rooms+" комнат "}return t}(t)+function(e){let t="";switch(e.offer.guests){case 0:t="не для гостей";break;case 1:t="для 1 гостя";break;default:t=`для ${e.offer.guests} гостей`}return t}(t),l.textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,d.textContent=t.offer.description,window.data.fillPhotoSrc(t),window.data.getCardFeatures(t),"img/avatars/default.png"!==t.author.avatar)e.appendChild(s),s.src=t.author.avatar;else{const t=e.querySelector(".popup__avatar");t&&e.removeChild(t)}}}})(),(()=>{const e=document.querySelector(".map__pins"),t=document.createDocumentFragment(),n=document.querySelector("#card").content.querySelector(".map__card"),o=document.querySelector(".map__filters-container"),r=document.querySelector(".map__filters"),i=document.querySelectorAll("fieldset"),c=document.querySelectorAll(".feature"),u=r.querySelectorAll(".map__filter"),a=r.querySelectorAll(".map__feature"),l=document.querySelector(".map__pin--main"),d=document.querySelector("#address"),s=function(e,t){if(t.length>0)for(let n=0;n<t.length;n++)e.removeChild(t[n])},f=function(){document.querySelectorAll(".map__pin:not(.map__pin--main)").length||(window.backend.load(window.filter.renderCardFromServerData,window.backend.onLoadError),window.pin.setAdress(l,d)),window.form.setDisableInputs(i,c,!1,"auto"),window.form.setDisableInputs(u,a,!1,"auto")};window.map={showActivePage:f,findButtonSide:function(e){e.button||f()},fragment:t,removeCreatedElements:s,BOOKING_AMOUNT:5,pinsButtons:e,deleteAllPins:function(){const e=document.querySelectorAll(".map__pin:not(.map__pin--main)");e.length>0&&s(window.map.pinsButtons,e)},closeCurrentPopup:function(){const e=document.querySelectorAll(".map__card");e.length>0&&e[0].classList.add("visually-hidden")},addPinFromData:function(n){for(let e=0;e<n.length;e++)t.appendChild(window.pin.render(n[e]));window.util.debounce(e.appendChild(t))},setIdForCard:function(t){const i=function(e){if("map__pin"===e.target.className){let r=Number(e.target.dataset.id);if(r>=0){const e=t.find((function(e){return e.id===r}));window.data.fillCardFromServer(e),o.before(n),window.popupModule.closeCardInfo()}}};r.addEventListener("change",(function(){e.removeEventListener("click",i)})),e.addEventListener("click",i),r.removeEventListener("change",(function(){e.removeEventListener("click",i)}))}}})(),(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),n=e.querySelector("#housing-price"),o=e.querySelector("#housing-rooms"),r=e.querySelector("#housing-guests"),i=e.querySelector("#housing-features"),c=document.querySelector(".map"),u=e.querySelectorAll(".map__filter"),a=e.querySelectorAll(".map__checkbox"),l=document.querySelector(".ad-form__reset"),d="any",s="low",f="middle",m="hight",p=function(e,t){t.addEventListener("keydown",(function(t){if("Enter"===t.key)for(let n=0;n<e.length;n++)t.target===e[n]&&(e[n].checked=!e[n].checked)}))},w=function(e){return e.filter((function(e){return y(e)&&v(e)&&h(e)&&S(e)&&function(e){const t=i.querySelectorAll(".map__checkbox:checked");let n=!0;return!t.length||(t.forEach((function(t){e.offer.features.includes(t.value)||(n=!1)})),n)}(e)})).slice(0,5)},y=function(e){return t.value===d||t.value===e.offer.type},v=function(e){return n.value===d||n.value===s&&e.offer.price<1e4||n.value===f&&e.offer.price>=1e4&&e.offer.price<=5e4||n.value===m&&e.offer.price>5e4},h=function(e){return o.value===d||+o.value===e.offer.rooms},S=function(e){return r.value===d||+r.value===e.offer.guests},_=function(t){window.DATA=t;const n=w(window.DATA);n.forEach((function(e,t){return e.id=t})),window.map.setIdForCard(n),window.util.debounce(window.map.addPinFromData(n)),c.classList.remove("map--faded"),window.form.adForm.classList.remove("ad-form--disabled"),e.removeEventListener("click",_),l.addEventListener("click",window.form.resetData)},g=function(){window.map.deleteAllPins(),window.map.closeCurrentPopup(),_(window.DATA)};e.addEventListener("change",window.util.debounce(g)),e.addEventListener("keydown",window.util.debounce(g)),p(a,e),window.filter={applyAll:w,getTypeHousing:y,renderCardFromServerData:_,setFiltersStartValue:function(){for(let e=0;e<u.length;e++)u[e].value=d;for(let e=0;e<a.length;e++)a[e].checked=!1},onKeydownEnterFeatures:p}})(),(()=>{window.DATA=[];const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map__pin--main"),n=t.offsetHeight;let o=t.offsetWidth;const r=function(e){const t=e.getBoundingClientRect();return{top:t.top+pageYOffset,left:t.left+pageXOffset}},i=function(e,t){const n=r(e);return t.value=`${Math.floor(n.left+12.5)}, ${Math.floor(n.top+70)}`,t.value};window.pin={render:function(t){const n=e.cloneNode(!0),o=n.querySelector("img");return n.style.left=t.location.x-25+"px",n.style.top=t.location.y-70+"px",o.alt=t.offer.title,o.src=t.author.avatar,n.dataset.id=t.id,n},getCoords:r,setAdress:i,setStartAdress:function(e,t){const n=r(e);return t.value=`${Math.floor(n.left+12.5)}, ${Math.floor(n.top+35)}`,t.value},active:function(e){e.addEventListener("keydown",(function(e){"Enter"===e.key&&(window.map.closeCurrentPopup(),window.map.showActivePage())}))},move:function(e,r){e.addEventListener("mousedown",(function(e){e.preventDefault();let c={x:e.clientX,y:e.clientY};const u=function(e){e.preventDefault(),function(t){let u=c.x-e.clientX,a=c.y-e.clientY;c={x:e.clientX,y:e.clientY};let l=t.offsetTop-a;l>=130-n-15&&l<=630-n-15&&(t.style.top=l+"px");let d=-1*Math.floor(o/2),s=t.offsetLeft-u;s>=d&&s<=1200+d&&(t.style.left=s+"px"),i(t,r)}(t)},a=function(e){e.preventDefault(),document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",u),document.addEventListener("mouseup",a)}))},getPosition:function(){t.style.top="375px",t.style.left="570px",i(t,window.form.inputAdress)}}})(),(()=>{const e=document.querySelector("#type"),t=document.querySelector("#title-output"),n=document.querySelector("#adress-output"),o=document.querySelector("#min-price"),r=document.querySelector("#submit-output"),i=document.querySelector("#timein"),c=document.querySelector("#timeout"),u=document.querySelector("#room_number"),a=document.querySelector("#capacity"),l=document.querySelector(".ad-form__submit"),d=document.querySelector("#success").content.querySelector(".success"),s=document.querySelector(".ad-form"),f=s.querySelector("#address"),m=s.querySelector("#title"),p=s.querySelector("#price"),w=s.querySelectorAll("fieldset"),y=s.querySelectorAll(".feature"),v=document.querySelector(".map__filters"),h=v.querySelectorAll(".map__filter"),S=v.querySelectorAll(".map__feature"),_=s.querySelector(".ad-form__reset"),g=document.querySelectorAll(".feature__checkbox");s.action="https://21.javascript.pages.academy/keksobooking",s.method="POST",m.required=!0,f.readOnly=!0,window.util.setInputAttributes(m,30,100),window.util.setInputAttributes(p,0,1e6);const q=function(e,t){let n="";return t.placeholder=e,t.min=e,n="Минимальная цена "+e,o.value=n,n},E=function(e,t,n){setTimeout((function(){l.textContent=t,l.style.color=n}),e)},k=function(e){e.preventDefault(),m.value.length>=m.min&&p.value.length>0?r.textContent="Форма объявления заполнена верно":(r.textContent='Пожалуйста, проверьте введенные данные. Ошибка отправки формы. Исправьте данные и нажмите еще раз на кнопку "Отправить".',E(0,"Ошибка отправки","red"),E(2e3,"Отправить повторно","gold"))},b=function(){c.value=i.value;const e=c.querySelectorAll("option");for(let t=0;t<e.length;t++)e[t].value!==i.value?e[t].setAttribute("disabled",!0):e[t].removeAttribute("disabled",!1)},L=function(){s.reset(),window.map.deleteAllPins(),window.map.closeCurrentPopup(),window.pin.getPosition(),window.filter.setFiltersStartValue(),function(){const e=s.querySelectorAll("img");for(let t=0;t<e.length;t++)e[t].src="img/muffin-grey.svg"}(),document.querySelector(".map").classList.add("map--faded"),s.classList.add("ad-form--disabled"),x(w,y,!0,"none")},A=function(e){document.body.removeChild(e)},C=function(e,t){e.addEventListener("keydown",(function(e){"Escape"===e.key&&(e.preventDefault(),A(t))}))},x=function(e,t,n,o){for(let t=0;t<e.length;t++)e[t].disabled=n;for(let e=0;e<t.length;e++)t[e].style="pointer-events: "+o},D=function(){const e=d.cloneNode(!0);e.style="z-index: 1200;",document.body.insertAdjacentElement("afterbegin",e),L(),l.removeEventListener("click",k),document.addEventListener("click",(function(t){t.target===e&&A(e)})),C(document,e),window.form.setDisableInputs(h,S,!0,"none"),_.removeEventListener("click",T)},F=function(e){e.preventDefault(),l.addEventListener("click",k),l.addEventListener("keydown",(function(e){"Enter"===e.key&&k()})),window.backend.save(new FormData(s),D,window.backend.onShowError)},T=function(e){e.preventDefault(),L()};s.addEventListener("submit",F),_.addEventListener("click",T),_.addEventListener("keydown",(function(e){"Enter"===e.key&&T()})),window.filter.onKeydownEnterFeatures(g,s),window.form={checkRoomsAndGuestsCount:function(){const e=function(){const e=a.querySelectorAll("option");for(let t=0;t<e.length;t++)e[t].removeAttribute("disabled",!1),"100"===u.value?a.value=0:a.value=u.value,("0"===e[t].value||u.value<e[t].value&&"100"!==u.value)&&e[t].setAttribute("disabled",!0)};u.addEventListener("change",e),a.addEventListener("change",e)},onTimeChange:function(){i.addEventListener("change",b),c.addEventListener("change",b)},setMinPrice:function(){const t=function(){switch(e.value){case"bungalow":q(0,p);break;case"flat":q(1e3,p);break;case"house":q(5e3,p);break;case"palace":q(1e4,p)}};e.addEventListener("change",t),p.addEventListener("input",t)},checkTitleInput:function(){m.addEventListener("input",(function(){let e=m.value.length,n="";e<30?(m.setCustomValidity("Ещё "+(30-e)+" симв."),n="Ещё "+(30-e)+" симв."):e>100?(m.setCustomValidity("Удалите лишние "+(e-100)+" симв."),n="Удалите лишние "+(e-100)+" симв."):(m.setCustomValidity(""),n="Отличный заголовок!",t.style.color="green"),t.value=n}))},inputAdressMessage:function(){f.addEventListener("click",(function(){n.value="Для изменения адреса передвиньте метку на карте"})),f.addEventListener("mouseleave",(function(){n.value=""}))},checkTitleInputInvalid:function(){m.addEventListener("invalid",(function(){m.validity.valueMissing?m.setCustomValidity("Обязательное поле"):m.setCustomValidity("")}))},adForm:s,onSendSuccess:D,inputAdress:f,setDisableInputs:x,hideUserMessageOnEscape:C,onSubmit:F,resetData:T,allMapFilters:h,allMapLabels:S}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=document.querySelector(".map__filters-container");window.popupModule={openCardInfo:function(){t.before(e)},closeCardInfo:function(){const e=document.querySelectorAll(".map__card");e.length>0&&(e[0].classList.remove("visually-hidden"),e[0].querySelector(".popup__close").addEventListener("click",(function(){e[0].classList.add("visually-hidden")})))}}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelector("#address"),n=window.form.adForm.querySelectorAll("fieldset"),o=window.form.adForm.querySelectorAll(".feature"),r=document.querySelector(".map__filters"),i=r.querySelectorAll(".map__filter"),c=r.querySelectorAll(".map__feature");e.addEventListener("mousedown",window.map.findButtonSide),window.pin.setStartAdress(e,t),window.pin.move(e,t),window.form.checkTitleInput(),window.form.checkTitleInputInvalid(),window.form.inputAdressMessage(),window.form.setMinPrice(),window.form.onTimeChange(),window.form.checkRoomsAndGuestsCount(),window.form.setDisableInputs(n,o,!0,"none"),window.form.setDisableInputs(i,c,!0,"none"),document.addEventListener("click",(function(t){t.target===e&&(window.map.showActivePage(),window.map.closeCurrentPopup())})),document.addEventListener("keydown",(function(e){if("Escape"===e.key){const e=document.querySelectorAll(".map__card");e.length>0&&e[0].classList.add("visually-hidden")}}))})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form-header__upload input[type=file]"),n=document.querySelector(".ad-form-header__preview img"),o=document.querySelector(".ad-form__upload input[type=file]"),r=document.querySelector(".ad-form__photo"),i="100%",c=function(t,n){const o=t.files[0],r=o.name.toLowerCase();if(e.some((function(e){return r.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(function(){n.src=e.result})),e.readAsDataURL(o)}};t.addEventListener("change",(function(){c(t,n)})),o.addEventListener("click",(function(){document.querySelectorAll(".housing-image").length||function(e){const t=document.createElement("img");t.alt="Фотография жилья",t.style.height=i,t.style.width=i,t.src="img/muffin-grey.svg",t.className="housing-image",t.style.borderRadius="5px",e.appendChild(t)}(r)}));const u=function(){const e=r.querySelector("img");c(o,e),o.addEventListener("change",u)};o.addEventListener("change",u)})()})();