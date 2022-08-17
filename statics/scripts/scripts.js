"use strict";

const headerEl = document.querySelector("header");
const navMainEl = document.querySelector(".nav__main_list");
const navSubmenuElArray = document.querySelectorAll(".nav__main__submenu");
const testimonialsElArray = document.querySelectorAll(".slide");
const openModalBtn = document.querySelector(".btn__open__modal");
const closeModalBtn = document.querySelector(".button_close_modal");

const maxInd = testimonialsElArray.length - 1;
let actInd = 0;

////////////////////////////
// Testimonials slides
function nextslide() {
  if (actInd > maxInd) actInd = 0;
  testimonialsElArray.forEach(function (s, i) {
    s.style.transform = `translateX(${(i - actInd) * 100}%)`;
  });

  actInd++;
}
nextslide();
setInterval(nextslide, 5000);

////////////////////////////
// Nav elements fade-out fade-in menu_mobile
navMainEl.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("nav__main__link")) return;
  const el = e.target.parentElement;
  removeHover();
  el.querySelector(".nav__main__submenu").classList.add("hover");
});

headerEl.addEventListener("mouseleave", function (e) {
  if (e.target.classList.contains("header")) removeHover();
});

function removeHover() {
  navSubmenuElArray.forEach((element) => {
    element.classList.remove("hover");
  });
}

document.querySelector(".menu__mobil").addEventListener("click", function (ev) {
  navMainEl.classList.toggle("menu_active");
  let btnStrVal = "Menu";
  if (navMainEl.classList.contains("menu_active")) btnStrVal = "> <";
  ev.target.textContent = btnStrVal;
});

////////////////////////////
// Reveal-hidden modal
openModalBtn.addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
});

function closeModal() {
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
}
closeModalBtn.addEventListener("click", closeModal);
document.querySelector(".overlay").addEventListener("click", closeModal);

////////////////////////////
// Reveal sections

function revealSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section__hidden");
  observer.unobserve(entry.target);
}

const obsOpts = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, obsOpts);

const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  section.classList.add("section__hidden");
  sectionObserver.observe(section);
});

/////////////////////////////////
// Lazy images.

const lazyImages = document.querySelectorAll(".lazy__img");

function highDefImages(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.src.replace("-lazy", "");
  entry.target.addEventListener("load", () =>
    entry.target.classList.remove("lazy__img")
  );
  observer.unobserve(entry.target);
}

const obsOptsImg = {
  root: null,
  threshold: [0.1, 0.15, 0.2, 0.25],
  rootMargin: "200px",
};

const lazyImagesObserver = new IntersectionObserver(highDefImages, obsOptsImg);

lazyImages.forEach((img) => {
  lazyImagesObserver.observe(img);
});
