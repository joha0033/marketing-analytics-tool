import * as React from 'react';
import ProductsTable from './ProductsTable';

export default class Products extends React.Component {
  render() {
    return (
      <div>
        <h1>Product Clicks by Source</h1>
        <ProductsTable />
      </div>
    );
  }
}
