import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {useEffect} from 'react';

import {Sources} from '../../constants/SourceMap';
import SearchBar from '../../components/SearchBar';
import BarChart from '../../components/BarChart';
import ProductsTable from './ProductsTable';

const useStyles = makeStyles({
  paper: {
    width: '100%',
    marginBottom: 20
  }
});

export default function ProductsContainer() {
  const [keyword, setKeyword] = React.useState('');
  const [data, setData] = React.useState([]);

  const arrangeData = (data: any) => {
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
  };

  useEffect(() => {
    fetch('/api/productstatistics' + (keyword.length > 1 ? `?keyword=${keyword}` : ''))
      .then(results => results.json())
      .then(data => {
        setData(arrangeData(data.productstatistics));
      });
  }, [keyword]);

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <SearchBar onChange={setKeyword} />
      <BarChart data={data} />
      <ProductsTable data={data} />
    </Paper>
  );
}
