import React, { useState } from 'react';
import ToggleArrow from './image/svg/Dasharrow.svg';
import Gear from './image/logo/gear.png';
//import Plotmap from './Plotmap'; // Import the Plotmap component

function PlotComponent({ plotData, plotIndex }) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(prevCollapsed => !prevCollapsed);
  };

  /*const plotCoordinates = [
    { lat: 37.772, lng: -122.214 },
    { lat: 37.774, lng: -122.214 },
    { lat: 37.774, lng: -122.216 },
    { lat: 37.772, lng: -122.216 }
  ];*/

  return (
    <div className="small-container">
      <div className='Container-Header'>
        <div className="toggle-button">
          <span onClick={toggleCollapse}>
            <img
              className={`arrow ${collapsed ? "collapsed" : ""}`}
              src={ToggleArrow}
              alt="Toggle Arrow"
            />
          </span>
        </div>
        <span>{`Plot : No.${plotIndex}`}</span>
        
        <img src={Gear} alt="Gear" className="gear" />
      </div>

      <div className={`content ${collapsed ? "collapsed" : ""}`}>
        <div className='Map-Box'>
        
        </div>
       

      </div>
    </div>
  );
}

export default PlotComponent;