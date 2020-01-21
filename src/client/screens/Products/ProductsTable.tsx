import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useEffect} from 'react';

import {Sources} from '../../constants/SourceMap';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function ProductsTable() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetch('/api/productstatistics')
      .then(results => results.json())
      .then(data => {
        setData(data.productstatistics);
      });
  }, []);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='table'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell align='right'>Clicks Amazon</TableCell>
            <TableCell align='right'>Clicks Facebook</TableCell>
            <TableCell align='right'>Clicks Google</TableCell>
            <TableCell align='right'>Clicks LinkedIn</TableCell>
            <TableCell align='right'>Clicks Twitter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (row: {_id: {productName: string; product: string}; result: [{source: string; clicks: string}]}) => (
              <TableRow key={row._id.product}>
                <TableCell component='th' scope='row'>
                  {row._id.product}
                </TableCell>
                <TableCell>{row._id.productName}</TableCell>
                <TableCell align='right'>
                  {row.result.find(r => r.source === Sources.Amazon.valueOf())?.clicks}
                </TableCell>
                <TableCell align='right'>
                  {row.result.find(r => r.source === Sources.Facebook.valueOf())?.clicks}
                </TableCell>
                <TableCell align='right'>
                  {row.result.find(r => r.source === Sources.Google.valueOf())?.clicks}
                </TableCell>
                <TableCell align='right'>
                  {row.result.find(r => r.source === Sources.LinkedIn.valueOf())?.clicks}
                </TableCell>
                <TableCell align='right'>
                  {row.result.find(r => r.source === Sources.Twitter.valueOf())?.clicks}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
