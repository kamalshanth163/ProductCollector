import React from 'react';
import '../../App.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Booking from './tabs/Booking';

const UserPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='user-page'>
    <div>
      <div>

        <h1>Collector page</h1>
        <table className='admin-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/booking`}>Booking</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Booking} />
          <Route path={`${path}/booking`} component = {Booking} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default UserPage;
