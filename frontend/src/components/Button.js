import React from "react";

function Button({ data, styles, onClick }) {
  const { label, img } = data;
  return (
    <button onClick={onClick} className={styles.button}>
      <img src={img} />
      <p className={styles.label}>{label}</p>
    </button>
  );
}

export default Button;
