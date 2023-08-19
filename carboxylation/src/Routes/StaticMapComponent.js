import React from 'react';
import './css/App.css';

function StaticMapComponent({ initialCenter }) {
  const apiKey = 'AIzaSyCREEB2-SgUZ8ozGu4HEUxv-lQiSqjuevE'; 

  // Check if initialCenter is not yet available
  if (!initialCenter) {
    return <div>Loading...</div>; // You can replace this with a loading indicator or any other content
  }



  
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${initialCenter.lat},${initialCenter.lng}&zoom=12&size=400x400&maptype=satellite&markers=label:${initialCenter.lat},${initialCenter.lng}&key=${apiKey}`;

return (
    <div> 
      <div>
        <img src={mapUrl} alt="Static Map" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}

export default StaticMapComponent;
