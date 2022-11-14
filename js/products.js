import products from "./products.json" assert { type: "json" };

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
