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
import {TableSortLabel, TablePagination} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: 20
  },
  table: {
    minWidth: 650
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

function desc(a: {[x: string]: number}, b: {[x: string]: number}, orderBy: string | number) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array: any[], cmp: (arg0: any, arg1: any) => any) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: number[], b: number[]) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any[]) => el[0]);
}

function getSorting(order: string, orderBy: any) {
  return order === 'desc' ? (a: any, b: any) => desc(a, b, orderBy) : (a: any, b: any) => -desc(a, b, orderBy);
}

const headCells = [
  {id: 'id', numeric: false, disablePadding: false, label: 'ID'},
  {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
  {id: 'amazon', numeric: true, disablePadding: false, label: 'Amazon'},
  {id: 'facebook', numeric: true, disablePadding: false, label: 'Facebook'},
  {id: 'google', numeric: true, disablePadding: false, label: 'Google'},
  {id: 'linkedin', numeric: true, disablePadding: false, label: 'LinkedIn'},
  {id: 'twitter', numeric: true, disablePadding: false, label: 'Twitter'}
];

function EnhancedTableHead(props: {classes: any; order: any; orderBy: any; onRequestSort: any}) {
  const {classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ProductsTable() {
  const [data, setData] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: any, property: React.SetStateAction<string>) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const arrangeDataForTable = (data: any) => {
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
    fetch('/api/productstatistics')
      .then(results => results.json())
      .then(data => {
        setData(arrangeDataForTable(data.productstatistics));
      });
  }, []);

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
    <Paper className={classes.paper}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='table' size='small'>
          <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
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
    </Paper>
  );
}
