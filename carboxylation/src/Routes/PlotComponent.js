import React, { useState } from 'react';
import ToggleArrow from './image/svg/Dasharrow.svg';
import Gear from './image/logo/gear.png';
import StaticMapComponent from './StaticMapComponent';
import { useNavigate } from 'react-router-dom';

function PlotComponent(props) {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const toggleCollapse = () => {
    setCollapsed(prevCollapsed => !prevCollapsed);
  };

  const navigateToPage = () => {
    // Perform any logic before navigating
    navigate('/'); // Navigate using useHistory
  }


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
        <img src={Gear} alt="Gear" className="gear"  onClick={navigateToPage} />

      </div>

      <div className={`content ${collapsed ? "collapsed" : ""}`}>
        <div className='Map-Box'>
          
          <div style={{transform: 'scale(0.8)'}}>
          <StaticMapComponent initialCenter={{ lat: props.plot.PlotCenter[0] , lng: props.plot.PlotCenter[1] }} />
          </div>
          
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2>Plot Coordinates</h2>
            <table style={{ color: 'Black', backgroundColor: 'transparent', width: '80%' }}>
              <thead>
                <tr>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                  <td>{props.plot.PlotCenter[0]}</td>
                    <td>{props.plot.PlotCenter[1]}</td>
                  </tr>
               
              </tbody>
            </table>
            <p>Area: {props.plot.Area} sq. meters</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlotComponent;
