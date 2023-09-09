import { fetchSlidesData } from "./fetchSlidesData";
import { insertSlides } from "./insertSlides";
import { handleButtonClick } from "./handleButtonClick";

export async function handleSlideChange(slider, slidesNumber, searchParams) {
    if (slider.realIndex === slider.slides.length - 1 && slidesNumber > slider.slides.length) {
        searchParams.offset += 3;

        const { slidesList } = await fetchSlidesData(searchParams);

        slider.appendSlide(insertSlides(slidesList));
    }

    handleButtonClick(slider);
}