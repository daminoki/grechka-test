import { apiHelper } from "./apiHelper";

export const getSlidesList = async() => apiHelper('get', '/slides?offset=3&limit=3');