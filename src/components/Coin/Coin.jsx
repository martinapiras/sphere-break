import styles from "./Coin.module.scss";

const Coin = ({ type, value = "", onClick, selected = null }) => {
  return (
    <div className={`${styles.coin} ${styles[type]}`} onClick={onClick}>
      <div
        className={`${styles.background} ${selected && styles.selected}`}
      ></div>
      <span>{value}</span>
    </div>
  );
};

export default Coin;
