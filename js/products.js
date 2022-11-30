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
  let accordion = document.getElementsByClassName("container");

  for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }
})();

(function productsGeneration(data) {
  data.sort(() => Math.random() - 0.5);

  for (let i = 0; i < data.length; i++) {
    let productsField = document.querySelector(".products-field"),
      productSection = document.createElement("div"),
      productPrice = document.createElement("p"),
      productImg = document.createElement("img"),
      productInfo = document.createElement("div"),
      productName = document.createElement("h2"),
      productButton = document.createElement("div"),
      productButtonMinus = document.createElement("button"),
      productQuantity = document.createElement("input"),
      productButtonPlus = document.createElement("button"),
      cartField = document.querySelector(".products-list");

    function cartItemsQuantity() {
      let basketSpanValue = document.querySelector(".basket-span-value");
      basketSpanValue.innerHTML =
        cartField.querySelectorAll(".product-div").length;
    }

    productSection.className = "product-section";
    productSection.dataset.id = i;
    productsField.appendChild(productSection);

    productPrice.className = "product-price";
    productPrice.innerHTML = data[i].price + "$";
    productSection.appendChild(productPrice);

    productImg.className = "product-img";
    productImg.src = data[i].link;
    productSection.appendChild(productImg);

    productInfo.className = "product-info";
    productSection.appendChild(productInfo);

    productName.className = "product-name";
    productName.innerHTML = data[i].name;
    productInfo.appendChild(productName);

    productButton.className = "product-button";
    productInfo.appendChild(productButton);

    productButtonMinus.className = "product-button-minus";
    productButtonMinus.innerHTML = "-";
    productButton.appendChild(productButtonMinus);

    productQuantity.className = "product-button-value";
    productQuantity.setAttribute("type", "number");
    productQuantity.value = 0;
    productButton.appendChild(productQuantity);

    productButtonPlus.className = "product-button-plus";
    productButtonPlus.innerHTML = "+";
    productButton.appendChild(productButtonPlus);

    productButtonPlus.onclick = function addProduct() {
      productQuantity.value = +productQuantity.value + 1;

      let productDiv = document.createElement("div"),
        productDivId = productSection.getAttribute("data-id"),
        currentItem = cartField.querySelector(`[data-id="${productDivId}"]`),
        productDivImage = document.createElement("img"),
        productDivInfo = document.createElement("div"),
        productDivName = document.createElement("h2"),
        productDivPrice = document.createElement("p"),
        productDivButtonRemove = document.createElement("button"),
        productDivQuantity = document.createElement("div"),
        productDivButtonUp = document.createElement("button"),
        productDivValue = document.createElement("input"),
        productDivButtonDown = document.createElement("button");

      (function productListTemplateGeneration() {
        if (currentItem) {
          currentItem.querySelector(".product-div-value").value =
            +currentItem.querySelector(".product-div-value").value + 1;
          return false;
        }

        productDiv.className = "product-div";
        productDiv.dataset.id = productDivId;
        cartField.appendChild(productDiv);

        productDivImage.className = "product-div-image";
        productDivImage.src = data[i].link;
        productDiv.appendChild(productDivImage);

        productDivInfo.className = "product-div-info";
        productDiv.appendChild(productDivInfo);

        productDivName.className = "product-div-name";
        productDivName.innerHTML = data[i].name;
        productDivInfo.appendChild(productDivName);

        productDivPrice.className = "product-div-price";
        productDivPrice.innerHTML = data[i].price + "$";
        productDivInfo.appendChild(productDivPrice);

        productDivButtonRemove.className = "product-div-button-remove";
        productDivButtonRemove.innerHTML = "remove";
        productDivButtonRemove.onclick = () => {
          cartField.removeChild(productDiv);

          productQuantity.value = 0;

          cartItemsQuantity();
        };
        productDivInfo.appendChild(productDivButtonRemove);

        productDivQuantity.className = "product-div-quantity";
        productDiv.appendChild(productDivQuantity);

        productDivButtonUp.className = "product-div-button-up";
        productDivQuantity.appendChild(productDivButtonUp);
        productDivButtonUp.onclick = () => {
          addProduct();
        };

        productDivValue.className = "product-div-value";
        productDivValue.value = 1;
        productDivQuantity.appendChild(productDivValue);

        function removeProduct() {
          currentItem = cartField.querySelector(`[data-id="${productDivId}"]`);

          if (
            productQuantity.value > 0 &&
            currentItem.querySelector(".product-div-value").value > 0
          ) {
            productQuantity.value -= 1;
            currentItem.querySelector(".product-div-value").value =
              +currentItem.querySelector(".product-div-value").value - 1;
            if (+currentItem.querySelector(".product-div-value").value === 0) {
              cartField.removeChild(productDiv);
              cartItemsQuantity();
            }
          }
        }
        productButtonMinus.onclick = () => {
          removeProduct();
          calcTotalSum();
        };

        productDivButtonDown.className = "product-div-button-down";
        productDivButtonDown.onclick = () => {
          removeProduct();
          calcTotalSum();
        };
        productDivQuantity.appendChild(productDivButtonDown);
      })();

      cartItemsQuantity();

      function calcTotalSum() {
        let allItems = cartField.querySelectorAll(".product-div"),
          totalPriceValue = document.querySelector(".total-price");

        if (allItems.length == 0) {
          totalPriceValue.innerHTML = 0;
        }

        let totalPrice = 0;

        allItems.forEach((item) => {
          let itemQuantity = item.querySelector(".product-div-value"),
            itemPrice = item.querySelector(".product-div-price");

          let currentPrice =
            +itemPrice.innerHTML.replace("$", "") * +itemQuantity.value;

          totalPrice += currentPrice;
          totalPriceValue.innerHTML = totalPrice.toFixed(2);
        });
      }
      calcTotalSum();
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
