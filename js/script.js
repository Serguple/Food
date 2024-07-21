import tabs from "./modules/tabs";
import timer from "./modules/timer";
import modal from "./modules/modal";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calc from "./modules/calc";
import {openModalWindow} from './modules/modal';

"use strict";

window.addEventListener("DOMContentLoaded", function() {

    const modalCountDown = setTimeout(() => openModalWindow("modal", modalCountDown), 2000000);

    tabs(".tabheader__item", ".tabheader__items", ".tabcontent", "tabheader__item_active");
    timer('.timer', "2024-08-01");
    modal("[data-modal]", ".modal", modalCountDown);
    cards();
    forms("form", modalCountDown);
    slider({
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        currentCount: "#current",
        sliderP: ".offer__slider",
        totalCount:"#total",
        wrapper: ".offer__slider-wrapper",
        allSlides: ".offer__slide",
        field: ".offer__slider-inner"
    });
    calc();

    //Tabs

    //Timer
    
    // Modal 

    // Cards

    //Forms

    //Slider

    //Calc

})
