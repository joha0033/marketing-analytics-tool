import ProductMap from './data/ProductMap';

// ideally this would be an entire service that allows users
// to add metadata based on a unique ID of products for data
// enrichment purposes
class Mapper {
  static mapProduct(productKey: string) {
    return ProductMap[productKey];
  }
}

export default Mapper;
