import { useState, useEffect } from "react";
import Header from "./components/Parts/Header";
import RegisterBody from "./components/Parts/RegisterBody";
import regSignInApi from "./api/regSignInApi";
import useFetch from "../../../Helpers/Hooks/useFetch";
import Styles from "./RegSignInForm.module.css";

const RegSignInForm = () => {

  // let postData = {}
  // const {data: fetchedData, error, isPending} = useFetch(`http://localhost:1337/users/`, 'get', postData);

  return (
    <div className={Styles["form-container"]}>
      {/* <span>Hello</span> */}

      <Header/>
      <RegisterBody />

    </div>
  )

};


export default RegSignInForm;