import styles from "../styles/modal.module.css";
import Draggable from "react-draggable";

const Modal = ({ data, setModal }) => {
  const { open, detail } = data;

  const { label, description } = detail;

  const handleClose = () => {
    setModal({
      open: false,
      detail: "",
    });
  };

  if (!open) return;

  return (
    <Draggable
      handle=".handle"
      defaultPosition={{
        x: 0,
        y: 0,
      }}
      scale={1}
    >
      <div className={styles.modal}>
        <div className={`${styles.modalHeader} handle`}>
          <h2>{label}</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            X
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.description}>{description}</p>

          <button className={styles.find}>Find</button>
        </div>
      </div>
    </Draggable>
  );
};

export default Modal;
