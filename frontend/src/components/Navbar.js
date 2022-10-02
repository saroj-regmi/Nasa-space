import React from 'react'
import styles from "../styles/navbar.module.css"
import { FaSatelliteDish } from "react-icons/fa";
const Navbar = () => {
  return (
    <>
      <div className={styles.nav_container}>
        <div className={styles.logo_wrapper}>
          <FaSatelliteDish className={styles.logo} />
          <span>Name</span>
        </div>
      </div>
    </>
  );
}

export default Navbar