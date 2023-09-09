import { setLike } from "../apiHelper";

export function handleButtonClick(slider) {
    const sliderSlides = document.querySelectorAll('.cars__slide');
    const likeButton = sliderSlides[slider.realIndex].querySelector('.cars__like-button');
    const likeCount = sliderSlides[slider.realIndex].querySelector('.cars__like-count span');    

    likeButton.addEventListener('click', async function () {
        likeButton.disabled = true;
        await setLike(likeButton.dataset.index);
        likeButton.disabled = false;
        likeButton.classList.add('cars__like-button_active');

        const id = likeButton.dataset.index;

        localStorageData.push({ id: Number(id), isLiked: true, likeCount: Number(likeCount.textContent) + 1 });
        localStorage.setItem("likedArray", JSON.stringify(localStorageData));

        likeCount.textContent = Number(likeCount.textContent) + 1;
    })

    let localStorageData;

    if (localStorage.getItem('likedArray')) {
        localStorageData = JSON.parse(localStorage.getItem('likedArray'));
    } else {
        localStorageData = [];
    }

    if (localStorageData.length > 0) {
        localStorageData.forEach(element => {
            if (element.id === slider.realIndex) {
                likeButton.classList.add('cars__like-button_active');
                likeCount.textContent = element.likeCount;
            }
        });
    }
}