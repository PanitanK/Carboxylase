import React, { useEffect, useState } from "react";

const MapFrame = () => {
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  useEffect(() => {
    window.addEventListener("message", receiveMessage);

    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (event) => {
    if (event.data.type === "polygonCoordinates") {
      const receivedCoordinates = event.data.coordinates;
      setPolygonCoordinates(receivedCoordinates);
    }
  };

  const calculatePolygonArea = (coords) => {
    if (coords.length < 3) return 0;

    let area = 0;

    for (let i = 0; i < coords.length; i++) {
      const curr = coords[i];
      const next = coords[(i + 1) % coords.length];

      area += (next.lng + curr.lng) * (next.lat - curr.lat);
    }

    // Conversion factor: 1 sq degree = 111.32 sq km (approximately)
    const sqKmArea = (Math.abs(area) / 2) * 111.32 * 111.32;

    return sqKmArea;
  };

  return (
    <div className="MapBoxContainerForDraw">
      <h1 style={{color : "black"}} >Check your plot production</h1>
      <iframe
        src="/mapdrawing.html"
        width="80%"
        height="400px"
        frameBorder="0"
        title="Google Map"
      ></iframe>

      <div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h2>Polygon Coordinates</h2>
          <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          <table style={{ color: 'white', backgroundColor: 'transparent', width: '100%' }}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {polygonCoordinates.map((coord, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{coord.lat}</td>
                  <td>{coord.lng}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h2>Polygon Area</h2>
          
          <p style={{ textAlign: 'center', margin: 0 }}>
            <span style={{ display: 'block', marginTop: 'auto', marginBottom: 'auto' }}>
              {calculatePolygonArea(polygonCoordinates).toFixed(2)} sq km
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h2>Estimated yearly rubber production</h2>
          <p>{calculatePolygonArea(polygonCoordinates).toFixed(2)} kg</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h2>Maximum Carbon Credit / Year</h2>
          <p>{calculatePolygonArea(polygonCoordinates).toFixed(2)} Credits</p>
        </div>
      </div>


              
            </div>
          </div>
  );
};

export default MapFrame;
