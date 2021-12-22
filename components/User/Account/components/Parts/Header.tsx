const Header = ({setIsRegisterForm}) => {

  return (
    <div>
      <>
        <button onClick={() => setIsRegisterForm(true)}>Register</button>
        <button onClick={() => setIsRegisterForm(false)}>SignIn</button>

      </>
    </div>
  )

}


export default Header;