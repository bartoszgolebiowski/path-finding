import * as React from "react";
import { createUseStyles } from "react-jss";
import RowNet from "./RowNet";
import { MESH_HEIGTH, MESH_WIDTH, COORDINATES} from "../../config/contants";
import {
  createObstacles,
  getRandomRgb,
  remvoeObstacles,
} from "../../utils/obstacles";
import { drawSolution, undrawSolution } from "../../utils/solution";

const useStyles = createUseStyles(() => ({
  mesh: {
    display: "block",
    minHeight: (props) => props.height,
    maxHeight: (props) => props.height,
  },
}));


const colors = [...Array(COORDINATES.length).keys()].map(() => getRandomRgb())

const Mesh = ({ height = MESH_HEIGTH, width = MESH_WIDTH, grid, paths }) => {
  const c = useStyles({ width, height });
  const a = React.useMemo(() => height / grid.height, [grid, height]);
  const b = React.useMemo(() => width / grid.width, [grid, width]);
 
  React.useEffect(() => {
    if (!grid) return;
    createObstacles(grid);
    return () => remvoeObstacles(grid);
  }, [grid]);

  React.useEffect(() => {
    if (!paths) return;
    paths.forEach((path, index) => {
      drawSolution(path, colors[index]);
    });

    return () => {
      paths.forEach((path) => {
        undrawSolution(path);
      });
    };
  }, [paths]);

  return (
    <div className={c.mesh}>
      {Array.from(Array(grid.height).keys()).map((index) => (
        <RowNet key={index} a={a} b={b} n={grid.width} rowNumber={index} />
      ))}
    </div>
  );
};

export default Mesh;
