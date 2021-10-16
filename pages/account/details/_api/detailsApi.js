// import axios from 'axios';
import server from 'helpers/Functions/server';

export async function getAddress(userId) {
  const baseUrl = await server.get(`user-details?_users_permissions_user=${userId}`);
  const resData = baseUrl.data;
  // console.log(`resData: `, resData);

  return resData;
}

export async function postAddress(addressData) {
  const baseUrl = await server.post(`user-details`, addressData);
  const resData = baseUrl.data;
  console.log(`resData: `, resData);
  return resData;
}