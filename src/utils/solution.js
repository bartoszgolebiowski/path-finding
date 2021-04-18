export const drawSolution = (path) => {
  for (let index = 0; index < path.length; index++) {
    const xy = path[index];
    const x = xy[0];
    const y = xy[1];
    markPath(x, y);
  }
};
export const undrawSolution = (path) => {
  for (let index = 0; index < path.length; index++) {
    const xy = path[index];
    const x = xy[0];
    const y = xy[1];
    unmarkPath(x, y);
  }
};

const markPath = (x, y) => {
  const cell = document.getElementById(`${x}-${y}`);
  cell.style = "background-color: red;";
};
const unmarkPath = (x, y) => {
  const cell = document.getElementById(`${x}-${y}`);
  cell.style = "";
};
