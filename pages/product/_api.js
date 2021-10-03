import axios from "axios";

export async function addToCart(data) {
  const addUrl = await axios.post(`http://localhost:1337/carts/`, data);
  const resAddData = addUrl.data;

  // console.log('resAddData :>> ', resAddData);
  return resAddData;

}