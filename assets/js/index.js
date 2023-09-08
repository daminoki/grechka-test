import { getSlidesList, setLike } from "./apiHelper";

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

    let init = false;

    const handleLikeButtonClick = (s) => {
        const sliderSlides = document.querySelectorAll('.cars__slide');
        const likeButton = sliderSlides[s.realIndex].querySelector('.cars__like-button');
        const likeCount = sliderSlides[s.realIndex].querySelector('.cars__like-count span');
    
        likeButton.addEventListener('click', async () => {
            await setLike(likeButton.dataset.index);
            likeButton.style.pointerEvents = 'none';
            likeButton.classList.add('cars__like-button_active');
            likeCount.textContent = Number(likeCount.textContent) + 1;
        });
    };
    

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
                        <div class=cars__title-wrapper>
                            <h2 class="cars__title">${slide.title}</h2>
                        </div>
                        <div class="cars__description-wrapper"><p class="cars__description">${slide.desc}</p></div>
                        <div class="cars__like-wrapper">
                            <button type="button" class="cars__like-button" data-index=${slide.id}></button>
                            <p class="cars__like-count">like: <span>${slide.likeCnt}</span></p>
                        </div>
                    </div>
                `;
            }).join('');
        
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
                        handleLikeButtonClick(s);
                    },

                    slideChange: async function (s) {
                        if (s.realIndex === s.slides.length - 1) {
                            console.log(slidesNumber - fetchParams.offset > 3)
                            if (slidesNumber - fetchParams.offset > 3) {
                                fetchParams.offset += 3;
                                await fetchData();
                                const fetchedSlides = slidesList.map((slide) => {
                                    return `
                                        <div class="cars__slide swiper-slide">
                                            <div class="cars__img">
                                                <img src=${slide.imgUrl} alt=${slide.title}>
                                            </div>
                                            <h2 class="cars__title">${slide.title}</h2>
                                            <div class="cars__description-wrapper">
                                                <p class="cars__description">${slide.desc}</p>
                                            </div>
                                            <div class="cars__like-wrapper">
                                                <button type="button" class="cars__like-button"></button>
                                                <p class="cars__like-count">like: <span>${slide.likeCnt}</span></p>
                                            </div>
                                        </div>`
                                });
                                s.appendSlide(fetchedSlides);
                            }
                        };

                        handleLikeButtonClick(s);
                    }
                }
            });
        } else {
            carsSlider.destroy();
            init = false;
        }
    }

    initCarsSlider();
})()