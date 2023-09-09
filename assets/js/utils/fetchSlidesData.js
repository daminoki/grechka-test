import { getSlidesList } from "../apiHelper"

export async function fetchSlidesData(searchParams) {
    const { data, countAll } = await getSlidesList(searchParams);

    if (data) {
        const slidesList = data;
        const slidesNumber = countAll;

        return { slidesList, slidesNumber };
    }
}