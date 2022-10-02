import React from "react";
import styles from "../styles/hero.module.css";
import {Link} from "react-router-dom"

const HeroPage = () => {
  return (
    <>
      <div className={styles.hero_container}>
        <div className={styles.hero_wrapper}>
          <div className={styles.hero_content}>
            <h2>Explore the ISA</h2>
            <p>
              This project helps us to view the exact location of ISA and track
              it. This project helps us to view the exact location of ISA and
              track it. This project helps us to view the exact location of ISA
              and track it.
            </p>
          </div>
          <div className={styles.hero_btn_con}>
            <Link to="/app" className={styles.btn}>Let's Explore</Link>
            <button className={styles.btn}>Github</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPage;
