/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const totalCal = document.querySelector(".calculating__result span");
    let gender, height, weight, age, activity;

    if (localStorage.getItem("gender")) {
        gender = localStorage.getItem("gender");
    } else {
        gender = "female";
        localStorage.setItem("gender", "female");
    }

    if (localStorage.getItem("activity")) {
        activity = localStorage.getItem("activity");
    } else {
        activity = 1.375;
        localStorage.setItem("activity", 1.375);
    }

    function initLocalItems(selector, active) {
        const elements = document.querySelectorAll(`${selector} div`);

        elements.forEach(item => {
            if (item.getAttribute("id") === localStorage.getItem("gender")) {
                elements.forEach(item => item.classList.remove(active));
                item.classList.add(active);
            }
            if (item.getAttribute("data-activ-level") === localStorage.getItem("activity")) {
                elements.forEach(item => item.classList.remove(active));
                item.classList.add(active);
            }
        });
    }

    initLocalItems("#gender", "calculating__choose-item_active");
    initLocalItems(".calculating__choose_big", "calculating__choose-item_active");

    function calcTotalCal() {
        if (!gender || !height || !weight || !age || !activity) {
            totalCal.textContent = "____"
        } else {
            if (gender === "female"){
                totalCal.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
            }
            if (gender === "male") {
                totalCal.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
            }
        }
    }

    calcTotalCal();

    function getBtnsValue(parentElement, activeClass) {
        const elements = document.querySelectorAll(`${parentElement} div`)

        elements.forEach(item => {
            item.addEventListener("click", e => {
                if (parentElement === "#gender") {
                    gender = item.getAttribute("id");
                    localStorage.setItem("gender", gender);
                } else {
                    activity = item.getAttribute("data-activ-level");
                    localStorage.setItem("activity", activity);
                }
                elements.forEach(item => item.classList.remove(activeClass));
                item.classList.add(activeClass);
                calcTotalCal();
            })
        })
    }

    function getInputsValue(selector) {
        const input = document.querySelector(`#${selector}`);


        input.addEventListener("input", () => {
            if (input.value.match(/\D/)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            switch (input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age": 
                    age = +input.value; 
                    break;
            }

            calcTotalCal();
        });
    }

    getBtnsValue("#gender", "calculating__choose-item_active");
    getBtnsValue(".calculating__choose_big", "calculating__choose-item_active");

    getInputsValue("height");
    getInputsValue("weight");
    getInputsValue("age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class CardConstructor {
        constructor(img, title, text, price) {
            this.img = img;
            this.title = title;
            this.text = text;
            this.price = price;
            this.card = document.createElement("div");
            this.exchange = 40;
            this.exchangeCurr();
        }

        exchangeCurr() {
            this.price = Math.floor(this.price * this.exchange);
        }

        createCard() {
            this.card.classList.add("menu__item");
            this.card.innerHTML = `
                <img src=${this.img} alt="vegy">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            document.querySelector(".menu .container").append(this.card);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)(" http://localhost:3000/menu")
        .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, title, descr, price}) => {
            price *= 40;

            const element = document.createElement("div");

            element.classList.add("menu__item");

            element.innerHTML = `
                <img src=${img} alt="vegy">
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;

            document.querySelector(".menu .container").append(element);
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(selector, modalCountDown) {
    const form = document.querySelectorAll(selector);

    const messages = {
        loading: "img/form/spinner.svg",
        success: "Дякуємо! Ми скоро зв'яжемося з вами!",
        failure: "Щось пішло не так..."
    }

    form.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const newMessage = document.createElement("img");
            newMessage.src = messages.loading;
            newMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(newMessage);
            form.insertAdjacentElement("afterend", newMessage);
            
            
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
                showThanksModal(messages.success);
                newMessage.remove();
            })
            .catch(() => {
                showThanksModal(messages.failure);
            })
            .finally(() => {
                form.reset();
            });
        })
    }

    function showThanksModal(message) {
        const prevModalWin = document.querySelector(".modal__dialog");

        prevModalWin.classList.add("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModalWindow)(".modal", modalCountDown);

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");  
        thanksModal.innerHTML = `
            <div class="modal__content">
                <form action="#">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </form>
            </div>`;
        document.querySelector(".modal").append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalWin.classList.add("show");
            prevModalWin.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)(".modal");
        }, 2000)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModalWindow: () => (/* binding */ closeModalWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModalWindow: () => (/* binding */ openModalWindow)
/* harmony export */ });
function openModalWindow(modalSelector, modalInterval) {
    document.querySelector(modalSelector).classList.add("show");
    document.querySelector(modalSelector).classList.remove("hide");
    document.body.style.overflow = "hidden";

    console.log(modalInterval);
    if (modalInterval) {
        clearTimeout(modalInterval);
    }
    
}

function closeModalWindow(modalSelector) {
    document.querySelector(modalSelector).classList.remove("show");
    document.querySelector(modalSelector).classList.add("hide");
    document.body.style.overflow = "";
}

