import { getSlidesList } from "./apiHelper";

async function fetchData() {
    const { data } = await getSlidesList();
    console.log(data);
}
  
fetchData();