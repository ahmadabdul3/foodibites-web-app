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
    http.get('/product').then(
      data => {
        this.setState({
          products: data.products
        })
      }
    ).catch(
      e => {
        console.log('error', e);
      }
    );
  }

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    const { error, redirectTo } = this.state;
    const { products } = this.state;
    console.log('products', products);
    if (redirectTo) return <Redirect push to={redirectTo} />;
    if(!products) {
      return (
        <div className='home-page'>
          <header className='home-page__header'>
            <div className='content'>
              <button className='green-button' onClick={this.goToProductNewPage}>
                <i className='fas fa-plus' /> New Product
              </button>
            </div>
          </header>
          <div>
              No products...
          </div>
        </div>
      );
    } else {

      let dataArray = [];
      products.map((datum, i) => {
        //return <div key={i}>{ datum.name }</div>
        console.log('datum', datum);
        console.log('i', i);
        console.log('datum.name', datum.name);
        console.log('');
        dataArray.push(datum.name);
      });
      console.log(typeof(dataArray));
      console.log(dataArray);
      return (
        <div>hello</div>
      );
    }
  }
}

// <section className='home-page__content'>
//   <div className='page-width'>
//     <AddProductForm />
//   </div>
// </section>
