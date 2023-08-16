import React from 'react';
import './css/App.css';

function StaticMapComponent({ initialCenter }) {
  const apiKey = 'AIzaSyCREEB2-SgUZ8ozGu4HEUxv-lQiSqjuevE'; // Replace with your actual API key
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${initialCenter.lat},${initialCenter.lng}&zoom=15&size=400x400&maptype=satellite&key=${apiKey}`;

  return (
    <div>
      <p className="primary-header3">Static Map</p>
      <div>
        <img src={mapUrl} alt="Static Map" style={{ width: '100%', height: '400px' }} />
      </div>
    </div>
  );
}

export default StaticMapComponent;
