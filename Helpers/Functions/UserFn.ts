// import { useContext } from "react";
// import { UserContext } from "Helpers/Contexts/UserContext";
// import { UNSET_USER } from "Helpers/Reducers/userReducer";

export function signOut() {
  // const { user, dispatch } = useContext(UserContext);
  // console.log(`user: `, user);
  // localStorage.removeItem('__userToken');
  // localStorage.removeItem('__userData');
  localStorage.removeItem('__userAuth');
  console.log('Logged out');
  // dispatch({type: UNSET_USER});
};