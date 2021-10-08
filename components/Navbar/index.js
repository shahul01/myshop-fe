import { useContext } from "react";
import { UserContext } from "Helpers/Contexts/UserContext";
import { UNSET_USER } from "Helpers/Reducers/userReducer";
import { signOut } from "Helpers/Functions/userFn";
import Styles from "./Styles/navbar.module.css";

const Navbar = () => {

  const { user, dispatch } = useContext(UserContext);

  function handleSignOut() {
    // console.log('runs 0');
    // signOut()

    if (!user?.isUserSignedIn) return;
    localStorage.removeItem('__userToken');
    localStorage.removeItem('__userData');
    dispatch({type: UNSET_USER});
  };

  return (
    <>
      <button className={Styles['temp-signout-btn']} onClick={handleSignOut}>Sign {!user?.isUserSignedIn ? 'in' : 'out'}</button>
    </>
  )
};

export default Navbar;