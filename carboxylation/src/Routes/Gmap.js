import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

const Gmap = ({ initialCenter, onLocationUpdate }) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };


  const [center, setCenter] = useState(initialCenter);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [inputLat, setInputLat] = useState(initialCenter.lat);
  const [inputLng, setInputLng] = useState(initialCenter.lng);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAS-9FhEUM8F00Bhhb6RwaI3DmEX4dMApU',
  });

  const onMapClick = (e) => {
    const clickedPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setInputLat(clickedPosition.lat.toFixed(6)); // Update inputLat with new latitude
    setInputLng(clickedPosition.lng.toFixed(6)); // Update inputLng with new longitude
    setCenter(clickedPosition);
    setMarkerPosition(clickedPosition);
    onLocationUpdate(clickedPosition); // Call the onLocationUpdate function
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
    isLoaded && (
      <div>
        <p>Click on the map to input a location or type in the coordinate in the box below</p>
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
          <button onClick={handleGoToCoordinates}>Go</button>
        </div>

        <p></p>

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
      </div>
    )
  );
};

export default Gmap;
