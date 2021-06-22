export const MESH_WIDTH = 1024;
export const MESH_HEIGTH = 1024;

export const ITERATION_STEP = 2;
export const AHEAD_PREDICTION_STEPS = 6;

const getRandomArbitrary = (min, max)=> {
  return Math.round(Math.random() * (max - min) + min);
}
const OFFSET = ()=> getRandomArbitrary(-2,3)


export const START_X = 5;
export const START_Y = 5;
export const END_X = 88;
export const END_Y = 88;
export const START_X2 = 10;
export const START_Y2 = 35;
export const END_X2 = 55;
export const END_Y2 = 66;
export const START_X3 = 77;
export const START_Y3 = 45;
export const END_X3 = 10;
export const END_Y3 = 66;
export const START_X4 = 31;
export const START_Y4 = 86;
export const END_X4 = 5;
export const END_Y4 = 8;


export const COORDINATES = [
  [START_X, START_Y, END_X, END_Y],
  [END_X, END_Y, START_X, START_Y],
  [START_X2, START_Y2, END_X2, END_Y2],
  [END_X2, END_Y2, START_X2, START_Y2],
  [START_X3, START_Y3, END_X3, END_Y3],
  [END_X3, END_Y3, START_X3, START_Y3],
  [START_X4, START_Y4, END_X4, END_Y4],
  [END_X4, END_Y4, START_X4, START_Y4],
];


export const CARS_QUANTITY = COORDINATES.length;
// const generateCoooridnates = ()=>{
//   const START = 1;
//   const END = 100;
// const COORDINATES = []
// for (let index = 1; index < 100; index++) {
//   COORDINATES.push([START * index, START, END - START * index, END])
//   COORDINATES.push([END - START * index, END, START * index, START])
// }
// return COORDINATES
// }

// export const COORDINATES = generateCoooridnates()
// export const CARS_QUANTITY = COORDINATES.length;