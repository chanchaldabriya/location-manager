import React, { useState } from "react";
import { TextField, Button, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useFormField from "../../hooks/useFormField";
import { upsertLocation } from "../../db";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    flex: 1,
  },
  columnFlex: {
    flexDirection: "column",
    flex: 1,
  },
  textField: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
  },
  formHeading: {
    textAlign: "start",
    color: "primary",
  },
  btn: {
    margin: 10,
  },
  btnContainer: {
    justifyContent: "flex-end",
    margin: "10px 0",
  },
  form: {
    padding: "10px 20px",
  },
  card: {
    margin: "20px auto",
    width: "60%",
  },
});

export default ({ history }) => {
  // Styles
  const {
    flex,
    columnFlex,
    textField,
    formHeading,
    btn,
    btnContainer,
    form,
    card,
  } = useStyles();

  /* Form fields' state */
  const [name, setName, resetName] = useFormField(""),
    [address1, setAddress1, resetAddress1] = useFormField(""),
    [address2, setAddress2, resetAddress2] = useFormField(""),
    [suite, setSuite, resetSuite] = useFormField(""),
    [city, setCity, resetCity] = useFormField(""),
    [state, setState, resetState] = useFormField(""),
    [zip, setZip, resetZip] = useFormField(""),
    [phone, setPhone, resetPhone] = useFormField(""),
    [timezone, setTimezone, resetTimezone] = useFormField(""),
    [facility, setFacility, resetFacility] = useFormField(""),
    [appointment, setAppointment, resetAppointment] = useFormField("");

  const [status, setStatus] = useState({ loading: false, error: false });

  /* Reset calls for all fields */
  const resetAll = () => {
    resetName();
    resetAddress1();
    resetAddress2();
    resetSuite();
    resetCity();
    resetState();
    resetZip();
    resetPhone();
    resetTimezone();
    resetFacility();
    resetAppointment();
  };

  const save = () => {
    setStatus({ loading: true, error: false });
    upsertLocation({
      name,
      address1,
      address2,
      suite,
      city,
      state,
      zip,
      phone,
      timezone,
      facility,
      appointment,
    })
      .then((resp) => {
        console.log(resp);
        setStatus({ loading: false, error: false });
        resetAll();
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
        setStatus({ loading: false, error: true });
      });
  };

  return (
    <Card raised classes={{ root: card }}>
      <form className={form}>
        <h3 className={formHeading}>Add Location</h3>
        <div className={flex}>
          <TextField
            required
            label="Location Name"
            classes={{ root: textField }}
            value={name}
            onChange={setName}
          />
        </div>

        {/* Complete Address */}
        <div className={flex}>
          {/* Address Lines */}
          <div className={`${flex} ${columnFlex}`}>
            <TextField
              label="Address Line 1"
              classes={{ root: textField }}
              value={address1}
              onChange={setAddress1}
            />
            <TextField
              label="Address Line 2"
              classes={{ root: textField }}
              value={address2}
              onChange={setAddress2}
            />
          </div>

          {/* City, Address & Suite */}
          <div className={`${flex} ${columnFlex}`}>
            {/* Suite */}
            <div className={flex}>
              <TextField
                label="Suite No"
                classes={{ root: textField }}
                value={suite}
                onChange={setSuite}
              />
            </div>

            {/* City & State */}
            <div className={flex}>
              <TextField
                label="City"
                classes={{ root: textField }}
                value={city}
                onChange={setCity}
              />
              <TextField
                label="State"
                classes={{ root: textField }}
                value={state}
                onChange={setState}
              />
            </div>
          </div>
        </div>

        {/* zip, phone & timezone */}
        <div className={flex}>
          {/* zipcode & phone */}
          <div className={flex}>
            <TextField
              label="Zip Code"
              classes={{ root: textField }}
              value={zip}
              onChange={setZip}
            />
            <TextField
              label="Phone Number"
              classes={{ root: textField }}
              value={phone}
              onChange={setPhone}
            />
          </div>

          {/* Timezone */}
          <TextField
            label="Time Zone"
            classes={{ root: textField }}
            value={timezone}
            onChange={setTimezone}
          />
        </div>

        {/* Facility times & Appointment Pool */}
        <div className={flex}>
          <TextField
            label="Facility Times"
            classes={{ root: textField }}
            value={facility}
            onChange={setFacility}
          />
          <TextField
            label="Appointment Pool"
            classes={{ root: textField }}
            value={appointment}
            onChange={setAppointment}
          />
        </div>

        {/* Buttons */}
        <div className={`${flex} ${btnContainer}`}>
          <Button color="secondary" variant="contained" classes={{ root: btn }} onClick={() => history.push("/")}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            classes={{ root: btn }}
            onClick={save}
          >
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
};
