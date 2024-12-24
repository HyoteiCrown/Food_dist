function cards() {
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
}
module.exports = cards;
