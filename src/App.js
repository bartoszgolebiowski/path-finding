import * as React from "react";
import ImagePicker from "./components/ImagePicker";
import AlgorithmPicker from "./components/AlgorithmPicker";
import Mesh from "./components/grid/Mesh";
import useGridAndPath from "./algorithms/useGridAndPath";

function App() {
  const {
    isDefined,
    grid,
    pathCars,
    incrementIteration,
    showStatistics,
    setFinder,
    setGridArray,
  } = useGridAndPath();

  return (
    <div>
      <AlgorithmPicker onAlgorithmChange={setFinder} />
      <ImagePicker onImageChange={setGridArray} />
      <button onClick={incrementIteration}>Next iteration</button>
      <button onClick={showStatistics}>ShowStatistics</button>
      {isDefined ? <Mesh grid={grid.clone()} paths={pathCars} /> : null}
    </div>
  );
}

export default App;
