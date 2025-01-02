require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from "./modules/tabs.js";
import cards from "./modules/cards.js";
import calc from "./modules/calc.js";
import forms from "./modules/forms.js";
import slider from "./modules/slider.js";
import modal from "./modules/modal.js";
import timer from "./modules/timer.js";
import { openModal } from "./modules/modal";

document.addEventListener("DOMContentLoaded", () => {

  const modalTimerID = setTimeout(() => openModal(".modal", modalTimerID), 5000);

  tabs( '.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  cards();
  calc();
  forms('.modal form', modalTimerID);
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next", 
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  modal("[data-modal]", '.modal', modalTimerID);
  timer('.timer', '2025-02-04');
 
});
