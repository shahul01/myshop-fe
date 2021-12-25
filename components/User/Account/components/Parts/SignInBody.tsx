import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "helpers/Contexts/UserContext";
import { SET_USER, UNSET_USER } from "helpers/Reducers/userReducer";
import Input from "../../../../Elements/Input/index";
import { postSignIn } from "../../api/regSignInApi";
import { signOut } from "helpers/Functions/UserFn";
import styles from "./styles/signInBody.module.css";

const SignInBody = ({isRegisterForm}) => {

  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);
  const [ demoEmail, setDemoEmail ] = useState('');
  const [ isDemoUpdated, setIsDemoUpdated ] = useState(false);
  const [ demoPass, setDemoPass ] = useState('');
  const [ signInForm, setSignInForm ] = useState({
    identifier: '',
    password: ''
  });

  useEffect(() => {
    setDemoEmail(process?.env?.NEXT_PUBLIC_DEMO_EMAIL);
    setDemoPass(process?.env?.NEXT_PUBLIC_DEMO_PSSW);

  }, []);

  useEffect(() => {
    // Fixes async side effect of useState
    if (signInForm.identifier !== demoEmail) return;
    handleSubmit(true, null, signInForm);

  }, [isDemoUpdated]);

  function handleChange(e) {
    setSignInForm({
      ...signInForm,
      [e?.target?.name]: e?.target?.value
    })
  };

  async function handleSubmit(isDemo, e, submittedForm) {
    // if (!isDemo) e.preventDefault();
    e?.preventDefault();
    if (submittedForm.identifier === '') return;
    console.log(`submittedForm: `, submittedForm);
    const resSubmit = await postSignIn(submittedForm);

    if (user.isUserSignedIn && !resSubmit?.jwt) return;
    localStorage.setItem('__userAuth', JSON.stringify(resSubmit));
    console.log('token set');

    const resUser = resSubmit.user;
    dispatch({
      type: SET_USER,
      user: {
        userId: resUser?.id,
        email: resUser?.email,
        username: resUser?.username
      }
    })

    resetForm();
    //  COMMT: TODO: toast - success and redirecting..
    setTimeout(() => {
      router.push('/');

    }, 2000 );
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

  async function handleDemoSignIn(e) {
    /*
    // COMMT: If constantly updating email and password, consider
     asking backend for already available email and password,
     so they can be used to sign in
    */
    // console.log('demoEmail :>> ', demoEmail);
    if (!demoEmail) return;

    setSignInForm({
      identifier: demoEmail,
      password: demoPass
    });
    setIsDemoUpdated(true);

  };

  return (
    <>
      {/* {console.log(`user?.isUserSignedIn: `, user)} */}
      {!isRegisterForm && user?.isUserSignedIn && user.username
        ? (
          <div className={styles['already-signed-in-err']} >
            {`
              User '${user.username}' with email '${user.email}'
              is already signed in.
            `}
            <br /><br />
            If it is not you, please
            <span className={styles['sign-out-text']} onClick={handleSignOut
              }> sign out.
            </span>
          </div>
        )
      : (!isRegisterForm && !user?.isUserSignedIn)
          ? (
            <form
                className={styles['sign-in-container']}
                onSubmit={(e) => handleSubmit(false, e, signInForm)}
              >

              <Input
                className="acc-val-ipt"
                name="identifier"
                type="email"
                title="Email"
                value={signInForm.identifier}
                onChange={handleChange}
              />

              <Input
                className="acc-val-ipt"
                name="password"
                type="password"
                title="Password"
                value={signInForm.password}
                onChange={handleChange}
              />

              <button type="submit" className="button">Sign In</button>
              <button
                type="button" title="For Demo purpose"
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