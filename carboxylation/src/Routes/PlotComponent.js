import React, { useState } from 'react';
import ToggleArrow from './image/svg/Dasharrow.svg';
import Gear from './image/logo/gear.png';
import { useNavigate } from 'react-router-dom';
import StaticmapwithPolygon from './StaticmapwithPolygon';

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
          <StaticmapwithPolygon initialCenter={{ Label: props.plot.Plot_Number ,lat: props.plot.PlotCenter[0] , lng: props.plot.PlotCenter[1] , Plotpolygon: props.plot.Plotpolygon}} />
          </div>
          
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2>Plot Coordinates</h2>
            <table style={{ color: 'Black', backgroundColor: 'transparent', width: '100%' }}>
              <thead>
                <tr style={{outline: '2px solid black'}}>
                  <th style={{outline: '2px solid black'}}>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody style={{outline: '2px solid black'}} >
                  <tr style={{padding: '15' , margin: '3px'}} >
                    <td  style={{outline: '2px solid black'}} >{props.plot.PlotCenter[0]}</td>
                    <td >{props.plot.PlotCenter[1]}</td>
                  </tr>
               
              </tbody>
            </table>
            <p>Plot data</p>
            <div style={{textAlign:"left" , lineHeight: "0.2",fontSize:"20px" }}>

              <div>
              <span>Area: </span>
              <span style={{color:"green"}} >{props.plot.Area} </span> 
              <span>sq. kilometers</span>
              </div>

            <p>Est. Yearly Raw Rubber Production </p>
            <div>
            <span style={{color:"green"}}>{ (props.plot.Area / 0.0016)*230  } </span>
            <span> kilograms ( Rate 230kg/rai/year )</span>
            </div>
            <p> *rai is an area measurement unit in Thailand* </p>
            <p> 1 rai = 0.0016 sqkm </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlotComponent;
