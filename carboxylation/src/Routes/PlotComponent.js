import React, { useState } from 'react';
import ToggleArrow from './image/svg/Dasharrow.svg';
import Gear from './image/logo/gear.png';
import StaticMapComponent from './StaticMapComponent';


function PlotComponent(props) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(prevCollapsed => !prevCollapsed);
  };

  return (
    <div className="small-container">
      <div className='Container-Header'>
        <div className="toggle-button">

        <span onClick={toggleCollapse} className="span-container">
        
        <img
          className={`arrow ${collapsed ? "collapsed" : ""}`}
          src={ToggleArrow}
          alt="Toggle Arrow"
        />
        <p className="plot-number">No.{props.plot.Plot_Number}</p>
      </span>

        </div>

        <span>{`Plot :  ${props.plot.Plotname} `}</span>
        <img src={Gear} alt="Gear" className="gear" />

      </div>

      <div className={`content ${collapsed ? "collapsed" : ""}`}>
        <div className='Map-Box'>
          <p>Name: {props.plot.Plotname}</p>
          <p>Area: {props.plot.Area} sq. meters</p>
          <StaticMapComponent initialCenter={{ lat: 15, lng: 20 }} />
        </div>
      </div>
    </div>
  );
}

export default PlotComponent;
