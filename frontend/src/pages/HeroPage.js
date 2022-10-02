import React from "react";
import styles from "../styles/hero.module.css";
import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <>
      <div className={styles.hero_container}>
        <div className={styles.hero_wrapper}>
          <div className={styles.hero_content}>
            <h2>Hamro Earth</h2>
            <p>
              Tracking , comparing , locating and visualizing ISS made easy. A
              complete 3D visualization of ISS.
            </p>
          </div>
          <div className={styles.hero_btn_con}>
            <Link to="/app" className={styles.btn}>
              Let's Explore
            </Link>
            <button className={styles.btn}>Github</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPage;
