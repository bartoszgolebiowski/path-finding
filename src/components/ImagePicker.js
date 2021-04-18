/* eslint-disable no-undef */

import * as React from "react";
import {
  convert1Dto2D,
  covertToZerosAndOnes,
  transpose,
} from "../utils/imageProcessing";

const ImagePicker = ({ onImageChange }) => {
  const handleChange = (e) => {
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };

  const handleLoad = () => {
    const imgElement = document.getElementById("output");
    let src = cv.imread(imgElement, 0);
    let dst = new cv.Mat();
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    const twoDemensionArray = convert1Dto2D(dst.data, dst.size().width);
    const zerosOnes = covertToZerosAndOnes(twoDemensionArray);
    const transposedZerosOnes = transpose(zerosOnes);
    onImageChange(transposedZerosOnes);
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleChange} />
      <img
        id="output"
        alt="uploaded_image"
        onLoad={handleLoad}
        style={{ display: "none" }}
      />
    </>
  );
};

export default ImagePicker;
