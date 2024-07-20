"use strict";

window.addEventListener("DOMContentLoaded", function() {

    //Tabs

    const tabsParent = document.querySelector(".tabheader__items"),
          tabs = document.querySelectorAll(".tabheader__item"),
          tabContent = document.querySelectorAll(".tabcontent");

    function hideContent(element) {
        element.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabsContent(i) {
        tabContent[i].classList.remove("hide");
        tabContent[i].classList.add("show", "fade");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideContent(tabContent);
    showTabsContent(0);

    tabsParent.addEventListener("click", e => {
        const target = e.target;

        if (target && target.classList.contains("tabheader__item")) {

            tabs.forEach((item, i) => {
                if (item == target) {
                    hideContent(tabContent);
                    showTabsContent(i);
                }
            })
        }        
    });

    //Timer

    const deadline = "2024-08-01";

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

    function getZero(item) {
        if (item >= 0 && item <= 9) {
            return `0${item}`;
        } else {
            return item;
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

    setClock(".timer", deadline);
    
    // Modal 

    const modal = document.querySelector(".modal"),
          modalBtns = document.querySelectorAll("[data-modal]");
    
    function openModalWindow() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearTimeout(modalCountDown);
    }

    function closeModalWindow() {
        modal.classList.remove("show");
        modal.classList.add("hide");
        document.body.style.overflow = "";
    }

    modalBtns.forEach(item => {
        item.addEventListener("click", openModalWindow);
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == '') {
            closeModalWindow();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModalWindow();
        }
    });

    const modalCountDown = setTimeout(openModalWindow, 2000000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow();
            removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    // Cards

    // class CardConstructor {
    //     constructor(img, title, text, price) {
    //         this.img = img;
    //         this.title = title;
    //         this.text = text;
    //         this.price = price;
    //         this.card = document.createElement("div");
    //         this.exchange = 40;
    //         this.exchangeCurr();
    //     }

    //     exchangeCurr() {
    //         this.price = Math.floor(this.price * this.exchange);
    //     }

    //     createCard() {
    //         this.card.classList.add("menu__item");
    //         this.card.innerHTML = `
                // <img src=${this.img} alt="vegy">
                // <h3 class="menu__item-subtitle">${this.title}</h3>
                // <div class="menu__item-descr">${this.text}</div>
                // <div class="menu__item-divider"></div>
                // <div class="menu__item-price">
                //     <div class="menu__item-cost">Цена:</div>
                //     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                // </div>`;
    //         document.querySelector(".menu .container").append(this.card);
    //     }
    // }

    // const getResource = async (url) => {
    //     const res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // }

    axios.get(" http://localhost:3000/menu")
        .then(data => createCard(data.data));

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
        })
    }

    //Forms

    const form = document.querySelectorAll("form");

    const messages = {
        loading: "img/form/spinner.svg",
        success: "Дякуємо! Ми скоро зв'яжемося з вами!",
        failure: "Щось пішло не так..."
    }

    form.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: data
        });

        return await res.json();
    }

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

            postData("http://localhost:3000/requests", json)
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
        openModalWindow();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");  
        thanksModal.innerHTML = `
            <div class="modal__content">
                <form action="#">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </form>
            </div>`;
        modal.append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalWin.classList.add("show");
            prevModalWin.classList.remove('hide');
            closeModalWindow();
        }, 2000)
    }

    //Slider

    const prev = document.querySelector('.offer__slider-prev'),
          next= document.querySelector('.offer__slider-next'),
          sliderParent = document.querySelector(".offer__slider"),
          current = document.querySelector("#current"),
          total = document.querySelector("#total"),
          slides = document.querySelectorAll(".offer__slide"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          slidesField = document.querySelector(".offer__slider-inner"),
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


    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex + 1);

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
        current.textContent = getZero(slideIndex + 1);  

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
        current.textContent = getZero(slideIndex + 1);

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

    //Calc

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
        console.log(gender, height, weight, age, activity);
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
                console.log(activity, gender);
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

            console.log(height, weight, age);

            calcTotalCal();
        });
    }

    getBtnsValue("#gender", "calculating__choose-item_active");
    getBtnsValue(".calculating__choose_big", "calculating__choose-item_active");

    getInputsValue("height");
    getInputsValue("weight");
    getInputsValue("age");

})
