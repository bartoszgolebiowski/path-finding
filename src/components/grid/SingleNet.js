import * as React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(() => ({
  cell: {
    minWidth: (props) => props.b,
    maxWidth: (props) => props.b,
    minHeight: (props) => props.a,
    maxHeight: (props) => props.a,
    border: "1px green solid",
  },
}));

const SingleNet = ({ a, b, rowNumber, columnNumber, suffix }) => {
  const c = useStyles({
    b,
    a,
  });
  return (
    <div id={`${suffix}-${rowNumber}-${columnNumber}`} className={c.cell}></div>
  );
};

export default React.memo(SingleNet);
