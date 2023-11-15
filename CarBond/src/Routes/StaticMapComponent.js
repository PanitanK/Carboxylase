import React from 'react';
import './css/App.css';

function StaticMapComponent({ initialCenter }) {
  const apiKey = 'AIzaSyCREEB2-SgUZ8ozGu4HEUxv-lQiSqjuevE';

  // Check if initialCenter is not yet available
  if (!initialCenter) {
    return <div>Loading...</div>; // You can replace this with a loading indicator or any other content
  }

  let PlotArr = [];
  for (let i = 0; i < initialCenter.PlotDoc.length; i++) {
    PlotArr.push(initialCenter.PlotDoc[i].PlotCenter);
  }

  // Create markers string for all the coordinates in PlotArr
  const markers = PlotArr.map((coordinate, index) => {
    return `label:${index + 1}|${coordinate[0]},${coordinate[1]}`;
  }).join('&markers=');

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${initialCenter.lat},${initialCenter.lng}&zoom=14&size=400x400&maptype=satellite&markers=${markers}&key=${apiKey}`;

  return (
    <div>
      <div>
        <img src={mapUrl} alt="Static Map" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}

export default StaticMapComponent;
