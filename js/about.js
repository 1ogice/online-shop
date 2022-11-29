(function burgerSwitch() {
  let burger = document.querySelector(".burger"),
    menu = document.querySelector(".menu");

  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
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
