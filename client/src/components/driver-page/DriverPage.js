import React from 'react';
import '../../App.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Details from './tabs/Details';
import CurrentTrip from './tabs/CurrentTrip';
import CompletedTrips from './tabs/CompletedTrips';

const DriverPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='driver-page'>
    <div>
      <div>

        <h1>Driver page</h1>
        <table className='admin-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/details`}>Details</Link>
            </td>
            <td>
              <Link className="menu-link" to={`${url}/driver-current-trip`}>Current Trip</Link>
            </td>
            
            <td>
              <Link className="menu-link" to={`${url}/driver-completed-trips`}>Completed Trips</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Details} />
          <Route path={`${path}/details`} component = {Details} />
          <Route path={`${path}/driver-current-trip`} component = {CurrentTrip} />
          <Route path={`${path}/driver-completed-trips`} component = {CompletedTrips} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default DriverPage;
