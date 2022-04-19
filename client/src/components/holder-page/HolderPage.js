import React from 'react';
import '../../App.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Details from './tabs/Details';
import Products from './tabs/Products';

const DriverPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='holder-page'>
    <div>
      <div>

        <h1>Product Holder page</h1>
        <table className='admin-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/details`}>Product management</Link>
            </td>
            <td>
              <Link className="menu-link" to={`${url}/products`}>Added products</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Details} />
          <Route path={`${path}/details`} component = {Details} />
          <Route path={`${path}/products`} component = {Products} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default DriverPage;
