export function insertSlides(slidesArray) {
    return slidesArray.map((slide) => {
        function getImage() {
            const imgElement = document.createElement('img');
            imgElement.className = 'cars__img';
            imgElement.src = slide.imgUrl;
            imgElement.alt = slide.title;
            
            imgElement.onerror = function() {
                console.log(1)
                const errorElement = `
                    <div class="cars__img-error">
                        <p class="cars__error-text">ERROR</p>
                        <img src="./templates/img/error.png" alt="Ошибка загрузки слайда" width="950" height="110">
                    </div>
                `;

                imgElement.replaceWith(errorElement);
            };
            
            return imgElement;
        }

        return `
            <div class="cars__slide swiper-slide">
                <div class="cars__img-container">
                    ${getImage().outerHTML}
                </div>
                <div class="cars__title-wrapper">
                    <h2 class="cars__title">${slide.title}</h2>
                </div>
                <div class="cars__description-wrapper"><p class="cars__description">${slide.desc}</p></div>
                <div class="cars__like-wrapper">
                    <button type="button" data-index=${slide.id} class="cars__like-button"></button>
                    <p class="cars__like-count">like: <span>${slide.likeCnt}</span></p>
                </div>
            </div>
        `;
    });
}
