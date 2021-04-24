export const createObstacles = (grid, suffix) => {
  const rows = grid.nodes;

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (!cell.walkable) {
        markObstacle(x, y, suffix);
      }
    }
  }
};

export const remvoeObstacles = (grid, suffix) => {
  const rows = grid.nodes;

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (!cell.walkable) {
        unmarkObstacle(x, y, suffix);
      }
    }
  }
};

const markObstacle = (x, y, suffix) => {
  const cell = document.getElementById(`${suffix}-${x}-${y}`);
  cell.style = "background-color: black;";
};
const unmarkObstacle = (x, y, suffix) => {
  const cell = document.getElementById(`${suffix}-${x}-${y}`);
  cell.style = "background-color: black;";
};
