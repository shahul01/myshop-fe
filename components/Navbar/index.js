import { useContext } from "react";
import { UserContext } from "Helpers/Contexts/UserContext";
import { UNSET_USER } from "Helpers/Reducers/userReducer";
import Styles from "./Styles/navbar.module.css";

const Navbar = () => {

  const { user, dispatch } = useContext(UserContext);

  function handleSignOut() {
    if (!user?.isUserSignedIn) return;
    localStorage.removeItem('__userToken');
    localStorage.removeItem('__userData');
    console.log('Logged out');
    dispatch({type: UNSET_USER});
  };

  return (
    <>
      <button className={Styles['temp-signout-btn']} onClick={handleSignOut}>Sign {!user?.isUserSignedIn ? 'in' : 'out'}</button>
    </>
  )
};

export default Navbar;