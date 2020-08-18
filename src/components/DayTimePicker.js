import React from "react";
import {
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TimePicker from "./TimePicker";

const useStyles = makeStyles({
  dayTimePicker: {
    margin: "10px 0",
    display: "flex",
    flexWrap: "nowrap",
  },
  flex1: {
    flex: 1,
  },
});

export default ({ value, onChange, applyToSelected }) => {
  const classes = useStyles();

  const {
    day,
    selected,
    startTime,
    startMeridian,
    endTime,
    endMeridian,
  } = value;
  // const [checked, setChecked] = useState(false),
  //       [startTime, setStartTime] = useFormField("10:30"),
  //       [startMeridian, setStartMeridian] = useState("am"),
  //       [endTime, setEndTime] = useFormField("6:30"),
  //       [endMeridian, setEndMeridian] = useFormField("pm");

  const textChangeHandler = (name, event) =>
    onChange({ [name]: event.target.value });
  const meridianHandler = (name, value) => onChange({ [name]: value });

  return (
    <FormGroup row classes={{ root: classes.dayTimePicker }}>
      <FormControlLabel
        classes={{ root: classes.flex1 }}
        control={
          <Checkbox
            checked={selected}
            onChange={(event) => onChange({ selected: event.target.checked })}
            color="primary"
            name={day}
          />
        }
        label={day}
      />

      <TimePicker
        time={startTime}
        setTime={(event) => textChangeHandler("startTime", event)}
        meridian={startMeridian}
        setMeridian={(value) => meridianHandler("startMeridian", value)}
      />
      <TimePicker
        time={endTime}
        setTime={(event) => textChangeHandler("endTime", event)}
        meridian={endMeridian}
        setMeridian={(value) => meridianHandler("endMeridian", value)}
      />
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={() =>
          applyToSelected({
            startTime,
            startMeridian,
            endTime,
            endMeridian,
          })
        }
      >
        Apply to All Checked
      </Button>
    </FormGroup>
  );
};
