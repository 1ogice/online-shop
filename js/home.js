import products from "./products.json" assert { type: "json" };

let burger = document.querySelector(".burger"),
  menu = document.querySelector(".menu");

burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
});

let cart = document.querySelector(".cart"),
  basket = document.querySelector(".icon-basket"),
  close = document.querySelector(".cart-close");

basket.addEventListener("click", function () {
  cart.classList.toggle("active");
});
close.addEventListener("click", function () {
  cart.classList.remove("active");
});

(function selectionOfMainGoods(array) {
  array.sort(() => Math.random() - 0.5);
  array = array.slice(0, 3);

  let prodNames = document.querySelectorAll(".prod-name");
  let prodPrices = document.querySelectorAll(".prod-price");
  let imgLinks = document.querySelectorAll(".article-img");

  for (let elem of array) {
    for (let i = 0; i < array.length; i++) {
      prodNames[i].innerHTML = array[i].name;
      prodPrices[i].innerHTML = array[i].price;
      imgLinks[i].src = array[i].link;
    }
  }

  return array;
})(products);

const accordion = document.getElementsByClassName("container");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}
