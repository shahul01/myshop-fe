import { useState } from "react";
import RegInput from "./Elements/RegInput";
import { postRegister } from "../../api/regSignInApi.js";
import Styles from "./Styles/RegisterBody.module.css";

const RegisterBody = ({ isRegisterForm }) => {

  const [ registerForm, setRegisterForm  ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: ''
  });

  function handleChange(e) {
    setRegisterForm({
      ...registerForm,
      [e?.target?.name]: e?.target?.value
    });
  };


  async function handleSubmit(submittedForm) {

    if (submittedForm.firstName === '') return;

    const createdUserName = submittedForm.firstName.toLowerCase()
      + submittedForm.lastName
      + '-' + new Date().getTime();

      submittedForm.username = createdUserName;

    const regForm = {
      ...submittedForm,
      username: createdUserName
    };

    const signInForm = {
      identifier: submittedForm.email,
      password: submittedForm.password
    };

    const resSubmit = await postRegister(regForm, signInForm);
    console.log(`resSubmit: `, resSubmit);

    const resAccData = resSubmit?.signInData;
    if (resAccData?.jwt) {
      localStorage.setItem('__userToken', resAccData.jwt);
      console.log('token set');

      const resUser = resAccData.user;
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
    setRegisterForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: ''
    });
  };


  return (
    <>

      {isRegisterForm &&
        <div className={Styles["reg-container"]} >

          <h2>Register</h2>

          <div className={Styles["name-container"]}>

            <RegInput
              className="acc-val-ipt"
              name="firstName"
              title="First name"
              value={registerForm.firstName}
              onChange={handleChange}
              required={true}
            />

            <RegInput
              className="acc-val-ipt"
              name="lastName"
              title="Last name"
              value={registerForm.lastName}
              onChange={handleChange}
            />

          </div>
          <div>

            <RegInput
              className="acc-val-ipt"
              name="email"
              type="email"
              title="Email"
              value={registerForm.email}
              onChange={handleChange}
              required={true}
            />

            <RegInput
              className="acc-val-ipt"
              name="password"
              type="password"
              title="Password"
              value={registerForm.password}
              onChange={handleChange}
              required={true}
            />

            <RegInput
              className="acc-val-ipt"
              name="rePassword"
              type="password"
              title="Re enter password"
              value={registerForm.rePassword}
              onChange={handleChange}
              required={true}
            />
          </div>

          {/* <div className="agreement">
            <button type="checkbox"></button>
            <span>
              I agree to
                <a href="#">
                  terms, agreement and privacy policy
                </a>
            </span>
          </div> */}

          <button className="button" onClick={() => handleSubmit(registerForm)}>Submit</button>
        </div>
      }
    </>
  )


}


export default RegisterBody;