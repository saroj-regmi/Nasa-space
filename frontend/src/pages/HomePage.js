import React from "react";
import Stat from "../components/Stat";
import THREEJS from "../THREEJS";
import Button from "../components/Button";

import styles from "../styles/homepage.module.css";
import Modal from "../components/Modal";

function HomePage() {
  const buttons = [
    {
      label: "Satellite overhead",
      onClick: () => {
        console.log("Button 1 clicked");
      },
      img: "/svgs/overhead.svg",
    },
    {
      label: "Time Difference",
      onClick: () => {
        console.log("Button 2 clicked");
      },
      img: "/svgs/timedifference.svg",
    },
    {
      label: "Satellite location",
      onClick: () => {
        console.log("Button 3 clicked");
      },
      img: "/svgs/searchlocation.svg",
    },
  ];
  return (
    <div className={styles.conatiner}>
      <THREEJS />
      <Stat/>
      <div className={styles.buttons}>
        {buttons.map((button, index) => (
          <Button data={button} styles={styles} />
        ))}
      </div>
      <Modal />
    </div>
  );
}

export default HomePage;
