import React from 'react';
import '../../App.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Booking from './tabs/Booking';
import CurrentTrip from './tabs/CurrentTrip';
import CompletedTrips from './tabs/CompletedTrips';

const UserPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='user-page'>
    <div>
      <div>

        <h1>Passenger page</h1>
        <table className='admin-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/booking`}>Booking</Link>
            </td>
            <td>
              <Link className="menu-link" to={`${url}/user-current-trip`}>Current Trip</Link>
            </td>
            
            <td>
              <Link className="menu-link" to={`${url}/user-completed-trips`}>Completed Trips</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Booking} />
          <Route path={`${path}/booking`} component = {Booking} />
          <Route path={`${path}/user-current-trip`} component = {CurrentTrip} />
          <Route path={`${path}/user-completed-trips`} component = {CompletedTrips} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default UserPage;
