import * as React from "react";
import { createUseStyles } from "react-jss";
import SingleNet from "./SingleNet";

const useStyles = createUseStyles(() => ({
  row: {
    display: "flex",
    minWidth: (props) => props.b,
    maxWidth: (props) => props.b,
    minHeight: (props) => props.a,
    maxHeight: (props) => props.a,
  },
}));

const RowNet = ({ a, b, n, rowNumber, suffix }) => {
  const c = useStyles({
    b: b * n,
    a,
  });

  return (
    <div className={c.row}>
      {Array.from(Array(n).keys()).map((index) => (
        <SingleNet
          key={index}
          a={a}
          b={b}
          rowNumber={rowNumber}
          columnNumber={index}
          suffix={suffix}
        />
      ))}
    </div>
  );
};

export default React.memo(RowNet);
