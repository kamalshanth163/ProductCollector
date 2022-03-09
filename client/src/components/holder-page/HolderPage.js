import React from 'react';
import '../../App.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Details from './tabs/Details';

const DriverPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='driver-page'>
    <div>
      <div>

        <h1>Holder page</h1>
        <table className='admin-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/details`}>Details</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Details} />
          <Route path={`${path}/details`} component = {Details} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default DriverPage;
