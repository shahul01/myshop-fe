import { useState, useEffect } from "react";
import RegInput from "./Elements/RegInput";
import { postSignIn } from "../../api/regSignInApi";
import Styles from "./Styles/SignInBody.module.css";

const SignInBody = ({isRegisterForm}) => {

  const [ signInForm, setSignInForm ] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    setSignInForm({
      ...signInForm,
      [e?.target?.name]: e?.target?.value
    })
  };

  async function handleSubmit(submittedForm) {
    console.log(`submittedForm: `, submittedForm);
    resetForm();
  };

  function resetForm() {
    setSignInForm({
      email: '',
      password: ''
    })
  };

  return (
    <>
      {!isRegisterForm &&
        <div className={Styles["signIn-container"]}>

          <RegInput
            className="acc-val-ipt"
            name="email"
            type="email"
            title="Email"
            value={signInForm.email}
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