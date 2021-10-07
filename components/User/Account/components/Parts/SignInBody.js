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
    // console.log(`submittedForm: `, submittedForm);
    const resSubmit = await postSignIn(submittedForm);
    console.log(`resSubmit: `, resSubmit);
    if (resSubmit?.jwt) {
      console.log('token set');
      localStorage.setItem('userToken', resSubmit?.jwt);

      let userObj = {
        'id': resSubmit.user.id,
        'email': resSubmit.user.email
      };

      localStorage.setItem('userData', JSON.stringify(userObj));

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
        <div className={Styles["signIn-container"]}>

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

          <button className="button" onClick={() => handleSubmit(signInForm)}>Sign In</button>

        </div>
      }
    </>
  )

}

export default SignInBody;