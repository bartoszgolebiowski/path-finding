export const MESH_WIDTH = 1024;
export const MESH_HEIGTH = 1024;

export const ITERATION_STEP = 2;
export const AHEAD_PREDICTION_STEPS = 6;

const generateCoooridnates = () => {
  const START = 1;
  const END = 100;
  const COORDINATES = [];
  for (let index = 1; index < 100; index++) {
    COORDINATES.push([START * index, START, END - START * index, END]);
    COORDINATES.push([END - START * index, END, START * index, START]);
  }
  return COORDINATES;
};

export const COORDINATES = generateCoooridnates();
export const CARS_QUANTITY = COORDINATES.length;
