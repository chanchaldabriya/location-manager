import React, { useState, useEffect } from "react";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LocationListItem from "../LocationListItem/LocationListItem";
import { getAllLocations, deleteLocation } from "../../db";

const useStyles = makeStyles({
  /* ListItem styling*/
  list: {
    padding: 10,
  },
  /* /ListItem styling*/
});

export default ({ history }) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: false });
  const isEmpty = items && items.length === 0;

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

  const deleteItem = (id) => {
    deleteLocation(id)
      .then((resp) => {
        // get all items except item to be deleted
        let newList = items.filter((item) => item.id !== id);
        setItems(newList);
      })
      .catch((error) => {
        console.error("Error while deleting: " + id, error);
      });
  };

  const editItem = (id) => {
    history.push(`/location/${id}`);
  };

  return !items || isEmpty ? (
    <span style={{ color: "#888" }}>Empty</span>
  ) : (
    <List classes={{ root: classes.list }}>
      <LocationListItem isHeading />
      {items.map((item, index) => (
        <LocationListItem
          key={item.id}
          index={index + 1}
          deleteItem={deleteItem}
          editItem={editItem}
          {...item}
        />
      ))}
    </List>
  );
};
