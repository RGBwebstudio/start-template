/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js":
/*!******************************************************************!*\
  !*** ./node_modules/@googlemaps/js-api-loader/dist/index.esm.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_ID: () => (/* binding */ DEFAULT_ID),
/* harmony export */   Loader: () => (/* binding */ Loader),
/* harmony export */   LoaderStatus: () => (/* binding */ LoaderStatus)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// do not edit .js files directly - edit src/index.jst



var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ID = "__googleMapsScriptId";
/**
 * The status of the [[Loader]].
 */
var LoaderStatus;
(function (LoaderStatus) {
    LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
    LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
    LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then((google) => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */
class Loader {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */
    constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = "https://maps.googleapis.com/maps/api/js", version, }) {
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.apiKey = apiKey;
        this.authReferrerPolicy = authReferrerPolicy;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID; // Do not allow empty string
        this.language = language;
        this.libraries = libraries;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.region = region;
        this.retries = retries;
        this.url = url;
        this.version = version;
        if (Loader.instance) {
            if (!fastDeepEqual(this.options, Loader.instance.options)) {
                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
            }
            return Loader.instance;
        }
        Loader.instance = this;
    }
    get options() {
        return {
            version: this.version,
            apiKey: this.apiKey,
            channel: this.channel,
            client: this.client,
            id: this.id,
            libraries: this.libraries,
            language: this.language,
            region: this.region,
            mapIds: this.mapIds,
            nonce: this.nonce,
            url: this.url,
            authReferrerPolicy: this.authReferrerPolicy,
        };
    }
    get status() {
        if (this.errors.length) {
            return LoaderStatus.FAILURE;
        }
        if (this.done) {
            return LoaderStatus.SUCCESS;
        }
        if (this.loading) {
            return LoaderStatus.LOADING;
        }
        return LoaderStatus.INITIALIZED;
    }
    get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     * @deprecated
     */
    createUrl() {
        let url = this.url;
        url += `?callback=__googleMapsCallback`;
        if (this.apiKey) {
            url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
            url += `&channel=${this.channel}`;
        }
        if (this.client) {
            url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
            url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
            url += `&language=${this.language}`;
        }
        if (this.region) {
            url += `&region=${this.region}`;
        }
        if (this.version) {
            url += `&v=${this.version}`;
        }
        if (this.mapIds) {
            url += `&map_ids=${this.mapIds.join(",")}`;
        }
        if (this.authReferrerPolicy) {
            url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
        }
        return url;
    }
    deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
            script.remove();
        }
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     * @deprecated, use importLibrary() instead.
     */
    load() {
        return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     * @deprecated, use importLibrary() instead.
     */
    loadPromise() {
        return new Promise((resolve, reject) => {
            this.loadCallback((err) => {
                if (!err) {
                    resolve(window.google);
                }
                else {
                    reject(err.error);
                }
            });
        });
    }
    importLibrary(name) {
        this.execute();
        return google.maps.importLibrary(name);
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     * @deprecated, use importLibrary() instead.
     */
    loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
    }
    /**
     * Set the script on document.
     */
    setScript() {
        var _a, _b;
        if (document.getElementById(this.id)) {
            // TODO wrap onerror callback for cases where the script was loaded elsewhere
            this.callback();
            return;
        }
        const params = {
            key: this.apiKey,
            channel: this.channel,
            client: this.client,
            libraries: this.libraries.length && this.libraries,
            v: this.version,
            mapIds: this.mapIds,
            language: this.language,
            region: this.region,
            authReferrerPolicy: this.authReferrerPolicy,
        };
        // keep the URL minimal:
        Object.keys(params).forEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (key) => !params[key] && delete params[key]);
        if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) {
            // tweaked copy of https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import
            // which also sets the base url, the id, and the nonce
            /* eslint-disable */
            ((g) => {
                // @ts-ignore
                let h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
                // @ts-ignore
                b = b[c] || (b[c] = {});
                // @ts-ignore
                const d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = () => 
                // @ts-ignore
                h || (h = new Promise((f, n) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    yield (a = m.createElement("script"));
                    a.id = this.id;
                    e.set("libraries", [...r] + "");
                    // @ts-ignore
                    for (k in g)
                        e.set(k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()), g[k]);
                    e.set("callback", c + ".maps." + q);
                    a.src = this.url + `?` + e;
                    d[q] = f;
                    a.onerror = () => (h = n(Error(p + " could not load.")));
                    // @ts-ignore
                    a.nonce = this.nonce || ((_a = m.querySelector("script[nonce]")) === null || _a === void 0 ? void 0 : _a.nonce) || "";
                    m.head.append(a);
                })));
                // @ts-ignore
                d[l] ? console.warn(p + " only loads once. Ignoring:", g) : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
            })(params);
            /* eslint-enable */
        }
        // While most libraries populate the global namespace when loaded via bootstrap params,
        // this is not the case for "marker" when used with the inline bootstrap loader
        // (and maybe others in the future). So ensure there is an importLibrary for each:
        const libraryPromises = this.libraries.map((library) => this.importLibrary(library));
        // ensure at least one library, to kick off loading...
        if (!libraryPromises.length) {
            libraryPromises.push(this.importLibrary("core"));
        }
        Promise.all(libraryPromises).then(() => this.callback(), (error) => {
            const event = new ErrorEvent("error", { error }); // for backwards compat
            this.loadErrorCallback(event);
        });
    }
    /**
     * Reset the loader state.
     */
    reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
    }
    resetIfRetryingFailed() {
        if (this.failed) {
            this.reset();
        }
    }
    loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
            const delay = this.errors.length * Math.pow(2, this.errors.length);
            console.error(`Failed to load Google Maps script, retrying in ${delay} ms.`);
            setTimeout(() => {
                this.deleteScript();
                this.setScript();
            }, delay);
        }
        else {
            this.onerrorEvent = e;
            this.callback();
        }
    }
    callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb) => {
            cb(this.onerrorEvent);
        });
        this.callbacks = [];
    }
    execute() {
        this.resetIfRetryingFailed();
        if (this.done) {
            this.callback();
        }
        else {
            // short circuit and warn if google.maps is already loaded
            if (window.google && window.google.maps && window.google.maps.version) {
                console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." +
                    "This may result in undesirable behavior as options and script parameters may not match.");
                this.callback();
                return;
            }
            if (this.loading) ;
            else {
                this.loading = true;
                this.setScript();
            }
        }
    }
}


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/form */ "./src/js/components/form.js");
/* harmony import */ var _components_form__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_form__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/modal */ "./src/js/components/modal.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_burgerMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/burgerMenu */ "./src/js/components/burgerMenu.js");
/* harmony import */ var _components_burgerMenu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_burgerMenu__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/map */ "./src/js/components/map.js");
/* harmony import */ var _components_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/tabs */ "./src/js/components/tabs.js");
/* harmony import */ var _components_tabs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_tabs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_swiper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/swiper */ "./src/js/components/swiper.js");
/* harmony import */ var _components_swiper__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_swiper__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_options__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/options */ "./src/js/components/options.js");
/* harmony import */ var _components_options__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_options__WEBPACK_IMPORTED_MODULE_6__);
//сюда подключаем js компоненты и функции









