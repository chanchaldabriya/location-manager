import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DayTimePicker from "./DayTimePicker";

const useStyles = makeStyles({
  
});

export default ({ open }) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <Dialog maxWidth="lg" disableBackdropClick disableEscapeKeyDown open={open}>
            <DialogContent>
                {days.map(day => <DayTimePicker day={day} key={day} /> )}
            </DialogContent>

            <DialogActions>
                <Button color="secondary">Cancel</Button>
                <Button color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};