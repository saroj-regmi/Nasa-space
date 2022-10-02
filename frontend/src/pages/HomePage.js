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
      description: "Find the time when the ISS will fly over your location",
    },
    {
      label: "Time Difference",
      img: "/svgs/timedifference.svg",
      description: "Find the time difference between two your time and ISS",
    },
    {
      label: "Satellite location",
      img: "/svgs/searchlocation.svg",
      description: "Find the location of the ISS at a given time",
    },
  ];

  const [modal, setModal] = useState({
    open: false,
    detail: "",
  });

  const [query, setQuery] = useState({
    label: "",
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
      {/* <Stat /> */}
      <div className={styles.buttons}>
        {buttons.map((button) => (
          <Button
            data={button}
            styles={styles}
            key={button.label}
            onClick={() => handleClick(button)}
          />
        ))}
        <Modal data={modal} setModal={setModal} setQuery={setQuery} />
      </div>
    </div>
  );
}

export default HomePage;
