import axios from 'axios';

export async function getAddress() {
  const baseUrl = await axios.post(`http://localhost:1337/user-details`);
  const resData = baseUrl.data;

  return resData;
}

export async function postAddress(addressData) {
  const baseUrl = await axios.post(`http://localhost:1337/user-details`, addressData);
  const resData = baseUrl.data;

  return resData;
}