import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "Helpers/Contexts/UserContext";
import { UNSET_USER } from "Helpers/Reducers/userReducer";
import { signOut } from "Helpers/Functions/UserFn";
import Styles from "./Styles/navbar.module.css";

const Navbar = () => {

  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);

  function handleSignOut() {
    // signOut(user, dispatch);
    if (!user?.isUserSignedIn) return;
    signOut();
    router.push('/account/validation');
    return dispatch({type: UNSET_USER});

  };

  return (
    <>
      <button className={Styles['temp-signout-btn']} onClick={handleSignOut}>Sign {!user?.isUserSignedIn ? 'in' : 'out'}</button>
    </>
  )
};

export default Navbar;