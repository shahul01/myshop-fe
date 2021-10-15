import axios from 'axios';
import server from 'helpers/Functions/server';

// let user = null;
// let userId = 0;

// function getUser() {
//   if (typeof window === undefined) return
//   let localUser = localStorage.getItem('__userAuth');

//   if (!localUser) return
//   localUser = JSON.parse(localUser);
//   console.log(`localUser: `, localUser);

//   user = localUser;
//   userId = localUser.id;

//   return userId;
// };

// getUser();

// console.log(`userId 0: `, userId);
// if (userId !== 0) {

//   console.log(`userId: `, userId);
// }

export async function getAddress(userId) {
  console.log(`userId: `, userId);
  const baseUrl = await axios.get(`http://localhost:1337/user-details?_users_permissions_user=${userId}`);
  const resData = baseUrl.data;
  console.log(`resData: `, resData);

  return resData;
}

export async function postAddress(addressData) {
  const baseUrl = await server.post(`http://localhost:1337/user-details`, addressData);
  const resData = baseUrl.data;
  console.log(`resData: `, resData);
  return resData;
}