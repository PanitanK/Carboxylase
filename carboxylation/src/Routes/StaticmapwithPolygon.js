import React from 'react';
import './css/App.css';

function StaticmapwithPolygon({ initialCenter }) {
  const apiKey = 'AIzaSyCREEB2-SgUZ8ozGu4HEUxv-lQiSqjuevE'; 

  // Check if initialCenter is not yet available
  if (!initialCenter) {
    return <div>Loading...</div>; // You can replace this with a loading indicator or any other content
  }

  // Define polygon vertices (example coordinates)
  const polygonVertices = initialCenter.Plotpolygon;

  // Create the polygon path string for the URL
  const polygonPath = polygonVertices
    .map(vertex => `${vertex.lat},${vertex.lng}`)
    .join('|');

  // Create a label for the pin marker
  const pinLabel = initialCenter.Label; // You can customize this label as needed

  // Change the 'color' parameter to specify the desired pin color
  const pinColor = 'white'; // Change this to the desired color (e.g., 'red', 'green', 'blue', etc.)

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${initialCenter.lat},${initialCenter.lng}&zoom=13&size=400x400&maptype=satellite&markers=label:${pinLabel}|color:${pinColor}|${initialCenter.lat},${initialCenter.lng}&path=color:blue|fillcolor:red|${polygonPath}&key=${apiKey}`;

  return (
    <div> 
      <div>
        <img src={mapUrl} alt="Static Map" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}

export default StaticmapwithPolygon;
