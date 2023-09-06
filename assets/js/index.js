import { getSlidesList } from "./apiHelper";

(async () => {
    let slidesList = [];
    let slidesNumber = 0;

    const fetchParams = {
        limit: 3,
        offset: 0
    };

    async function fetchData() {
        const { data, countAll } = await getSlidesList(fetchParams);

        if (data) {
            slidesList = data;
            slidesNumber = countAll;
        }
    }

      
    await fetchData();

    function insertSlides() {
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
    }

    let init = false;

    function initCarsSlider() {
        if (slidesList.length > 0) {
            init = true;

            const sliderContainer = document.querySelector('.cars__slider .swiper-wrapper');

            sliderContainer.innerHTML = slidesList.map((slide) => {
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
                allowTouchMove: false,
        
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
                    slideChange: async function (s) {
                        if (s.realIndex === s.slides.length - 1) {
                            console.log(slidesNumber - fetchParams.offset > 3)
                            if (slidesNumber - fetchParams.offset > 3) {
                                fetchParams.offset += 3;
                                await fetchData();
                                const fetchedSlides = slidesList.map((slide) => {
                                    return `<div class="cars__slide swiper-slide"><div class="cars__img"><img src=${slide.imgUrl} alt=${slide.title}></div></div>`
                                });
                                s.appendSlide(fetchedSlides);
                            }
                        }
                    }
                }
            });
        } else {
            carsSlider.destroy();
            init = false;
        }
    }

    initCarsSlider();

    console.log(slidesList);
})()