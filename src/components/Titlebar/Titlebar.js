import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    titlebar: {
        padding: 10,
        display: "flex",
        alignItems: "center",
    },
    title: {
        color: "#888",
        fontWeight: "bold",
    },
    /* Button styling*/
    root: {
      borderRadius: 20,
      marginLeft: "auto",
    },
    label: {
      textTransform: "capitalize",
    },
    /* /Button styling*/
});

export default ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classes.titlebar}>
      <span className={classes.title}>{title || "Title"}</span>
      <Button
        classes={{ root: classes.root, label: classes.label }}
        color="primary"
        variant="contained"
        size="small"
      >
        + Add Location
      </Button>
    </div>
  );
};
