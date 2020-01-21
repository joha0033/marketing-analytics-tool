import * as React from 'react';
import ProductsTable from './ProductsTable';

export default class Products extends React.Component {
  state = {clicks: null};

  render() {
    const {clicks} = this.state;
    return (
      <div>
        <h1>waaawwa</h1>
        <ProductsTable />
      </div>
    );
  }
}
