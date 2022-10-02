import styles from "../styles/loader.module.css";

function Loader() {
  return (
    <div className={styles.ring}>
      <span></span>
    </div>
  );
}

export default Loader;
