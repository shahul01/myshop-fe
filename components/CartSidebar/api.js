import axios from 'axios';

export async function deleteCart(id) {
  const deleteUrl = await axios.delete(`http://localhost:1337/carts/${id}`);
  const resDeleteData = deleteUrl.data;
  // console.log('resDeleteData :>> ', resDeleteData);
  return resDeleteData;
}
