import React from "react";
import { createUseStyles } from "react-jss";
import { MESH_HEIGTH, MESH_WIDTH } from "../config/contants";
import { createObstacles, remvoeObstacles } from "../utils/obstacles";
import { drawSolution, undrawSolution } from "../utils/solution";
import RowNet from "./RowNet";

const useStyles = createUseStyles(() => ({
  mesh: {
    display: "block",
    position: "absolute",
    minWidth: (props) => props.width,
    maxWidth: (props) => props.width,
    minHeight: (props) => props.height,
    maxHeight: (props) => props.height,
  },
}));

const Mesh = ({ height = MESH_HEIGTH, width = MESH_WIDTH, grid, path }) => {
  const c = useStyles({ width, height });
  const a = React.useMemo(() => height / grid.height, [grid, height]);
  const b = React.useMemo(() => width / grid.width, [grid, width]);

  React.useEffect(() => {
    if (!grid) return;
    createObstacles(grid);
    return () => remvoeObstacles(grid);
  }, [grid]);

  React.useEffect(() => {
    if (!path) return;
    drawSolution(path);
    return () => undrawSolution(path);
  }, [path]);

  return (
    <div className={c.mesh}>
      {Array.from(Array(grid.height).keys()).map((index) => (
        <RowNet key={index} a={a} b={b} n={grid.width} rowNumber={index} />
      ))}
    </div>
  );
};

export default Mesh;
