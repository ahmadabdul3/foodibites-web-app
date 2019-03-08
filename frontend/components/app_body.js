import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePageContainer from 'src/frontend/containers/home_page_container';
import ProductNewPage from 'src/frontend/pages/product_new_page';
import appRoutes from 'src/constants/routes';

export default class AppBody extends Component {
  render() {
    return (
      <div className='app-body'>
        <Route exact path={appRoutes.home} component={HomePageContainer} />
        <Route exact path={appRoutes.productNew} component={ProductNewPage} />
      </div>
    );
  }
}
