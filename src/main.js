import "./style.scss";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const sliderElement = document.querySelector(".hero__slider");
  const dots = document.querySelectorAll(".hero__dot");

  function updateDots(activeIndex) {
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[activeIndex] !== undefined) {
      dots[activeIndex].classList.add("active");
    }
  }

  if (sliderElement && window.innerWidth <= 767) {
    const swiper = new Swiper(".hero__slider", {
      modules: [Navigation, Pagination],
      slidesPerView: 1.07,
      breakpoints: {
        400: {
          slidesPerView: 1.4,
        },
        500: {
          slidesPerView: 1.7,
        },
      },
      spaceBetween: 10,
      navigation: {
        nextEl: ".hero__slider-buttons .swiper-button-next",
        prevEl: ".hero__slider-buttons .swiper-button-prev",
        disabledClass: "swiper-button-disabled",
      },
      pagination: {
        el: ".hero__slider-buttons .swiper-pagination",
        clickable: true,
      },
      on: {
        paginationUpdate: function (swiper, paginationEl) {
          const active = swiper.pagination.bullets.findIndex((b) =>
            b.classList.contains("swiper-pagination-bullet-active")
          );

          dots.forEach((dot) => dot.classList.remove("active"));

          if (active !== -1 && dots[active]) {
            dots[active].classList.add("active");
          }
        },
      },
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index);
        if (!isNaN(index)) {
          swiper.slideTo(index);
        }
      });
    });
  }

  if (dots.length > 0) {
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = parseInt(this.dataset.index);
        if (!isNaN(index) && index >= 0 && index < dots.length) {
          updateDots(index);
        }
      });
    });

    updateDots(0);
  }
});
