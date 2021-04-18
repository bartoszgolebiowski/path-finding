import * as React from "react";
import * as PF from "pathfinding";
import ImagePicker from "./components/ImagePicker";
import AlgorithmPicker from "./components/AlgorithmPicker";
import Mesh from "./components/grid/Mesh";

function App() {
  const [gridArray, setGridArray] = React.useState();
  const [finder, setFinder] = React.useState();
  const [metrics, setMetrics] = React.useState({});

  const grid = React.useMemo(() => {
    if (gridArray === undefined) {
      return undefined;
    }
    return new PF.Grid(gridArray);
  }, [gridArray]);

  const path = React.useMemo(() => {
    if (grid === undefined || finder === undefined) {
      return undefined;
    }
    const startTime = new Date();
    const result = finder.findPath(1, 2, 44, 73, grid);  
    const duration = new Date().getTime() - startTime.getTime(); 

    setMetrics({
      length: result.length,
      duration,
    });

    return result;
  }, [finder, grid]);

  return (
    <div>
      <AlgorithmPicker onAlgorithmChange={setFinder} />
      <ImagePicker onImageChange={setGridArray} />
      {grid !== undefined || path !== undefined ? (
        <Mesh grid={grid} path={path} />
      ) : null}
      {JSON.stringify(metrics, null, 2)}
    </div>
  );
}

export default App;
