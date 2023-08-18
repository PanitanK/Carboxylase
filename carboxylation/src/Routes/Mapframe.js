import React, { useEffect, useState } from "react";

const MapFrame = () => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  
  const handleMessage = (event) => {
    if (event.origin !== window.location.origin) {
      return;
    }

    const vertexInfo = event.data;
    setReceivedMessages((prevMessages) => [...prevMessages, vertexInfo]);
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleSendData = () => {
    // Simulate sending data to iframe
    const iframe = document.querySelector("iframe");
    iframe.contentWindow.postMessage("Send me vertex data!", "*");
  };

  return (
    <div>
      <h1>Google Maps Drawing Example</h1>
      <button onClick={handleSendData}>Send Vertex Data</button>
      <div>
        <h2>Received Messages:</h2>
        <ul>
          {receivedMessages.map((message, index) => (
            <li key={index}>{JSON.stringify(message)}</li>
          ))}
        </ul>
      </div>
      <iframe
        src="/mapdrawing.html"
        width="100%"
        height="400px"
        frameBorder="0"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default MapFrame;