function modal(btnSelector, modalSelector, modalInterval) {
    const modal = document.querySelector(modalSelector),
          modalBtns = document.querySelectorAll(btnSelector);

    modalBtns.forEach(item => {
        item.addEventListener("click", () => openModalWindow('.modal', modalInterval));
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == '') {
            closeModalWindow(".modal");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModalWindow(".modal");
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow('.modal', modalInterval);
            removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({prevArrow, nextArrow, sliderP, currentCount, totalCount, allSlides, wrapper, field}) {
    const prev = document.querySelector(prevArrow),
          next= document.querySelector(nextArrow),
          sliderParent = document.querySelector(sliderP),
          current = document.querySelector(currentCount),
          total = document.querySelector(totalCount),
          slides = document.querySelectorAll(allSlides),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 0;
    let offset = 0;
    let dots = [];

    sliderParent.style.position = "relative";

    const carouselIndicators = document.createElement("ol");
    carouselIndicators.classList.add("carousel-indicators");

    sliderParent.append(carouselIndicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dot.setAttribute("data-slide-to", i)

        dots.push(dot);
    }

    dots.forEach(dot => {
        carouselIndicators.append(dot);
        if (dot.getAttribute("data-slide-to") == 0) {
            dot.style.opacity = "1";
        }
    })


    total.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slides.length);
    current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex + 1);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slides.forEach(item => {
        item.style.width = width;
    })
    
    function getRidOfPX(str) {
        return +str.replace(/px/, '');
    }

    function highlightDot(element) {
        dots.forEach(item => item.style.opacity = "0.5");
        element.style.opacity = "1";
    }
    
    next.addEventListener("click", () => {
        if (offset == getRidOfPX(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getRidOfPX(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex > slides.length - 2) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex + 1);  

        highlightDot(dots[slideIndex]);
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
			offset = getRidOfPX(width) * (slides.length - 1);
		} else {
			offset -= getRidOfPX(width);
		}

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex < 1) {
            slideIndex = slides.length -1;
        } else {
            slideIndex--;
        }
        current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex + 1);

        highlightDot(dots[slideIndex]);
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            highlightDot(dot);

            const slideTo = +dot.getAttribute("data-slide-to")
            offset = getRidOfPX(width) * (slideTo);
            slidesField.style.transform = `translateX(-${offset}px)`

            slideIndex = slideTo+1;

            if (slideIndex < 10) {
                current.textContent = `0${slideIndex}`
            } else {
                current.textContent = slideIndex;
            }
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, parentSelector, contentSelector, active) {
    const tabsParent = document.querySelector(parentSelector),
          tabs = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(contentSelector);

    function hideContent(element) {
        element.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show");
        });

        tabs.forEach(item => {
            item.classList.remove(active);
        });
    }

    function showTabsContent(i) {
        tabContent[i].classList.remove("hide");
        tabContent[i].classList.add("show", "fade");
        tabs[i].classList.add(active);
    }

    hideContent(tabContent);
    showTabsContent(0);

    tabsParent.addEventListener("click", e => {
        const target = e.target;

        if (target && target.classList.contains(tabsSelector.replace(/\./, ''))) {

            tabs.forEach((item, i) => {
                if (item == target) {
                    hideContent(tabContent);
                    showTabsContent(i);
                }
            })
        }        
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getZero: () => (/* binding */ getZero)
/* harmony export */ });
function getZero(item) {
    if (item >= 0 && item <= 9) {
        return `0${item}`;
    } else {
        return item;
    }
}

function timer(selector, deadline) {

    function getTimeRemeining(endtime) {
        let days, hours, minutes, seconds;
        const total = Date.parse(endtime) - Date.parse(new Date());

        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((total / 1000 / 60) % 60),
            seconds = Math.floor((total / 1000) % 60);
        }

        return {
            "total": total,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              setTimer = setInterval(runTimer, 1000);
        
        runTimer();

        function runTimer() {
            const t = getTimeRemeining(endtime);
            
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t <= 0) {
                clearInterval(setTimer);
            }
        }
    }

    setClock(selector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: data
    });

    return await res.json();
}

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}







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
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









"use strict";

window.addEventListener("DOMContentLoaded", function() {

    const modalCountDown = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModalWindow)("modal", modalCountDown), 2000000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabheader__items", ".tabcontent", "tabheader__item_active");
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', "2024-08-01");
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])("[data-modal]", ".modal", modalCountDown);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form", modalCountDown);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        currentCount: "#current",
        sliderP: ".offer__slider",
        totalCount:"#total",
        wrapper: ".offer__slider-wrapper",
        allSlides: ".offer__slide",
        field: ".offer__slider-inner"
    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();

    //Tabs

    //Timer
    
    // Modal 

    // Cards

    //Forms

    //Slider

    //Calc

})

/******/ })()
;
//# sourceMappingURL=bundle.js.map