/***/ }),

/***/ "./src/js/components/burgerMenu.js":
/*!*****************************************!*\
  !*** ./src/js/components/burgerMenu.js ***!
  \*****************************************/
/***/ (() => {

document.querySelector('#open-burger-btn').addEventListener('click', () => {
  const burgerMenu = document.querySelector('#burger-menu');
  burgerMenu.classList.remove('hide');
});
document.querySelector('#burger-menu-close').addEventListener('click', () => {
  const burgerMenu = document.querySelector('#burger-menu');
  burgerMenu.classList.add('hide');
});

/***/ }),

/***/ "./src/js/components/form.js":
/*!***********************************!*\
  !*** ./src/js/components/form.js ***!
  \***********************************/
/***/ (() => {

const form = document.querySelector('#form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const phoneValue = document.querySelector('#phone2');
const submitBtn = document.querySelector('.rgb-form__btn');
const nameLabel = document.getElementById('label-name');
const phoneLabel = document.getElementById('label-phone');
const emailLabel = document.getElementById('label-email');
const error = document.querySelector('.rgb-form__error-message');
const errorPhone = document.querySelector('.rgb-form__error-message-phone');
const errorEmail = document.querySelector('.rgb-form__error-message-email');

//Инициализация международного телефонного инпута
if (form) {
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: 'ua',
    separateDialCode: true,
    nationalMode: false,
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
  });
  //Функция обновления значения велью номера телефона, для вывода с кодом страны
  function updatePhoneNumber() {
    const phoneNumberWithDialCode = iti.getNumber();
    return phoneNumberWithDialCode;
  }
  //Проверка чтобы не отправлялись пустые поля
  submitBtn.addEventListener('click', e => {
    if (nameRegex.test(nameInput.value)) {
      isValidFormName = true;
      nameLabel.classList.remove('red-border');
      nameLabel.classList.add('green-border');
      error.classList.remove('visible');
    } else {
      isValidFormName = false;
      nameLabel.classList.remove('green-border');
      nameLabel.classList.add('red-border');
      error.classList.add('visible');
    }
    if (phoneRegex.test(phoneInput.value)) {
      isValidFormTel = true;
      phoneLabel.classList.remove('red-border');
      phoneLabel.classList.add('green-border');
      errorPhone.classList.remove('visible');
    } else {
      isValidFormTel = false;
      phoneLabel.classList.remove('green-border');
      phoneLabel.classList.add('red-border');
      errorPhone.classList.add('visible');
    }
    if (emailRegex.test(emailInput.value)) {
      isValidFormEmail = true;
      emailLabel.classList.remove('red-border');
      emailLabel.classList.add('green-border');
      errorEmail.classList.remove('visible');
    } else {
      isValidFormEmail = false;
      emailLabel.classList.remove('green-border');
      emailLabel.classList.add('red-border');
      errorEmail.classList.add('visible');
    }
  });

  //Паттерны валидации для имени, телефона и почты
  const nameRegex = /^[A-Za-zА-Яа-яЁё\- ]+$/;
  const phoneRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{3,4}$/;
  // const emailRegex =
  //   /^[a-zA-Z0-9]+[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9]+[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValidFormName = false;
  let isValidFormTel = false;
  let isValidFormEmail = false;
  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^A-zА-яЁё]/g, '');
    if (nameRegex.test(nameInput.value)) {
      isValidFormName = true;
      nameLabel.classList.remove('red-border');
      nameLabel.classList.add('green-border');
      error.classList.remove('visible');
    } else {
      isValidFormName = false;
      nameLabel.classList.remove('green-border');
      nameLabel.classList.add('red-border');
      error.classList.add('visible');
    }
  });
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d]/g, '');
    if (phoneRegex.test(phoneInput.value)) {
      isValidFormTel = true;
      phoneLabel.classList.remove('red-border');
      phoneLabel.classList.add('green-border');
      errorPhone.classList.remove('visible');
    } else {
      isValidFormTel = false;
      phoneLabel.classList.remove('green-border');
      phoneLabel.classList.add('red-border');
      errorPhone.classList.add('visible');
    }
  });
  emailInput.addEventListener('input', () => {
    if (emailRegex.test(emailInput.value)) {
      isValidFormEmail = true;
      emailLabel.classList.remove('red-border');
      emailLabel.classList.add('green-border');
      errorEmail.classList.remove('visible');
    } else {
      isValidFormEmail = false;
      emailLabel.classList.remove('green-border');
      emailLabel.classList.add('red-border');
      errorEmail.classList.add('visible');
    }
  });
}

