import React, { Component, PureComponent } from 'react';
import { Redirect } from 'react-router';
import appRoutes from 'src/constants/routes';
import http from 'src/frontend/services/http';
import FormInput from 'src/frontend/components/form_input';
import ProductSummary from 'src/frontend/components/product_summary';
import { throwStatement } from 'babel-types';
import { productStatusComplete, productStatusIncomplete, productStatusPendingReview } from 'src/constants/product_status';

export default class HomePage extends Component {
  state = {
    loading: false,
    error: '',
    redirectTo: '',
    products: '',
    brandFilterString: '',
    complete: '',
    incomplete: '',
    pendingReview: '',
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

  productStatusIncludesFilter = (string) => {
    const { complete, incomplete, pendingReview } = this.state;
    string = string.toLowerCase();
    let ret = false;
    let filtExists = false;
    if (this.state.complete) {
      ret |= string === complete.toLowerCase();
      filtExists = true;
    }
    if (this.state.incomplete) {
      ret |= string === incomplete.toLowerCase();
      filtExists = true;
    }
    if (this.state.pendingReview) {
      ret |= string === pendingReview.toLowerCase();
      filtExists = true;
    }
    if (!filtExists) {
      return true;
    }
    return ret;
  }

  productBrandIncludesFilter = (string) => {
    const { brandFilterString } = this.state;
    return string.toLowerCase().includes(brandFilterString.toLowerCase());
  }

  renderProducts = () => {
    const { products, brandFilterString } = this.state;
    if (!products) return <div> No products </div>;
    const productsMarkup = products.map((datum, i) => {
      if (!this.productStatusIncludesFilter(datum.dataInputStatus)) return;
      if (brandFilterString && !this.productBrandIncludesFilter(datum.brand)) return;
      return (
        <ProductSummary
          product={datum}
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

  checkBoxOnChangeComplete = ({ name, value }) => {
    // console.log('checkbox');
    // console.log('name & value', name, value)
    // if(this.state[name]) {
    //   this.setState({ [name]: '' });
    // } else {
    //   this.setState({ [name]: value });
    // }
    if(this.state.complete) {
      this.setState({ complete: '' });
    } else {
      this.setState({ complete: 'complete' });
    }
  }

  checkBoxOnChangeIncomplete = ({ name, value }) => {
    if(this.state.incomplete) {
      this.setState({ incomplete: '' });
    } else {
      this.setState({ incomplete: 'incomplete' });
    }
  }

  checkBoxOnChangePendingReview = ({ name, value }) => {
    if(this.state.pendingReview) {
      this.setState({ pendingReview: '' });
    } else {
      this.setState({ pendingReview: 'pending-review' });
    }
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
                labelText='Search...'
                name='brandFilterString'
                value={this.state.brandFilterString}
                type='text'
                onChange={this.onChange}
              />
            </div>
            <button className='green-button' onClick={this.goToProductNewPage}>
              <i className='fas fa-plus' /> New Product
            </button>
            <div style={{ }}>
              <label> Complete </label>
              <input
                type='checkbox'
                name={productStatusComplete.key}
                value={productStatusComplete.value}
                onChange={this.checkBoxOnChangeComplete}
              />
              <label> Incomplete </label>
              <input
                type='checkbox'
                name={productStatusIncomplete.key}
                value={productStatusComplete.value}
                onChange={this.checkBoxOnChangeIncomplete}
              />
              <label> Pending Review </label>
              <input
                type='checkbox'
                name={productStatusPendingReview.key}
                value={productStatusPendingReview.value}
                onChange={this.checkBoxOnChangePendingReview}
              />
            </div>
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
