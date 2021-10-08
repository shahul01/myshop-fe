import Styles from "../Styles/RegisterBody.module.css";

const RegInput = (props) => {

  return (
    <div className={Styles["reg-input-container"]}>
      <p>{props.title}</p>
      <input
        className={Styles[props.className]}
        name={props.name} /* Important Part */
        type={props.type}
        title={props.title}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
    </div>
  )
}

export default RegInput;