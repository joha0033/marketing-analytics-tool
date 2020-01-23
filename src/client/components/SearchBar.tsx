import moment from 'moment';
import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  inputs: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  textField: {
    color: 'white'
  }
}));

export default function SearchBar(props: {
  startDate: Date;
  endDate: Date;
  setKeyword(keyword: string): void;
  handleStartDateChange(startDate: Date): void;
  handleEndDateChange(startDate: Date): void;
}) {
  const classes = useStyles();
  const {setKeyword, handleEndDateChange, handleStartDateChange, startDate, endDate} = props;

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            Product Clicks by Source
          </Typography>
          <div className={classes.inputs}>
            <InputBase
              onChange={e => {
                setKeyword(e.target.value);
              }}
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
          <div className={classes.inputs}>
            <TextField
              id='date'
              label='Start Date'
              type='date'
              defaultValue={moment(startDate).format('YYYY-MM-DD')}
              className={classes.textField}
              onChange={e => {
                handleStartDateChange(new Date(e.target.value));
              }}
              InputLabelProps={{
                shrink: true,
                className: classes.textField
              }}
              InputProps={{
                className: classes.textField
              }}
            />
          </div>
          <div className={classes.inputs}>
            <TextField
              id='date'
              label='End Date'
              type='date'
              defaultValue={moment(endDate).format('YYYY-MM-DD')}
              onChange={e => {
                handleEndDateChange(new Date(e.target.value));
              }}
              InputLabelProps={{
                shrink: true,
                className: classes.textField
              }}
              InputProps={{
                className: classes.textField
              }}
            />
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
