import { useState, useEffect } from "react";
import RegInput from "./Elements/RegInput";
import { postRegister } from "../../api/regSignInApi.js";
import Styles from "./Styles/RegisterBody.module.css";

const RegisterBody = ({ isRegisterForm }) => {

  const [ registrForm, setRegistrForm  ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: ''
  });

  function handleChange(e) {
    setRegistrForm({
      ...registrForm,
      [e.target.name]: e.target.value
    });
  };


  async function handleSubmit(submittedValue) {

    const createdUserName = submittedValue.firstName.toLowerCase()
      + submittedValue.lastName.toLowerCase()
      + '-' + new Date().getTime();

    submittedValue.username = createdUserName;

    const resSubmit = await postRegister(submittedValue);
    console.log(`resSubmit: `, resSubmit);

    if (resSubmit?.data?.jwt) {
      console.log('token set');
      localStorage.setItem('userToken',  resSubmit?.data?.jwt);
    }

    resetForm();
  };

  function resetForm() {
    setRegistrForm({
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
              value={registrForm.firstName}
              onChange={handleChange}
            />

            <RegInput
              className="acc-val-ipt"
              name="lastName"
              title="Last name"
              value={registrForm.lastName}
              onChange={handleChange}
            />

          </div>
          <div>

            <RegInput
              className="acc-val-ipt"
              name="email"
              type="email"
              title="Email"
              value={registrForm.email}
              onChange={handleChange}
            />

            <RegInput
              className="acc-val-ipt"
              name="password"
              type="password"
              title="Password"
              value={registrForm.password}
              onChange={handleChange}
            />

            <RegInput
              className="acc-val-ipt"
              name="rePassword"
              type="password"
              title="Re enter password"
              value={registrForm.rePassword}
              onChange={handleChange}
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

          <button className="button" onClick={() => handleSubmit(registrForm)}>Submit</button>
        </div>
      }
    </>
  )


}


export default RegisterBody;