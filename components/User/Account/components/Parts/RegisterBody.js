import { useState, useEffect } from "react";
import RegInput from "./Elements/RegInput";
import { postRegister } from "../../api/regSignInApi.js";
import Styles from "./Styles/RegisterBody.module.css";

const RegisterBody = () => {

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
    submittedValue.username = submittedValue.firstName + submittedValue.lastName;
    const resSubmit = await postRegister(submittedValue);
    console.log(`resSubmit: `, resSubmit);
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
    <div className={Styles["reg-container"]} >

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

      <button className="button" onClick={() => handleSubmit(registrForm)}>Temp Btn</button>
    </div>
  )


}


export default RegisterBody;