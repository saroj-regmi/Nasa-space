import { useState } from "react";
import Loader from "./Loader";

const Overhead = ({ text, setText, styles, setQuery, label }) => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoding] = useState(false);
  const [time, setTime] = useState(null);

  const calculateTime = () => {
    setLoding(true);
    setQuery({
      label,
      latitude: lat,
      longitude: lon,
    });

    // return a time after which the ISS will be overhead
    setTime(new Date().toLocaleTimeString());
    setText("The ISS will be overhead at ");
    setLoding(false);
  };

  const getLocation = () => {
    setClicked(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
      setText("Your current location is: ");
    } else {
      setText(
        "Geolocation is not supported by this browser. Please enter your location manually."
      );
    }
  };

  function showPosition(position) {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setText(
          "You have denied the request for Geolocation. Please enter your location manually."
        );
        break;
      case error.POSITION_UNAVAILABLE:
        setText(
          "Location information is unavailable in your browser. Please enter your location manually."
        );
        break;
      case error.TIMEOUT:
        setText("Please enter your location.");
        break;
      case error.UNKNOWN_ERROR:
        setText(
          "An unknown error occurred while getting your location. Please enter your location manually."
        );
        break;
    }
  }
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
      {time ? (
        <p className={styles.time}>{time}</p>
      ) : (
        <>
          {clicked ? (
            <div className={styles.overhead}>
              <div className={styles.input}>
                <input
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  required
                />
                <label>Latitude: </label>
              </div>
              <div className={styles.input}>
                <input
                  type="text"
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                  required
                />
                <label>Longitude: </label>
              </div>
            </div>
          ) : (
            <p className={styles.description}>
              Please allow us to use your location
            </p>
          )}
          {clicked ? (
            <button className={styles.find} onClick={calculateTime}>
              Find time
            </button>
          ) : (
            <button className={styles.find} onClick={getLocation}>
              Continue
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Overhead;
