export const convertLatLon = (lat, lon, radius) => {
  var phi = (90 - lat) * (Math.PI / 180);
  var theta = (lon + 180) * (Math.PI / 180);

  let x = -(radius * Math.sin(phi) * Math.cos(theta));
  let z = radius * Math.sin(phi) * Math.sin(theta);
  let y = radius * Math.cos(phi);

  // console.log([x, y, z]);
  return { x, y, z };
};
