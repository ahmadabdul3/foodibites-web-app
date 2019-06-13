import React, { Component, PureComponent } from 'react';
import { Redirect } from 'react-router';
import appRoutes from 'src/constants/routes';
import http from 'src/frontend/services/http';

export default class HomePage extends Component {
  state = {
    loading: false,
    error: '',
    redirectTo: '',
    products: '',
  }

  goToProductNewPage = () => {
    this.setState({ redirectTo: appRoutes.productNew });
  }

  fetchProducts = () => {
    http.get('/product').then(res => {
        this.setState({
          products: res.products
        })
    }).catch(e => {
        console.log('error', e);
    });
  }

  componentDidMount() {
    this.fetchProducts();
  }

  renderProducts = () => {
    const { products } = this.state;
    if(!products) { return (<div> No products </div>); }
    const dataArray = products.map((datum, i) => {
      return (
        <div key={ i } className='products-component'>
          <div className='products-component-name'>
            { datum.name }
          </div>
          <div className='products-component-seperator'></div>
          <div className='products-component-brand'>
            <i style={{fontStyle: 'italic'}}> by:&nbsp; </i> { datum.brand }
          </div>
        </div>
      );
    });
    return(
      <div className='products-component-container'>
        { dataArray }
      </div>
    );
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
          { this.renderProducts() }
        </div>
      );
  }
}

// <section className='home-page__content'>
//   <div className='page-width'>
//     <AddProductForm />
//   </div>
// </section>
