import React from 'react';
import './css/App.css';

function StaticMapComponent({ initialCenter }) {
  const apiKey = 'AIzaSyCREEB2-SgUZ8ozGu4HEUxv-lQiSqjuevE'; 

  // Check if initialCenter is not yet available
  if (!initialCenter) {
    return <div>Loading...</div>; // You can replace this with a loading indicator or any other content
  }

  const label = "Your Long Text"; // Replace with the text you want to display
  const truncatedLabel = label.length > 10 ? label.substr(0, 10) + "..." : label; // Truncate if it's too long
  
  // Encode the truncated label for URL safety
  const encodedLabel = encodeURIComponent(truncatedLabel);
  
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${initialCenter.lat},${initialCenter.lng}&zoom=15&size=400x400&maptype=satellite&markers=label:${encodedLabel}|${initialCenter.lat},${initialCenter.lng}&key=${apiKey}`;

return (
    <div> 
      <div>
        <img src={mapUrl} alt="Static Map" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}

export default StaticMapComponent;
