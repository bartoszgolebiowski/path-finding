import * as React from "react";
import * as PF from "pathfinding";
import {
  ITERATION_STEP,
  AHEAD_PREDICTION_STEPS,
  CARS_QUANTITY,
  COORDINATES,
} from "../config/contants";

const emptyArrays = [...Array(CARS_QUANTITY).keys()].map(() => []);

const useGridAndPath = () => {
  const statisticsRaw = React.useRef(emptyArrays);
  const prevPathsRef = React.useRef();
  const [gridArray, setGridArray] = React.useState();
  const [finder, setFinder] = React.useState();
  const [iteration, setIteration] = React.useState(0);

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
        const carXStart = COORDINATES[car][0];
        const carYStart = COORDINATES[car][1];
        const carXEnd = COORDINATES[car][2];
        const carYEnd = COORDINATES[car][3];

        return finder.findPath(
          carXStart,
          carYStart,
          carXEnd,
          carYEnd,
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

        const xCurrent = lastElement[0];
        const yCurrent = lastElement[1];
        const xTarget = COORDINATES[car][2];
        const yTarget = COORDINATES[car][3];

        const result = finder.findPath(
          xCurrent,
          yCurrent,
          xTarget,
          yTarget,
          currentGrid.clone()
        );

        const steps = result.filter(
          (_, index) => index < AHEAD_PREDICTION_STEPS
        );

        steps.forEach((node) => {
          currentGrid.setWalkableAt(node[0], node[1], false);
        });

        if (xCurrent !== xTarget && yCurrent !== yTarget) {
          let carStatistics = statisticsRaw.current[car];
          carStatistics.push(steps);
        }

        if (result.length === 0) {
          return [
            [xCurrent, yCurrent],
            [xCurrent, yCurrent],
          ];
        }
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

  const showStatistics = () => {
    statisticsRaw.current.forEach((singleCarPath, carNumber) => {
      const data = {
        carNumber,
        length: singleCarPath.length,
      };
      console.table(data);
    });
  };

  const incrementIteration = () => setIteration((iteration) => iteration + 1);

  return {
    isDefined,
    grid,
    pathCars,
    finder,
    iteration,
    incrementIteration,
    showStatistics,
    setFinder,
    setGridArray,
  };
};

export default useGridAndPath;
