import React, { PureComponent } from 'react';

export default class ProductSummary extends PureComponent {
  state = {};

  render() {
    const {
      product
    } = this.props;

    return (
      <div className='products-summary'>
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
