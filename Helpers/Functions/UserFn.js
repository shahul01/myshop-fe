import { useContext } from "react";
import { UserContext } from "Helpers/Contexts/UserContext";
import { UNSET_USER } from "Helpers/Reducers/userReducer";

// COMMT: TODO:
// Hooks cant be called inside nested fn, find a work around

export function signOut({user, dispatch}) {
  // const { user, dispatch } = useContext(UserContext);
  console.log(`user: `, user);
  console.log('runs 1');
  if (!user?.isUserSignedIn) return;
  console.log('runs 2');
  localStorage.removeItem('__userToken');
  localStorage.removeItem('__userData');
  console.log('runs 3');
  console.log('Logged out');
  console.log('runs 4');
  dispatch({type: UNSET_USER});

  // return (
  //   <div>

  //   </div>
  // )
};