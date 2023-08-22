import { FaLocationArrow } from "react-icons/fa";
import styles from "./Button.module.scss";

const Button = ({ onClick, content }) => {
  return (
    <div className={styles.Button} onClick={onClick}>
      <span className={styles.icon}>
        <FaLocationArrow />
      </span>
      <span className={styles.text}>{content.toUpperCase()}</span>
    </div>
  );
};

export default Button;
