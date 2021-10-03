import Styles from "./RegSignInForm.module.css";
import Header from "./components/Parts/Header";
import RegisterBody from "./components/Parts/RegisterBody";
import regSignInApi from "./api/regSignInApi";

const RegSignInForm = () => {



  return (
    <div className={Styles["form-container"]}>
      {/* <span>Hello</span> */}

      <Header/>
      <RegisterBody />

    </div>
  )

};


export default RegSignInForm;