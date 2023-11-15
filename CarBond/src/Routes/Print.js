import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import StaticmapwithPolygon from './StaticmapwithPolygon';
import './css/App.css';
import Title from './image/logo/CBX_Transparent.png';

const Print = () => {
  const location = useLocation();
  const { userUID,userData, plotDocuments, MaximumCredit } = location.state || {};
  const navigate = useNavigate();
  const handlePrint = () => {
    window.print();
  }; 

  return (
    <div className="App">
      <div className="static-bar" id="static-bar" >
        <div className="left-content">
        
            <img src={Title} alt="Title"    onClick={() => {
              navigate('/Home', { state: { userUID } });
            }}/>
   
        </div>

        <div className="right-content">

        <button className="btn1" onClick={handlePrint} id="printButton">
            Print
          </button>
        </div>
      </div>
      <div className='Printpage'>
        <div className="info-container2 ">
          
            <div>
              <span className="info-label">Firstname :</span>
              <span className="info-value">{userData[0].FirstName}</span>
            </div>
            <div>
              <span className="info-label">Lastname :</span>
              <span className="info-value">{userData[0].LastName}</span>
            </div>
            <div>
              <span className="info-label">Issued Date:</span>
              <span className="info-value">{userData[0].Created_Date}</span>
            </div>
            <div>
              <span className="info-label">Expiration Date:</span>
              <span className="info-value">{userData[0].Expiry_Date}</span>
            </div>
            <div>
              <span className="info-label">Province of Issued :</span>
              <span className="info-value">{userData[0].Hometown}</span>
            </div>
            <div>
              <span className="info-label">Credit owned : </span>
              <span className="Credit-own">{userData[0].Credit_Own}</span>
              <span className="info-label"> Credits</span>
            </div>
            <div>
              <span className="info-label">Maximum Credit Cap: </span>
              <span className="Credit-own">{MaximumCredit.toFixed(2)}</span>
              <span className="info-label"> Credits/year</span>
            </div>
         
        </div>

        <div className="SmallPrintBox">
          {plotDocuments &&
            plotDocuments.map((plot, index) => (
              <div
                key={index}
                className="Map-Box"
              
              >
                <div style={{ transform: 'scale(0.8)' }}>
                  <StaticmapwithPolygon
                    initialCenter={{
                      Label: plot.Plot_Number,
                      lat: plot.PlotCenter[0],
                      lng: plot.PlotCenter[1],
                      Plotpolygon: plot.Plotpolygon,
                    }}
                  />
                </div>

                <div className="PlotDataset">
                  <h2>Plot Coordinates</h2>
                  <table style={{ color: 'Black', backgroundColor: 'transparent', width: '100%' }}>
                    <thead>
                      <tr style={{ outline: '2px solid black' }}>
                        <th style={{ outline: '2px solid black' }} className="primary-header9">
                          Latitude
                        </th>
                        <th className="primary-header9">Longitude</th>
                      </tr>
                    </thead>
                    <tbody style={{ outline: '2px solid black' }}>
                      <tr style={{ padding: '15', margin: '3px' }}>
                        <td style={{ outline: '2px solid black' }} className="primary-header9">
                          {plot.PlotCenter[0].toFixed(5)}
                        </td>
                        <td className="primary-header9">{plot.PlotCenter[1].toFixed(5)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="primary-header9">Plot data</p>
                  <div style={{ textAlign: 'left', lineHeight: '0.1', fontSize: '5px' }}>
                    <div>
                      <span className="primary-header9">Area : </span>
                      <span style={{ color: 'green' }} className="primary-header9">
                        {plot.Area}{' '}
                      </span>
                      <span className="primary-header9">sq. kilometers</span>
                    </div>
                    <p className="primary-header9">Est. Yearly Raw Rubber Production </p>
                    <div>
                      <span style={{ color: 'green' }} className="primary-header9">
                        {(plot.Area / 0.0016) * 230}
                      </span>
                      <span className="primary-header9"> kilograms ( Rate 230kg/rai/year )</span>
                    </div>
                    <p className="primary-header9">Maximum Carbon Credit Applicable</p>
                    <p style={{ color: 'green' }} className="primary-header9">
                      {((44 / 12) * ((plot.Area / 0.0016) * 230 * 0.65 * 0.8825 / 1000)).toFixed(2)} Credits
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>

  );
};

export default Print;
