/*
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
*/

import React, { PureComponent } from 'react';

export default class ProductMarkup extends PureComponent {
  productName = null;
  productBrand = null;
  productStatus = null;
  state = {};

  render() {
    const {
      productName,
      productBrand,
      productStatus,
      keyProp,
    } = this.props;

    return (
      <div key={keyProp} className='products-summary'>
        <div className='products-summary__name'>
          { productName }
        </div>
        <div className='products-summary__brand'>
          <i className='products-summary__brand-by italic'> by </i> { productBrand }
        </div>
        <div className='products-summary__data-input-status'>
          <i className='italic'> Status </i> { productStatus }
        </div>
      </div>
    )
  }

}
