export const convert1Dto2D = (dataFromCV, heigth) => {
  const convertedArray = Array.from(dataFromCV);
  const twoDemensionArray = [];

  while (convertedArray.length) {
    twoDemensionArray.push(convertedArray.splice(0, heigth));
  }

  return twoDemensionArray;
};

export const covertToZerosAndOnes = (raw2dArray) => {
  const converted2dArray = [];
  for (var i = 0; i < raw2dArray.length; i++) {
    for (var j = 0; j < raw2dArray[i].length; j++) {
      const rawValue = raw2dArray[i][j];
      if (rawValue >= 128) converted2dArray.push(0);
      else converted2dArray.push(1);
    }
  }

  return convert1Dto2D(converted2dArray, raw2dArray[0].length);
};

export const transpose = (matrix) => {
  const rows = matrix.length,
    cols = matrix[0].length;
  const grid = [];
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j];
    }
  }
  return grid;
};
