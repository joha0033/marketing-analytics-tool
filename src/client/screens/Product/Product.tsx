import * as React from "react";
import Paper from "@material-ui/core/Paper";
import DateBar from "../../components/DateBar";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    width: "100%",
    marginBottom: 20
  }
});

export default function Product() {
  let { productId } = useParams();

  const today = new Date();
  const [keyword, setKeyword] = React.useState("");
  // @ts-ignore because dates aren't working right
  const [startDate, handleStartDateChange] = React.useState(
    new Date(today.setFullYear(today.getFullYear() - 1))
  );
  const [endDate, handleEndDateChange] = React.useState(new Date());
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <DateBar
        startDate={startDate}
        endDate={endDate}
        title={"Product Foo"}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
      />
      Requested product ID: {productId}
      <Link to="/">BACK</Link>
    </Paper>
  );
}
