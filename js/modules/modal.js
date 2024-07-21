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

export default modal;
export {openModalWindow, closeModalWindow};