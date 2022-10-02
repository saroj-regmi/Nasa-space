import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";

const TimeDifference = ({ text, setText, styles }) => {
  const [timeDiff, setTimeDiff] = useState(null);
  const [loading, setLoding] = useState(false);
  const [time, setTime] = useState(null);

  const calculateTime = async () => {
    setLoding(true);
    const currentTime = new Date().getTime();

    const { data } = await axios.get(
      "https://api.wheretheiss.at/v1/satellites/25544",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data);

    const satelliteTime = data.timestamp;

    const timeDifference = currentTime - satelliteTime;

    let milliseconds = timeDifference;

    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    setTime({ hours, minutes, seconds });
    setTimeDiff({
      localTime: new Date(currentTime).toLocaleTimeString(),
      issTime: new Date(satelliteTime).toLocaleTimeString(),
    });
    setLoding(false);
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {timeDiff ? (
        <p className={styles.description}>
          {`Your local time: ${timeDiff.localTime} `}
          <br />
          {`Time of the ISS: ${timeDiff.issTime}`}
        </p>
      ) : (
        <p className={styles.description}>{text}</p>
      )}
      {time ? (
        <p className={styles.time}>
          {`${time.hours}:${time.minutes}:${time.seconds}`}
        </p>
      ) : (
        <>
          <p className={styles.description}>
            We will use your system time to calculate the time difference.
          </p>
          <button className={styles.find} onClick={calculateTime}>
            Find time difference
          </button>
        </>
      )}
    </>
  );
};

export default TimeDifference;
