import { fetchSlidesData } from "../utils/fetchSlidesData";
import { insertSlides } from "../utils/insertSlides";
import { handleSlideChange } from "../utils/handleSlideChange";
import { handleButtonClick } from "../utils/handleButtonClick";

export async function carsSlider() {
    const sliderContainer = document.querySelector('.cars__slider .swiper-wrapper');
    let init = false;

    const searchParams = {
        limit: 3,
        offset: 0
    };

    const { slidesList, slidesNumber } = await fetchSlidesData(searchParams, slidesList, slidesNumber);

    function initCarsSlider() {
        if (!slidesList.length) {
            return;
        }

        init = true;

        sliderContainer.innerHTML = insertSlides(slidesList).join("");

        const carsSlider = new Swiper('.cars__slider', {
            slidesPerView: 1,
            allowTouchMove: false,
            speed: 1000,
    
            navigation: {
                nextEl: '.cars__next-button',
                prevEl: '.cars__prev-button'
            },
    
            effect: "creative",
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: ["-20%", 0, -1],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },

            on: {
                init: function (s) {
                    handleButtonClick(s);
                },
                slideChange: function (s) {
                    handleSlideChange(s, slidesNumber, searchParams, slidesList);
                }
            }
        })
    }

    initCarsSlider();
};