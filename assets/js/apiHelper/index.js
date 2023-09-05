import { apiHelper } from "./apiHelper";

export const getSlidesList = async() => apiHelper('get', '/slides');