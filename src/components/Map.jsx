import React from 'react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ data }) => {
    const mapStyles = {
        height: '50vh',
        width: '100%'
    };
    console.log(data)
    const defaultCenter = {
        lat: 44.355, lng: -7.24
    };

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyArwZlTBTRS0qy3l1xqMAFJ6dSS56sAj9E'
        >
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={9}
                center={defaultCenter}
            >
                <Marker position={defaultCenter} />
            </GoogleMap>
        </LoadScript>
    );
}

export default Map
