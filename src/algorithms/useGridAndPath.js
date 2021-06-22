import * as React from "react";
import * as PF from "pathfinding";
import {
  ITERATION_STEP,
  AHEAD_PREDICTION_STEPS,
  CARS_QUANTITY,
  COORDINATES,
} from "../config/contants";

const emptyArrays = ()=> [...Array(COORDINATES.length).keys()].map(() => []);

const useGridAndPath = () => {
  const statisticsRaw = React.useRef(emptyArrays());
  const stopsRaw = React.useRef(emptyArrays());
  const timeRaw = React.useRef(emptyArrays());

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

        const start = new Date().getTime();
        const result = finder.findPath(
          xCurrent,
          yCurrent,
          xTarget,
          yTarget,
          currentGrid.clone()
        );
        const end = new Date().getTime()
        const steps = result.filter(
          (_, index) => index < AHEAD_PREDICTION_STEPS
        );

        steps.forEach((node) => {
          currentGrid.setWalkableAt(node[0], node[1], false);
        });

        const duration = (end-start)/1000
        let timeStatistics = timeRaw.current[car];
        timeStatistics.push(duration);

        if (xCurrent !== xTarget && yCurrent !== yTarget) {
          let carStatistics = statisticsRaw.current[car];
          carStatistics.push(steps);
        }

        if (result.length === 0) {
          stopsRaw.current[car] = Number(stopsRaw.current[car]) + 1;
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
    const statistics = []
    statisticsRaw.current.forEach((singleCarPath, carNumber) => {
      const data =  singleCarPath.length
      statistics.push(data)
    });
    const stopsArr = []
    stopsRaw.current.forEach((stops, carNumber) => {
      stopsArr.push(stops)
    });
    const timeArr = []
    timeRaw.current.forEach((time, carNumber) => {
      const average = time.reduce((acc,el)=>{return acc + el},0) / time.length
      timeArr.push(average)
    });

    console.log(JSON.stringify(statistics))
    console.log(JSON.stringify(stopsArr))
    console.log(JSON.stringify(timeArr))
  };

  const incrementIteration = React.useCallback(() => {
    setInterval(()=>{
      setIteration((iteration) => iteration + 1)
    },100)
  },[]);

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
