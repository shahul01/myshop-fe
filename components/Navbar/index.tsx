import { useRouter, withRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "helpers/Contexts/UserContext";
import { UNSET_USER } from "helpers/Reducers/userReducer";
import { signOut } from "helpers/Functions/UserFn";
import styles from "./styles/navbar.module.css";

const Navbar = () => {

  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);
  console.log('user :>> ', user);

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
    <div className={styles['navbar']}>
      <div className={styles['content']}>
        <span className={styles['title-name']}>My Shop</span>
        <div className={styles['search-box-container']}>
          <input
            className={styles['search-box']}
            placeholder="Search"
            // value={searchTitle}
            // onChange={(e) => setSearchTitle(e.target?.value)}
          />
        </div>
        <div className="avatar">
          {/* // COMMT: TODO: Clean the logic */}
          {
            ( user?.isUserSignedIn ) ? (
              <button title={`Sign out ${user.username}`} className={styles['temp-signout-btn']} onClick={handleSignOut}>S</button>
            )
            : ( !user?.isUserSignedIn && router.pathname !== '/account/validation' ) ? (
              <button className={styles['temp-signout-btn']} onClick={handleRedirectSignIn}>Go to Sign in page</button>
            )
            : ( !user?.isUserSignedIn && router.pathname.substring(/account/) && router.pathname !== '/account/validation' ) ? (
              <button className={styles['temp-signout-btn']} onClick={handleRedirectSignIn}>Go to Sign in page</button>
            )
            : <></>
          }
        </div>

      </div>

      <div className={styles['line']}>

      </div>


    </div>
  )
};

export default Navbar;