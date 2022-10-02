import styles from "../styles/modal.module.css";

const Modal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h2>Modal Header</h2>
        <button className={styles.closeButton}>X</button>
      </div>
      <div className={styles.modalContent}></div>
    </div>
  );
};

export default Modal;
