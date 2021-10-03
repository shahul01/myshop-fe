import Styles from "../Styles/RegisterBody.module.css";

const RegInput = (props) => {

  return (
    <div className={Styles["reg-input-container"]}>
      {/* <div>{props.className}</div> */}
      <p>
        {props.title}
      </p>
      <input
        className={Styles[props.className]}
        type={props.type}
        title={props.title}
      />
      {/* {isDetail} */}
    </div>
  )
}

export default RegInput;