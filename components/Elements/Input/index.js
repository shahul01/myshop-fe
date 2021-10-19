import styles from "./styles/Input.module.css";

const RegInput = (props) => {

  return (
    <div className={styles["reg-input-container"]}>
      <p>{props.title}</p>
      <input
        className={styles[props.className]}
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