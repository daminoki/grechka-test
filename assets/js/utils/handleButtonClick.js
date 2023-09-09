import { setLike } from "../apiHelper";
import { popup } from "../components/popup";

export function handleButtonClick(slider) {
    const sliderSlides = document.querySelectorAll('.cars__slide');
    const likeButton = sliderSlides[slider.realIndex].querySelector('.cars__like-button');
    const likeCount = sliderSlides[slider.realIndex].querySelector('.cars__like-count span');
    let popupData = {};

    likeButton.addEventListener('click', async function () {
        likeButton.disabled = true;
        const { data, error } = await setLike(likeButton.dataset.index);
        
        if (data) {
            popupData = data;

            likeButton.disabled = false;
            likeButton.classList.add('cars__like-button_active');

            const id = likeButton.dataset.index;

            localStorageData.push({ id: Number(id), isLiked: true, likeCount: Number(likeCount.textContent) + 1 });
            localStorage.setItem("likedArray", JSON.stringify(localStorageData));

            likeCount.textContent = Number(likeCount.textContent) + 1;
        }

        if (error) {
            popupData = {
                title: "Произошла ошибка",
                desc: "Пожалуйста, попробуйте позже"
            };
        }

        popup(popupData);
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