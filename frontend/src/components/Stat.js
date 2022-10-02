import React from "react";
import styles from "../styles/stat.module.css";

const Stat = () => {
  return (
    <>
      <div className={styles.stat_container}>
        <p>
          Latitude: <span>20N 56,30E 44</span>
        </p>
        <p>
          Longitude: <span>50N 57,45E 67</span>
        </p>
        <p>
          Earth Velcotiy: <span>10mls</span>
        </p>
        <p>
          ISA velocity: <span>160m/s</span>
        </p>
      </div>
    </>
  );
};

export default Stat;
