import axios from "axios";

export async function addToCart(data: ICart) {
  // console.log(`data: `, data);
  const addUrl = await axios.post(`http://localhost:1337/carts/`, data);
  const resAddData = addUrl.data;

  // console.log('resAddData :>> ', resAddData);
  return resAddData;

};

// COMMT: increments cart number
export async function incrCartNumber(product) {
  // console.log(`product: `, product);
  let id = 0;
  const getUrl = await axios.get(`http://localhost:1337/carts/`);
  // console.log(`getUrl?.data: `, getUrl?.data);
  const matchedProd = getUrl?.data?.filter(currProd => currProd?.productId === product?.productId);
  // console.log(`##matchedProd: `, matchedProd);
  id = matchedProd?.[0]?.id;
  if (id === 0 || id === undefined) return console.error('Not incremented Product');
  const incrUrl = await axios.put(`http://localhost:1337/carts/${id}`, {'repeatItem': product?.repeatItem});
  const resIncrData = incrUrl?.data;

  console.log(`resIncrData: `, resIncrData);
  return resIncrData;

};


