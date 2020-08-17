import React, { useState, useEffect } from "react";
import { TextField, Button, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useFormField from "../hooks/useFormField";
import { upsertLocation, getLocation } from "../db";
import WeekTimePicker from "./WeekTimePicker";
import CustomSelect from "./CustomSelect";

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

export default ({ history, match }) => {
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

  // Load Location item acc. to Id passed
  let locationId = parseInt(match.params.id);
  locationId = locationId ? locationId : -1; // Avoid NaN

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

  const setAll = ({
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
  }) => {
    // pass as wrapper of event object
    const asEventObj = (val) => ({
      target: {
        value: val,
      },
    });

    // Set all fetched values to state
    setName(asEventObj(name));
    setAddress1(asEventObj(address1));
    setAddress2(asEventObj(address2));
    setSuite(asEventObj(suite));
    setCity(asEventObj(city));
    setState(asEventObj(state));
    setZip(asEventObj(zip));
    setPhone(asEventObj(phone));
    setTimezone(asEventObj(timezone));
    setFacility(asEventObj(facility));
    setAppointment(asEventObj(appointment));
  };

  // Load location details acc. to Id in Url parameter
  useEffect(() => {
    locationId > 0 &&
      getLocation(locationId)
        .then((item) => {
          // Set all fetched values to state
          setAll(item);
        })
        .catch((error) => {
          console.error(
            "Error loading location from DB with ID: " + locationId,
            error
          );
        });
  }, [locationId]);

  const [status, setStatus] = useState({ loading: false, error: false }),
    [openFacilityTimePicker, setOpenFacilityTimePicker] = useState(false);

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

    let objToSave = {
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
    };

    // In case of edit, id also needs to be passed
    if (locationId > 0) objToSave.id = locationId;

    upsertLocation(objToSave)
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
              <CustomSelect
                label="State"
                name="state"
                options={["Rajasthan", "Gujarat", "Maharashtra", "Uttar Pradesh"]}
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
          <CustomSelect
            label="Time Zone"
            name="timezone"
            options={["Pacific Standard Time (UTC-08:00)", "GMT Standard Time (UTC+00:00)", "Middle East Standard Time (UTC+02:00)",
            "India Standard Time (UTC+05:30)"]}
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
          <Button
            color="secondary"
            variant="contained"
            classes={{ root: btn }}
            onClick={() => history.push("/")}
          >
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

          <WeekTimePicker open={openFacilityTimePicker} />
        </div>
      </form>
    </Card>
  );
};
