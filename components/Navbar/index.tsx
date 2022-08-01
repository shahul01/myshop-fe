import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import { useContext } from "react";
import { SearchContext } from "helpers/Contexts/SearchContext";
import { UPDATE_SEARCH } from "helpers/Reducers/searchReducer";
import { UserContext } from "helpers/Contexts/UserContext";
import { UNSET_USER } from "helpers/Reducers/userReducer";
import { signOut } from "helpers/Functions/UserFn";
import styles from "./styles/navbar.module.css";

const Navbar = () => {

  const router = useRouter();
  const { user, dispatchUser } = useContext(UserContext);
  const { searchText, dispatchSearchText } = useContext(SearchContext);
  // console.log('user :>> ', user);
  // console.log(`searchText (nav)`, searchText);

  function handleChangeSearch(e) {
    dispatchSearchText({
      type: UPDATE_SEARCH,
      searchText: e?.target?.value
    });
    // console.log('e?.target?.value :>> ', e?.target?.value);
  };

  function handleRedirectSignIn() {
    router.push('/account/validation');
  };

  function handleSignOut() {
    // signOut(user, dispatchUser);
    if (!user?.isUserSignedIn) return;
    signOut();
    router.push('/account/validation');
    return dispatchUser({type: UNSET_USER});
    // COMMT: TODO: toast - Signed out
  };

  return (
    <div className={styles['navbar']}>
      <div className={styles['content']}>
        <div className={styles['title-container']}>
          <Link href="/" className={styles['title-name']}>My Shop</Link>
        </div>
        <div className={styles['search-box-container']}>
          <input
            className={styles['search-box']}
            placeholder="Search"
            value={searchText?.textData}
            onChange={handleChangeSearch}
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