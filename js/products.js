import products from "./products.json" assert { type: "json" };

let burger = document.querySelector(".burger"),
  menu = document.querySelector(".menu");

burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
});

const accordion = document.getElementsByClassName("container");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

// for (let elem of products) {
//   for (let i = 0; i < 1; i++) {
//     console.log(elem.name);
//   }
// }