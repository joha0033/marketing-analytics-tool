import moment from "moment";
import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    marginLeft: theme.spacing(3)
  },
  inputs: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  textField: {
    color: "white"
  }
}));

export default function DateBar(props: {
  startDate: Date;
  endDate: Date;
  title: string;
  handleStartDateChange(startDate: Date): void;
  handleEndDateChange(startDate: Date): void;
}) {
  const classes = useStyles();
  const {
    handleEndDateChange,
    handleStartDateChange,
    startDate,
    endDate,
    title
  } = props;

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">{"< BACK"}</Link>
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.inputs}>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              defaultValue={moment(startDate).format("YYYY-MM-DD")}
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
              id="date"
              label="End Date"
              type="date"
              defaultValue={moment(endDate).format("YYYY-MM-DD")}
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
