import * as React from "react";
import * as PF from "pathfinding";
import ImagePicker from "./components/ImagePicker";
import AlgorithmPicker from "./components/AlgorithmPicker";
import Mesh from "./components/grid/Mesh";

const START_X = 1;
const START_Y = 1;
const END_X = 68;
const END_Y = 68;
const START_X2 = 55;
const START_Y2 = 33;
const END_X2 = 12;
const END_Y2 = 76;

const ITERATION_STEP = 2;
const AHEAD_PREDICTION_STEPS = 6;
const CARS_QUANTITY = 4;
const COORDINATES = [
  [START_X, START_Y, END_X, END_Y],
  [END_X, END_Y, START_X, START_Y],
  [START_X2, START_Y2, END_X2, END_Y2],
  [END_X2, END_Y2, START_X2, START_Y2],
];

function App() {
  const prevPathsRef = React.useRef();
  const [gridArray, setGridArray] = React.useState();
  const [finder, setFinder] = React.useState();
  const [iteration, setIteration] = React.useState(0);

  const incrementIteration = () => setIteration((iteration) => iteration + 1);

  const grid = React.useMemo(() => {
    if (gridArray === undefined) {
      return undefined;
    }
    return new PF.Grid(gridArray);
  }, [gridArray]);

  const pathCars = React.useMemo(() => {
    if (grid === undefined || finder === undefined) {
      return undefined;
    }
    if (iteration === 0) {
      const newPaths = [...Array(CARS_QUANTITY).keys()].map((car) => {
        return finder.findPath(
          COORDINATES[car][0],
          COORDINATES[car][1],
          COORDINATES[car][2],
          COORDINATES[car][3],
          grid.clone()
        );
      });
      const result = newPaths.map((singlePath) =>
        singlePath.filter((_, index) => index < ITERATION_STEP)
      );
      prevPathsRef.current = result;
      return result;
    } else {
      const prevPaths = prevPathsRef.current;
      let currentGrid = grid.clone();
      const newPaths = [...Array(CARS_QUANTITY).keys()].map((car) => {
        const currentCarPath = prevPaths[car];
        const lastElement = currentCarPath[currentCarPath.length - 1];

        const result = finder.findPath(
          lastElement[0],
          lastElement[1],
          COORDINATES[car][2],
          COORDINATES[car][3],
          currentGrid.clone()
        );

        result
          .filter((_, index) => index < AHEAD_PREDICTION_STEPS)
          .forEach((node) => {
            currentGrid.setWalkableAt(node[0], node[1], false);
          });

        return result;
      });

      const result = newPaths.map((singlePath) =>
        singlePath.filter((_, index) => index < ITERATION_STEP)
      );
      prevPathsRef.current = result;

      return result;
    }
  }, [finder, grid, iteration]);

  const isDefined = grid !== undefined || pathCars !== undefined;

  return (
    <div>
      <AlgorithmPicker onAlgorithmChange={setFinder} />
      <ImagePicker onImageChange={setGridArray} />
      <button onClick={incrementIteration}>Next iteration</button>
      {isDefined ? <Mesh grid={grid.clone()} paths={pathCars} /> : null}
    </div>
  );
}

export default App;
