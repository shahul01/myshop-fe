import { useState, useEffect } from "react";
import RegInput from "./Elements/RegInput";
import { postSignIn } from "../../api/regSignInApi";
import Styles from "./Styles/SignInBody.module.css";

const SignInBody = ({isRegisterForm}) => {


  return (
    <>
      {!isRegisterForm &&
        <div className={Styles["signIn-container"]}>

          <RegInput
          />

        </div>
      }
    </>
  )

}

export default SignInBody;