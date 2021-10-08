import axios from "axios";

export async function postRegister(regData, signInData) {
  const postRegUrl = await axios.post(`http://localhost:1337/users`, regData);
  const postSignInUrl = await axios.post(`http://localhost:1337/auth/local`, signInData);

  const resPost = {
    regData: postRegUrl.data,
    signInData: postSignInUrl.data
  };

  console.log('resPost :>> ', resPost);
  return resPost;

}

export async function postSignIn(data) {
  const postUrl = await axios.post(`http://localhost:1337/auth/local`, data);
  const resPost = postUrl.data;

  return resPost
};