import { useState } from "react";
import RegInput from "./Elements/RegInput";
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
    // console.log('e.target :>> ', e.target.value);
    // if (!e.target) return;
    setRegistrForm({
      ...registrForm,
      [e.target.name]: e.target.value
    });
  };


  function handleSubmit(submittedValue) {
    console.log('submittedValue', submittedValue);
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