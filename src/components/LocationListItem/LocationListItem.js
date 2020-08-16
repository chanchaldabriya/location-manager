import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  /* ListItem styling*/
  listItem: {
    borderRadius: 25,
    backgroundColor: "white",
    boxShadow: "0 5px 5px rgba(0,0,0,0.15)",
    padding: "10px 20px",
    margin: "10px 0",
  },
  /* /ListItem styling*/
});

export default ({children}) => {
  const classes = useStyles();
  return (
    <ListItem classes={{ root: classes.listItem }} button>
      {children}
    </ListItem>
  );
};
