import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const Gmap = () => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const initialCenter = {
    lat: 8.435164926,
    lng: 99.957829502,
  };

  const [center, setCenter] = useState(initialCenter);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [inputLat, setInputLat] = useState('');
  const [inputLng, setInputLng] = useState('');

  const onMapClick = (e) => {
    const clickedPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setCenter(clickedPosition);
    setMarkerPosition(clickedPosition);

    // You can perform other actions here
  };

  const handleGoToCoordinates = () => {
    const lat = parseFloat(inputLat.trim());
    const lng = parseFloat(inputLng.trim());

    if (!isNaN(lat) && !isNaN(lng)) {
      setCenter({ lat, lng });
      setMarkerPosition(null);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAS-9FhEUM8F00Bhhb6RwaI3DmEX4dMApU">
      <div>
        <p>Click on the map to report a location.</p>
        <div>
          <input
            type="text"
            placeholder="Latitude"
            value={inputLat}
            onChange={(e) => setInputLat(e.target.value)}
          />
          <input
            type="text"
            placeholder="Longitude"
            value={inputLng}
            onChange={(e) => setInputLng(e.target.value)}
          />
        </div>
        <button onClick={handleGoToCoordinates}>Go</button>
        
      </div>

      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={center}
        onClick={onMapClick}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            animation={window.google.maps.Animation.DROP}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Gmap;
