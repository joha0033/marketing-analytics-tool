import * as React from 'react';
import moment from 'moment';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {useEffect} from 'react';
import querystring from 'querystring';

import {Sources} from '../../constants/SourceMap';
import SearchBar from '../../components/SearchBar';
import BarChart from '../../components/BarChart';
import ProductsTable from './ProductsTable';

const useStyles = makeStyles({
  divider: {
    marginBottom: 40
  },
  paper: {
    width: '100%',
    marginBottom: 20
  }
});

export default function ProductsContainer() {
  const today = new Date();
  const [keyword, setKeyword] = React.useState('');
  // @ts-ignore because dates aren't working right
  const [startDate, handleStartDateChange] = React.useState(new Date(today.setFullYear(today.getFullYear() - 1)));
  const [endDate, handleEndDateChange] = React.useState(new Date());
  const [data, setData] = React.useState([]);

  const arrangeData = (data: any) => {
    if (data.length > 0) {
      return data.map(
        (row: {_id: {productName: string; product: string}; result: [{source: string; clicks: string}]}) => ({
          id: row._id.product,
          productName: row._id.productName,
          amazon: row.result.find(r => r.source === Sources.Amazon.valueOf())?.clicks,
          facebook: row.result.find(r => r.source === Sources.Facebook.valueOf())?.clicks,
          google: row.result.find(r => r.source === Sources.Google.valueOf())?.clicks,
          linkedin: row.result.find(r => r.source === Sources.LinkedIn.valueOf())?.clicks,
          twitter: row.result.find(r => r.source === Sources.Twitter.valueOf())?.clicks
        })
      );
    } else {
      return [];
    }
  };

  useEffect(() => {
    let queryString = {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD')
    };
    if (!!keyword && keyword.length > 0) {
      queryString['keyword'] = keyword;
    }
    fetch(`/api/productstatistics?${querystring.encode(queryString)}`)
      .then(results => results.json())
      .then(data => {
        setData(arrangeData(data.productstatistics));
      });
  }, [keyword, startDate, endDate]);

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <SearchBar
        setKeyword={setKeyword}
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
      />
      <BarChart data={data} />
      <div className={classes.divider} />
      <ProductsTable data={data} />
    </Paper>
  );
}
