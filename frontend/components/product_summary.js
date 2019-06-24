import React, { PureComponent } from 'react';
import appRoutes from 'src/constants/routes';
import { Redirect } from 'react-router';

export default class ProductSummary extends PureComponent {
  state = {
    redirect: '',
  };

  goToProductNewPage = () => {
    this.setState({ redirect: appRoutes.productNew });
  }

  render() {
    const { redirect } = this.state;
    const {
      product
    } = this.props;
    if(redirect) return <Redirect push to={redirect} />;
    return (
      <div className='products-summary' onClick={this.goToProductNewPage}>
        <div className='products-summary__name'>
          { product.name }
        </div>
        <div className='products-summary__brand'>
          <i className='products-summary__brand-by italic'> by </i> { product.brand }
        </div>
        <div className='products-summary__data-input-status'>
          <i className='italic'> Status </i> { product.dataInputStatus }
        </div>
      </div>
    )
  }

}
