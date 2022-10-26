import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'center'
    },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: 'white',
  },
  textLabel: {
    color: 'white',
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem'
    } 
  }
}));

const SelectCity= ({list, onClick}) => {
  const classes = useStyles();
  const [coord, setCoord] = useState(list[0].coord);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClickAway = () => {
    if (open) 
    setOpen(false);
  };

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <ClickAwayListener 
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart" 
        onClickAway={handleClickAway}
        >
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="city-controlled-open-select-label">City</InputLabel>
              <Select
              labelId="city-controlled-open-select-label"
              id="city-controlled-open-select"
              className={classes.textLabel}
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={coord}
              onChange={event => setCoord(event.target.value)}
              onClick={onClick}
              >
                  <MenuItem value={list[0].coord} name={list[0].name}>{list[0].name}</MenuItem>
                  <MenuItem value={list[1].coord} name={list[0].name}>{list[1].name}</MenuItem>
                  <MenuItem value={list[2].coord} name={list[0].name}>{list[2].name}</MenuItem>
                  <MenuItem value={list[3].coord} name={list[0].name}>{list[3].name}</MenuItem>
                  <MenuItem value={list[4].coord} name={list[0].name}>{list[4].name}</MenuItem>
              </Select>
            </FormControl>
          </div>
        </ClickAwayListener>
      </Toolbar>
    </AppBar>
  );
}

SelectCity.propTypes = {
  list: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SelectCity