/***/ }),

/***/ "./src/js/components/map.js":
/*!**********************************!*\
  !*** ./src/js/components/map.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @googlemaps/js-api-loader */ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js");

const mapContainer = document.getElementById("map");
let map;
let marker;

// здесь прописать тему для карты 
const defaultTheme = [{
  featureType: 'administrative',
  elementType: 'all',
  stylers: [{
    saturation: '-100'
  }]
}, {
  featureType: 'administrative.province',
  elementType: 'all',
  stylers: [{
    visibility: 'off'
  }]
}, {
  featureType: 'landscape',
  elementType: 'all',
  stylers: [{
    saturation: -100
  }, {
    lightness: 65
  }, {
    visibility: 'on'
  }]
}, {
  featureType: 'poi',
  elementType: 'all',
  stylers: [{
    saturation: -100
  }, {
    lightness: '50'
  }, {
    visibility: 'simplified'
  }]
}, {
  featureType: 'road',
  elementType: 'all',
  stylers: [{
    saturation: '-100'
  }]
}, {
  featureType: 'road.highway',
  elementType: 'all',
  stylers: [{
    visibility: 'simplified'
  }]
}, {
  featureType: 'road.arterial',
  elementType: 'all',
  stylers: [{
    lightness: '30'
  }]
}, {
  featureType: 'road.local',
  elementType: 'all',
  stylers: [{
    lightness: '40'
  }]
}, {
  featureType: 'transit',
  elementType: 'all',
  stylers: [{
    saturation: -100
  }, {
    visibility: 'simplified'
  }]
}, {
  featureType: 'water',
  elementType: 'geometry',
  stylers: [{
    hue: '#ffff00'
  }, {
    lightness: -25
  }, {
    saturation: -97
  }]
}, {
  featureType: 'water',
  elementType: 'labels',
  stylers: [{
    lightness: -25
  }, {
    saturation: -100
  }]
}];
// здесь настроить опции для карты
const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: false,
  keyboardShortcuts: false,
  scrollWheel: false,
  disableDoubleClickZoom: true,
  fullscreenControl: false
};
const loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__.Loader({
  // ввести здесь апи ключ гугл мепс
  apiKey: ''
});
if (mapContainer) {
  loader.load().then(async () => {
    const {
      Map
    } = await google.maps.importLibrary('maps');
    map = new Map(document.getElementById('map'), {
      center: {
        lat: 48.4485167,
        lng: 35.0264985
      },
      zoom: 17,
      styles: defaultTheme,
      options: defaultOptions
    });
    const img = 'img/marker.svg';
    marker = new google.maps.Marker({
      position: {
        lat: 48.4485167,
        lng: 35.0264985
      },
      map,
      icon: img
    });
    returnToMarkerControl = new ReturnToMarkerControl(map, marker);
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(returnToMarkerControl);
    map.addListener('dragend', () => {
      marker.setPosition(map.getCenter());
    });
  });
}

