import React from "react";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "center"
  },
  errorText: {
    color: "#f50057",
  }
});

export default ({ loading, error, close=() => {} }) => {
  const classes = useStyles();
  return (
    <Dialog maxWidth="lg" open={loading || error}>
      <DialogContent classes={{root: classes.dialogContent}}>
        {loading && <CircularProgress />}
        {error && (
          <DialogContentText classes={{ root: classes.errorText }}>
            Error: {error}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions classes={{root: classes.dialogActions}}> 
        <Button variant="contained" color="primary" onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
