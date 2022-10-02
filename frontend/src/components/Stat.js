import React, { useState, useEffect } from "react";
import styles from "../styles/stat.module.css";
import axios from "axios";

const Stat = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [issVel, setIssvel] = useState(0);
  const [repeater, setRepeater] = useState(0);

  const color = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
  ];
  const getLocation = async () => {
    const { data } = await axios.get(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );
    setLat(data.latitude);
    setLon(data.longitude);
    setIssvel(data.velocity.toString().substring(0, 8));
  };
  useEffect(() => {
    getLocation();
    setTimeout(() => {
      setRepeater((prevState) => prevState + 1);
    }, 5000);
  }, [repeater]);

  return (
    <>
      <div className={styles.stat_container}>
        <p>
          Latitude: <span>{lat}</span>
        </p>
        <p>
          Longitude: <span>{lon}</span>
        </p>
        <p>
          Earth Velcotiy: <span>30 km/hr</span>
        </p>
        <p>
          ISA velocity: <span>{issVel} km/hr</span>
        </p>
      </div>
    </>
  );
};

export default Stat;
