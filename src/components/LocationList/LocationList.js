import React, { useState, useEffect } from "react";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LocationListItem from "../LocationListItem/LocationListItem";
import { getAllLocations } from "../../db";

const useStyles = makeStyles({
  /* ListItem styling*/
  list: {
    padding: 10,
  },
  /* /ListItem styling*/
});

export default () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: false });
  const isEmpty = items.length === 0;

  useEffect(() => {
    setStatus({ loading: true, error: false });
    getAllLocations()
      .then((items) => {
        setItems(items);
        setStatus({ loading: false, error: false });
      })
      .catch((error) => {
        setStatus({ loading: false, error: true });
      });
  }, []);

  return isEmpty ? (
    <span style={{ color: '#888' }}>Empty</span>
  ) : (
    <List classes={{ root: classes.list }}>
      {items.map((item) => (
        <LocationListItem key={item} />
      ))}
    </List>
  );
};
