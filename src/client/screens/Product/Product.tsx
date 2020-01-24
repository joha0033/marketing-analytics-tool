import * as React from "react";
import Paper from "@material-ui/core/Paper";
import DateBar from "../../components/DateBar";
import moment from "moment";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import querystring from "querystring";
import ProductChart from "./ProductChart";
import ProductTable from "./ProductTable";
import { Sources } from "../../constants/SourceMap";

const useStyles = makeStyles({
  paper: {
    width: "100%",
    marginBottom: 20
  }
});

export default function Product() {
  let { productId } = useParams();

  const today = new Date();
  const [data, setData] = React.useState([]);
  // @ts-ignore because dates aren't working right
  const [startDate, handleStartDateChange] = React.useState(
    new Date(today.setFullYear(today.getFullYear() - 1))
  );
  const [endDate, handleEndDateChange] = React.useState(new Date());
  const classes = useStyles();

  const arrangeData = (data: any) => {
    if (data.length > 0) {
      return data
        .map(
          (row: {
            _id: { createdAt: Date; productName: string };
            result: [{ source: string; clicks: string }];
          }) => ({
            createdAt: row._id.createdAt,
            productName: row._id.productName,
            amazon: row.result.find(
              r => r.source === Sources.Facebook.valueOf()
            )?.clicks,
            facebook: row.result.find(
              r => r.source === Sources.Facebook.valueOf()
            )?.clicks,
            google: row.result.find(r => r.source === Sources.Google.valueOf())
              ?.clicks,
            linkedin: row.result.find(
              r => r.source === Sources.LinkedIn.valueOf()
            )?.clicks,
            twitter: row.result.find(
              r => r.source === Sources.Twitter.valueOf()
            )?.clicks
          })
        )
        .sort(function(a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          // @ts-ignore
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
    } else {
      return [];
    }
  };

  useEffect(() => {
    let queryString = {
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      id: productId
    };
    fetch(`/api/clicks?${querystring.encode(queryString)}`)
      .then(results => results.json())
      .then(data => {
        setData(arrangeData(data.clicks));
      });
  }, [startDate, endDate]);
  //@ts-ignore
  const productName = data.length > 0 ? data[0].productName : "LOADING...";

  return (
    <Paper className={classes.paper}>
      <DateBar
        startDate={startDate}
        endDate={endDate}
        title={productName}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
      />
      <ProductChart data={data} />
      <ProductTable data={data} />
    </Paper>
  );
}
