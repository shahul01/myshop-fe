import { useState } from "react";
import Header from "./components/Parts/Header";
import RegisterBody from "./components/Parts/RegisterBody";
import SignInBody from "./components/Parts/SignInBody";
// import regSignInApi from "./api/regSignInApi";
// import useFetch from "Helpers/Hooks/useFetch";
import Styles from "./RegSignInForm.module.css";

const RegSignInForm = () => {

  const [ isRegisterForm, setIsRegisterForm ] = useState(true);

  // let postData = {}
  // const {data: fetchedData, error, isPending} = useFetch(`http://localhost:1337/users/`, 'get', postData);

  return (
    <div className={Styles["form-container"]}>
      {/* <span>Hello</span> */}

      <Header
        setIsRegisterForm={setIsRegisterForm}
      />
      <RegisterBody
        isRegisterForm={isRegisterForm}
      />
      <SignInBody
        isRegisterForm={isRegisterForm}
      />

    </div>
  )

};


export default RegSignInForm;