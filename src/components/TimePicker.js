import React from "react";
import { TextField, FormGroup } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  timePicker: {
    marginRight: 16
  },
  timeField: {
    marginRight: 8
  },
  selectedToggleBtn: {
    backgroundColor: "#3f51b5 !important",
    color: "white !important"
  }
});

export default ({ time, meridian, setTime, setMeridian }) => {
  const { timePicker, timeField, selectedToggleBtn } = useStyles(); 

  const handleMeridianChange = (event, newValue) => setMeridian(newValue);

  return (
    <FormGroup row classes={{ root: timePicker }}>
      <TextField
        variant="outlined"
        size="small"
        value={time}
        onChange={setTime}
        classes={{root: timeField}}
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
        <ToggleButton value="am" size="small" classes={{selected: selectedToggleBtn}}>
          AM
        </ToggleButton>
        <ToggleButton value="pm" size="small" classes={{selected: selectedToggleBtn}}>
          PM
        </ToggleButton>
      </ToggleButtonGroup>
    </FormGroup>
  );
};
