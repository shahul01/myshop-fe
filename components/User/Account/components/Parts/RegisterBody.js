import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { UserContext } from "helpers/Contexts/UserContext";
import { SET_USER } from "helpers/Reducers/userReducer";
import Input from "../../../../Elements/Input/index";
import { postRegister } from "../../api/regSignInApi.js";
import styles from "./styles/registerBody.module.css";

const RegisterBody = ({ isRegisterForm }) => {

  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);
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


  async function handleSubmit(e, submittedForm) {
    e.preventDefault();
    if (submittedForm.firstName === '') return;

    const uniqueID = new Date().getTime().toString().substring(9,13);
    const createdUserName = submittedForm.firstName.toLowerCase()
      + submittedForm.lastName
      + '-' + uniqueID;

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
      // __userAuth
      localStorage.setItem('__userAuth', JSON.stringify(resAccData));
      // localStorage.setItem('__userToken', resAccData.jwt);

      const resUser = resAccData.user;
      // const userObj = {
      //   'id': resUser.id,
      //   'email': resUser.email,
      //   'username': resUser.username
      // };
      // console.log(`userObj: `, userObj);
      // localStorage.setItem('__userData', JSON.stringify(userObj));

      console.log('token set');

      dispatch({
        type: SET_USER,
        user: {
          isUserSignedIn: true,
          userId: resUser.id,
          email: resUser.email,
          username: resUser.username
        }
      });


    }

    resetForm();
    //  COMMT: TODO: toast - success and redirecting..
    setTimeout(() => {
      router.push('/');

    }, 2000 );
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
        <form
          className={styles["reg-container"]}
          onSubmit={(e) => handleSubmit(e, registerForm)}
        >

          <h2>Register</h2>

          <div className={styles["name-container"]}>

            <Input
              className="acc-val-ipt"
              name="firstName"
              title="First name"
              value={registerForm.firstName}
              onChange={handleChange}
              required={true}
            />

            <Input
              className="acc-val-ipt"
              name="lastName"
              title="Last name"
              value={registerForm.lastName}
              onChange={handleChange}
            />

          </div>
          <div>

            <Input
              className="acc-val-ipt"
              name="email"
              type="email"
              title="Email"
              value={registerForm.email}
              onChange={handleChange}
              required={true}
            />

            <Input
              className="acc-val-ipt"
              name="password"
              type="password"
              title="Password"
              value={registerForm.password}
              onChange={handleChange}
              required={true}
            />

            <Input
              className="acc-val-ipt"
              name="rePassword"
              type="password"
              title="Re enter password"
              value={registerForm.rePassword}
              onChange={handleChange}
              required={true}
            />
          </div>

          {/*
            COMMT: TODO:
            <div className="agreement">
              <button type="checkbox"></button>
              <span>
                I agree to
                  <a href="#">
                    terms, agreement and privacy policy
                  </a>
              </span>
            </div>
          */}

          <button type="submit" className="button">Register</button>

          {
            user.isUserSignedIn && (
              <div className={styles['already-signed-in-err']}>
                You are already signed in.
                <br />
                But for testing purpose,
                registration form can be reused without signing out.
              </div>
            )
          }
        </form>
      }
    </>
  )


}


export default RegisterBody;