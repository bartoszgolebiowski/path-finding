import * as React from "react";
import * as PF from "pathfinding";
import ImagePicker from "./components/ImagePicker";
import AlgorithmPicker from "./components/AlgorithmPicker";
import Mesh from "./components/grid/Mesh";

function App() {
  const [gridArray, setGridArray] = React.useState();
  const [finder, setFinder] = React.useState();

  const grid = React.useMemo(() => {
    if (gridArray === undefined) {
      return undefined;
    }
    return new PF.Grid(gridArray);
  }, [gridArray]);

  const pathCar1 = React.useMemo(() => {
    if (grid === undefined || finder === undefined) {
      return undefined;
    }
    return finder.findPath(1, 2, 68, 68, grid.clone());
  }, [finder, grid]);

  const pathCar2 = React.useMemo(() => {
    if (grid === undefined || finder === undefined) {
      return undefined;
    }
    return finder.findPath(68, 68, 1, 2, grid.clone());
  }, [finder, grid]);

  const isDefined = grid !== undefined || pathCar1 !== undefined;

  return (
    <div>
      <AlgorithmPicker onAlgorithmChange={setFinder} />
      <ImagePicker onImageChange={setGridArray} />
      {isDefined ? (
        <Mesh grid={grid.clone()} path={pathCar1} suffix="car-1" />
      ) : null}
      {isDefined ? (
        <Mesh grid={grid.clone()} path={pathCar2} suffix="car-2" />
      ) : null}
    </div>
  );
}

export default App;
