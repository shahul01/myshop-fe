import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "Helpers/Contexts/UserContext";
import { SET_USER, UNSET_USER } from "Helpers/Reducers/userReducer";
import RegInput from "./Elements/RegInput";
import { postSignIn } from "../../api/regSignInApi";
import { signOut } from "Helpers/Functions/UserFn";
import Styles from "./Styles/SignInBody.module.css";

const SignInBody = ({isRegisterForm}) => {

  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);
  let demoEmail = '';
  let demoPass = '';
  if (typeof window !== undefined) {
    demoEmail = process.env.REACT_APP_DEMO_EMAIL
    demoPass = process.env.REACT_APP_DEMO_PSSW
    console.log(`process.env 0: `, process.env);
    console.log(`demoEmail 0: `, demoEmail);
  }
  // console.log(`process.env: `, process.env);
  console.log(`demoEmail: `, demoEmail);

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

  async function handleSubmit(isDemo, e, submittedForm) {
    if (!isDemo) e.preventDefault();
    if (submittedForm.identifier === '') return;
    // console.log(`submittedForm: `, submittedForm);
    const resSubmit = await postSignIn(submittedForm);

    if (user.isUserSignedIn && !resSubmit?.jwt) return;
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

    //  COMMT: TODO: toast - success and redirecting..
    router.push('/');
    resetForm();
  };

  function resetForm() {
    setSignInForm({
      identifier: '',
      password: ''
    })
  };

  function handleSignOut() {
    if (!user?.isUserSignedIn) return;
    signOut();
    router.push('/account/validation');
    dispatch({type: UNSET_USER});
    // COMMT: TODO: toast - Signed out
  };

  function handleDemoSignIn(e) {
    /*
    // COMMT: If constantly updating email and password, consider
     asking backend for already available email and password,
     so they can be used to sign in
    */

    console.log(`demoEmail: `, demoEmail);
    if (!demoEmail) return;
    setSignInForm({
      identifier: demoEmail,
      password: demoPass
    });
    handleSubmit(true, e, signInForm);
  };

  return (
    <>
      {!isRegisterForm && user?.isUserSignedIn
        ? (
          <div className={Styles['already-signed-in-err']} >
            {`
              User '${user.username}' with email '${user.email}'
              is already signed in.
            `}
            <br /><br />
            If it is not you, please
            <span className={Styles['sign-out-text']} onClick={handleSignOut
              }> sign out.
            </span>
          </div>
        )
      : (!isRegisterForm && !user?.isUserSignedIn)
          ? (
            <form
                className={Styles["sign-in-container"]}
                onSubmit={(e) => handleSubmit(false, e, signInForm)}
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
              <button
                type="button" title="For testing purpose"
                className="button" onClick={handleDemoSignIn}
              >
                Demo Sign In
              </button>

            </form>
      ) : ''}
    </>
  )

}

export default SignInBody;