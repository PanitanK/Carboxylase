import React from "react";
import { GoogleMap, Polygon, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 0, // Provide the center latitude
  lng: 0, // Provide the center longitude
};

const PolygonMap = ({ coordinates }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAS-9FhEUM8F00Bhhb6RwaI3DmEX4dMApU"> {/* Replace with your API key */}
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {coordinates && coordinates.length > 0 && (
          <Polygon
            path={coordinates}
            options={{
              fillColor: "yellow",
              fillOpacity: 0.4,
              strokeColor: "#d35400",
              strokeOpacity: 0.8,
              strokeWeight: 3,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default PolygonMap;