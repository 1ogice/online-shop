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

    productButtonMinus.onclick = () => {
      if (productQuantity.value > 0) {
        productQuantity.value -= 1;
      }
    };

    let productQuantity = document.createElement("input");
    productQuantity.className = "product-button-value";
    productQuantity.setAttribute("type", "number");
    productQuantity.value = 0;
    productButton.appendChild(productQuantity);

    let productButtonPlus = document.createElement("button");
    productButtonPlus.className = "product-button-plus";
    productButtonPlus.innerHTML = "+";
    productButton.appendChild(productButtonPlus);

    productButtonPlus.onclick = function addProduct() {
      productQuantity.value = +productQuantity.value + 1;

      (function productListTemplateGeneration() {
        let cartField = document.querySelector(".products-list");

        let productDiv = document.createElement("div");
        productDiv.className = "product-div";
        cartField.appendChild(productDiv);

        let productDivImage = document.createElement("img");
        productDivImage.className = "product-div-image";
        productDivImage.src = data[i].link;
        productDiv.appendChild(productDivImage);

        let productDivInfo = document.createElement("div");
        productDivInfo.className = "product-div-info";
        productDiv.appendChild(productDivInfo);

        let productDivName = document.createElement("h2");
        productDivName.className = "product-div-name";
        productDivName.innerHTML = data[i].name;
        productDivInfo.appendChild(productDivName);

        let productDivPrice = document.createElement("p");
        productDivPrice.className = "product-div-price";
        productDivPrice.innerHTML = data[i].price + "$";
        productDivInfo.appendChild(productDivPrice);

        let productDivButtonRemove = document.createElement("button");
        productDivButtonRemove.className = "product-div-button-remove";
        productDivButtonRemove.innerHTML = "remove";
        productDivInfo.appendChild(productDivButtonRemove);

        let productDivQuantity = document.createElement("div");
        productDivQuantity.className = "product-div-quantity";
        productDiv.appendChild(productDivQuantity);

        let productDivButtonUp = document.createElement("button");
        productDivButtonUp.className = "product-div-button-up";
        productDivQuantity.appendChild(productDivButtonUp);
        productDivButtonUp.onclick = () => {
          addProduct();
        };

        let productDivValue = document.createElement("input");
        productDivValue.className = "product-div-value";
        productDivValue.value = 0;
        productDivQuantity.appendChild(productDivValue);

        let productDivButtonDown = document.createElement("button");
        productDivButtonDown.className = "product-div-button-down";
        productDivQuantity.appendChild(productDivButtonDown);
      })();
    };

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
