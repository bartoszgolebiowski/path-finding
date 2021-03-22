import * as PF from "pathfinding";
import Mesh from "./components/Mesh";

function App() {
  var grid = new PF.Grid(64, 64);

  for (let index = 0; index < 60; index++) {
    grid.setWalkableAt(index, 20, false);
  }

  for (let index = 0; index < 60; index++) {
    grid.setWalkableAt(63 - index, 40, false);
  }
  
  var finder = new PF.AStarFinder();
  var path = finder.findPath(0, 0, 63, 63, grid);

  return <Mesh grid={grid} path={path} />;
}

export default App;
