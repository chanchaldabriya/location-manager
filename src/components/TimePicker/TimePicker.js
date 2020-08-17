import React, { useState } from "react";
import { TextField, FormGroup } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  timePicker: {
    marginRight: 16, 
  },
  timeField: {
    marginRight: 8
  }
});

export default ({ time, meridian, setTime, setMeridian }) => {
  const classes = useStyles(); 

  const handleMeridianChange = (event, newValue) => {
    setMeridian(newValue);
  };

  return (
    <FormGroup row classes={{ root: classes.timePicker }}>
      <TextField
        variant="outlined"
        size="small"
        value={time}
        onChange={setTime}
        classes={{root: classes.timeField}}
        inputProps={{
          step: 300, // 5 min
        }}
      />

      <ToggleButtonGroup
        color="primary"
        value={meridian}
        onChange={handleMeridianChange}
        exclusive
      >
        <ToggleButton value="am" size="small">
          AM
        </ToggleButton>
        <ToggleButton value="pm" size="small">
          PM
        </ToggleButton>
      </ToggleButtonGroup>
    </FormGroup>
  );
};
