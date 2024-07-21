import { closeModalWindow, openModalWindow } from "./modal";
import { postData } from "../services/services";

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
        openModalWindow(".modal", modalCountDown);

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
            closeModalWindow(".modal");
        }, 2000)
    }
}

export default forms;