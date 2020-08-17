import React, { useState, useEffect } from "react";
import { List, TablePagination } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LocationListItem from "../LocationListItem/LocationListItem";
import { deleteLocation, getPagedLocations, getAllLocations } from "../../db";

const useStyles = makeStyles({
  /* ListItem styling*/
  list: {
    padding: 10,
  },
  pagination: {
    color: '#888',
    margin: 'auto'
  }
  /* /ListItem styling*/
});

export default ({ history }) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: false });
  const isEmpty = items && items.length === 0;

  const [totalItems, setTotalItems] = useState(0);

  /* Page state */
  const [page, setPage] = useState(0),
    [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    getAllLocations().then(items => {
      items && setTotalItems(items.length);
    }).catch(error => {
      console.error("Error loading all items", error);
    })
  }, []);

  useEffect(() => {
    setStatus({ loading: true, error: false });

    getPagedLocations((page) * itemsPerPage, itemsPerPage)
      .then((items) => {
        setItems(items);
        setStatus({ loading: false, error: false });
      })
      .catch((error) => {
        setStatus({ loading: false, error: true });
        console.error("Error loading page: "+ page, error);
      });
  }, [page, itemsPerPage]);

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
      <LocationListItem isHeading isContainer={false} />
      {items.map((item, index) => (
        <LocationListItem
          key={item.id}
          index={index + 1 + (page * itemsPerPage)}
          deleteItem={deleteItem}
          editItem={editItem}
          isContainer={false}
          {...item}
        />
      ))}
      <TablePagination
        count={totalItems}
        page={page}
        component={LocationListItem}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[5,10,15,20,25,30]}
        classes={{toolbar: classes.pagination}}
        labelRowsPerPage="Items per page:"
        onChangePage={(event, newValue) => setPage(newValue)}
        onChangeRowsPerPage={(event) => {
          setItemsPerPage(parseInt(event.target.value));
          setPage(0);
        }}
      />
    </List>
  );
};
