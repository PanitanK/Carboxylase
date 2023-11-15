import { useRouteError } from "react-router-dom";
import Title from './image/logo/CBX_Transparent.png';

export default function Err() {
  const error = useRouteError();
  console.error(error);

  return (

    <div className="App">
      <div className="static-bar">
        <div className="left-content">
          <a href="/">
            <img src={Title} alt="Title" /> 
          </a>
        </div>
      </div>


      <div className="App-header">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p><i>{error.statusText || error.message}</i></p>
      </div>
    </div>
  );
}

