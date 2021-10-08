import { useState, useEffect } from "react";
import RegInput from "./Elements/RegInput";
import { postSignIn } from "../../api/regSignInApi";
import Styles from "./Styles/SignInBody.module.css";

const SignInBody = ({isRegisterForm}) => {

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

  async function handleSubmit(submittedForm) {

    if (submittedForm.identifier === '') return;
    // console.log(`submittedForm: `, submittedForm);
    const resSubmit = await postSignIn(submittedForm);
    console.log(`resSubmit: `, resSubmit);
    if (resSubmit?.jwt) {
      localStorage.setItem('__userToken', resSubmit?.jwt);
      console.log('token set');

      const resUser = resSubmit.user;
      const userObj = {
        'id': resUser?.id,
        'email': resUser?.email,
        'username': resUser?.username
      };

      localStorage.setItem('__userData', JSON.stringify(userObj));

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
            onSubmit={() => handleSubmit(signInForm)}
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