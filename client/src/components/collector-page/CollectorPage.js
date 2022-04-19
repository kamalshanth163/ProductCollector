import React from 'react';
import '../../App.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Store from './tabs/Store';

const UserPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='collector-page'>
    <div>
      <div>

        <h1>Product Collector page</h1>
        <table className='admin-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/store`}>Store</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Store} />
          <Route path={`${path}/store`} component = {Store} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default UserPage;
