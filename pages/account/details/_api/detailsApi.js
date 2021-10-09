import axios from 'axios';

export async function postAddress(addressData) {
  const baseUrl = await axios.post(`http://localhost:1337/users`, addressData);
  const resData = baseUrl.data;

  return resData;
}