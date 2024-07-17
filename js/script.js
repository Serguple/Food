"use strict";

window.addEventListener("DOMContentLoaded", function() {

    //Tabs

    const tabsParent = document.querySelector(".tabheader__items"),
          tabs = document.querySelectorAll(".tabheader__item"),
          tabContent = document.querySelectorAll(".tabcontent");

    function hideTabsContent() {
        tabContent.forEach(item => {
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

    hideTabsContent();
    showTabsContent(0);

    tabsParent.addEventListener("click", e => {
        const target = e.target;

        if (target && target.classList.contains("tabheader__item")) {

            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabsContent();
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
            this.price = Math.floor(this.price / this.exchange);
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
                    <div class="menu__item-total"><span>${this.price}</span> $/день</div>
                </div>`;
            document.querySelector(".menu .container").append(this.card);
        }
    }

    const firstText = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
          secondText = 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
          thirdText = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.';

    const firstCard = new CardConstructor("img/tabs/vegy.jpg", 'Меню "Фитнес"', firstText, 229),
          secondCard = new CardConstructor("img/tabs/elite.jpg", 'Меню “Премиум”', secondText, 550),
          thirdCard = new CardConstructor("img/tabs/post.jpg", 'Меню "Постное"', thirdText, 430);

    firstCard.createCard();
    secondCard.createCard();
    thirdCard.createCard();

    //Forms

    const form = document.querySelectorAll("form");

    const messages = {
        loading: "img/form/spinner.svg",
        success: "Дякуємо! Ми скоро зв'яжемося з вами!",
        failure: "Щось пішло не так..."
    }

    form.forEach(item => {
        postData(item);
    });

    function postData(form) {
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

            const obj = {};

            formData.forEach((key, value) => {
                obj[key] = value;
            })

            fetch("server.php", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(obj)
            })
            .then(data => data.text())
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
            })

            // request.addEventListener("load", () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(messages.success);
            //         form.reset();
            //         newMessage.remove();
            //     } else {
            //         showThanksModal(messages.failure);
            //     }
            // });
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
})
