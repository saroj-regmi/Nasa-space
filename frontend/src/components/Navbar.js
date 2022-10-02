import React from "react";
import styles from "../styles/navbar.module.css";
import { FaSatelliteDish } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className={styles.nav_container}>
        <Link to="/">
          <div className={styles.logo_wrapper}>
            <FaSatelliteDish className={styles.logo} />
            <span>Name</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
