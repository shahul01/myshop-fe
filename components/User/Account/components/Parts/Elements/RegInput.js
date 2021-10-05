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
        name={props.name} /* Important Part */
        type={props.type}
        title={props.title}
        // placeholder={props.title}
        value={props.value}
        onChange={props.onChange}
      />
      <p>{props.iptValue}</p>
      {/* {isDetail} */}
    </div>
  )
}

export default RegInput;