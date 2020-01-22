import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {TablePagination, Divider} from '@material-ui/core';
import EnhancedTableHeader from '../../components/EnhancedTableHeader';
import {stableSort, getSorting} from '../../utilities/Sorting';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  table: {
    minWidth: 500
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
});

const headCells = [
  {id: 'id', numeric: false, disablePadding: false, label: 'ID'},
  {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
  {id: 'amazon', numeric: true, disablePadding: false, label: 'Amazon'},
  {id: 'facebook', numeric: true, disablePadding: false, label: 'Facebook'},
  {id: 'google', numeric: true, disablePadding: false, label: 'Google'},
  {id: 'linkedin', numeric: true, disablePadding: false, label: 'LinkedIn'},
  {id: 'twitter', numeric: true, disablePadding: false, label: 'Twitter'}
];

export default function ProductsTable(props: {data: any}) {
  const {data} = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event: any, property: React.SetStateAction<string>) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: {target: {value: string}}) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const classes = useStyles();
  return (
    <>
      <Divider variant='fullWidth' />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='table' size='small'>
          <EnhancedTableHeader
            headCells={headCells}
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(data, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(
                (row: {
                  id: string;
                  productName: string;
                  amazon: number;
                  facebook: number;
                  google: number;
                  linkedin: number;
                  twitter: number;
                }) => (
                  <TableRow key={row.id}>
                    <TableCell component='th' scope='row'>
                      {row.id}
                    </TableCell>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell align='right'>{row.amazon}</TableCell>
                    <TableCell align='right'>{row.facebook}</TableCell>
                    <TableCell align='right'>{row.google}</TableCell>
                    <TableCell align='right'>{row.linkedin}</TableCell>
                    <TableCell align='right'>{row.twitter}</TableCell>
                  </TableRow>
                )
              )}
            {emptyRows > 0 && (
              <TableRow style={{height: 33 * emptyRows}}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
