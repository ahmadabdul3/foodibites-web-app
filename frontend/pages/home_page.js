import React, { Component, PureComponent } from 'react';
import { Redirect } from 'react-router';
import appRoutes from 'src/constants/routes';

export default class HomePage extends Component {
  state = {
    loading: false,
    error: '',
    redirectTo: '',
  }

  goToProductNewPage = () => {
    this.setState({ redirectTo: appRoutes.productNew });
  }

  render() {
    const { error, redirectTo } = this.state;
    if (redirectTo) return <Redirect push to={redirectTo} />;

    return (
      <div className='home-page'>
        <header className='home-page__header'>
          <div className='content'>
            <button className='green-button' onClick={this.goToProductNewPage}>
              <i className='fas fa-plus' /> New Product
            </button>
          </div>
        </header>
      </div>
    );
  }
}

// <section className='home-page__content'>
//   <div className='page-width'>
//     <AddProductForm />
//   </div>
// </section>
