import React, { Component, PureComponent } from 'react';
import { Redirect } from 'react-router';
import appRoutes from 'src/constants/routes';
import http from 'src/frontend/services/http';
import FormInput from 'src/frontend/components/form_input';

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

  renderProducts = () => {
    const { products } = this.state;
    if(!products) return <div> No products </div>;
    const productsMarkup = products.map((datum, i) => {
      if(this.state.dataInputStatusFilterString.length > 0) {
        if(datum.dataInputStatus.toLowerCase().includes(this.state.dataInputStatusFilterString.toLowerCase())) {
          return (
            <div key={ i } className='products-summary'>
              <div className='products-summary__name'>
                { datum.name }
              </div>
              <div className='products-summary__brand'>
                <i className='products-summary__brand-by italic'> by </i> { datum.brand }
              </div>
              <div className='products-summary__data-input-status'>
                <i className='italic'> Status </i> { datum.dataInputStatus }
              </div>
            </div>
          );
        }
      } else {
        return (
          <div key={ i } className='products-summary'>
            <div className='products-summary__name'>
              { datum.name }
            </div>
            <div className='products-summary__brand'>
              <i className='products-summary__brand-by italic'> by </i> { datum.brand }
            </div>
            <div className='products-summary__data-input-status'>
              <i className='italic'> Status </i> { datum.dataInputStatus }
            </div>
        </div>
        );
      }
    });
    return (
      <div className='products-summary__container'>
        { productsMarkup }
      </div>
    );
  }

  onChange = ({name, value}) => {
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
