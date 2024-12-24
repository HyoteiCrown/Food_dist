document.addEventListener("DOMContentLoaded", () => {

  const tabs = require('./modules/tabs.js');
  const cards = require('./modules/cards.js');
  const calc = require('./modules/calc.js');
  const forms = require('./modules/forms.js');
  const slider = require('./modules/slider.js');
  const modal = require('./modules/modal.js');
  const timer = require('./modules/timer.js');

  tabs();
  cards();
  calc();
  forms();
  slider();
  modal();
  timer();
 
});
