import { useRouter, withRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "helpers/Contexts/UserContext";
import { UNSET_USER } from "helpers/Reducers/userReducer";
import { signOut } from "helpers/Functions/UserFn";
import Styles from "./Styles/navbar.module.css";

const Navbar = () => {

  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);

  function handleRedirectSignIn() {
    router.push('account/validation');
  };

  function handleSignOut() {
    // signOut(user, dispatch);
    if (!user?.isUserSignedIn) return;
    signOut();
    router.push('/account/validation');
    return dispatch({type: UNSET_USER});
    // COMMT: TODO: toast - Signed out
  };

  return (
    <>
      { (!user?.isUserSignedIn && router.pathname !== '/account/validation') ? (
          <button className={Styles['temp-signout-btn']} onClick={handleRedirectSignIn}>Go to Sign in page</button>
        )
        : (user?.isUserSignedIn) ? (
          <button className={Styles['temp-signout-btn']} onClick={handleSignOut}>Sign out</button>
        )
        : ''

      }
    </>
  )
};

export default Navbar;