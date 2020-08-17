import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TimePicker from './TimePicker';
import useFormField from "../hooks/useFormField";

const useStyles = makeStyles({
    formGroupRow: {
        display: 'flex',
        '& > *': {
            flex: 1
        }
    }
});

export default ({ day="Sun" }) => {
    const classes = useStyles();
  const [checked, setChecked] = useState(false),
        [startTime, setStartTime] = useFormField("10:30"),
        [startMeridian, setStartMeridian] = useState("am"),
        [endTime, setEndTime] = useFormField("6:30"),
        [endMeridian, setEndMeridian] = useFormField("pm");

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={setChecked}
            color="primary"
            name={day}
          />
        }
        label={day}
      />

      <TimePicker time={startTime} setTime={setStartTime} meridian={startMeridian} setMeridian={setStartMeridian} />
      <TimePicker time={endTime} setTime={setEndTime} meridian={endMeridian} setMeridian={setEndMeridian} />
      <Button size="small" variant="outlined" color="primary">Apply to All Checked</Button>
    </FormGroup>
  );
};
