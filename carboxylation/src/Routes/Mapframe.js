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
      <h1>Check your rubber plot production</h1>
      <iframe
        src="/mapdrawing.html"
        width="80%"
        height="400px"
        frameBorder="0"
        title="Google Map"
      ></iframe>
      <div>
        <h2>Polygon Coordinates:</h2>
        <textarea
          rows={5}
          cols={40}
          readOnly
          value={JSON.stringify(polygonCoordinates)}
        />
        <h2>Polygon Area:</h2>
        <p>{calculatePolygonArea(polygonCoordinates).toFixed(2)} sq km</p>
      </div>
    </div>
  );
};

export default MapFrame;
