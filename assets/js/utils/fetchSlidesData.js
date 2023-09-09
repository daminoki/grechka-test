import { getSlidesList } from "../apiHelper"

export async function fetchSlidesData(searchParams) {
    const { data } = await getSlidesList(searchParams);

    if (data) {
        const slidesList = data.data;
        const slidesNumber = data.countAll;

        return { slidesList, slidesNumber };
    }
}