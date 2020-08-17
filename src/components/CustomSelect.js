import React from "react";
import { FormControl, InputLabel, NativeSelect } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

export default ({ label, name, options, value, onChange, classes }) => {
  return (
    <FormControl classes={classes}>
      <InputLabel>{label}</InputLabel>
      <NativeSelect
        inputProps={{ name: name }}
        value={value}
        onChange={onChange}
      >
        <option aria-label="None" value="" />
        {options &&
          options.map((optionVal) => (
            <option value={optionVal} key={optionVal}>
              {optionVal}
            </option>
          ))}
      </NativeSelect>
    </FormControl>
  );
};
