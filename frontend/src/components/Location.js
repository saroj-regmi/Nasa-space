import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

const Location = ({ text, setText, styles, setQuery }) => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoding] = useState(false);
  const [location, setlocation] = useState(null);
  const [value, onChange] = useState(new Date());

  const calculateLocation = async () => {
    setLoding(true);

    console.log(value.getTime());

    const { data } = await axios.get(
      `https://api.wheretheiss.at/v1/satellites/25544?timestamps=${value.getTime()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { latitude, longitude, altitude } = data;

    console.log(data);
    setQuery({
      latitude,
      longitude,
      altitude,
    });

    // return a time after which the ISS will be overhead
    setText("The ISS location is mapped to the following coordinates: ");

    setlocation({
      latitude,
      longitude,
      altitude,
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
      <p className={styles.description}>{text}</p>
      {location ? (
        <p className={styles.location}>
          {`Latitude: ${location.latitude} `}
          <br />
          {`Longitude: ${location.longitude} `}
          <br />
          {`Altitude: ${location.altitude} `}
        </p>
      ) : (
        <>
          {clicked ? (
            <div className={styles.picker}>
              <DateTimePicker onChange={onChange} value={value} />
            </div>
          ) : (
            <p className={styles.description}>
              You need to enter a time to find out when the location of the ISS.
            </p>
          )}
          {clicked ? (
            <button className={styles.find} onClick={calculateLocation}>
              Find location
            </button>
          ) : (
            <button className={styles.find} onClick={() => setClicked(true)}>
              Continue
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Location;
