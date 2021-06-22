import * as React from "react";
import BestFirstFinder from "../algorithms/finders/BiAStarFinder";
import BreadthFirstFinder from "../algorithms/finders/BreadthFirstFinder";
import AStarFinder from "../algorithms/finders/AStarFinder";

const alghoritmMap = {
  AStarFinder: new AStarFinder(),
  BestFirstFinder: new BestFirstFinder(),
  BreadthFirstFinder: new BreadthFirstFinder(),
};

const AlgorithmPicker = ({ onAlgorithmChange }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    const algo = alghoritmMap[event.target.value];
    onAlgorithmChange(algo);
  };

  return (
    <select onChange={handleChange} value={value}>
      <option value=""></option>
      <option value={"AStarFinder"}>AStar</option>
      <option value={"BestFirstFinder"}>BestFirst</option>
      <option value={"BreadthFirstFinder"}>BreadthFirst</option>
    </select>
  );
};

export default AlgorithmPicker;
