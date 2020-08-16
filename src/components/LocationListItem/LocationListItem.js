import React from "react";
import { ListItem, Avatar, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  /* ListItem styling*/
  listItem: {
    borderRadius: 25,
    backgroundColor: "white",
    boxShadow: "0 5px 5px rgba(0,0,0,0.15)",
    padding: "10px 20px",
    margin: "10px 0",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.8rem",
    color: "#888",
  },
  avatar: {
    backgroundColor: "#0084cc",
    color: "white",
    fontSize: "1.1rem",
    fontWeight: "bold",
    transform: "scale(0.7)",
  },
  hiddenAvatar: {
    visibility: "hidden",
  },
  heading: {
    color: "#000",
    fontWeight: "bold",
  },
  flex1: {
    flex: 1,
    textAlign: "center",
  },
  flex2: {
    flex: 2,
    textAlign: "center",
  },
  /* /ListItem styling*/
});

export default ({ isHeading, index, deleteItem, editItem, children, ...locationObj }) => {
  const classes = useStyles();
  const {
    id,
    name,
    address1,
    address2,
    city,
    state,
    suite,
    phone,
    timezone,
    zip,
    appointment,
    facility,
  } = locationObj;

  const getFormattedAddress = () => {
    const fieldArr = [suite, address1, address2, city, state, zip];

    // create comma separated string of "fieldArr" fields to create formatted address
    return fieldArr.reduce((prev, curr) =>
      curr ? (prev += `, ${curr}`) : prev
    );
  };

  return isHeading ? (
    <ListItem
      classes={{ root: classes.listItem }}
      className={classes.heading}
      button
    >
      <Avatar
        component="div"
        className={`${classes.avatar} ${classes.hiddenAvatar}`}
      >
        Id
      </Avatar>

      <div className={classes.flex1}>
        <span>Name</span>
      </div>

      <div className={classes.flex2}>
        <span>Address</span>
      </div>

      <div className={classes.flex1}>
        <span>Phone No.</span>
      </div>

      <div className={classes.flex1}></div>
    </ListItem>
  ) : (
    <ListItem classes={{ root: classes.listItem }} button>
      <Avatar component="div" className={classes.avatar}>
        {index}
      </Avatar>

      <div className={classes.flex1}>
        <span>{name}</span>
      </div>

      <div className={classes.flex2}>
        <span>{getFormattedAddress()}</span>
      </div>

      <div className={classes.flex1}>
        <span>{phone}</span>
      </div>

      <div className={classes.flex1}>
        <IconButton
          onClick={() => {
            editItem(id);
          }}
        >
          <Edit color="primary" />
        </IconButton>

        <IconButton
          onClick={() => {
            deleteItem(id);
          }}
        >
          <Delete color="secondary" />
        </IconButton>
      </div>
      {/* {children} */}
    </ListItem>
  );
};
