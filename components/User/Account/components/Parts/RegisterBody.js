import RegInput from "./Elements/RegInput";
import Styles from "./Styles/RegisterBody.module.css";

const RegisterBody = () => {


  return (
    <div className={Styles["reg-container"]} >

      <div className={Styles["name-container"]}>
        <RegInput
          className="acc-val-ipt"
          title="First name"
        />
        <RegInput
          className="acc-val-ipt"
          title="Last name"
        />

      </div>
      <div>

        <RegInput
          className="acc-val-ipt"
          type="email"
          title="Email"
        />

        <RegInput
          className="acc-val-ipt"
          type="password"
          title="Password"
        />
        <RegInput
          className="acc-val-ipt"
          type="password"
          title="Re enter password"
        />
      </div>
    </div>
  )


}


export default RegisterBody;