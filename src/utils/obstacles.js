export const createObstacles = (grid) => {
  const rows = grid.nodes;

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (!cell.walkable) {
        markObstacle(x, y);
      }
    }
  }
};

export const remvoeObstacles = (grid) => {
  const rows = grid.nodes;

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (!cell.walkable) {
        unmarkObstacle(x, y);
      }
    }
  }
};

const markObstacle = (x, y) => {
  const cell = document.getElementById(`${x}-${y}`);
  cell.style = "background-color: black;";
};
const unmarkObstacle = (x, y) => {
  const cell = document.getElementById(`${x}-${y}`);
  cell.style = "background-color: black;";
};
