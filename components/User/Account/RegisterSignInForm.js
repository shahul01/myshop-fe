import Styles from "./RegisterSignInForm.module.css";
import Header from "./components/Parts/Header";
import RegisterBody from "./components/Parts/RegisterBody";

const RegisterSignInForm = () => {

  return (
    <div className={Styles["form-container"]}>
      {/* <span>Hello</span> */}

      <Header/>
      <RegisterBody />

    </div>
  )

};


export default RegisterSignInForm;