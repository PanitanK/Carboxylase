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
        <p className="plot-number1">No.{props.plot.Plot_Number}</p>
      </span>

        </div>

        <span className="plot-number2">{`Plot :  ${props.plot.Plotname} `}</span>
        <img src={Gear} alt="Gear" className="gear"  onClick={navigateToPage} />

      </div>

      <div className={`content ${collapsed ? "collapsed" : ""}`}>
        <div className='Map-Box'>
          
          <div style={{transform: 'scale(0.8)'}}>
          <StaticmapwithPolygon initialCenter={{ Label: props.plot.Plot_Number ,lat: props.plot.PlotCenter[0] , lng: props.plot.PlotCenter[1] , Plotpolygon: props.plot.Plotpolygon}} />
          </div>
          
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 class="primary-header1">Plot Coordinates</h2>
            <table style={{ color: 'Black', backgroundColor: 'transparent', width: '100%' }}>
              <thead>
                <tr style={{outline: '2px solid black'}}>
                  <th style={{outline: '2px solid black'}}className="primary-header9">Latitude</th>
                  <th className="primary-header9">Longitude</th>
                </tr>
              </thead>
              <tbody style={{outline: '2px solid black'}} >
                  <tr style={{padding: '15' , margin: '3px'}} >
                    <td  style={{outline: '2px solid black'}} className="primary-header9">{props.plot.PlotCenter[0].toFixed(5)}</td>
                    <td className="primary-header9">{props.plot.PlotCenter[1].toFixed(5)}</td>
                  </tr>
               
              </tbody>
            </table>
            <p className="primary-header9">Plot data</p>
            <div style={{textAlign:"left" , lineHeight: "0.2",fontSize:"20px" }}>

              <div>
              <span className="primary-header9">Area : </span>
              <span style={{color:"green"}} className="primary-header9">{props.plot.Area} </span> 
              <span className="primary-header9">sq. kilometers</span>
              </div>

            <p className="primary-header9">Est. Yearly Raw Rubber Production </p>
            <div>
            <span style={{color:"green"}} className="primary-header9">{ (props.plot.Area / 0.0016)*230  } </span>
            <span className="primary-header9"> kilograms ( Rate 230kg/rai/year )</span>
            </div>
            <p className="primary-header9">Maximum Carbon Credit Applicable</p>
            <p style={{color:"green"}} className="primary-header9">{ ((44/12)*((props.plot.Area / 0.0016)*230*0.65 * 0.8825  / (1000))).toFixed(2)   } Credits  </p>
            

            </div>
          </div>
          
        </div>
          <div style={{lineHeight: "0.2"}}>
            <p className="primary-header9"> *rai is an area measurement unit in Thailand* </p>
            <p className="primary-header9"> 1 rai = 0.0016 sqkm </p>
            <p className="primary-header9">Coversion rate for 1 kg of raw rubber to Credit of CO2 Captured is at 2.10 %</p>
            <p className="primary-header9">Explanation is in a pitch deck</p>
          </div>
      </div>
    </div>
  );
}

export default PlotComponent;
