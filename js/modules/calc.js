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

export default calc;