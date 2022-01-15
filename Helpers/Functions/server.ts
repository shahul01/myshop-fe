import axios from 'axios';
// import { useContext } from 'react';
// import { UserContext } from 'helpers/Contexts/UserContext';
// import { BACKEND_SERVER } from 'ENV';

// function getUser() {
//   const { user } = useContext(UserContext);
// };
// getUser();

// let baseURL = BACKEND_SERVER;
let baseURL = 'http://localhost:1337';

const instance = axios.create({
  baseURL
});

instance.interceptors.request.use((req) => {

  // if () {
  // }

  const token = getAuthToken();
  if (token) {
    const headers = req?.headers;
    if (typeof(headers?.['Authorization']) !== 'undefined') {
      headers['Authorization'] = token
    }

  }
    ;

  return req;

});

export function getAuthToken() {
  // const user = user;
  // console.log(`user: `, user);
  const user = localStorage.getItem('__userAuth');
  if (!user) return null;
  const { jwt } = JSON.parse(user);
  // console.log(`jwt: `, jwt);
  return `Bearer ${jwt}`;

};

export default instance;