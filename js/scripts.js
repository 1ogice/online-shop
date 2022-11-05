// function test() {
//   fetch("./youtJSON.json")
//     .then((res) => res.json())
//     .then((data) => console.log(data));
//   return data;
// }

// let info = test();

window.scrollBy(0, 1);

let pageUp = document.querySelector("#pageUp");

document.onscroll = function () {
  if (window.scrollY < 50) {
    pageUp.classList.add("page-up-hidden");
  } else {
    pageUp.classList.remove("page-up-hidden");
  }
};

let burger = document.querySelector(".burger"),
  menu = document.querySelector(".menu");

burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
});
