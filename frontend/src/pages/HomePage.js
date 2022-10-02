import React from "react";

import THREEJS from "../THREEJS";

import styles from "../styles/homepage.module.css";

function HomePage() {
  return (
    <div className={styles.conatiner}>
      <THREEJS />
      <div className={styles.buttons}>
        <button>
          <img src="/svgs/overhead.svg" />
        </button>
        <button>
          <img src="/svgs/timedifference.svg" />
        </button>
        <button>
          <img src="/svgs/searchlocation.svg" />
        </button>
      </div>
    </div>
  );
}

export default HomePage;
