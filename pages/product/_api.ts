import axios from "axios";

export async function addToCart(data: ICart) {
  // console.log(`data: `, data);
  const addUrl = await axios.post(`http://localhost:1337/carts/`, data);
  const resAddData = addUrl.data;

  // console.log('resAddData :>> ', resAddData);
  return resAddData;

};

// COMMT: increments cart number
export async function incrCartNumber(data) {
  let id = 0;
  const getUrl = await axios.get(`http://localhost:1337/carts/`);
  const currProduct = getUrl.filter(el => el.productId === data.productId);
  id = currProduct?.id;
  if (id === 0) return;
  const incrUrl = await axios.put(`http://localhost:1337/carts/${id}`, data);
  const resIncrData = incrUrl.data;

  // console.log(`resIncrData: `, resIncrData);
  return resIncrData;

};


