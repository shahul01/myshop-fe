import axios from "axios";

export async function postRegister(data) {
  const postUrl = await axios.post(`http://localhost:1337/users`, data);
  const resPost = postUrl.data;

  // console.log('resPost :>> ', resPost);
  return resPost;

}

export async function postSignIn(data) {
  const postUrl = await axios.post(`http://localhost:1337/auth/local`, data);
  const resPost = postUrl.data;

  return resData
};