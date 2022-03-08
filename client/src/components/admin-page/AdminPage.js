import React from 'react';
import '../../App.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Dashboard from './tabs/Dashboard';

const AdminPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='admin-page'>
    <div>
      <div>

        <h1>Admin page</h1>
        <table className='admin-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/dashboard`}>Dashboard</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Dashboard} />
          <Route path={`${path}/dashboard`} component = {Dashboard} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default AdminPage;
