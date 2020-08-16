import React from "react";
import Titlebar from '../components/Titlebar/Titlebar';
import LocationList from "../components/LocationList/LocationList";


export default () => {
    return (
        <React.Fragment>
            <Titlebar title="Locations"/>
            <LocationList />
        </React.Fragment>
    );
};