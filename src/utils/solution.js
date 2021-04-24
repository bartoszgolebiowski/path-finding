export const drawSolution = (path, color) => {
  for (let index = 0; index < path.length; index++) {
    const xy = path[index];
    const x = xy[0];
    const y = xy[1];
    markPath(x, y, color);
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

const markPath = (x, y, color) => {
  const cell = document.getElementById(`${x}-${y}`);
  cell.style = `background-color: ${color};`;
};

const unmarkPath = (x, y) => {
  const cell = document.getElementById(`${x}-${y}`);
  cell.style = "";
};
