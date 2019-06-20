import React, { Component, PureComponent } from 'react';
import { Redirect } from 'react-router';
import appRoutes from 'src/constants/routes';
import http from 'src/frontend/services/http';
import FormInput from 'src/frontend/components/form_input';
import ProductMarkup from 'src/frontend/components/product_markup';

export default class HomePage extends Component {
  state = {
    loading: false,
    error: '',
    redirectTo: '',
    products: '',
    dataInputStatusFilterString: '',
  }

  goToProductNewPage = () => {
    this.setState({ redirectTo: appRoutes.productNew });
  }

  fetchProducts = () => {
    http.get('/product').then(res => {
      this.setState({ products: res.products });
    }).catch(e => {
      console.log('error', e);
    });
  }

  componentDidMount() {
    this.fetchProducts();
  }

  stringIncludes = (string, include) => {
    return string.toLowerCase().includes(include.toLowerCase());
  }

  renderProducts = () => {
    const { products, dataInputStatusFilterString } = this.state;
    if (!products) return <div> No products </div>;
    const productsMarkup = products.map((datum, i) => {
      if (dataInputStatusFilterString && !this.stringIncludes(datum.dataInputStatus, dataInputStatusFilterString)) return;

      return (
        <ProductMarkup
          productName={datum.name}
          productBrand={datum.brand}
          productStatus={datum.dataInputStatus}
          key={i}
        />
      );
      
    });
    return (
      <div className='products-summary__container'>
        { productsMarkup }
      </div>
    );
  }

  onChange = ({ name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { error, redirectTo } = this.state;
    if (redirectTo) return <Redirect push to={redirectTo} />;
    return (
      <div className='home-page'>
        <header className='home-page__header'>
          <div className='content'>
            <div className='data-input-status'>
              <FormInput
                labelText='Filter on'
                name='dataInputStatusFilterString'
                value={this.state.dataInputStatusFilterString}
                type='text'
                onChange={this.onChange}
              />
            </div>
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
