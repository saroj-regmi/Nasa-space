import React from "react";

function Button({ data, styles }) {
  const { label, onClick, img } = data;
  return (
    <button onClick={onClick}>
      <img src={img} />
      <p className={styles.label}>{label}</p>
    </button>
  );
}

export default Button;
