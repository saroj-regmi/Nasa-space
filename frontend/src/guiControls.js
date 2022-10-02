import * as dat from "dat.gui";

const gui = new dat.GUI();

export const changingData = {
  "One day": 3600,
  "earthX": 0,
  "earthY": 0,
  "earthZ": 0,
};

gui.add(changingData, "One day", 60, 86400);
gui.add(changingData, "earthX", 0, 149740000);
gui.add(changingData, "earthY", 0, 149740000);
gui.add(changingData, "earthZ", 0, 149740000);
