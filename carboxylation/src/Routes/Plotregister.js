import React, { useState } from 'react';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

function Plotregister() {
  const [plotNo, setPlotNo] = useState('');
  const [plotAge, setPlotAge] = useState('');
  const [polygonPath, setPolygonPath] = useState([]);
  const [drawingMode, setDrawingMode] = useState(false); // Add state for drawing mode

  const handlePlotNoChange = (event) => {
    setPlotNo(event.target.value);
  };

  const handlePlotAgeChange = (event) => {
    setPlotAge(event.target.value);
  };

  const handleMapClick = (event) => {
    if (drawingMode) {
      const updatedPath = [...polygonPath, event.latLng];
      setPolygonPath(updatedPath);
    }
  };

  const handleToggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
    setPolygonPath([]); // Clear existing polygon when toggling drawing mode
  };

  const handleResetPolygon = () => {
    setPolygonPath([]);
  };

  return (
    <div>
      <h1>Plot Information</h1>
      <form>
        {/* ... (Plot No and Plot Age inputs) */}
      </form>

      <LoadScript
        googleMapsApiKey="AIzaSyAS-9FhEUM8F00Bhhb6RwaI3DmEX4dMApU"
      >
        <GoogleMap
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={13}
          onClick={handleMapClick}
          options={{
            draggableCursor: drawingMode ? 'crosshair' : 'grab', // Change pointer style
          }}
          mapContainerStyle={{ height: '500px', width: '100%' }}
        >
          {polygonPath.length > 2 && (
            <Polygon
              paths={polygonPath}
              options={{
                strokeColor: 'blue',
                fillColor: 'blue',
                labelVisible: false, // Hide the label
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      <button onClick={handleToggleDrawingMode}>
        {drawingMode ? 'Exit Drawing Mode' : 'Enter Drawing Mode'}
      </button>
      <button onClick={handleResetPolygon}>Reset Polygon</button>
    </div>
  );
}

export default Plotregister;
