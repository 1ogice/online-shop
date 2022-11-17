import products from "./products.json" assert { type: "json" };

window.productsFilter = productsFilter;
window.priceFilter = priceFilter;

(function burgerSwitch() {
  let burger = document.querySelector(".burger"),
    menu = document.querySelector(".menu");

  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
  });
})();

(function cartSwitch() {
  let cart = document.querySelector(".cart"),
    basket = document.querySelector(".icon-basket"),
    close = document.querySelector(".cart-close");

  basket.addEventListener("click", function () {
    cart.classList.toggle("active");
  });
  close.addEventListener("click", function () {
    cart.classList.remove("active");
  });
})();

(function accordionSwitch() {
  const accordion = document.getElementsByClassName("container");

  for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }
})();

(function productsGeneration(data) {
  data.sort(() => Math.random() - 0.5);

  for (let i = 0; i < data.length; i++) {
    let productsField = document.querySelector(".products-field");

    let productSection = document.createElement("div");
    productSection.className = "product-section";
    productsField.appendChild(productSection);

    let productPrice = document.createElement("p");
    productPrice.className = "product-price";
    productPrice.innerHTML = data[i].price + "$";
    productSection.appendChild(productPrice);

    let productImg = document.createElement("img");
    productImg.className = "product-img";
    productImg.src = data[i].link;
    productSection.appendChild(productImg);

    let productInfo = document.createElement("div");
    productInfo.className = "product-info";
    productSection.appendChild(productInfo);

    let productName = document.createElement("h2");
    productName.className = "product-name";
    productName.innerHTML = data[i].name;
    productInfo.appendChild(productName);

    let productButton = document.createElement("div");
    productButton.className = "product-button";
    productInfo.appendChild(productButton);

    let productButtonMinus = document.createElement("button");
    productButtonMinus.className = "product-button-minus";
    productButtonMinus.innerHTML = "-";
    productButton.appendChild(productButtonMinus);

    let productButtonValue = document.createElement("input");
    productButtonValue.className = "product-button-value";
    productButtonValue.setAttribute("type", "number");
    productButtonValue.value = 0; //NEED TO CHANGE
    productButton.appendChild(productButtonValue);

    let productButtonPlus = document.createElement("button");
    productButtonPlus.className = "product-button-plus";
    productButtonPlus.innerHTML = "+";
    productButton.appendChild(productButtonPlus);

    let productType = document.createElement("span");
    productType.className = "product-type";
    productType.innerHTML = data[i].type;
    productSection.appendChild(productType);
  }
})(products);

function productsFilter(filt) {
  let allProductsSections = document.querySelectorAll(".product-section");

  for (let elem of allProductsSections) {
    elem.style.display = "flex";

    if (filt === "all") {
      elem.style.display = "flex";
    } else if (elem.querySelector(".product-type").innerHTML != filt) {
      elem.style.display = "none";
    }
  }
}

function priceFilter() {
  function maxPrice() {
    let maxPrice = products.reduce((prev, current) =>
      prev.price > current.price ? prev : current
    );
    return +maxPrice.price.toFixed(0);
  }

  function minPrice() {
    let minPrice = products.reduce((prev, current) =>
      prev.price < current.price ? prev : current
    );
    return +minPrice.price.toFixed(0);
  }

  progressBar.setAttribute("max", maxPrice());
  progressBar.setAttribute("min", minPrice());

  progressBarValue.innerHTML = progressBar.value + "$";

  let allProductsSections = document.querySelectorAll(".product-section");

  for (let elem of allProductsSections) {
    if (
      +elem
        .querySelector(".product-price")
        .innerHTML.replace(/[^0-9.\s]/gi, " ") > progressBar.value
    ) {
      elem.style.display = "none";
    } else if (
      +elem
        .querySelector(".product-price")
        .innerHTML.replace(/[^0-9.\s]/gi, " ") < progressBar.value
    ) {
      elem.style.display = "flex";
    }
  }
}

function productsSearch() {
  let allProductsSections = document.querySelectorAll(".product-section");

  for (let elem of allProductsSections) {
    if (
      elem
        .querySelector(".product-name")
        .innerHTML.toUpperCase()
        .indexOf(searchInput.value.toUpperCase()) > -1
    ) {
      elem.style.display = "";
    } else {
      elem.style.display = "none";
    }
  }
}

document.addEventListener("keyup", productsSearch);
