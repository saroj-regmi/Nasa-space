import * as dat from "dat.gui";

const gui = new dat.GUI({autoPlace:false});

export const changingData = {
  "One day": 3600,
};

gui.add(changingData, "One day", 60, 86400);
