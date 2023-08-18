import React, { useEffect } from "react";

const MapFrame = () => {
  useEffect(() => {
    window.addEventListener("message", receiveMessage);

    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (event) => {
    if (event.data.type === "polygonCoordinates") {
      const polygonCoordinates = event.data.coordinates;
      console.log("Received polygon coordinates:", polygonCoordinates);
    }
  };

  return (
    <div className="MapBoxContainerForDraw">
      <h1>Check your plot production</h1>
      <iframe
        src="/mapdrawing.html"
        width="80%"
        height="400px"
        frameBorder="0"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default MapFrame;
