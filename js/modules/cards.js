import { getResource } from "../services/services";

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

    getResource(" http://localhost:3000/menu")
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

export default cards;