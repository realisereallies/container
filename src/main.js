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
    const isActive = burger.classList.contains("active");
    burger.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    burger.setAttribute("aria-expanded", !isActive);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const sliderElement = document.querySelector(".hero__slider");
  const dots = document.querySelectorAll(".hero__dot");

  if (!dots.length) return;

  function updateDots(activeIndex) {
    if (activeIndex < 0 || activeIndex >= dots.length) return;

    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      dot.setAttribute(
        "aria-selected",
        index === activeIndex ? "true" : "false"
      );
    });

    if (dots[activeIndex]) {
      dots[activeIndex].classList.add("active");
      dots[activeIndex].setAttribute("aria-selected", "true");
    }
  }

  function handleDotClick(index, swiper = null) {
    const validIndex = parseInt(index);
    if (isNaN(validIndex) || validIndex < 0 || validIndex >= dots.length)
      return;

    if (swiper) {
      swiper.slideTo(validIndex);
    } else {
      updateDots(validIndex);
    }
  }

  if (sliderElement && window.innerWidth <= 767) {
    try {
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
          paginationUpdate: function (swiper) {
            const active = swiper.pagination.bullets.findIndex((b) =>
              b.classList.contains("swiper-pagination-bullet-active")
            );
            updateDots(active);
          },
        },
      });

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          handleDotClick(dot.dataset.index, swiper);
        });
      });
    } catch (error) {
      console.error("Swiper initialization error:", error);
    }
  } else {
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        handleDotClick(this.dataset.index);
      });
    });
    updateDots(0);
  }
});
