import { useRouter, withRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "helpers/Contexts/UserContext";
import { UNSET_USER } from "helpers/Reducers/userReducer";
import { signOut } from "helpers/Functions/UserFn";
import styles from "./styles/navbar.module.css";

const Navbar = () => {

  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);

  function handleRedirectSignIn() {
      router.push('/account/validation');
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
      {/* // COMMT: TODO: Clean the logic */}
      { ( user?.isUserSignedIn ) ? (
          <button className={styles['temp-signout-btn']} onClick={handleSignOut}>Sign out</button>
        )
        : ( !user?.isUserSignedIn && router.pathname !== '/account/validation' ) ? (
          <button className={styles['temp-signout-btn']} onClick={handleRedirectSignIn}>Go to Sign in page</button>
        )
        : ( !user?.isUserSignedIn && router.pathname.substring(/account/) && router.pathname !== '/account/validation' ) ? (
          <button className={styles['temp-signout-btn']} onClick={handleRedirectSignIn}>Go to Sign in page</button>
        )
        : ''

      }
    </>
  )
};

export default Navbar;