/***/ }),

/***/ "./src/js/components/modal.js":
/*!************************************!*\
  !*** ./src/js/components/modal.js ***!
  \************************************/
/***/ (() => {

const modal = document.querySelector('#myModal');
document.querySelectorAll('[data-modals-open]').forEach(e => e.addEventListener('click', e => {
  e.preventDefault();
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}));
document.querySelectorAll('[data-modals-close]').forEach(e => e.addEventListener('click', e => {
  e.preventDefault();
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}));
document.querySelector('.myModal').addEventListener('click', e => {
  // e.preventDefault();
  if (!e.target.closest('.myModal__content')) {
    modal.classList.remove('active');
  }
});

/***/ }),

/***/ "./src/js/components/options.js":
/*!**************************************!*\
  !*** ./src/js/components/options.js ***!
  \**************************************/
/***/ (() => {

const options = document.querySelectorAll('.option');
options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
  });
});

/***/ }),

/***/ "./src/js/components/swiper.js":
/*!*************************************!*\
  !*** ./src/js/components/swiper.js ***!
  \*************************************/
/***/ (() => {

const swiper = new Swiper('.swiper', {
  // Optional parameters
  // If we need pagination
  pagination: {
    el: '.swiper-pagination'
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar'
  }
});

/***/ }),

/***/ "./src/js/components/tabs.js":
/*!***********************************!*\
  !*** ./src/js/components/tabs.js ***!
  \***********************************/
/***/ (() => {

window.addEventListener('DOMContentLoaded', function () {
  let tab = document.querySelectorAll('.tabs__item'),
    header = document.querySelector('.tabs'),
    tabContent = document.querySelectorAll('.tabs__content');
  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }
  hideTabContent(1);
  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }
  header.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('tabs__item')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components */ "./src/js/_components.js");

})();

/******/ })()
;
//# sourceMappingURL=main.js.map