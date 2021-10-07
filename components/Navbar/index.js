import Styles from "./Styles/navbar.module.css";


const Navbar = () => {

  function handleSignOut() {
    // isSignedIn = false
    localStorage.removeItem('__userToken');
    localStorage.removeItem('__userData');
    console.log('Logged out');

  }

  return (
    <>
      <button className={Styles['temp-signout-btn']} onClick={handleSignOut}>Sign out</button>
    </>
  )
};

export default Navbar;