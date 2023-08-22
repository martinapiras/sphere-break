import styles from "./Input.module.scss";

const Input = ({ type = "text", value, onChange, id }) => {
  return (
    <input
      type={type}
      value={value}
      className={styles.Input}
      onChange={onChange}
      id={id}
    />
  );
};

export default Input;
