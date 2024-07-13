"use strict";

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