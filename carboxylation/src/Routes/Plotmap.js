import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import * as turf from '@turf/turf';

function Plotmap({ coordinates }) {
  const [area, setArea] = useState(0);

  useEffect(() => {
    if (coordinates.length >= 3) {
      const turfPolygon = turf.polygon([coordinates]);
      const calculatedArea = turf.area(turfPolygon);
      setArea(calculatedArea);
    } else {
      setArea(0);
    }
  }, [coordinates]);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAS-9FhEUM8F00Bhhb6RwaI3DmEX4dMApU">
        <GoogleMap
          center={coordinates[0]}
          zoom={12}
          mapContainerStyle={{ height: '100px', width: '100%' }}
        >
            <Polygon
            paths={coordinates}
            options={{
                strokeColor: '#FF0000',    // Red stroke color
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',      // Red fill color
                fillOpacity: 0.35,
            }}
            />
        </GoogleMap>
      </LoadScript>
      <p>Area within the polygon: {area.toFixed(2)} square meters</p>
    </div>
  );
}

export default Plotmap;
