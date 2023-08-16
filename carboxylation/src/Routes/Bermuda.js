import React, { useEffect } from "react";

function BermudaTriangleMap() {

  useEffect(() => {
    function initMap() {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: 24.886, lng: -70.268 },
        mapTypeId: "terrain",
      });

      const triangleCoords = [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 },
        { lat: 25.774, lng: -80.19 },
      ];

      const bermudaTriangle = new window.google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      });

      bermudaTriangle.setMap(map);
    }

    if (window.google) {
      initMap();
    } else {
      // Load Google Maps API script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAS-9FhEUM8F00Bhhb6RwaI3DmEX4dMApU&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return <div id="map" style={{ height: "400px" }}></div>;
}

export default BermudaTriangleMap;