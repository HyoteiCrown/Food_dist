function slider(){
     //slider

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
}

module.exports = slider;