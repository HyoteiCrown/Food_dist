document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");
  const slides = document.querySelectorAll(".offer__slide");
  const prevButton = document.querySelector(".offer__slider-prev");
  const nextButton = document.querySelector(".offer__slider-next");
  const currentSlide = document.getElementById("current");
  const totalSlides = document.getElementById("total");
  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  const slidesField = document.querySelector(".offer__slider-inner");
  const width = window.getComputedStyle(slidesWrapper).width;
  const slider = document.querySelector(".offer__slider");
  const indicators = document.createElement("ol");

  function hideTabContent(item) {
    tabsContent.forEach((item) => {
      item.style.display = "none";
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, index) => {
        if (item === target) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  //Timer

  const deadline = "2024-12-31";

  function getTimerRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimerRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  //modal

  const modalTrigger = document.querySelectorAll("[data-modal]");
  const modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerID);
  }
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerID = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  //card classes

  class MenuCard {
    constructor(name, descr, price, img, alt, parentSelector, ...classes) {
      this.name = name;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.img = img;
      this.parentSelector = document.querySelector(parentSelector);
      this.alt = alt;
      this.transfer = 98;
      this.changeToRus();
    }
    changeToRus() {
      this.price = +this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
    <img src=${this.img} alt=${this.alt}>
    <h3 class="menu__item-subtitle">${this.name}</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
    </div>
    `;
      this.parentSelector.append(element);
    }
  }

  const getResource = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Fetching ${url} failed, error: ${result.status}`);
    }

    return await result.json();
  };

  // getResource("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ title, descr, price, img, altimg }) => {
  //     new MenuCard(
  //       title,
  //       descr,
  //       price,
  //       img,
  //       altimg,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  axios.get("http://localhost:3000/menu").then((data) =>
    data.data.forEach(({ title, descr, price, img, altimg }) => {
      new MenuCard(
        title,
        descr,
        price,
        img,
        altimg,
        ".menu .container"
      ).render();
    })
  );

  // getResource("http://localhost:3000/menu")
  //  .then((data => {
  //   function createCard(data){
  //     data.forEach(({ title, descr, price, img, altimg }) => {
  //       const element = document.createElement("div");
  //       element.classList.add("menu__item");
  //       const titleElement = document.createElement("h3");
  //       titleElement.textContent = title;
  //       const descrElement = document.createElement("div");
  //       descrElement.textContent = descr;
  //       const priceElement = document.createElement("div");
  //       priceElement.textContent = `цена: ${price} руб/день`;
  //       const imgElement = document.createElement("img");
  //       imgElement.src = img;
  //       imgElement.alt = altimg;

  //       element.append(titleElement, descrElement, priceElement, imgElement);
  //       document.querySelector(".menu .container").append(element);
  //     });
  //   }
  //   createCard(data);
  // })
  //  )

  //forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Мы скоро свяжемся с вами.",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await result.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal__dialog");
    modalDialog.classList.add("show");
    modalDialog.classList.add("modal__dialog--visible");
    modalDialog.innerHTML = `
      <div class="modal__content">
          <div data-close class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(modalDialog);

    setTimeout(() => {
      modalDialog.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));

  //slider

  let slideIndex = 1;
  let offset = 0;

  if (slideIndex < 10) {
    totalSlides.textContent = `0${slides.length}`;
    currentSlide.textContent = `0${slideIndex}`;
  } else {
    totalSlides.textContent = slides.length;
    currentSlide.textContent = slideIndex;
  }

  // showSlides(slideIndex);

  // if(slides.length > 10) {
  //   totalSlides.textContent = `0${slides.length}`;
  // } else {
  //   totalSlides.textContent = slides.length;
  // }

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach((item) => (item.style.display = "none"));

  //   slides[slideIndex - 1].style.display = "block";

  //   if (slides.length < 10) {
  //     currentSlide.textContent = `0${slideIndex}`;
  //     } else {
  //     currentSlide.textContent = slideIndex;
  //     }
  // }

  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prevButton.addEventListener("click", () => plusSlides(-1));

  // nextButton.addEventListener("click", () => plusSlides(1));

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";
  const dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none`;

  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slider-to", i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease`;

    if (i === 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function clearDigits(str) {
    return +str.replace(/\D/g, "");
  }

  nextButton.addEventListener("click", () => {
    if (offset == clearDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += clearDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = `0.5`));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prevButton.addEventListener("click", () => {
    if (offset == 0) {
      offset = clearDigits(width) * (slides.length - 1);
    } else {
      offset -= clearDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = `0.5`));
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = parseInt(e.target.getAttribute("data-slider-to"));
      slideIndex = slideTo;
      offset = clearDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        currentSlide.textContent = `0${slideIndex}`;
      } else {
        currentSlide.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = "0.5"));
      if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].style.opacity = 1;
      }
    });
  });

  //calc

  const result = document.querySelector(".calculating__result span");

  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "Введите все данные";
      return;
    }
    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        elements.forEach((element) => {
          element.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInfo("#gender div", "calculating__choose-item_active");
  getStaticInfo(".calculating__choose_big div", "calculating__choose-item_active");

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "2px solid red";
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
      calcTotal();
    });
  }
  getDynamicInfo("#height");
  getDynamicInfo("#weight");
  getDynamicInfo("#age");

  calcTotal();
});
