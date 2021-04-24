import * as React from "react";
import { createUseStyles } from "react-jss";
import RowNet from "./RowNet";
import { MESH_HEIGTH, MESH_WIDTH } from "../../config/contants";
import { createObstacles, remvoeObstacles } from "../../utils/obstacles";
import { drawSolution, undrawSolution } from "../../utils/solution";

const useStyles = createUseStyles(() => ({
  mesh: {
    display: "block",
    minHeight: (props) => props.height,
    maxHeight: (props) => props.height,
  },
}));

const Mesh = ({
  height = MESH_HEIGTH,
  width = MESH_WIDTH,
  grid,
  path,
  suffix,
}) => {
  const c = useStyles({ width, height });
  const a = React.useMemo(() => height / grid.height, [grid, height]);
  const b = React.useMemo(() => width / grid.width, [grid, width]);

  React.useEffect(() => {
    if (!grid) return;
    createObstacles(grid, suffix);
    return () => remvoeObstacles(grid, suffix);
  }, [grid, suffix]);

  React.useEffect(() => {
    if (!path) return;
    drawSolution(path, suffix);
    return () => undrawSolution(path, suffix);
  }, [path, suffix]);

  return (
    <div className={c.mesh}>
      {Array.from(Array(grid.height).keys()).map((index) => (
        <RowNet
          key={index}
          a={a}
          b={b}
          n={grid.width}
          rowNumber={index}
          suffix={suffix}
        />
      ))}
    </div>
  );
};

export default Mesh;
