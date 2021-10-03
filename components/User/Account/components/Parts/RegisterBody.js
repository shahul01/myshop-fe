import Styles from "./styles/RegisterBody.module.css";

const RegisterBody = () => {


  return (
    <div className={Styles["container"]} >

      <div className={Styles["name-container"]}>
        <input
          className={Styles["acc-val-ipt"]}
          title="First name"
        />
        <input
          className={Styles["acc-val-ipt"]}
          title="Last name"
        />

      </div>
      <div>

        <input
          className={Styles["acc-val-ipt"]}
          type="email"
          title="Email"
        />
        <input
          className={Styles["acc-val-ipt"]}
          type="password"
          title="Password"
        />
        <input
          className={Styles["acc-val-ipt"]}
          type="password"
          title="Re enter password"
        />
      </div>
    </div>
  )


}


export default RegisterBody;