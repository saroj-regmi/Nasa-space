import { useState } from "react";
import Stat from "../components/Stat";
import THREEJS from "../THREEJS";
import Button from "../components/Button";

import styles from "../styles/homepage.module.css";
import Modal from "../components/Modal";

function HomePage() {
  const buttons = [
    {
      label: "Satellite overhead",
      img: "/svgs/overhead.svg",
    },
    {
      label: "Time Difference",
      img: "/svgs/timedifference.svg",
    },
    {
      label: "Satellite location",
      img: "/svgs/searchlocation.svg",
    },
  ];

  const [modal, setModal] = useState({
    open: false,
    detail: "",
  });

  const handleClick = (button) => {
    setModal({
      open: true,
      detail: button,
    });
  };

  return (
    <div className={styles.conatiner}>
      <THREEJS />
      <Stat />
      <div className={styles.buttons}>
        {buttons.map((button) => (
          <Button
            data={button}
            styles={styles}
            key={button.label}
            onClick={() => handleClick(button)}
          />
        ))}
        <Modal data={modal} setModal={setModal} />
      </div>
    </div>
  );
}

export default HomePage;
