// function test() {
//   fetch("./youtJSON.json")
//     .then((res) => res.json())
//     .then((data) => console.log(data));
//   return data;
// }

// let info = test();

let burger = document.querySelector(".burger"),
  menu = document.querySelector(".menu");

burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
});

const accordion = document.getElementsByClassName("container");

for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}
