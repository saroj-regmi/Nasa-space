export const convertLatLon = (lat, lon) => {
  let aLat = (lat * Math.PI) / 180;
  let aLon = (lon * Math.PI) / 180;
  let R = 0.5834132413;

  return {
    x: Math.sin(aLon) * Math.cos(aLat) * R,
    y: Math.sin(aLat) * R,
    z: Math.cos(aLon) * Math.cos(aLat) * R,
  };
};
