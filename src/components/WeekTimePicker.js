import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import DayTimePicker from "./DayTimePicker";

function objFilterAndUpdate(obj, predicate, values) {
  let result = {},
    key;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      result[key] = { ...obj[key], ...values };
    }
  }

  return result;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default class WeekTimePicker extends React.Component {
  state = {
    ...days.map((day) => ({
      day: day,
      selected: false,
      startTime: "9:00",
      startMeridian: "am",
      endTime: "5:00",
      endMeridian: "pm",
    })),
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.parseValue(this.props.value);
    }
  }

  parseValue = (value) => {
    value &&
      value
        .trim()
        .split(",")
        .map((dayStr) => {
          let [day, timeStr] = dayStr.split(" ");
          let [
            startTime,
            startMeridian,
            endTime,
            endMeridian,
          ] = this.parseTimeRange(timeStr);

          this.setState({
            [days.indexOf(day)]: {
              day,
              startTime,
              startMeridian,
              endTime,
              endMeridian,
            },
          });
        });
  };

  parseTimeRange = (time) => {
    let [start, end] = time && time.split("-");
    let [startTime, startMeridian] = this.parseTime(start);
    let [endTime, endMeridian] = this.parseTime(end);

    return [startTime, startMeridian, endTime, endMeridian];
  };

  parseTime = (timeStr) => {
    let meridian = timeStr && timeStr.slice(-2);
    meridian = meridian === "am" || meridian === "pm" ? meridian : "";
    let time = meridian ? timeStr.slice(0, timeStr.indexOf(meridian)) : "";

    return [time, meridian];
  };

  getValue = () =>
    Object.values(this.state)
      .map(
        ({ day, startTime, startMeridian, endTime, endMeridian }) =>
          `${day} ${startTime}${startMeridian}-${endTime}${endMeridian}`
      )
      .join(",");

  handleChange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: { ...this.state[name], ...value },
    });
  };

  applyToSelected = (value) => {
    this.setState({
      ...this.state,
      ...objFilterAndUpdate(this.state, (obj) => obj.selected, { ...value }),
    });
  };

  render() {
    return (
      <Dialog
        maxWidth="lg"
        disableBackdropClick
        disableEscapeKeyDown
        open={this.props.open}
      >
        <DialogContent>
          {days.map((day, index) => (
            <DayTimePicker
              value={this.state[index]}
              key={day}
              onChange={(value) => this.handleChange(index, value)}
              applyToSelected={this.applyToSelected}
            />
          ))}
        </DialogContent>

        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.props.close}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              this.props.setValue(this.getValue());
              this.props.close();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
