import { useState } from "react";
import Header from "./components/Parts/Header";
import RegisterBody from "./components/Parts/RegisterBody";
import SignInBody from "./components/Parts/SignInBody";
// import regSignInApi from "./api/regSignInApi";
// import useFetch from "Helpers/Hooks/useFetch";
import styles from "./styles/regSignInForm.module.css";

const RegSignInForm = () => {

  const [ isRegisterForm, setIsRegisterForm ] = useState(false);

  // let postData = {}
  // const {data: fetchedData, error, isPending} = useFetch(`http://localhost:1337/users/`, 'get', postData);

  return (
    <div className={styles["form-container"]}>
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