import styles from "../styles/modal.module.css";
import Draggable from "react-draggable";

const Modal = () => {
  return (
    <Draggable
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position="absolute"
      scale={1}
    >
      <div className={styles.modal}>
        <div className={`${styles.modalHeader} handle`}>
          <h2>Modal Header</h2>
          <button className={styles.closeButton}>X</button>
        </div>
        <div className={styles.modalContent}></div>
      </div>
    </Draggable>
  );
};

export default Modal;
