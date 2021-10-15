import axios from 'axios';
import server from 'helpers/Functions/server';

export async function getAddress() {
  const baseUrl = await axios.post(`http://localhost:1337/user-details`);
  const resData = baseUrl.data;

  return resData;
}

export async function postAddress(addressData) {
  const baseUrl = await server.post(`http://localhost:1337/user-details`, addressData);
  const resData = baseUrl.data;
  console.log(`resData: `, resData);
  return resData;
}