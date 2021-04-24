export const drawSolution = (path, suffix) => {
  for (let index = 0; index < path.length; index++) {
    const xy = path[index];
    const x = xy[0];
    const y = xy[1];
    markPath(x, y, suffix);
  }
};
export const undrawSolution = (path, suffix) => {
  for (let index = 0; index < path.length; index++) {
    const xy = path[index];
    const x = xy[0];
    const y = xy[1];
    unmarkPath(x, y, suffix);
  }
};

const markPath = (x, y, suffix) => {
  const cell = document.getElementById(`${suffix}-${x}-${y}`);
  cell.style = "background-color: red;";
};

const unmarkPath = (x, y, suffix) => {
  const cell = document.getElementById(`${suffix}-${x}-${y}`);
  cell.style = "";
};
