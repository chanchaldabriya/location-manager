import React from "react";
import { PinDropOutlined } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    flex: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    },
    avatar: {
        backgroundColor: '#aaa',
        transform: 'scale(3)',
        margin: 'auto'
    },
    title: {
        marginBottom: '0.5em'
    },
    subtitle: {
        color: '#888',
        fontSize: '0.8rem'
    }
});

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.flex}>
            <Avatar component="div" classes={{colorDefault: classes.avatar}}>
                <PinDropOutlined color="primary" />
            </Avatar>

            <h3 className={classes.title}>Kindly Add Your Location First</h3>

            <span className={classes.subtitle}>There is no location added right now</span>
        </div>
    );
};