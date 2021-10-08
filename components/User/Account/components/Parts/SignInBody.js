import { useContext, useState } from "react";
import { UserContext } from "Helpers/Contexts/UserContext";
import { SET_USER } from "Helpers/Reducers/userReducer";
import RegInput from "./Elements/RegInput";
import { postSignIn } from "../../api/regSignInApi";

import Styles from "./Styles/SignInBody.module.css";

const SignInBody = ({isRegisterForm}) => {

  const { user, dispatch } = useContext(UserContext);

  const [ signInForm, setSignInForm ] = useState({
    identifier: '',
    password: ''
  });

  function handleChange(e) {
    setSignInForm({
      ...signInForm,
      [e?.target?.name]: e?.target?.value
    })
  };

  async function handleSubmit(e, submittedForm) {
    e.preventDefault();
    if (submittedForm.identifier === '') return;
    // console.log(`submittedForm: `, submittedForm);
    const resSubmit = await postSignIn(submittedForm);
    // console.log(`resSubmit: `, resSubmit);
    // console.log(`user: `, user);
    if (user.isUserSignedIn) {
      // alert('already signed in'); // replace with toast
      alert(`user ${user.username} with email '${user.email} is already signed in, please sign out first.'`)

    } else if (!user.isUserSignedIn && resSubmit?.jwt) {
      localStorage.setItem('__userToken', resSubmit?.jwt);
      console.log('token set');

      const resUser = resSubmit.user;
      const userObj = {
        'id': resUser?.id,
        'email': resUser?.email,
        'username': resUser?.username
      };

      localStorage.setItem('__userData', JSON.stringify(userObj));
      dispatch({
        type: SET_USER,
        user: {
          userId: resUser?.id,
          email: resUser?.email,
          username: resUser?.username
        }
      })

    }
    resetForm();
  };

  function resetForm() {
    setSignInForm({
      identifier: '',
      password: ''
    })
  };

  return (
    <>
      {!isRegisterForm &&
        <form
            className={Styles["signIn-container"]}
            onSubmit={(e) => handleSubmit(e, signInForm)}
          >

          <RegInput
            className="acc-val-ipt"
            name="identifier"
            type="email"
            title="Email"
            value={signInForm.identifier}
            onChange={handleChange}
          />

          <RegInput
            className="acc-val-ipt"
            name="password"
            type="password"
            title="Password"
            value={signInForm.password}
            onChange={handleChange}
          />

          <button type="submit" className="button">Sign In</button>

        </form>
      }
    </>
  )

}

export default SignInBody;