import { getSlidesList } from "./apiHelper";

(async () => {
    let slidesList = [];

    async function fetchData() {
        const { data } = await getSlidesList();
        if (data) {
            slidesList = data;
        }
    }
      
    await fetchData();

    let init = false;

    function initCarsSlider() {
        if (slidesList.length > 0) {
            init = true;
            const sliderContainer = document.querySelector('.cars__slider .swiper-wrapper');

            sliderContainer.innerHTML = slidesList.map((slide, index) => {
                return `
                    <div class="cars__slide swiper-slide">
                        <div class="cars__img">
                            <img src=${slide.imgUrl} alt=${slide.title}>
                        </div>
                    </div>
                `;
            }).join('');
        
            const carsSlider = new Swiper('.cars__slider', {
                slidesPerView: 1,
        
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
            });
        } else {
            carsSlider.destroy();
            init = false;
        }
    }

    initCarsSlider();

    console.log(slidesList);
})()