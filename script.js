"use strict";

//////////////////
///// buttons
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const btnFeatures = document.querySelector("btn");
const navLinks = document.querySelector(".nav__links");
const btnOperation = document.querySelectorAll(".operations__tab");
const lableOperationContant = document.querySelectorAll(".operations__content");

/////////////////////////
//functions
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const scrollIn = function (el) {
  const cords = el.getBoundingClientRect();
  window.scrollTo({
    left: cords.x + window.pageXOffset,
    top: cords.y + window.pageYOffset,
    behavior: "smooth",
  });
};

//////////////////////////
//event handlers
btnsOpenModal.forEach((e) => e.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnOperation.forEach((el, i) =>
  el.addEventListener("click", (e) => {
    if (!el.classList.contains("operations__tab--active")) {
      btnOperation.forEach((e) =>
        e.classList.remove("operations__tab--active")
      );
      el.classList.add("operations__tab--active");
      lableOperationContant.forEach((el) =>
        el.classList.remove("operations__content--active")
      );
      lableOperationContant[i].classList.add("operations__content--active");
    }
  })
);

//page navigation

btnScrollTo.addEventListener("click", function () {
  scrollIn(document.querySelector("#section--1"));
});

// document.querySelectorAll(".nav__link").forEach((link) =>
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     const target = document.querySelector(id);
//     const cords = target.getBoundingClientRect();
//     window.scrollTo({
//       left: cords.x + window.pageXOffset,
//       top: cords.y + window.pageYOffset,
//       behavior: "smooth",
//     });
//   })
// );
navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    if (id.length > 1) {
      const target = document.querySelector(id).getBoundingClientRect();
      window.scrollTo({
        left: target.x + window.pageXOffset,
        top: target.y + window.pageYOffset,
        behavior: "smooth",
      });
    }
  }
});

console.log("test");
