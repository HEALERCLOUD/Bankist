"use strict";

//////////////////
///// variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const btnFeatures = document.querySelector(".btn");
const navLinks = document.querySelector(".nav__links");
const btnOperation = document.querySelectorAll(".operations__tab");
const lableOperationContant = document.querySelectorAll(".operations__content");
const operationsContainer = document.querySelector(".operations");
const nav = document.querySelector(".nav");
const allSection = document.querySelectorAll(".section");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dots = document.querySelector(".dots");
const sendToInside = document.querySelector(".send__to__inside");

////////////////////////
//global variables
let currentSlide = 0;
const maxSlide = slides.length;

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

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    const wholeNav = [...siblings, logo];
    wholeNav.forEach((el) =>
      el !== e.target ? (el.style.opacity = opacity) : el
    );
  }
};

const stickyNav = function (entries) {
  [entries] = entries;
  if (!entries.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const goToSlide = function () {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
  activateDot();
};

const nextSlideRight = function () {
  if (currentSlide < maxSlide - 1) currentSlide++;
  else currentSlide = 0;
  goToSlide();
};

const nextSlideLeft = function () {
  if (currentSlide === 0) currentSlide = maxSlide - 1;
  else currentSlide--;
  goToSlide();
};

const creatDots = function (e) {
  slides.forEach((_, i) => {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide=${i}></button>`
    );
  });
};

creatDots();

const activateDot = function () {
  document
    .querySelectorAll(".dots__dot")
    .forEach((el) => el.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${currentSlide}"]`)
    .classList.add("dots__dot--active");
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

//nave hovers
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

//sticky navbar
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(document.querySelector("header"));

operationsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  if (!clicked.classList.contains("operations__tab--active")) {
    btnOperation.forEach((el) =>
      el.classList.remove("operations__tab--active")
    );
    clicked.classList.add("operations__tab--active");
    lableOperationContant.forEach((el) =>
      el.classList.remove("operations__content--active")
    );
    lableOperationContant[+clicked.getAttribute("data-tab") - 1].classList.add(
      "operations__content--active"
    );
  }
});

//page navigation
btnScrollTo.addEventListener("click", function () {
  scrollIn(document.querySelector("#section--1"));
});
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

//reveal sections
const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    [entries] = entries;
    if (entries.isIntersecting) {
      entries.target.classList.remove("section--hidden");
      observer.unobserve(entries.target);
    }
  },
  {
    root: null,
    threshold: 0.15,
  }
);

allSection.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

//lazy loading images
const imgTarget = document.querySelectorAll("img[data-src]");

const imgObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", (e) => {});
    entry.target.classList.remove("lazy-img");
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.2,
  }
);
imgTarget.forEach((img) => imgObserver.observe(img));

//slider
goToSlide();

btnRight.addEventListener("click", nextSlideRight);
btnLeft.addEventListener("click", nextSlideLeft);
document.addEventListener("keydown", function (e) {
  if (e.code === "ArrowRight") nextSlideRight();
  else if (e.code === "ArrowLeft") nextSlideLeft();
});

//adding powerdots to dom
dots.addEventListener("click", (e) => {
  // console.log(e.target.getAttribute("data-slide"));
  if (e.target.classList.contains("dots__dot")) {
    currentSlide = e.target.getAttribute("data-slide");
    goToSlide();
  }
});

sendToInside.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "Bankist_inside/index.html";
});
