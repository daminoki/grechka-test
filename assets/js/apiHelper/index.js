import { apiHelper } from "./apiHelper";

export const getSlidesList = async(params) => {
    return apiHelper('get', 'slides', { params })
};

export const setLike = async(id) => {
    return apiHelper('post', `slides/${id}/like`);
};