window.scrollBy(0, 1);

let pageUp = document.querySelector("#pageUp");

document.onscroll = function () {
  if (window.scrollY < 100) {
    pageUp.classList.add("page-up-hidden");
  } else {
    pageUp.classList.remove("page-up-hidden");
  }
};
