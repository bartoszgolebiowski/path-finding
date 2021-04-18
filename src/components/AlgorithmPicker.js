import * as React from "react";
import BiAStarFinder from "../algorithms/finders/BiAStarFinder";
import BreadthFirstFinder from "../algorithms/finders/BreadthFirstFinder";
import AStarFinder from "../algorithms/finders/AStarFinder";

const alghoritmMap = {
  AStarFinder: new AStarFinder(),
  BiAStarFinder: new BiAStarFinder(),
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
      <option value={"AStarFinder"}>AStarFinder</option>
      <option value={"BiAStarFinder"}>BiAStarFinder</option>
      <option value={"BreadthFirstFinder"}>BreadthFirstFinder</option>
    </select>
  );
};

export default AlgorithmPicker;
