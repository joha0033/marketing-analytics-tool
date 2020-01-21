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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function ProductsTable() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetch('/api/clicks')
      .then(results => results.json())
      .then(data => {
        console.warn(data.clicks);
        setData(data.clicks);
      });
  }, []);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='table'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align='right'>Product Name</TableCell>
            <TableCell align='right'>Total Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (row: {
              id: string;
              productName: string | number | undefined;
              product: React.ReactNode;
              clicks: React.ReactNode;
            }) => (
              <TableRow key={row.id}>
                <TableCell component='th' scope='row'>
                  {row.product}
                </TableCell>
                <TableCell align='right'>{row.productName}</TableCell>
                <TableCell align='right'>{row.clicks}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
