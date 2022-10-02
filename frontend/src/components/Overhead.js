import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";

const Overhead = ({ text, setText, styles }) => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoding] = useState(false);
  const [time, setTime] = useState(null);
  const [distance, setDistance] = useState(null);

  function getDistance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  const calculateTime = async () => {
    setLoding(true);

    // get the current time of the iss
    const { data } = await axios.get(
      `https://api.wheretheiss.at/v1/satellites/25544`
    );

    // get the distance between the iss and the location
    const dist = getDistance(lat, lon, data.latitude, data.longitude, "K");
    setDistance(Math.floor(dist));
    console.log(dist + "kilometers");

    // velocity of the iss
    const velocity = data.velocity;

    // calculate the time
    const time = Math.floor((dist / velocity) * 60); // in minutes
    setTime(time);

    console.log(time + "minutes");

    // return a time after which the ISS will be overhead
    setText("");
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
        <p className={styles.data}>
          The ISS will be overhead in <span>{time}</span> minutes.
          <br />
          <br />
          The distance between you and the ISS is <span>{distance}</span>{" "}
          kilometers.
        </p>
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
