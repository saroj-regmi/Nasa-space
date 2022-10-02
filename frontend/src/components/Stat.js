import React,{useState,useEffect} from "react";
import styles from "../styles/stat.module.css";
import axios from "axios";

const Stat = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [issVel, setIssvel] = useState(0);
  const [repeater, setRepeater] = useState(0);
  const getLocation = async () => {
    const {data} = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    setLat(data.latitude);
    setLon(data.longitude);
    setIssvel(data.velocity);
  }
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
