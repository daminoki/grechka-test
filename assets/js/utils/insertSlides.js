export function insertSlides(slidesArray) {
    return slidesArray.map((slide) => {
        return `<div class="cars__slide swiper-slide">
            <div class="cars__img">
                <img src=${slide.imgUrl} alt=${slide.title}>
            </div>
            <div class=cars__title-wrapper>
                <h2 class="cars__title">${slide.title}</h2>
            </div>
            <div class="cars__description-wrapper"><p class="cars__description">${slide.desc}</p></div>
            <div class="cars__like-wrapper">
                <button type="button" data-index=${slide.id} class="cars__like-button"></button>
                <p class="cars__like-count">like: <span>${slide.likeCnt}</span></p>
            </div>
        </div>`;
    });
}